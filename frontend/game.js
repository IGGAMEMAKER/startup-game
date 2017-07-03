import productStore from './stores/product-store';
import scheduleStore from './stores/schedule-store';
import playerStore from './stores/player-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';
import playerActions from './actions/player-actions';

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

  // const products = productStore.getCompetitorsList(0); logger.shit(`frontend/game.js magic id=0`);
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
      .map((p: Product) =>
        ({
          increase: 0,
          decrease: p.getDisloyalClients(),
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

        productActions.loseMonthlyHype(id);
        // const viral = productStore.getViralClients(id);
        // productActions.viralClients(id, viral);
      });

    const difference = moneyCalculator.saldo();

    playerActions.increaseMoney(difference);

    const money = playerStore.getMoney();

    // take loans if necessary
    if (money < 0) {
      logger.log('money below zero');
      // playerActions.loans.take(-money);
    }

    // calculate human points

    // calculate programmer points
    // const ppProducers = playerStore
    //   .getTeam()
    //   .filter(p => p.task === JOB.JOB_TASK_PROGRAMMER_POINTS);

    let programmingPoints = playerStore.getMonthlyProgrammerPoints();
    // ppProducers.length ?
    //   ppProducers
    //     .map(p => skillHelper.getProgrammingPointsProducedBy(p))
    //     .reduce((p, c) => p + c)
    //   :
    //   0;

    // calculate marketing points
    // const mpProducers = playerStore
    //   .getTeam()
    //   .filter(p => p.task === JOB.JOB_TASK_MARKETING_POINTS);

    let marketingPoints = playerStore.getMonthlyMarketerPoints();
    // mpProducers.length ?
    //   mpProducers
    //     .map(p => skillHelper.getMarketingPointsProducedBy(p))
    //     .reduce((p, c) => p + c)
    //   :
    //   0;

    const programmingSupportPoints = productStore.getProgrammingSupportCost(0);
    const marketingSupportPoints = productStore.getMarketingSupportCost(0);
    logger.shit('need proper index, NOT ZERO in: productStore.getProgrammingSupportCost(0); in game.js')


    // logger.log('increase points game.js', programmingPoints, marketingPoints);
    // logger.log('decrease points game.js', programmingSupportPoints, marketingSupportPoints);
    logger.shit('compute penalties and bonuses for point production');

    programmingPoints -= programmingSupportPoints;
    marketingPoints -= marketingSupportPoints;

    const points = {
      programming: programmingPoints,
      marketing: marketingPoints
    };
    playerActions.increasePoints(points);


    playerActions.updateEmployees();
  }

  // try to make an event
  eventGenerator.emit(day);
};

export default {
  run: run,
}
