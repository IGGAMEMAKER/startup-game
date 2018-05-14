import Project from './Project';
import Company from './Company';
import Channel from './Channel';

export default class GameSession {
  constructor(sessionId, companies, channels, projects, players) {
    this.sessionId = sessionId;

    this.companies = companies;
    this.projects = projects;
    this.channels = channels;
    this.players = players;

    this.tasks = [];
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

  getChannelById(channelId): Channel {
    const item = this.channels.find(c => c.getId() === channelId);

    if (!item) throw `no channel ${channelId} in session ${this.sessionId}`;

    return item;
  };

  // update

  exploreCore(projectId) {
    this.getProjectById(projectId).exploreCore();
  }

  upgradeCore(projectId) {
    this.getProjectById(projectId).upgradeCore();
  }

  upgradeOffer(projectId, clientType) {
    this.getProjectById(projectId).upgradeOffer(clientType, 1);
  }

  exploreOffer(projectId, clientType) {
    this.getProjectById(projectId).exploreOffer(clientType);
  }

  pickTemporaryProjectBonus(projectId, bonusId) {
    this.getProjectById(projectId).pickTemporaryProjectBonus(bonusId);
  }

  exploreClients(projectId, channelId) {
    this.getProjectById(projectId).exploreClients(channelId);
  }

  grabClients(projectId, channelId) {
    this.getChannelById(channelId).grabClients(projectId, 40);
  }
}
