/**
 * Created by KIMSEONHO on 2016-08-16.
 */
// Importing Passport, strategies, and config
const passport = require('passport'),
  models = require('../models'),
  Member = models.Member,
  config = require('./main.js'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
}

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  Member.findOne({ where: {email: email} }).then(function(user) {
    if(!user) {
      return done(null, false, {
        errorMsg: 'Your login details could not be verified. Please try again.',
        statusCode: 0
      });
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) {
        return done(null, false, {
          errorMsg: "Your login details could not be verified. Please try again.",
          statusCode: 2
        });
      }

      return done(null, user);    // user로 넘어가니까 받는 router의 req에서 user라는 이름의 object를 사용할 수 있다.
    });
  }).catch(function(err) {
    if(err) { return done(err); }
  });
});

// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret

  // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
// ID, 비밀번호까지 확인 해야되는데 일단 "야메로" idx만 확인하자
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  Member.findById(payload.idx).then(function(err, user) {
    if (user) {
      done(null, user);   // localStrategy와 같다.
    } else {
      done(null, false);
    }
  }).catch(function(err) {
    if (err) { return done(err, false); }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
