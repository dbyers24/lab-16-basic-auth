'use strict';

const User = require('../../model/user.js');
const Recipe = require('../../model/recipe.js');

let removeModelWithHook = (model) => {
  return model.find({})
    .then(items => {
      return Promise.all(items.map(a => a.remove()));
    });
};

module.exports = () => {
  return Promise.all([
    removeModelWithHook(User),
    removeModelWithHook(Recipe),
  ]);
};
