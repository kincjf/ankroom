/**
 * 시간이 없으므로 임시 테스트용으로 개발 한 후에,
 * 차후에 DB연동을 하자.
 */
var express = require('express'),
    _       = require('lodash'),
    config  = require('./../config/main'),
    jwt     = require('jsonwebtoken');
    mysql   = require('./mysqldb');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
// memberType : 1 - 일반회원, 2 - 사업주회원
var users = [{
  id: 1,
  email: 'goto',
  password: 'goto',
  memberType: 1
}, {
  id: 2,
  email: 'moblab',
  password: 'hitit113112',
  memberType: 2
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

// create a new user
// 나중에 username을 email로 바꾸기
app.post('/user', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.memberType) {
    return res.status(400).send("You must send the email and the password, memberType!");
  }

  mysql.isEmail(req.body.username, function(err, results) {
    if (err) {
      return res.status(500).send("DB Server Error - isEmail");
    }

    if (results[0].count === 0) {
      // IDX - Auto Increment
      var profile = _.pick(req.body, 'username', 'password', 'memberType');

      mysql.createAccount(profile.username, profile.password, profile.memberType, function(err, results) {
        if (err) {
          return res.status(500).send("DB Server Error - createAccount");
        }

        res.status(201).send({
          id_token: createToken(profile)
        });
      });
    } else {
      return res.status(400).send("A user with that email already exists");
    }
  });
});

// Login시 Session 생성
app.post('/session/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  mysql.getUserByEmail(req.body.username, function(err, results) {
    if (err) {
      return res.status(500).send("DB Server Error - getUserByEmail");
    }

    if (!results) {
      return res.status(401).send("The username doesn't exist");
    } else {
      if (!(results[0].password === req.body.password)) {
        return res.status(401).send("The password don't match");
      } else {
        res.status(201).send({
          id_token: createToken(results[0])
        });
      }
    }
  });
});

// 회원 정보 수정
// memberType을 체크하여 각 회원 정보에 맞게 수정함
app.put('/user/:id', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  mysql.getUserByEmail(req.body.username, function(err, results) {
    if (!results) {
      return res.status(401).send("The username doesn't exist");
    } else {
      if (!(results[0].password === req.body.password)) {
        return res.status(401).send("The password don't match");
      } else {
        res.status(201).send({
          id_token: createToken(user)
        });
      }
    }
  });
});

function setSession(session,email,account,id,login){
  session.email = email;
  session.account= account;
  session.idx = id;
  session.login = login;

  return session;
}

function removeSession(session){
  delete session.email;
  delete session.account;
  delete session.id;
  session.login=false;

  return session;
}
