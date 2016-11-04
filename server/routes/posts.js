'use strict'

var posts = {
  getAll: function(req, res) {
    var allposts = data;
    res.json(allposts);
  },

  get: function(req, res) {
    var id = req.params.id;
    var post = data[0];
    res.json(post);
  },

  create: function(req, res) {
    var newpost = req.body;
    data.push(newpost);
    res.json(newpost);
  },
  
  update: function(req, res) {
    var updatedpost = req.body;
    var id = req.params.id;
    data[id] = updatedpost;
    res.json(updatedpost);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1);
    res.json(true);
  }
};

// mock data, should be rely on your app database
var data = [{ id: '1', title: 'post title 1'},
{ id: '2', title: 'post title 2' },
{ id: '3', title: 'post title 3' },
{ id: '4', title: 'post title 4' },
{ id: '5', title: 'post title 5' },
{ id: '6', title: 'post title 6' }];

module.exports = posts;