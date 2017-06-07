import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/player-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as EXPENSES from '../constants/expenses';
import * as JOB from '../constants/job';

import getSpecialization from '../helpers/team/specialization';
import skillHelper from '../helpers/team/skills';

const EC = 'PLAYER_EVENT_CHANGE';

let _skills = {};
let _money = 1000;
let _expenses = [
  // {
  //   type: EXPENSES.EXPENSES_FOOD,
  //   quality: 0, // poor. Eat doshik and be happy (no). costs low money
  //   price: 300,
  //   regularity: 1 // everyday, 2 - once a week, 3 - once a month, 4 - once in half of the year, 5 - yearly
  // }
];

let _points = {
  programming: 300,
  marketing: 200,
  analyst: 300
};

let _employees = [
  {
    name: 'Lynda',
    skills: {
      programming: 0,
      marketing: 500,
      analyst: 150
    },
    task: JOB.JOB_TASK_MARKETING_POINTS,
    jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
    salary: {
      money: 500,
      percent: 0,
      pricingType: 1
    }
  }
];

let _team = [
  {
    name: 'James',
    skills: {
      programming: 1000,
      marketing: 150,
      analyst: 300
    },
    task: JOB.JOB_TASK_PROGRAMMER_POINTS,
    jobMotivation: JOB.JOB_MOTIVATION_BUSINESS_OWNER,
    salary: {
      percent: 100,
      money: 100,
      pricingType: 0
    },
    isPlayer: true
    // на каком основании работает в проекте
    // за еду, за опыт, за процент с продаж, собственник бизнеса
  }
];

let _reputation = 50; // neutral reputation
let _fame = 0; // nobody knows you

let _loan = 0; // no loans;

function isMercenary(worker) {
  return worker.salary.pricingType === 1;
}

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

  enoughMarketingPoints(mp) {
    return _points.marketing >= mp;
  }

  enoughProgrammingPoints(pp) {
    return _points.programming >= pp;
  }

  getTeam() {
    return _team.map(this.idHelper);
  }

  getMonthlyMarketerPoints() {
    return this.getMarketers()
      .map(skillHelper.getMarketingPointsProducedBy)
      .reduce((p, c) => p + c, 0);
  }
  getMonthlyProgrammerPoints() {
    return this.getProgrammers()
      .map(skillHelper.getProgrammingPointsProducedBy)
      .reduce((p, c) => p + c, 0);
  }

  idHelper(e, i) {
    return Object.assign({}, e, { id: i });
  }

  getTeamProgrammers() {
    return _team.map(this.idHelper).filter(skillHelper.isProgrammer)
  }
  getTeamMarketers() {
    return _team.map(this.idHelper).filter(skillHelper.isMarketer)
  }
  getTeamAnalysts() {
    return _team.map(this.idHelper).filter(skillHelper.isAnalyst)
  }

  getEmployeesProgrammers() {
    return _employees.map(this.idHelper).filter(skillHelper.isProgrammer);
  }
  getEmployeesMarketers() {
    return _employees.map(this.idHelper).filter(skillHelper.isMarketer);
  }
  getEmployeesAnalysts() {
    return _employees.map(this.idHelper).filter(skillHelper.isAnalyst);
  }


  getTeamExpenses() {
    return this.getTeam()
      .filter(isMercenary).map(worker => worker.salary.money)
      .reduce((p, c) => p + c, 0);
  }

  getMaxPossibleFreelanceMarketingPoints() {
    return Math.floor(_money / JOB.PRICE_OF_ONE_MP)
  }

  getMaxPossibleFreelanceProgrammingPoints() {
    return Math.floor(_money / JOB.PRICE_OF_ONE_PP)
  }

  getMaxPossibleAdClients() {
    const CLIENT_PRICE = 1;

    return Math.floor(_money / CLIENT_PRICE);
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

  getEmployees() {
    return _employees;
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

    case c.PLAYER_ACTIONS_HIRE_WORKER:
      _team.push(p.player);
      _employees.splice(p.i, 1);
      break;

    case c.PLAYER_ACTIONS_FIRE_WORKER:
      logger.debug('PLAYER_ACTIONS_FIRE_WORKER', p);

      _money -= _team[p.i].salary.money;
      _team.splice(p.i, 1);
      break;

    case c.PLAYER_ACTIONS_EMPLOYEE_ADD:
      _employees.push(p.player);
      // logger.debug(_employees, c.PLAYER_ACTIONS_EMPLOYEE_ADD);
      // logger.debug(p.player, c.PLAYER_ACTIONS_EMPLOYEE_ADD);
      break;

    case c.PLAYER_ACTIONS_EMPLOYEE_REMOVE:
      _employees.splice(p.i, 1);
      break;

    default:
      break;
  }


  if (change) store.emitChange();
});

export default store;
