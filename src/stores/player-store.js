import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/player-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

const EC = 'PLAYER_EVENT_CHANGE';

let _skills = {};
let _money = 1000;
let _expenses = [{
  type: 'EXPENSES_FOOD',
  quality: 0, // poor. Eat doshik and be happy (no). costs low money
  price: 100,
  regularity: 1 // everyday, 2 - once a week, 3 - once a month, 4 - once in half of the year, 5 - yearly
}];
let _reputation = 50; // neutral reputation
let _fame = 0; // nobody knows you

let _loan = 0; // no loans;

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

  getExpenses() {
    return _expenses;
  }

  getLoanPaymentAmount() {
    return _loan * 0.01;
  }

  getLoanSize() {
    return _loan;
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
    case c.PLAYER_ACTIONS_EXPENSES_ADD:
      _expenses.push(p.expense);
      break;
    case c.PLAYER_ACTIONS_EXPENSES_REMOVE:
      _expenses.splice(p.id, 1);
      break;
    case c.PLAYER_ACTIONS_LOANS_TAKE:
      logger.shit('LOAN SIZE MUST BASE ON YOUR INCOME!!!. stores player-store.js');

      _money += p.amount;
      _loan += p.amount;
      break;
    case c.PLAYER_ACTIONS_LOANS_REPAY:
      let loanSize = _expenses[p.id].price;
      if (loanSize <= _money) {
        _money -= loanSize;
        _loan -= loanSize;

        _expenses.splice(p.id, 1);
      } else {
        change = false;
      }
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
