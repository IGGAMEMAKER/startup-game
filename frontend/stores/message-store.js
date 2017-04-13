import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/message-actions';
import * as t from '../constants/events';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

const EC = 'MAIN_EVENT_CHANGE';

import * as  JOB from '../constants/job';

let _messages = [
  // {
  //   type: c.MESSAGE_TYPE_GAME_EVENT,
  //   data: {
  //     type: t.GAME_EVENT_HIRE_ENTHUSIAST,
  //     player: {
  //       name: 'Jessie',
  //       skills: {
  //         programming: 0,
  //         marketing: 800,
  //         analyst: 50
  //       },
  //       task: JOB.JOB_TASK_MARKETING_POINTS,
  //       jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
  //       salary: {}
  //     }
  //   }
  // },

  // {
  //   type: c.MESSAGE_TYPE_GAME_EVENT,
  //   data: {
  //     type: t.GAME_EVENT_FREE_POINTS,
  //     points: 100,
  //   }
  // },
  // {
  //   type: c.MESSAGE_TYPE_GAME_EVENT,
  //   data: {
  //     type: t.GAME_EVENT_FREE_MONEY,
  //     money: 32000,
  //   }
  // }
];

class ScheduleStore extends EventEmitter {
  addChangeListener(cb:Function) {
    this.addListener(EC, cb);
  }

  removeChangeListener(cb:Function) {
    this.removeListener(EC, cb);
  }

  emitChange() {
    this.emit(EC);
  }

  getMessages() {
    return _messages;
  }

  isDrawable() {
    return _messages.length;
  }
}

const add = message => {
  _messages.push(message);
};

const respond = (i, message) => {
  _messages.cb(message);
  _messages.splice(i, 1);
};

const close = i => {
  // logger.debug('close ', i, 'message');
  _messages.splice(i, 1);
};

const store = new ScheduleStore();

const payload = payloads.messageStorePayload;
type PayloadType = payload.type;

Dispatcher.register((p: PayloadType) => {
  if (!p.type) {
    logger.error(`empty type prop in payload ${payload.name}`, p);
    return;
  }

  let change = true;
  switch (p.type) {
    case c.GAME_EVENT_ADD:
      add(p.message);
      break;
    case c.GAME_EVENT_CHOOSE_ANSWER:
      respond(p.message);
      break;
    case c.GAME_EVENT_CLOSE_TAB:
      close(p.id);
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
