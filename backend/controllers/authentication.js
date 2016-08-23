/**
 * Created by KIMSEONHO on 2016-08-16.
 */
"use strict";

const crypto = require('crypto'),
  _ = require('lodash'),
  models = require('../models'),
  Member = models.Member,
  BusinessMember = models.BusinessMember,
  mailgun = require('../config/mailgun'),
  mailchimp = require('../config/mailchimp'),
  config = require('../config/main'),

  genToken = require("../utils/genToken");

// statusCode나 memberType을 enum으로 처리하자
const BIZMEMBER = 2;

//========================================
// Login Route - passport의 LocalStrategy를 이용함
//========================================
exports.login = function(req, res, next) {

  req.user.passwordOrigin = req.body.password;
  let userInfo = genToken.setUserInfo(req.user);   // passport에서 받은 object

  res.status(200).json({
    id_token: 'JWT ' + genToken.generateUserToken(userInfo),
    user: userInfo,    // password가 hash로 오기 때문에,
    statusCode: 1
  });

  return next();
}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;
  const memberType = req.body.memberType;

  // Return error if no email provided
  if (!email) {
    return res.status(400).send({
      errorMsg: 'You must enter an email address.',
      statusCode: -1
    });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(400).send({ errorMsg: 'You must enter a password.', statusCode: -1 });
  }

  Member.findOne({
    where: {
      email: email
    }
  }).then(function(existingUser) {
    // If user is not unique, return error
    if (existingUser) {
      return res.status(400).send({
        errorMsg: 'That email address is already in use.',
        statusCode: 2
      });
    }

    // If email is unique and password was provided, create account
    let user = {
      email: email,
      password: password,
      memberType: memberType
    };

    if (_.eq(memberType, BIZMEMBER)) {    // biz회원 가입시, transaction 때문에 나눠놨음
      return models.sequelize.transaction(function (t) {
        return Member.create(user, {transaction: t}).then(function(newUser) {
          // Subscribe member to Mailchimp list
          // mailchimp.subscribeToNewsletter(user.email);

          // Respond with JWT if user was created
          newUser.passwordOrigin = password;    // 인코딩 전의 패스워드 저장
          let userInfo = genToken.setUserInfo(newUser);

          let bizMember = {
            memberIdx: newUser.idx
          };

          return BusinessMember.create(bizMember, {transaction: t}).then(function(user) {
            return models.sequelize.Promise.resolve(userInfo);
          });
        })
      }).then(function(userInfo) {    // commit구간
        return res.status(201).json({
          id_token: 'JWT ' + genToken.generateUserToken(userInfo),
          user: userInfo,
          status: 1
        });
      }).catch(function(err) {    // end sequelize.transaction, rollback구간
        if (err) {
          res.status(422).json({ errorMsg: 'Internal Error', statusCode: 9 });
          return next(err);
        }
      });
    } else {    // 일반 회원 가입시
      Member.create(user).then(function(newUser) {
        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created
        newUser.passwordOrigin = password;    // 인코딩 전의 패스워드 저장
        let userInfo = genToken.setUserInfo(newUser);

        return res.status(201).json({
          id_token: 'JWT ' + genToken.generateUserToken(userInfo),
          user: userInfo,
          status: 1
        });

      }).catch(function(err) {    // end Member.create
        if (err) { return next(err); }
      });
    }
  }).catch(function(err) {    // end Member.findOne
    if (err) { return next(err); }
  });
}

//========================================
// Authorization Middleware - 사용하지 않음. 쓰임새가 있을 것 같으니 지우지 말자
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    Member.findById(user.idx).then(function(foundUser) {
      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ errorMsg: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    }).catch(function(err) {
      if (err) {
        res.status(422).json({ errorMsg: 'No user was found.' });
        return next(err);
      }
    })
  }
}

//========================================
// Forgot Password Route
//========================================

exports.forgotPassword = function(req, res, next) {
  const email = req.body.email;

  Member.findOne({ where: { email: email }}).then(function(existingUser) {
    // If user is not found, return error
    if (existingUser == null) {
      res.status(422).json({ errorMsg: 'Your request could not be processed as entered. Please try again.' });
      return next(new Error("not matching, please check again."));
    }

    // If user is found, generate and save resetToken

    // Generate a token with Crypto
    crypto.randomBytes(48, function(err, buffer) {
      const resetToken = buffer.toString('hex');
      if (err) { return next(err); }

      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      existingUser.save().then(function(user) {

        const message = {
          subject: 'Reset Password',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset-password/' + resetToken + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }

        // Otherwise, send user email via Mailgun
        mailgun.sendEmail(existingUser.email, message);

        res.status(200).json({ message: 'Please check your email for the link to reset your password.'});
        next();
      }).catch(function(err) {
        // If error in saving token, return it
        if (err) { return next(err); }
      });
    });
  }).catch(function(err) {    //end Member.findOne
    // If user is not found, return error
    if (err) {
      res.status(422).json({ errorMsg: 'Your request could not be processed as entered. Please try again.' });
      return next(err);
    }
  });
}

//========================================
// Reset Password Route
//========================================

exports.verifyToken = function(req, res, next) {
  Member.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).then(function(resetUser) {
    // If query returned no results, token expired or was invalid. Return error.
    if(!resetUser) {
      res.status(422).json({ errorMsg: 'Your token has expired. Please attempt to reset your password again.' });
    }

    // Otherwise, save new password and clear resetToken from database
    resetUser.password = req.body.password;
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;

    resetUser.save({ fields: ["password"] }).then(function(user) {

      // If password change saved successfully, alert user via email
      const message = {
        subject: 'Password Changed',
        text: 'You are receiving this email because you changed your password. \n\n' +
        'If you did not request this change, please contact us immediately.'
      }

      // Otherwise, send user email confirmation of password change via Mailgun
      mailgun.sendEmail(resetUser.email, message);

      res.status(200).json({ message: 'Password changed successfully. Please login with your new password.'});
      next();
    }).catch(function(err) {
      if (err) { return next(err); }
    });
  });   // end Member.findOne
}
