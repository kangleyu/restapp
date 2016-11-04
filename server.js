'use strict'

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// setup static server
app.use(express.static(__dirname + '/client'));

// set middleware for express
// add log middleware
app.use(morgan('dev'));
// add request and response json body parser
app.use(bodyParser.json());

// add request inspector middleware to add required header for the response
app.all('/*', function(req, res, next) {
  // cors header
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
  // custom headers for cors
  res.header("Access-Control-Allow-Headers", "Content-type, Accept, X-Access-Token, X-Key");
  // Skip OPTIONS request
  if(req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    // keep on next handler
    next();
  }
});

// authentication middleware - check whether the token is valid
// only the requests that start with /api/* will be checked for the token
// all other request are assumed that they are no need authentication
app.all('/api/*', [require('./server/middlewares/validate')]);

// define routes
app.use('/', require('./server/routes'));

// if no route matched, then return 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// launch the server
app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function(){
  console.log('Express server is listening on port - ' + server.address().port);
});

// export the app as module for testing purpose
module.exports = server;
