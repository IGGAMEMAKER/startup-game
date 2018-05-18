import Project from './Project';
import Company from './Company';
import Channel from './Channel';

import * as ACTIONS from '../constants/actions/product-actions';

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
  addTask(taskType, channel, executionTime, resources, data) {
    this.getProjectById(data.projectId).spendResources(resources);

    this.tasks.push({
      progress: 0,
      executionTime,

      taskType,
      channel,
      resources,
      data
    })
  }

  executeTask(task) {
    const data = task.data;
    const projectId = task.projectId;

    switch (task.taskType) {
      case ACTIONS.ACTIONS_EXPLORE_CORE:
        this.exploreCore(projectId);
        break;

      case ACTIONS.ACTIONS_UPGRADE_CORE:
        this.upgradeCore(projectId);
        break;

      case ACTIONS.ACTIONS_EXPLORE_OFFER:
        this.exploreOffer(projectId);
        break;

      case ACTIONS.ACTIONS_UPGRADE_OFFER:
        this.upgradeOffer(projectId, data.clientType);
        break;
    }
  };

  spendResources(projectId, resources) {

  }

  isEnoughResources(projectId, resources) {

  }


  // result functions

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
    // spend manager points and 1 idea point for exploration
    this.getProjectById(projectId).exploreOffer(clientType);
  }

  pickTemporaryProjectBonus(projectId, bonusId) {
    this.getProjectById(projectId).pickTemporaryProjectBonus(bonusId);
  }

  exploreClientTypes(projectId, channelId) {
    this.getProjectById(projectId).exploreClientTypes(channelId);
  }

  grabClients(projectId, channelId) {
    this.getChannelById(channelId).grabClients(projectId, 40);
  }
}
