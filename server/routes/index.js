'use strict'

var express = require('express');
var router = express.Router();

var auth = require('./auth');
var posts = require('./posts');
var users = require('./users')

/**
 * routes that can be accessed by anyone 
 */
router.post('/login', auth.login);

/**
 * routes that can be accessed only by authenticated users
 */
router.get('/api/posts', posts.getAll);
router.get('/api/posts/:id', posts.get);
router.post('/api/posts', posts.create);
router.put('/api/posts/:id', posts.update);
router.delete('/api/posts/:id', posts.delete);

/**
 * routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/admin/users', users.getAll);
router.get('/api/admin/users/:id', users.get);
router.post('/api/admin/users', users.create);
router.put('/api/admin/users/:id', users.update);
router.delete('/api/admin/users/:id', users.delete);

module.exports = router;