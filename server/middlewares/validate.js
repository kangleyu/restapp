'use strict'
var jwt = require('jsonwebtoken');
var validateUser = require('../routes/auth').valiateUser;
var secret = require('../config/secret');

module.exports = function(req, res, next) {
  // when performing a cross domian request, you will recieve
  // a preflighted request first, this is to check if our the app
  // is safe.

  // we skip the token outh for [OPTIONS] requests
  //if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      jwt.verify(token, secret(), function(err, decoded) {
        if (err) {
          if (err.expiredAt) {
            res.status(400);
            res.json({
              status: 400,
              message: "Token expired"
            });
            return;
          } else {
            res.status(400);
            res.json({
              status: 400,
              message: "Token parse error"
            });
          }
        } else {
          // authorize the user to see whether s/he can access our resources
          var dbuser = validateUser(key);
          if (dbuser) {
            if((req.url.indexOf('admin') >= 0 && dbuser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api') >= 0)) {
              next(); // move to next middleware
            } else {
              res.status(403),
              res.json({
                status: 403,
                message: "Not authorized"
              });
              return;
            }
          }
        }
      });
    } catch(err) {
      res.status(500),
      res.json({
        status: 500,
        message: "Oops! something went wrong",
        error: err
      });
      return;
    }
  } else {
    res.status(401),
    res.json({
      status: 401,
      message: "Invalid token or key"
    });
    return;
  }
};