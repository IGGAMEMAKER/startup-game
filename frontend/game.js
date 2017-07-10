import productStore from './stores/product-store';
import scheduleStore from './stores/schedule-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';

import logger from './helpers/logger/logger';

import moneyCalculator from './helpers/economics/money-difference';
import eventGenerator from './helpers/events/event-generator';

import Product from './classes/Product';

import {
  isLastDayOfMonth,
  isLastDayOfYear
} from './helpers/date';

const computeTasks = () => {
  const tasks = scheduleStore.getTasks();

  const finishing = [];

  tasks.forEach((t, taskId) => {
    const speed = t.speed;

    if (t.inProgress) {
      if (t.progress + speed >= t.timecost) {
        // this task will complete today
        finishing.push(taskId);

        if (t.cb) {
          t.cb();
        }

      } else {
        scheduleActions.increaseProgress(taskId, speed);
      }
    }
  });

  scheduleActions.removeTasks(finishing); // and we need to set new inProgress task
};

const checkRents = day => {
  const refreshRents = [];
  const rents = productStore.getRents();

  rents
    .forEach((r, i) => {
      if (r.until <= day) {
        refreshRents.push(i);
      }
    });

  if (refreshRents.length) productActions.refreshRents(refreshRents);
};

const calculatePoints = companyId => {
  // calculate programmer points
  const programmingPoints = productStore.getMonthlyProgrammerPoints(companyId) - productStore.getProgrammingSupportCost(companyId);

  // calculate marketing points
  let marketingPoints = productStore.getMonthlyMarketerPoints(companyId) - productStore.getMarketingSupportCost(companyId);

  const points = {
    programming: programmingPoints,
    marketing: marketingPoints
  };

  productActions.increasePoints(points);
};

const getClientTransformations = () => {
  const products: Array<Product> = productStore.getProducts();

  const frees = productStore.getFreeClientsBatch();

  const sumOfHypes = products.map((p: Product) => p.getHypeValue()).reduce((p, c) => p + c, 0);

  const transformations: Array = products
    .map((p: Product, id) =>
      ({
        increase: 0,
        decrease: productStore.getDisloyalClients(id),
        hypeValue: p.getHypeValue(),
        hype: p.getHypeValue() / sumOfHypes
      })
    );

  products.forEach((p: Product, i) => {
    const freeHypeShare = transformations[i].hype;

    // add free clients if possible
    transformations[i].increase += Math.round(frees * freeHypeShare);

    // we exclude one company from list, so ... sum of hypes decreases by current company
    const hypeDiscount = transformations[i].hypeValue;

    transformations.forEach((t, j) => {
      if (j !== i) {
        const currentHypeShare = t.hypeValue / (sumOfHypes - hypeDiscount);

        transformations[i].increase += Math.round(t.decrease * currentHypeShare);
      }
    })
  });

  return transformations;
};



const run = () => {
  scheduleActions.increaseDay();

  const day = scheduleStore.getDay();

  const products: Array<Product> = productStore.getProducts();

  // check tasks for finishing
  computeTasks();

  // check if it is last day of month (pay day)
  if (isLastDayOfMonth(day)) {
    // calculate client amount change
    const transformations = getClientTransformations();

    products
      .forEach((p, i) => {
        const clients = transformations[i].increase;
        const churn = transformations[i].decrease;
        const damping = productStore.getHypeDampingValue(i);

        productActions.addClients(i, clients);
        productActions.removeClients(i, churn);
        productActions.loseMonthlyHype(i, damping);
      });

    const moneyBefore = productStore.getMoney();

    const difference = moneyCalculator.saldo();

    productActions.increaseMoney(difference);

    const money = productStore.getMoney();


    if (money < 0 && moneyBefore < 0) {
      logger.log('money below zero');
    }

    const companyId = 0;
    logger.shit('need proper index, NOT ZERO in: productStore.getProgrammingSupportCost(0); in game.js');
    logger.shit('compute penalties and bonuses for point production');

    // calculate human points
    calculatePoints(companyId);

    // clean expired rents
    checkRents(day);

    productActions.updateEmployees();
  }

  if (isLastDayOfYear(day)) {
    products.forEach((p, i) => {
      productActions.addBonus(i);
    })
  }

  // try to make an event
  eventGenerator.emit(day);
};

export default {
  run
}
