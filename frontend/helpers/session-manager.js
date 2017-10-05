import Product from './../classes/Product';

import sessionStorage from './../sessionStorage';

import * as GAME_STAGES from './../constants/game-stages';
import * as JOB from './../constants/job';
import * as IDEAS from './../constants/products/ideas';
import * as PRODUCT_STAGES from './../constants/products/product-stages';

import stats from '../stats';


import logger from './logger/logger';

function saveToStorage(name, value) {
  sessionStorage.saveInStorage(name, value);
}

function setDefaultValues() {

  console.log('setDefaultValues in session-manager');
  const tasks = [];
  const day = 1;
  const gamePhase = GAME_STAGES.GAME_STAGE_INIT;

  const money = 1000;

  const world = {
  };

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

  sessionStorage.saveInStorage('loan', 0);
  sessionStorage.saveInStorage('rents', []);



  logger.debug('saved tasks');



  // products
  sessionStorage.saveInStorage('markets', []);

  const idea = IDEAS.IDEA_WEB_HOSTING;
  const stage = PRODUCT_STAGES.PRODUCT_STAGE_IDEA;

  const products = [
    new Product({
      idea,
      stage,
      name: 'WWWEB HOSTING',
      companyId: 0
    }),
    new Product({
      idea,
      stage,
      isCompetitor: true,
      companyId: 1
    }),
    new Product({
      idea,
      stage,
      isCompetitor: true,
      companyId: 2
    }),
    new Product({
      idea,
      stage,
      isCompetitor: true,
      companyId: 3
    })
  ];

  // logger.debug(product, JSON.parse(JSON.stringify(product)));

  sessionStorage.saveInStorage('products', products);
}


function getFromStorage(name) {
  return sessionStorage.getFromStorage(name);
}

function restartGame() {
  setDefaultValues();

  stats.saveAction('restartGame', {});
}

function saveProductStorageData({ markets, products, money, points, employees, team }) {
  saveToStorage('markets', markets);
  saveToStorage('products', products);
  saveToStorage('money', money);
  saveToStorage('points', points);
  saveToStorage('employees', employees);
  saveToStorage('team', team);
}

function getProductStorageData() {
  let employees: Array;
  let team: Array;

  let products: Array<Product>;
  let markets: Array;

  try {
    employees = Array.from(JSON.parse(getFromStorage('employees')));

    team = Array.from(JSON.parse(getFromStorage('team')));

    const data = getFromStorage('products');

    products = Array.from(JSON.parse(data)).map(p => new Product(p, true));

    markets = Array.from(JSON.parse(getFromStorage('markets')));

  } catch (ex) {
    logger.error('error in getProductStorageData', ex);
  }

  return {
    employees,
    team,
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

setDefaultValues();
if (!sessionStorage.getFromStorage('sessionId')) {
  sessionStorage.saveInStorage('sessionId', 'asd');

  setDefaultValues();
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
