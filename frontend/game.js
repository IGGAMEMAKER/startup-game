import productStore from './stores/store';
import scheduleStore from './stores/schedule-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';

import messageActions from './actions/message-actions';

import logger from './helpers/logger/logger';

import moneyCalculator from './helpers/economics/money-difference';
import eventGenerator from './helpers/events/event-generator';

import Product from '../shared/classes/Project';

import {
  isLastDayOfMonth,
  isLastDayOfYear,
  isUsualDay
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
};

const run = () => {
  scheduleActions.increaseDay();

  const day = scheduleStore.getDay();

  const products: Array<Product> = productStore.getProducts();

  // check tasks for finishing
  computeTasks();

  // check if it is last day of month (pay day)
  if (isLastDayOfMonth(day)) {
    products
      .forEach((p, i) => {
        const moneyBefore = productStore.getMoney(i);

        const difference = moneyCalculator.saldo(i);

        productActions.increaseMoney(difference, i);

        const money = productStore.getMoney(i);

        if (money < 0 && moneyBefore < 0) {
          logger.log('money below zero companyId=', i);
        }

        productActions.produceResources(i);
      });

    // clean expired rents
    checkRents(day);

    productActions.updateEmployees();
  }

  if (isLastDayOfYear(day)) {
    products.forEach((p, i) => {
      productActions.addBonus(i);
    })
  }

  if (isUsualDay(day)) {
    products.forEach((p, i) => {
      if (i !== 0) {
        // bot.run(i);
      }
    })
  }

  // try to make an event
  // eventGenerator.emit(day);
};

export default {
  run
}
