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
        this.exploreCore(data);
        break;

      case ACTIONS.ACTIONS_UPGRADE_CORE:
        this.upgradeCore(data);
        break;

      case ACTIONS.ACTIONS_EXPLORE_OFFER:
        this.exploreOffer(data);
        break;

      case ACTIONS.ACTIONS_UPGRADE_OFFER:
        this.upgradeOffer(data);
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


  // result functions


  exploreCore({ projectId }) {
    this.projects.exploreCore({ projectId });
  }

  upgradeCore({ projectId }) {
    this.projects.upgradeCore(projectId);
  }

  upgradeOffer({ projectId, clientType }) {
    this.projects.upgradeOffer(projectId, clientType);
  }

  exploreOffer({ projectId, clientType }) {
    this.projects.exploreOffer(projectId, clientType);
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
