var express = require('express');
var router = express.Router();

import logger from '../helpers/logger';

// import tgBot from '../helpers/tgBot';

import SessionManager from '../../shared/classes/SessionManager';
import GameSession from '../../shared/classes/GameSession';

const sessionManager = new SessionManager();

const createSession = () => {
  sessionManager.createSession();
};

const test = () => {
  createSession();

  const session: GameSession = sessionManager.getSession(1);

  session.upgradeOffer(0, 0);
  session.upgradeOffer(0, 0);
  session.upgradeOffer(0, 0);
  session.upgradeCore(0);
  session.upgradeCore(0);
  
  
};

test();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT Startup' });
});

module.exports = router;
