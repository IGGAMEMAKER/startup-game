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
  sessionStorage.saveInStorage('skills', {});
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
  logger.debug('saved tasks');
  //
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


function savePlayerStorageData({ skills, money, expenses, points, employees, team, reputation, fame, loan }) {
  return {
    skills: saveToStorage('skills', skills),
    money: saveToStorage('money', money),
    expenses: saveToStorage('expenses', expenses),
    points: saveToStorage('points', points),
    employees: saveToStorage('employees', employees),
    team: saveToStorage('team', team),
    reputation: saveToStorage('reputation', reputation),
    fame: saveToStorage('fame', fame),
    loan: saveToStorage('loan', loan)
  };
}

function getPlayerStorageData() {
  const skills: Object = JSON.parse(getFromStorage('skills'));
  const money: Number = Number.parseInt(getFromStorage('money'));
  const expenses: Array = Array.from(JSON.parse(getFromStorage('expenses')));
  const points: Object = JSON.parse(getFromStorage('points'));
  const employees: Array = Array.from(JSON.parse(getFromStorage('employees')));

  const team: Array = Array.from(JSON.parse(getFromStorage('team')));
  const reputation: Number = Number.parseInt(getFromStorage('reputation'));
  const fame: Number = Number.parseInt(getFromStorage('fame'));
  const loan: Number = Number.parseInt(getFromStorage('loan'));

  return {
    skills,
    money,
    expenses,
    points,
    employees,
    team,
    reputation,
    fame,
    loan
  };
}

function getProductStorageData() {
  const data = getFromStorage('products');

  logger.debug('getProductStorageData', data);

  const products: Array<Product> = Array.from(JSON.parse(data));

  logger.debug('getProductStorageData', products);

  return products.map(p => new Product(p, true));
}

function saveProductStorageData({ products }) {
  return {
    products: saveToStorage('products', products)
  }
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

// logger.log('initialize, session-manager', getPlayerStorageData(), getProductStorageData(), getScheduleStorageData());

export default {
  getPlayerStorageData,
  getProductStorageData,
  getScheduleStorageData,
  getMessageStorageData,

  savePlayerStorageData,
  saveScheduleStorageData,
  saveProductStorageData,

  restartGame,
}
