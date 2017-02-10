export default {
  log: console.log,
  error: console.error,
  shit: (text) => {
    console.log(`GOVNOKOD ${text}`);
  }
  // TODO: send error logs to server
  // TODO: specify user info: login, useragent, gameData, user segment
};
