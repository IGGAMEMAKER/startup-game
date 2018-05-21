import Resources from './Resources';

import ChannelManager from './ChannelManager';
import ProjectManager from './ProjectManager';

import * as ACTIONS from '../constants/actions/product-actions';
import * as balance from '../constants/balance';

export default class GameSession {
  constructor(sessionId, companies, channels, projects, players) {
    this.sessionId = sessionId;

    this.projects = new ProjectManager(projects, sessionId);
    this.channels = new ChannelManager(channels, sessionId);
    this.players = players;

    this.time = 1;
    this.tasks = [];
    this.restrictions = [];
  }

  printInfo() {
    this.projects.printMainInfo();

    this.tasks.forEach((t, i) => {
      // console.log(`task ${i}`, t);
    })
  }

  getGameTime() {
    return this.time;
  }



  // update
  addTask = (taskType, channel, executionTime, data, requirements = []) => {
    let requirementsOk = true;

    // if (requirements.length !== requirements.filter(r => {
    //     return this.isEnoughResources(r.projectId, r.resources)
    //   })) {
    //   requirementsOk = false;
    // }

    if (requirementsOk) {
      requirements.forEach((r) => this.spendResources(r.projectId, r.resources));

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
  };

  addRestriction(channel, duration) {
    this.restrictions.push({
      channel,
      start: this.getGameTime(),
      finish: this.getGameTime() + duration
    })
  }

  executeTask = (task, i) => {
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

      case ACTIONS.ACTIONS_EXPLORE_CHANNEL:
        this.projects.exploreChannel(data.projectId, data.channelId);
        break;
    }

    this.tasks.splice(i, 0);
  };



  spendResources = (projectId, resources) => {
    this.projects.spendResources(projectId, resources);
  };

  isEnoughResources = (projectId, resources) => {
    // console.log('isEnoughResources', projectId, resources);

    return this.projects.isEnoughResources(projectId, resources);
  };


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

  requirementsForExploreChannel(projectId) {
    return [{
      projectId,
      resources: new Resources().salesPoints(50)
    }];
  }

  // long running tasks
  exploreCore = (projectId) => {
    const requirements = this.requirementsForExploreCore(projectId);

    this.addTask(ACTIONS.ACTIONS_EXPLORE_CORE, `exploreCore-${projectId}`, balance.DURATION_CORE_EXPLORE, { projectId }, requirements);
  };

  upgradeCore = (projectId) => {
    const requirements = this.requirementsForUpgradeCore(projectId);

    this.addTask(ACTIONS.ACTIONS_UPGRADE_CORE, `upgradeCore-${projectId}`, balance.DURATION_CORE_UPGRADE, { projectId }, requirements);
  };

  exploreOffer = (projectId, clientType) => {
    const requirements = this.requirementsForExploreOffer(projectId, clientType);

    this.addTask(ACTIONS.ACTIONS_EXPLORE_OFFER, `exploreOffer-${projectId}-${clientType}`, balance.DURATION_OFFER_EXPLORE, { projectId, clientType }, requirements);
  };

  upgradeOffer = (projectId, clientType) => {
    const requirements = this.requirementsForUpgradeOffer(projectId, clientType);

    this.addTask(ACTIONS.ACTIONS_UPGRADE_OFFER, `upgradeOffer-${projectId}-${clientType}`, balance.DURATION_OFFER_UPGRADE, { projectId, clientType }, requirements);
  };

  exploreChannel = (projectId, channelId) => {
    const requirements = this.requirementsForExploreChannel(projectId);

    this.addTask(ACTIONS.ACTIONS_EXPLORE_CHANNEL, `exploreChannel-${projectId}`, balance.DURATION_TEMPORARY_BONUS, { projectId, channelId }, requirements);
  };


  // instant functions
  pickTemporaryProjectBonus = (projectId, bonusId) => {
    this.projects.pickTemporaryProjectBonus(projectId, bonusId);
  };

  hireProgrammer = (projectId, level) => {
    this.projects.hireProgrammer(projectId, level);
  };

  addServer = (projectId) => {
    this.projects.addServer(projectId);
  };

  upgradeDefence = (projectId) => {
    this.projects.improveDefence(projectId);
  };

  grabClients = (projectId, channelId) => {
    this.channels.grabClients(projectId, channelId);
  };

  stealIdeas = (projectId, competitorId) => {
    this.projects.addResources(projectId, new Resources().ideas(1));
  };
}
