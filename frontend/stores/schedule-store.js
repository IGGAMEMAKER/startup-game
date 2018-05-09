import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/schedule-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as GAME_STAGES from '../constants/game-stages';

import { WORK_SPEED_NORMAL } from '../constants/work-speed';

import sessionManager from '../helpers/session-manager';

import stats from '../stats';

const EC = 'MAIN_EVENT_CHANGE';

let _tasks = [];

let _day = 1;

let _gamePhase = GAME_STAGES.GAME_STAGE_INIT;

const initialize = ({ tasks, day, gamePhase }) => {
  _tasks = tasks;
  _day = day;
  _gamePhase = gamePhase;
};

initialize(sessionManager.getScheduleStorageData());

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

  getGameFormattedDay(input = _day) {
    // let input =
    const year = Math.floor(input / 360);
    const month = Math.floor((input - year * 360) / 30);
    const day = input - year * 360 - month * 30;

    return `${day + 1}.${month + 1}.${year + 2016}`;
  }

  getOffsetFormattedDay(offset) {
    return this.getGameFormattedDay(_day + offset);
  }

  getNextYearFormatted() {
    return this.getOffsetFormattedDay(360);
  }

  getNextYear() {
    return _day + 360;
  }

  getGamePhase() {
    return _gamePhase;
  }

  static getStoreData() {
    return {
      tasks: _tasks,
      day: _day,
      gamePhase: _gamePhase
    }
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

      tasks.forEach((taskId) => {
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

    case c.SCHEDULE_ACTIONS_GAME_START:
      _gamePhase = GAME_STAGES.GAME_STAGE_GAME_STARTED;
      break;

    case c.SCHEDULE_ACTIONS_SET_GAME_PHASE:
      _gamePhase = p.phase;
      break;

    default:
      break;
  }

  if (change) {
    stats.saveAction(p.type, p);
    sessionManager.saveScheduleStorageData(ScheduleStore.getStoreData());

    store.emitChange();
  }
});

export default store;
