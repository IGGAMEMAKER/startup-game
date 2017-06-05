export default {
  log: console.log,
  debug: console.log,
  error: console.error,
  shit: (text) => {
    console.log(`GOVNOKOD: ${text}`);
    console.trace();
    console.log('-----------');
  },
  actions: (sessionId, userId, action) => {

  },

  // TODO: send error logs to server
  // TODO: specify user info: login, useragent, gameData, user segment
};
