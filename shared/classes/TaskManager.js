import ProjectManager from './ProjectManager';
import ChannelManager from './ChannelManager';

import * as ACTIONS from '../constants/actions/product-actions';
import * as balance from '../constants/balance';

export default class TaskManager {
  constructor(projectManager: ProjectManager, channelManager: ChannelManager) {
    this.projects = projectManager;
    this.channels = channelManager;
    this.tasks = [];
  }

  add = (taskType, channel, executionTime, data, requirements = []) => {
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

    this.tasks.forEach(this.execute)
  };

  execute = (task, i) => {
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
}
