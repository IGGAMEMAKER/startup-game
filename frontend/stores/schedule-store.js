import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/schedule-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as GAME_STAGES from '../constants/game-stages';

import { WORK_SPEED_NORMAL, WORK_SPEED_HAS_MAIN_JOB } from '../constants/work-speed';

const EC = 'MAIN_EVENT_CHANGE';

let _tasks = [];
// let _tasks = [{
//   description: 'improve main feature',
//   inProgress: true,
//   isSynchronous: true,
//   progress: 1,
//   timecost: 15 * WORK_SPEED_HAS_MAIN_JOB,
//   speed: WORK_SPEED_HAS_MAIN_JOB,
// }, {
//   description: 'improve secondary feature',
//   inProgress: true,
//   isSynchronous: false,
//   progress: 8,
//   timecost: 2 * WORK_SPEED_NORMAL,
//   speed: WORK_SPEED_NORMAL
// }, {
//   description: 'improve analytics',
//   inProgress: false,
//   isSynchronous: true,
//   progress: 1,
//   timecost: 2 * WORK_SPEED_NORMAL,
//   speed: WORK_SPEED_NORMAL
// }];
let _day = 0;
let _workHours = 4;

let _gameStage = GAME_STAGES.GAME_STAGE_INIT;

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

const addTask = task => {
  const { queue, days, description, cb, performance } = task;

  let start = _day;
  let finish = _day + days;
  let inProgress = true;


  if (queue) {
    _tasks.filter(t => t.isSynchronous).forEach((t, i) => {
      if (t.inProgress) {
        inProgress = false;
      }
    });
  }

  const object = {
    added: _day,
    days, cb, description,
    isSynchronous: queue,
    start, finish,
    progress: 0, inProgress,
    timecost: days * WORK_SPEED_NORMAL,
    speed: performance
  };

  _tasks.push(object);
};

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
      addTask(task);
      break;
    case c.SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS:
      // it's considered, that this increase will not complete task and there is at least one day left
      let taskId = p.taskId;
      let speed = _tasks[taskId].speed;

      _tasks[taskId].progress += speed;
      break;
    case c.SCHEDULE_ACTIONS_TASKS_REMOVE:
      // let tasks = [10, 1, 3, 2]; // p.tasks.sort((a, b) => a - b);
      let tasks = p.tasks.sort((a, b) => b - a);

      tasks.forEach((taskId, i) => {
        // const callback = _tasks[taskId].cb;

        // if (callback) {
        //   callback();
        // }

        _tasks.splice(taskId, 1);
      });

      const synchronous =  _tasks
        .map((t, taskId) => Object.assign(t, { taskId }))
        .filter(t => t.isSynchronous);

      if (synchronous.length) {
        if (!synchronous.filter(t => t.inProgress).length) {
          // we HAVE synchronous tasks, but we didn't set any of them in progress

          const newSynchronousTaskId = synchronous[0].taskId;
          _tasks[newSynchronousTaskId].inProgress = true;
        }
      }
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
