import productStore from './stores/product-store';
import scheduleStore from './stores/schedule-store';

import productActions from './actions/product-actions';
import scheduleActions from './actions/schedule-actions';

const run = () => {
  scheduleActions.increaseDay();
};

export default {
  run: run,
}
