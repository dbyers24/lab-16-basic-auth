'use-strict';

// load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

// require npm modules
const expect = require('expect');
const superagent = require('superagent');

//require app modules
require('./lib/mock-aws');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user');

const API_URL = process.env.API_URL;

describe('testing recipe recipe router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/recipes', () => {
    it('should respond with a recipe', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/recipes`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('title', 'Beans')
            .field('content', 'are delicious')
            .attach('image', `${__dirname}/assets/hacker.gif`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Beans');
          expect(res.body.content).toEqual('are delicious');
          expect(res.body.userID).toEqual(tempUserData.user._id.toString());
          expect(res.body.photoURI).toExist();
        });
    });
    it('should respond with a 400', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/recipes`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
          // .field('title', 'Beans')
            .field('content', 'are delicious')
            .attach('image', `${__dirname}/assets/hacker.gif`);
        })
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });
    it('should respond with a 401', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/recipes`)
          // .set('Authorization', `Bearer ${tempUserData.XXXXXXX}`)
            .field('title', 'Beans')
            .field('content', 'are delicious')
            .attach('image', `${__dirname}/assets/hacker.gif`);
        })
        .catch(err => {
          expect(err.status).toEqual(401);
        });
    });
  });
});
