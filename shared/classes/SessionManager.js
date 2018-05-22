import worldGenerator from '../content/mock';

import GameSession from './GameSession';

export default class SessionManager {
  constructor() {
    this.world = {};
  }

  createSession() {
    const sessionId = 1;

    const data = worldGenerator();

    const session: GameSession = new GameSession(
      sessionId,
      data.companies,
      data.channels,
      data.projects,
      data.players
    );

    this.world[sessionId] = { session };

    // stats
    this.world[sessionId].actions = [];
  }

  getSession(sessionId): GameSession {
    return this.world[sessionId].session;
  }

  getWorldForUser(sessionId, playerId) {
    this.getSession(sessionId).getUserData(playerId);
  }
}
