import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/schedule-actions';
import logger from '../helpers/logger/logger';

import scheduleStore from '../stores/schedule-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  increaseDay: () => {
    Dispatcher.dispatch({
      type: ACTIONS.SCHEDULE_ACTIONS_DAY_TICK
    })
  },

  addTask: (days, queue, description, cb) => {
    // days: amount of days, that you need to complete the task. While working fulltime
    // if you have a job/freelance, you need more days to complete it.
    // it's considered, that you can work 8 h/day

    // queue - if true (it means, that you run task synchronously) start date of task won't be today
    // it will start, when the last task will be done and this task will be pending
    // if false (it means, that you run task in parallel)
    // you paid someone to do it and it doesn't block your work)
    Dispatcher.dispatch({
      type: ACTIONS.SCHEDULE_ACTIONS_TASKS_ADD,
      task: {
        days,
        queue,
        cb,
        description
      }
    })
  },

  removeTasks: (taskIdList) => {
    if (taskIdList.length) {
      Dispatcher.dispatch({
        type: ACTIONS.SCHEDULE_ACTIONS_TASKS_REMOVE,
        tasks: taskIdList
      })
    }
  }
};
