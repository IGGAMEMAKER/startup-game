import ProjectManager from './ProjectManager';
import ChannelManager from './ChannelManager';

import * as ACTIONS from '../constants/actions/product-actions';
import * as balance from '../constants/balance';

import logger from '../../backend/helpers/logger';

export default class TaskManager {
  constructor(projectManager: ProjectManager, channelManager: ChannelManager) {
    this.projects = projectManager;
    this.channels = channelManager;
    this.tasks = [];
  }

  add = (taskType, channel, currentTime, executionTime, data, requirements = []) => {
    let requirementsOk = true;

    // if (requirements.length !== requirements.filter(r => {
    //     return this.projects.isEnoughResources(r.projectId, r.resources)
    //   })) {
    //   requirementsOk = false;
    // }

    if (requirementsOk) {
      requirements.forEach((r) => this.projects.spendResources(r.projectId, r.resources));

      this.tasks.push({
        // progress: 0,
        executionTime,
        started: currentTime,
        finished: currentTime + executionTime,

        taskType,
        channel,
        requirements,
        data
      })
    }
  };

  check = (time) => {
    logger.clear();
    const removable = [];

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      if (time >= task.finished) {
        this.execute(task, i);
      } else {
        const progress = Math.floor(100 * (time - task.started) / (task.finished - task.started));

        logger.log(task.taskType, task.started, task.finished, time, progress, '%');
        // logger.log(task.taskType, "*".repeat(progress / 10));
      }

      if (time >= task.finished) {
        removable.push(i);
      }
    }

    removable.reverse().forEach(r => {
      logger.log(`FINISHED! ${this.tasks[r].taskType}`);

      this.tasks.splice(r, 0);
    })
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

    logger.log(`Executed task: ${task.taskType} with parameters`, data);
  };
}
