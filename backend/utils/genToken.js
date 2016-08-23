/**
 * Created by KIMSEONHO on 2016-08-22.
 */
"use strict";

const jwt = require('jsonwebtoken'),
  config = require('../config/main');

// Generate JWT
// TO-DO Add issuer and audience
exports.generateUserToken = function(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds, 2.8시간
  });
}

// Set user info from request
exports.setUserInfo = function(request) {
  let getUserInfo = {
    idx: request.idx,
    email: request.email,
    password: request.password,
    memberType: request.memberType,
    passwordOrigin: request.passwordOrigin    // 인코딩 전의 패스워드도 저장해놓자.
  };

  return getUserInfo;
}
