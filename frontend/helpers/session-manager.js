import Product from './../classes/Product';
import productDescriptions from './products/product-descriptions';

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
  const product = new Product({
    idea: IDEAS.IDEA_WEB_HOSTING,
    name: 'WWWEB HOSTING',
    stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA,
    // defaultFeatures: productDescriptions(IDEAS.IDEA_WEB_HOSTING).features.map(f => f.data)
    defaultFeatures: [
      {
        name: 'scalability',
        influence: 0,
        description: '',
        shortDescription: 'Масштабируемость',
        data: 5000,
        time: 20,
        development: 70
      },
      {
        name: 'website',
        influence: 1.5,
        description: '',
        shortDescription: 'Веб-сайт',
        data: 15000,
        time: 30,
        development: 30
      },
      {
        name: 'support',
        influence: 1.5,
        description: '',
        shortDescription: 'Техподдержка',
        data: 5000,
        time: 30,
        development: 100
      },
      {
        name: 'VPS',
        influence: 3,
        description: '',
        shortDescription: 'Виртуальная машина',
        data: 7000,
        time: 30,
        shareable: true,
        development: 75
      },
      {
        name: 'VDS',
        influence: 0,
        description: '',
        shortDescription: 'Выделенный сервер',
        data: 15000,
        time: 30,
        shareable: true,
        development: 135
      }].map(f => f.data)
  });

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

// restartGame();

function saveProductStorageData({ products, rents, money, expenses, points, employees, team, reputation, fame, loan }) {
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
  const money: Number = Number.parseInt(getFromStorage('money'));

  let raw = getFromStorage('expenses');

  logger.debug('raw data for expenses!!!', raw, getFromStorage('money'), getFromStorage('points'),
    getFromStorage('employees'));

  const expenses: Array = Array.from(JSON.parse(raw));
  logger.debug('expenses needed');
  const points: Object = JSON.parse(getFromStorage('points'));
  const employees: Array = Array.from(JSON.parse(getFromStorage('employees')));

  const rents: Array = Array.from(JSON.parse(getFromStorage('rents')));
  const team: Array = Array.from(JSON.parse(getFromStorage('team')));
  const reputation: Number = Number.parseInt(getFromStorage('reputation'));
  const fame: Number = Number.parseInt(getFromStorage('fame'));
  const loan: Number = Number.parseInt(getFromStorage('loan'));

  logger.debug('products needed');

  const data = getFromStorage('products');

  const products: Array<Product> = Array.from(JSON.parse(data)).map(p => new Product(p, true));

  return {
    money,
    expenses,
    points,
    employees,
    team,
    reputation,
    fame,
    loan,
    rents,
    products
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

export default {
  getProductStorageData,
  getScheduleStorageData,
  getMessageStorageData,

  saveScheduleStorageData,
  saveProductStorageData,

  restartGame,
}
