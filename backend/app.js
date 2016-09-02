'use strict';

var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    router = require('./frontRouter');


var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.options("*", cors());
app.use(cors({
  "origin": "*",
  "allowedHeaders": 'X-Requested-With, Content-Type, Accept, Authorization',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "credentials": true,
  "preflightContinue": true
}));    // 왜 안먹는거지?

// catch 404 and forward to error handler
// app.use(function(err, req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

// Import routes to be served
router(app);

module.exports = app;
