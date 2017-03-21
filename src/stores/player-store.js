import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/player-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as EXPENSES from '../constants/expenses';
import * as JOB from '../constants/job';

import getSpecialization from '../helpers/team/specialization';

const EC = 'PLAYER_EVENT_CHANGE';

let _skills = {};
let _money = 1000;
let _expenses = [{
  type: EXPENSES.EXPENSES_FOOD,
  quality: 0, // poor. Eat doshik and be happy (no). costs low money
  price: 100,
  regularity: 1 // everyday, 2 - once a week, 3 - once a month, 4 - once in half of the year, 5 - yearly
}];

let _points = {
  programming: 100,
  marketing: 1000,
  analyst: 1000
};

let _team = [{
  name: 'James',
  skills: {
    programming: 1000,
    marketing: 150,
    analyst: 300,
  },
  task: JOB.JOB_TASK_PROGRAMMER_POINTS,
  jobMotivation: JOB.JOB_MOTIVATION_BUSINESS_OWNER,
  salary: {}
  // на каком основании работает в проекте
  // за еду, за опыт, за процент с продаж, собственник бизнеса
}, {
  name: 'Lynda',
  skills: {
    programming: 0,
    marketing: 500,
    analyst: 150,
  },
  task: JOB.JOB_TASK_MARKETING_POINTS,
  jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
  salary: {}
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
    return _loan ? _loan * 0.01 : 0;
  }

  getLoanSize() {
    return _loan;
  }

  // getExpectedMoney() {
  //   return
  // }
  getPoints() {
    return _points;
  }

  getTeam() {
    return _team;
  }

  getMaxPossibleFreelanceMarketingPoints() {
    return Math.floor(_money / JOB.PRICE_OF_ONE_MP)
  }

  getMaxPossibleFreelanceProgrammingPoints() {
    return Math.floor(_money / JOB.PRICE_OF_ONE_PP)
  }

  getProgrammers() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_PROGRAMMER)
  }

  getMarketers() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_MARKETER)
  }

  getAnalysts() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_ANALYST)
  }

  getDesigners() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_DESIGNER)
  }

  getSkill = skill => Math.floor(skill / 100);

  getMarketingPointsProducedBy(p) {
    const marketingEfficiency = 30;

    return this.getSkill(p.skills.marketing) * marketingEfficiency;
  }

  getProgrammingPointsProducedBy(p) {
    const programmingEfficiency = 30;

    return this.getSkill(p.skills.programming) * programmingEfficiency;
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

      const repay = 1.3;
      _money += p.amount;
      _loan += p.amount * repay;

      _expenses.push({
        type: EXPENSES.EXPENSES_LOAN,
        price: p.amount * repay,
        regularity: 1
      });
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
    case c.PLAYER_ACTIONS_SET_TASK:
      _team[p.index].task = p.task;
      break;
    case c.PLAYER_ACTIONS_INCREASE_POINTS:
      _points.marketing += p.points.marketing;
      _points.programming += p.points.programming;
      break;
    case c.PLAYER_ACTIONS_BUY_PP:
      _points.programming += p.pp;
      _money -= p.pp * JOB.PRICE_OF_ONE_PP;
      break;
    case c.PLAYER_ACTIONS_BUY_MP:
      _points.marketing += p.mp;
      _money -= p.mp * JOB.PRICE_OF_ONE_MP;
      break;
    case c.PLAYER_ACTIONS_DECREASE_POINTS:
      _points.marketing -= p.mp;
      _points.programming -= p.pp;
      break;
    default:
      break;
  }


  if (change) store.emitChange();
});

export default store;
