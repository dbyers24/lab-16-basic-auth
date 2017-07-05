'use-strict';

// npm modules
const {Router} = require('express');

// app modules
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Recipe = require('../model/recipe.js');

// module logic
const recipeRouter = module.exports = new Router();
recipeRouter.post('/api/recipes', bearerAuth, s3Upload('image'), (req, res, next) => {
  console.log('hit POST /api/articles');

  new Recipe({
    title: req.body.title,
    content: req.body.content,
    userID: req.user._id.toString(),
    photoURI: req.s3Data.Location,
  })
  .save()
  .then(recipe => res.json(recipe))
  .catch(next);
});
