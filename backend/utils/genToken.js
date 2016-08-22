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
    username: request.email,
    password: request.password,
    telephone: request.telephone,
    memberType: request.memberType
  };

  return getUserInfo;
}
