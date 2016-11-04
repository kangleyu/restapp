'use strict'

var users = {
  getAll: function(req, res) {
    var users = data;
    res.json(users);
  },

  get: function(req, res) {
    var id = req.params.id;
    var user = data[0];
    res.json(user);
  },

  create: function(req, res) {
    var newuser = req.body;
    data.push(newuser);
    res.json(newuser);
  },
  
  update: function(req, res) {
    var updateduser = req.body;
    var id = req.params.id;
    data[id] = updateduser;
    res.json(updateduser);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1);
    res.json(true);
  }
};

// mock data, should be rely on your app database
var data = [{ id: '1', name: 'user 1'},
{ id: '2', name: 'user 2' },
{ id: '3', name: 'user 3' },
{ id: '4', name: 'user 4' },
{ id: '5', name: 'user 5' },
{ id: '6', name: 'user 6' }];

module.exports = users;