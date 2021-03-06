'use strict';

module.exports = (err, req, res, next) => {
  // console.error('!!!!!!!!!!!!!!!!!!!!', err.message);
  // if validation error respond with 400
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('request body required'))
    return res.sendStatus(401);

  if(err.message.toLowerCase().includes('unauthorized'))
    return res.sendStatus(401);

  // if(err.message.toLowerCase().includes('unauthorized user does not exist'))
  //   return res.sendStatus(401);

  // if duplacte key respond with 409
  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409);

  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  res.sendStatus(500);
};
