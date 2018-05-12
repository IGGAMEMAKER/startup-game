import Project from './Project';
import Company from './Company';

export default class GameSession {
  constructor(sessionId, companies, channels, projects, players) {
    this.sessionId = sessionId;

    this.companies = companies;
    this.projects = projects;
    this.channels = channels;
    this.players = players;
  }

  getProjectById(projectId): Project {
    const item = this.projects.find(p => p.getId() === projectId);

    if (!item) throw `no project ${projectId} in session ${this.sessionId}`;

    return item;
  };

  getCompanyById(companyId): Company {
    const item = this.companies.find(c => c.getId() === companyId);

    if (!item) throw `no company ${companyId} in session ${this.sessionId}`;

    return item;
  };

  // update
  upgradeCore(projectId) {
    this.getProjectById(projectId).improveCore();
  }
}
