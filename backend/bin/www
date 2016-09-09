#!/usr/bin/env node

var debug = require('debug')('ankroom:server');
var app = require('../app');
var models = require("../models");
var http = require('http');
var env = process.env.NODE_ENV || "development";
var config = require('../config/main')[env];

var testDB = require('../tests/testDB');

var server;
app.set('port', normalizePort(process.env.PORT || config.serverPort));

// If force: true it will first drop tables before recreating them.
models.sequelize.sync({ logging: true, force: true }).then(function () {
  /**
   * Listen on provided port, on all network interfaces.
   */
  // server = http.createServer(app).listen(app.get('port'), function (err) {
  //  debug('Express server listening on port ' + server.address().port);
  // });

  server = app.listen(app.get('port'), function (err) {
    debug('Express server listening on port ' + server.address().port);
  });

  server.on('error', onError);
  server.on('listening', onListening);

  if (env === 'development') {
    return setTestDatabase(testDB);    // test DB
  }
}).catch(function(err) {
  console.error(err + ' on sequelize.sync error');
  process.exit(1);
});

/**
 * setting test database, include in member.
 */
function setTestDatabase(testDB) {
  if(testDB) {
    models.Member.bulkCreate(testDB.member).then(function() {
      debug('create Member Test Database');
      return models.BusinessMember.bulkCreate(testDB.businessMember);
    }).then(function() {
      debug('create BusinessMember Test Database');
      return models.BuildCaseInfoBoard.bulkCreate(testDB.buildCaseInfoBoard);
    }).then(function() {
      debug('Complete create Test Database');
      return models.sequelize.Promise.resolve('Complete create Test Database');
    }).catch(function(err) {
      debug('create Test Database Error ' + err);
      return models.sequelize.Promise.reject(err);
    });
  } else {
    return models.sequelize.Promise.reject('no testDB is found');
  }
}


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
