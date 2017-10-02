import Product from './../classes/Product';

import sessionStorage from './../sessionStorage';

import * as GAME_STAGES from './../constants/game-stages';
import * as JOB from './../constants/job';
import * as IDEAS from './../constants/products/ideas';
import * as PRODUCT_STAGES from './../constants/products/product-stages';

import productDescriptions from './products/product-descriptions';

import stats from '../stats';


import logger from './logger/logger';

function saveToStorage(name, value) {
  sessionStorage.saveInStorage(name, value);
}

function setDefaultValues() {
  console.log('setDefaultValues in session-manager');

  // schedule
  sessionStorage.saveInStorage('tasks', []);
  sessionStorage.saveInStorage('day', 1);
  sessionStorage.saveInStorage('gamePhase', GAME_STAGES.GAME_STAGE_INIT);

  // player
  sessionStorage.saveInStorage('money', 1000);
  sessionStorage.saveInStorage('expenses', []);
  sessionStorage.saveInStorage('points', {
    programming: 5300,
    marketing: 5200,
    analyst: 300
  });
  sessionStorage.saveInStorage('employees', [
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
    },
    {
      name: 'Xavier',
      skills: {
        programming: 600,
        marketing: 100,
        analyst: 150
      },
      task: JOB.JOB_TASK_PROGRAMMER_POINTS,
      jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
      salary: {
        money: 700,
        percent: 0,
        pricingType: 1
      }
    }
  ]);
  sessionStorage.saveInStorage('team', [
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
    }
  ]);
  sessionStorage.saveInStorage('reputation', 0);
  sessionStorage.saveInStorage('fame', 0);
  sessionStorage.saveInStorage('loan', 0);
  sessionStorage.saveInStorage('rents', []);

  logger.debug('saved tasks');

  // products
  sessionStorage.saveInStorage('markets', []);

  let product = new Product({
    idea: IDEAS.IDEA_WEB_HOSTING,
    name: 'WWWEB HOSTING',
    stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA
  });

  logger.debug(product);

  sessionStorage.saveInStorage('products', [product]);
}

if (!sessionStorage.getFromStorage('sessionId')) {
  sessionStorage.saveInStorage('sessionId', 'asd');

  setDefaultValues();
}

function getFromStorage(name) {
  return sessionStorage.getFromStorage(name);
}

function restartGame() {
  setDefaultValues();

  stats.saveAction('restartGame', {});
}

function saveProductStorageData({ markets, products, rents, money, expenses, points, employees, team, reputation, fame, loan }) {
  saveToStorage('markets', markets);
  saveToStorage('products', products);
  saveToStorage('money', money);
  saveToStorage('expenses', expenses);
  saveToStorage('points', points);
  saveToStorage('employees', employees);
  saveToStorage('team', team);
  saveToStorage('reputation', reputation);
  saveToStorage('fame', fame);
  saveToStorage('loan', loan);
  saveToStorage('rents', rents);
}

function getProductStorageData() {
  let expenses: Array;

  let employees: Array;
  let team: Array;
  let loan: Number;

  let reputation: Number;
  let fame: Number;
  let rents: Array;
  let products: Array<Product>;
  let markets: Array;

  try {
    // money = Number.parseInt(getFromStorage('money'));
    // logger.debug('got money', money);

    markets = Array.from(JSON.parse(getFromStorage('markets')));
    rents = Array.from(JSON.parse(getFromStorage('rents')));

    expenses = Array.from(JSON.parse(getFromStorage('expenses')));

    // points = JSON.parse(getFromStorage('points'));
    // logger.debug('got points', points);

    employees = Array.from(JSON.parse(getFromStorage('employees')));

    team = Array.from(JSON.parse(getFromStorage('team')));

    reputation = Number.parseInt(getFromStorage('reputation'));
    fame = Number.parseInt(getFromStorage('fame'));

    loan = Number.parseInt(getFromStorage('loan'));

    const data = getFromStorage('products');

    products = Array.from(JSON.parse(data)).map(p => new Product(p, true));

  } catch (ex) {
    logger.error('error in getProductStorageData', ex);
  }

  return {
    // money,
    expenses,
    // points,
    employees,
    team,
    reputation,
    fame,
    loan,
    rents,
    products,
    markets
  };
}

function getScheduleStorageData() {
  return {
    tasks: Array.from(JSON.parse(getFromStorage('tasks'))),
    day: Number.parseInt(getFromStorage('day')),
    gamePhase: Number.parseInt(getFromStorage('gamePhase'))
  };
}

function saveScheduleStorageData({ tasks, day, gamePhase }) {
  return {
    tasks: saveToStorage('tasks', tasks),
    day: saveToStorage('day', day),
    gamePhase: saveToStorage('gamePhase', gamePhase)
  };
}

function getMessageStorageData() {
  return getFromStorage('messages');
}

// restartGame();


export default {
  getProductStorageData,
  getScheduleStorageData,
  getMessageStorageData,

  saveScheduleStorageData,
  saveProductStorageData,

  restartGame,
}
