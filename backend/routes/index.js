var express = require('express');
var router = express.Router();

import SessionManager from '../../shared/classes/SessionManager';
import GameSession from '../../shared/classes/GameSession';

const sessionManager = new SessionManager();

const createSession = () => {
  sessionManager.createSession();
};

createSession();

const session: GameSession = sessionManager.getSession(1);

session.upgradeCore({ projectId: 0 });
session.printInfo();
session.upgradeCore({ projectId: 0 });
session.upgradeCore({ projectId: 0 });
session.upgradeCore({ projectId: 0 });
session.upgradeCore({ projectId: 0 });
session.printInfo();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT Startup' });
});

module.exports = router;
