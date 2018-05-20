import Resources from './Resources';

import ChannelManager from './ChannelManager';
import ProjectManager from './ProjectManager';

import * as ACTIONS from '../constants/actions/product-actions';

export default class GameSession {
  constructor(sessionId, companies, channels, projects, players) {
    this.sessionId = sessionId;

    this.projects = new ProjectManager(projects, sessionId);
    this.channels = new ChannelManager(channels, sessionId);
    this.players = players;

    this.time = 1;
    this.tasks = [];
  }

  printInfo() {
    this.projects.printMainInfo();
  }

  getGameTime() {
    return this.time;
  }



  // update
  addTask(taskType, channel, executionTime, data, requirements = []) {
    let requirementsOk = true;

    if (requirements.length !== requirements.filter(this.isEnoughResources)) {
      requirementsOk = false;
    }

    if (requirementsOk) {
      requirements.forEach(this.spendResources);

      this.tasks.push({
        progress: 0,
        executionTime,
        started: this.getGameTime(),
        finish: this.getGameTime() + executionTime,

        taskType,
        channel,
        requirements,
        data
      })
    }
  }

  executeTask(task, i) {
    const data = task.data;

    switch (task.taskType) {
      case ACTIONS.ACTIONS_EXPLORE_CORE:
        this.projects.exploreCore(data.projectId);
        break;

      case ACTIONS.ACTIONS_UPGRADE_CORE:
        this.projects.upgradeCore(data.projectId);
        break;

      case ACTIONS.ACTIONS_EXPLORE_OFFER:
        this.projects.exploreOffer(data.projectId, data.clientType);
        break;

      case ACTIONS.ACTIONS_UPGRADE_OFFER:
        this.projects.upgradeOffer(data.projectId, data.clientType);
        break;
    }

    this.tasks.splice(i, 0);
  };



  spendResources({ projectId, resources }) {
    this.projects.spendResources(projectId, resources);
  }

  isEnoughResources({ projectId, resources }) {
    return this.projects.isEnoughResources(projectId, resources);
  }


  requirementsForExploreCore(projectId) {
    return [{
      projectId,
      resources: new Resources().ideas(10).managerPoints(50)
    }];
  }

  requirementsForUpgradeCore(projectId) {
    return [{
      projectId,
      resources: new Resources().programmerPoints(250)
    }];
  }

  requirementsForExploreOffer(projectId, clientType) {
    return [{
      projectId,
      resources: new Resources().ideas(1).managerPoints(10)
    }];
  }

  requirementsForUpgradeOffer(projectId, clientType) {
    return [{
      projectId,
      resources: new Resources().programmerPoints(50)
    }];
  }


  exploreCore({ projectId }) {
    const requirements = this.requirementsForExploreCore(projectId);

    this.addTask(ACTIONS.ACTIONS_EXPLORE_CORE, `exploreCore-${projectId}`, 33, { projectId }, requirements);
  }

  upgradeCore({ projectId }) {
    const requirements = this.requirementsForUpgradeCore(projectId);

    this.addTask(ACTIONS.ACTIONS_UPGRADE_CORE, `upgradeCore-${projectId}`, 100, { projectId }, requirements);
  }

  exploreOffer({ projectId, clientType }) {
    const requirements = this.requirementsForExploreOffer(projectId, clientType);

    this.addTask(ACTIONS.ACTIONS_EXPLORE_OFFER, `exploreOffer-${projectId}-${clientType}`, 10, { projectId, clientType }, requirements);
  }

  upgradeOffer({ projectId, clientType }) {
    const requirements = this.requirementsForUpgradeOffer(projectId, clientType);

    this.addTask(ACTIONS.ACTIONS_UPGRADE_OFFER, `upgradeOffer-${projectId}-${clientType}`, 25, { projectId, clientType }, requirements);
  }

  pickTemporaryProjectBonus({ projectId, bonusId }) {
    this.projects.pickTemporaryProjectBonus(projectId, bonusId);
  }

  exploreClientTypes({ projectId, channelId }) {
    this.projects.exploreClientTypes(projectId, channelId);
  }

  grabClients({ projectId, channelId }) {
    this.channels.grabClients(projectId, channelId);
  }

  stealIdeas({ projectId, competitorId }) {
    this.projects.addResources(projectId, new Resources().ideas(1));
  }
}
