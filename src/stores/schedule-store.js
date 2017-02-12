import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/schedule-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

const EC = 'MAIN_EVENT_CHANGE';

let _tasks = [];
let _day = 0;


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

  getTasks() {
    return _tasks;
  }

  getDay() {
    return _day;
  }
}

const store = new ScheduleStore();

const payload = payloads.scheduleStorePayload;
type PayloadType = payload.type;

Dispatcher.register((p: PayloadType) => {
  if (!p.type) {
    logger.error(`empty type prop in payload ${payload.name}`, p);
    return;
  }

  let change = true;
  switch (p.type) {
    case c.SCHEDULE_ACTIONS_DAY_TICK:
      _day++;
      break;
    case c.SCHEDULE_ACTIONS_TASKS_ADD:
      let task = p.task;
      _tasks.push(task);
      break;
    case c.SCHEDULE_ACTIONS_TASKS_REMOVE:
      let taskId = p.id;
      _tasks.splice(taskId, 1);
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
