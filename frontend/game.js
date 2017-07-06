import productStore from './stores/product-store';
import scheduleStore from './stores/schedule-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';

import logger from './helpers/logger/logger';

import moneyCalculator from './helpers/economics/money-difference';
import eventGenerator from './helpers/events/event-generator';
import skillHelper from './helpers/team/skills';

import stageHelper from './helpers/stages';

import Product from './classes/Product';

import * as JOB from './constants/job';

const isLastDayOfMonth = (day) => {
  return day % 30 === 0;
};

const computeTasks = (tasks) => {
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

const run = () => {
  scheduleActions.increaseDay();

  const day = scheduleStore.getDay();
  const tasks = scheduleStore.getTasks();


  const products: Array<Product> = productStore.getProducts();

  // check tasks for finishing
  computeTasks(tasks);

  // check if it is last day of month (pay day)
  if (isLastDayOfMonth(day)) {
    if (stageHelper.isFirstHypothesisMission()) {
      stageHelper.onFirstHypothesisMissionCompleted();
    }

    // calculate client amount change
    // const frees = productStore.getFreeClientsBatch();
    // products.forEach((p, i) => {
    //   productActions.testHypothesis(i);
    // });

    const frees = productStore.getFreeClientsBatch();
    const sumOfHypes = products
      .map((p: Product) => p.getHypeValue())
      .reduce((p, c) => p + c, 0);

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

    products
      .forEach((p, i) => {
        const id = i;
        const clients = transformations[i].increase;

        const churn = transformations[i].decrease;
        // const churn = productStore.getDisloyalClients(id);


        productActions.testHypothesis(id);
        productActions.addClients(id, clients);
        productActions.removeClients(id, churn);

        const damping = productStore.getHypeDampingValue(id);
        productActions.loseMonthlyHype(id, damping);
      });

    const difference = moneyCalculator.saldo();

    productActions.increaseMoney(difference);

    const money = productStore.getMoney();

    // take loans if necessary
    if (money < 0) {
      logger.log('money below zero');
      // productActions.loans.take(-money);
    }

    const companyId = 0;
    // calculate human points

    // calculate programmer points
    let programmingPoints = productStore.getMonthlyProgrammerPoints(companyId);

    // calculate marketing points
    let marketingPoints = productStore.getMonthlyMarketerPoints(companyId);

    const programmingSupportPoints = productStore.getProgrammingSupportCost(companyId);
    const marketingSupportPoints = productStore.getMarketingSupportCost(companyId);
    logger.shit('need proper index, NOT ZERO in: productStore.getProgrammingSupportCost(0); in game.js');


    // logger.log('increase points game.js', programmingPoints, marketingPoints);
    // logger.log('decrease points game.js', programmingSupportPoints, marketingSupportPoints);
    logger.shit('compute penalties and bonuses for point production');

    programmingPoints -= programmingSupportPoints;
    marketingPoints -= marketingSupportPoints;

    const points = {
      programming: programmingPoints,
      marketing: marketingPoints
    };
    productActions.increasePoints(points);

    // clean expired rents
    const refreshRents = [];
    const rents = productStore.getRents();

    // logger.debug('rents', rents, 'game.js');


    rents
      .forEach((r, i) => {
        // logger.debug('check rent', r, day);

        if (r.until <= day) {
          // logger.debug('expiration!!', r);
          refreshRents.push(i);
        }
      });

    if (refreshRents.length) productActions.refreshRents(refreshRents);

    productActions.updateEmployees();
  }

  // try to make an event
  eventGenerator.emit(day);
};

export default {
  run: run,
}
