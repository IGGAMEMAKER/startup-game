import Resources from './Resources';

import ChannelManager from './ChannelManager';
import ProjectManager from './ProjectManager';
import TaskManager from './TaskManager';

import * as ACTIONS from '../constants/actions/product-actions';
import * as balance from '../constants/balance';

export default class GameSession {
  constructor(sessionId, companies, channels, projects, players) {
    this.sessionId = sessionId;

    this.projects = new ProjectManager(projects, sessionId);
    this.channels = new ChannelManager(channels, sessionId);
    this.tasks = new TaskManager(this.projects, this.channels);

    this.players = players;

    this.time = 1;
    this.restrictions = [];
  }

  printInfo() {
    this.projects.printMainInfo();
  }

  getGameTime() {
    return this.time;
  }



  // update
  addRestriction(channel, duration) {
    this.restrictions.push({
      channel,
      start: this.getGameTime(),
      finish: this.getGameTime() + duration
    })
  }

  addTask = (taskType, channel, executionTime, data, requirements = []) => {
    this.tasks.add(taskType, channel, executionTime, data, requirements);
  };

  getUserData = (playerId) => {
    return {
      projects: this.projects.getInfo(playerId),
      channels: this.channels.getInfo(playerId),
      time: this.getGameTime(),
      // tasks:
    }
  };

  // long running tasks
  exploreCore = (projectId) => {
    const requirements = this.projects.getRequirementsForExploreCore(projectId);

    this.addTask(
      ACTIONS.ACTIONS_EXPLORE_CORE,
      `exploreCore-${projectId}`,
      balance.DURATION_CORE_EXPLORE,
      { projectId },
      requirements
    );
  };

  upgradeCore = (projectId) => {
    const requirements = this.projects.getRequirementsForUpgradeCore(projectId);

    this.addTask(
      ACTIONS.ACTIONS_UPGRADE_CORE,
      `upgradeCore-${projectId}`,
      balance.DURATION_CORE_UPGRADE,
      { projectId },
      requirements
    );
  };

  exploreOffer = (projectId, clientType) => {
    const requirements = this.project.getRequirementsForExploreOffer(projectId, clientType);

    this.addTask(
      ACTIONS.ACTIONS_EXPLORE_OFFER,
      `exploreOffer-${projectId}-${clientType}`,
      balance.DURATION_OFFER_EXPLORE,
      { projectId, clientType },
      requirements
    );
  };

  upgradeOffer = (projectId, clientType) => {
    const requirements = this.project.getRequirementsForUpgradeOffer(projectId, clientType);

    this.addTask(
      ACTIONS.ACTIONS_UPGRADE_OFFER,
      `upgradeOffer-${projectId}-${clientType}`,
      balance.DURATION_OFFER_UPGRADE,
      { projectId, clientType },
      requirements
    );
  };

  exploreChannel = (projectId, channelId) => {
    const requirements = this.project.getRequirementsForExploreChannel(projectId);

    this.addTask(
      ACTIONS.ACTIONS_EXPLORE_CHANNEL,
      `exploreChannel-${projectId}`,
      balance.DURATION_TEMPORARY_BONUS,
      { projectId, channelId },
      requirements
    );
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
