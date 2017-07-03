'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

// module logic
const authRouter = module.exports = new Router();

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  console.log('hit /api/signup');
  console.log('*********Inside**********', req.body.username);
  if(!req.body.username || undefined) {
    return next(new Error('request body required'));
  }
  User.create(req.body)
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/api/login', basicAuth, (req, res, next) => {
  console.log('hit /api/login');
  console.log('//////////////////////', req.user);

  req.user.tokenCreate()
  .then(token => res.send(token))
  .catch(next);
});
