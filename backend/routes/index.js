var express = require('express');
var router = express.Router();

import SessionManager from '../../shared/classes/SessionManager';

const sessionManager = new SessionManager();

const createSession = () => {
  sessionManager.createSession();
};

createSession();

// const session = sessionManager.getSession(1);

// console.log('session', session.session);

sessionManager.getSession(1).upgradeCore({ projectId: 0 });
sessionManager.getSession(1).printInfo();
sessionManager.getSession(1).upgradeCore({ projectId: 0 });
sessionManager.getSession(1).upgradeCore({ projectId: 0 });
sessionManager.getSession(1).upgradeCore({ projectId: 0 });
sessionManager.getSession(1).upgradeCore({ projectId: 0 });
sessionManager.getSession(1).printInfo();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT Startup' });
});

module.exports = router;
