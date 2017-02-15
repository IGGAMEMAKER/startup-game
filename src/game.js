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

const run = () => {
  scheduleActions.increaseDay();

  const day = scheduleStore.getDay();
  const tasks = scheduleStore.getTasks();
  const products = productStore.getProducts();

  // check tasks for finishing
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
    const income = products
      .map((p, i) => productStore.getProductIncome(i))
      .reduce((p, c) => p + c);

    // check expenses
    const expenses = 100;

    playerActions.increaseMoney(income - expenses);
  }

  // try to make an event
};

export default {
  run: run,
}
