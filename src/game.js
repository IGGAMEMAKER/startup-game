import productStore from './stores/product-store';
import scheduleStore from './stores/schedule-store';
import playerStore from './stores/player-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';
import playerActions from './actions/player-actions';

import logger from './helpers/logger/logger';

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
  const products = productStore.getProducts();

  // check tasks for finishing
  computeTasks(tasks);

  // check if it is last day of month (pay day)
  if (isLastDayOfMonth(day)) {
    // calculate client amount change
    products.forEach((p, i) => {
      const churn = productStore.getDisloyalClients(i);
      const viral = productStore.getViralClients(i);

      productActions.removeClients(i, churn);
      productActions.viralClients(i, viral);
    });

    // check income
    const jobIncome = 5000;

    const income = jobIncome + products
      .map((p, i) => productStore.getProductIncome(i))
      .reduce((p, c) => p + c);

    // check expenses
    const nonProductExpenses = playerStore.getExpenses()
      .map((e, i) => e.price)
      .reduce((p, c) => p + c);


    const productExpenses = products
      .map((p, i) => productStore.getProductExpenses(i))
      .reduce((p, c) => p + c);

    const loans = playerStore.getLoanPaymentAmount();

    const expenses = nonProductExpenses + productExpenses + loans;

    logger.log('expenses', expenses, nonProductExpenses, productExpenses, loans);

    playerActions.increaseMoney(income - expenses);

    const money = playerStore.getMoney();

    logger.log(`resulting money __ money: ${money}. ${income} - ${expenses}`, income, expenses);

    if (money < 0) {
      playerActions.loans.take(-money);
    }
  }

  // try to make an event
};

export default {
  run: run,
}
