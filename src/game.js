import productStore from './stores/product-store';
import scheduleStore from './stores/schedule-store';
import playerStore from './stores/player-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';
import playerActions from './actions/player-actions';

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
