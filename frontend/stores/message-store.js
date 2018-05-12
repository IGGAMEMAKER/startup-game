import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../../shared/constants/actions/message-actions';
import payloads from '../../shared/constants/actions/payloads';
import logger from '../helpers/logger/logger';

const EC = 'MAIN_EVENT_CHANGE';

let _messages = [];
let _notifications = [];

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
    return _messages.filter(m => m.isModal).length;
  }

  getPlainMessages() {
    return _notifications;
  }

  getNotifications() {
    return this.getPlainMessages().reverse();
  }

  initialize(messages) {
    _messages = messages;
  }

  getStoreData() {
    return {
      messages: _messages
    }
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
    case c.NOTIFICATION_ADD:
      _notifications.push(p.message);
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
