import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/player-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

const EC = 'PLAYER_EVENT_CHANGE';

let _skills = {};
let _money = 1000;
let _reputation = 50; // neutral reputation
let _fame = 0; // nobody knows you

class PlayerStore extends EventEmitter {
  addChangeListener(cb:Function) {
    this.addListener(EC, cb);
  }

  removeChangeListener(cb:Function) {
    this.removeListener(EC, cb);
  }

  emitChange() {
    this.emit(EC);
  }

  getSkills() {
    return _skills;
  }

  getMoney() {
    return _money;
  }
}

const store = new PlayerStore();

const payload = payloads.scheduleStorePayload;
type PayloadType = payload.type;

Dispatcher.register((p: PayloadType) => {
  if (!p.type) {
    logger.error(`empty type prop in payload ${payload.name}`, p);
    return;
  }

  let change = true;
  switch (p.type) {
    case c.PLAYER_ACTIONS_INCREASE_MONEY:
      _money += p.amount;
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
