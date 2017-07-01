import sessionStorage from './sessionStorage';
// import flux from './flux';

import * as GAME_STAGES from './constants/game-stages';
import * as JOB from './constants/job';
import * as IDEAS from './constants/products/ideas';
import * as PRODUCT_STAGES from './constants/products/product-stages';

import Product from './classes/Product';
import productDescriptions from './helpers/products/product-descriptions';

import logger from './helpers/logger/logger';

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

  // products
  sessionStorage.saveInStorage('products', [
    new Product({
      idea: IDEAS.IDEA_WEB_HOSTING,
      name: 'WWWEB HOSTING',
      stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA,
      defaultFeatures: productDescriptions(IDEAS.IDEA_WEB_HOSTING).features.map(f => f.data)
    })
  ]);
}

function getFromStorage(name) {
  if (!sessionStorage.getFromStorage('sessionId')) {
    sessionStorage.saveInStorage('sessionId', 'asd');

    setDefaultValues();
  }

  logger.log('pick from session-manager', name);
  return sessionStorage.getFromStorage(name);
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
  return getFromStorage('products');
}

function getScheduleStorageData() {
  return {
    tasks: getFromStorage('tasks'),
    day: getFromStorage('day'),
    gamePhase: getFromStorage('gamePhase')
  };
}

function getMessageStorageData() {
  return getFromStorage('messages');
}

// export function initialize() {
//   logger.log('initialize, session-manager');
//
//   const playerData = getPlayerStorageData();
//   const productsData = getProductStorageData();
//   const scheduleData = getScheduleStorageData();
//   // const messageData = getMessageStorageData();
//
//   flux.scheduleStore.initialize(scheduleData);
//   flux.productStore.initialize(productsData);
//   flux.playerStore.initialize(playerData);
//   // flux.playerStore.initialize(playerData);
// }

logger.log('initialize, session-manager', getPlayerStorageData(), getProductStorageData(), getScheduleStorageData());

export default {
  getPlayerStorageData,
  getProductStorageData,
  getScheduleStorageData,
  getMessageStorageData,

  savePlayerStorageData
}

// initialize();
