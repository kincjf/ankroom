/**
 * Created by KIMSEONHO on 2016-08-16.
 */
"use strict";
const _ = require('lodash');
const genToken = require('../utils/genToken');

const models = require('../models');
const Member = models.Member;
const BusinessMember = models.BusinessMember;

// statusCode나 memberType을 enum으로 처리하자
const BIZMEMBER = 2;
//========================================
// Member Routes
//========================================
// 회원 정보 조회
exports.viewProfile = function(req, res, next) {
  const userId = _.toNumber(req.params.memberIdx);

  if (req.user.idx != userId) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to view this user profile.',
      statusCode: 2
    });
  }

  Member.findById(userId).then(function(user) {
    res.status(200).json({ user: user, statusCode: 1 });
    return next();
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: -1
      });
      return next(err);
    }
  });
}

// 회원 정보 수정
exports.updateProfile = function(req, res, next) {
  const userId = _.toNumber(req.params.memberIdx);

  if (req.user.idx != userId) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to view this user profile.',
      statusCode: 2
    });
  }

  const current = {
    email: req.user.email,
    password: req.user.passwordOrigin,
    telephone: req.user.telephone
  }

  const changes = {
    email: req.body.email,
    password: req.body.password,
    telephone: req.body.telephone
  };

  // return Array[0] = affectedRows
  Member.update(changes, {where: { idx: userId }}).then(function(array) {
    if(array[0] == 1) {   // 변경 된 경우
      // email, pwd이 바뀐 경우
      if(!_.eq(current.email, changes.email) || !_.eq(current.password, changes.password)) {
        return next();
      } else {    // 바뀌지 않거나, 전화번호만 바뀌었을 경우
        return res.status(200).json({
          msg: 'change Only telephone',
          statusCode: 0
        });
      }
    }

    res.status(200).json({
      msg: 'No changes',
      statusCode: 0
    });

    return next("route");   // 다른 callback은 무시함.
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: -1
      });
      return next(err);
    }
  });
}

// {
//   let userInfo = genToken.setUserInfo(user);
//
//   res.status(200).json({
//     id_token: 'JWT ' + genToken.generateUserToken(userInfo),
//     user: user,
//     statusCode: 1
//   });
// }

// 사업주 회원 정보 조회
exports.viewBizProfile = function(req, res, next) {
  const userId = _.toNumber(req.params.memberIdx);

  if ((req.user.idx != userId) || (req.user.memberType != BIZMEMBER)) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to view this user profile.',
      statusCode: 2
    });
  }

  BusinessMember.findById(userId).then(function(user) {
    res.status(200).json({ bizUserInfo: user, statusCode: 1 });
    return next();
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: -1
      });
      return next(err);
    }
  });
}

// 사업주 회원 정보 입력, 수정
exports.updateBizProfile = function(req, res, next) {
  const userId = _.toNumber(req.params.memberIdx);

  if ((req.user.idx != userId) || (req.user.memberType != BIZMEMBER)) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to view this user profile.',
      statusCode: 2
    });
  }

  if (!req.body.companyName || !req.body.ownerName || !req.body.bizRegNo || !req.body.workPlace || !req.body.contact) {
    return res.status(401).json({
      errorMsg: 'You must enter an required field! please check companyName, ownerName, bizRegNo, workPlace, contact.',
      statusCode: -1
    });
  }

  BusinessMember.update({
    companyName: req.body.companyName,
    ownerName: req.body.ownerName,
    bizRegNo: req.body.bizRegNo,
    workPlace: req.body.workPlace,
    contact: req.body.contact,
    mainWorkField: req.body.mainWorkField,
    mainWorkArea: req.body.mainWorkArea,
    aboutCompanyShort: req.body.aboutCompanyShort,
    aboutCompany: req.body.aboutCompany,
    companyLogo: req.body.companyLogo,
    companyIntroImage: req.body.companyIntroImage
  }, {where: { id: userId }}).then(function(user) {
    res.status(200).json({ bizUserInfo: user, statusCode: 1 });
    return next();
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: -1
      });
      return next(err);
    }
  });
}
