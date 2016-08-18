// 예제 실행용, 나중에 지우자

var express = require('express'),
    quoter  = require('./../tests/quoter');

var app = module.exports = express.Router();

app.get('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});
