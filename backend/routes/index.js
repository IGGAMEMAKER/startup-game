var express = require('express');
var router = express.Router();

import worldGenerator from '../../shared/content/mock';

import GameSession from '../../shared/classes/GameSession';

const world = {};

const createSession = () => {
  const sessionId = 1;

  const data = worldGenerator();

  world[sessionId].session = new GameSession(sessionId,
    data.companies,
    data.channels,
    data.projects,
    data.players
  );

  // stats
  world[sessionId].actions = [];
};

createSession();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT Startup' });
});

module.exports = router;
