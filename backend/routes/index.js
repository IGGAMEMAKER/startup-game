var express = require('express');
var router = express.Router();

import SessionManager from '../../shared/classes/SessionManager';

const sessionManager = new SessionManager();

const createSession = () => {
  sessionManager.createSession();
};

createSession();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT Startup' });
});

module.exports = router;
