import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/message-actions';
import logger from '../helpers/logger/logger';

import messageStore from '../stores/message-store';

export default {
  addGameEvent: (eventType, data) => {
    Dispatcher.dispatch({
      type: ACTIONS.GAME_EVENT_ADD,
      message: {
        type: eventType,
        data
      }
    });
  },

  closeEvent: (id) => {
    Dispatcher.dispatch({
      type: ACTIONS.GAME_EVENT_CLOSE_TAB,
      id
    });
  }
};
