'use strict'

var jwt = require('jsonwebtoken');
var secret = require('../config/secret');

var auth = {
  login: function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      // return unauthroized error
      res.status(401);
      res.json({
        status: 401,
        message: "Invalid credentials"
      });
      return;
    }

    // fire a query to database for checking whether credential is validate
    var userobj = auth.validate(username, password);
    if (!userobj) {
      // return unauthroized error
      res.status(401);
      res.json({
        status: 401,
        message: "Invalid credentials"
      });
      return;
    } else {
      // if authentication succecced, then we will generate a token
      // and issue it to the client
      res.json(generateToken(userobj));
    }
  },

  // validate user against your data store
  validate: function(username, password) {
    // mock data - should query your database like mongodb
    var dbUserObj = {
      name: 'kangleyu',
      role: 'admin',
      username: 'kangleyu@yourapp.com'
    };

    return dbUserObj;
  },

  // validate wheter user is existing
  validateUser: function(username) {
    // mock data - should query your database like mongodb
    var dbUserObj = {
      name: 'kangleyu',
      role: 'admin',
      username: 'kangleyu@yourapp.com'
    };

    return dbUserObj;
  },
}

// private methods
// generate jwt token for user
function generateToken(user) {
  // refer to http://www.npmjs.com/package/jsonwebtoken for usage
  var expires = "7 days"; // should be put into config file, configure for how long the token will be expired
  var token = jwt.sign(user, secret());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

module.exports = auth;