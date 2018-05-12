import Dispatcher from '../dispatcher';
import * as ACTIONS from '../../shared/constants/actions/message-actions';
import logger from '../helpers/logger/logger';

import messageStore from '../stores/message-store';

export default {
  addGameEvent: (eventType, data, isModal) => {
    const obj = Object.assign({}, data, { type: eventType });
    Dispatcher.dispatch({
      type: ACTIONS.GAME_EVENT_ADD,
      message: {
        type: eventType,
        data: obj,
        isModal
      }
    });
  },

  closeEvent: (id) => {
    Dispatcher.dispatch({
      type: ACTIONS.GAME_EVENT_CLOSE_TAB,
      id
    });
  },

  addNotification: (eventType, data) => {
    // return;
    const obj = Object.assign({}, data, { type: eventType });
    logger.debug('notification', eventType, data);

    Dispatcher.dispatch({
      type: ACTIONS.NOTIFICATION_ADD,
      message: {
        type: eventType,
        data: obj,
        isModal: false
      }
    });
  }
};
