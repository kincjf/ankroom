var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
// 일단 DB 연동은 나중에 하자.
var users = [{
  id: 1,
  username: 'goto',
  password: 'goto'
}, {
  id: 2,
  username: 'moblab',
  password: 'hitit113112'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

// create a new user
app.post('/user', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  // User 중복검사는 DB에서 수행 하자.
  if (_.find(users, {username: req.body.username})) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, 'username', 'password', 'memberType');
  profile.id = _.max(users, 'id').id + 1;   // IDX를 뜻함.
  // IDX 값은 Auto Increment로 생성된 값을 이용 할 예정이므로 내부 정보는 삭제하자.

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

// Login시 Session 생성
app.post('/session/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, {username: req.body.username});    // 나중에 이 부분은 DB와 연동되는 부분으로 교체
  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (!(user.password === req.body.password)) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
