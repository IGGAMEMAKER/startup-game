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

  // check if it is last day of month (pay day)
  if (isLastDayOfMonth(day)) {
    // calculate client amount change
    products.forEach((p, i) => {
      const clients = productStore.getClients(i);
      const churn = productStore.getDisloyalClients(i);
      const viral = productStore.getViralClients(i);
      logger.log('onMonth update', churn, viral, clients);

      const change = churn - viral;

      if (change > 0) {
        // people are leaving our service!
        if (change > clients) {
          productActions.addClients(i, -change); // decrease client number
        } else {
          productActions.addClients(i, -clients); // set client size to zero
        }
      } else {
        // YEAH! WE ARE GROWING!
        productActions.addClients(i, -change); // change is negative, so we need to mul by -1
      }
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
