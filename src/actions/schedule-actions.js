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

  addTask: () => {
    
  },

  removeTask: () => {

  }
};
