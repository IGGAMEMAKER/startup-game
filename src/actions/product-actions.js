import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/product-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  improveFeature: (id, featureGroup, featureName) => {
    // common business experience of team
    const commonExperience = 0.25;
    // business experience of team in specific theme
    const analytics = 0.5 * productStore.getAnalyticsValueForFeatureCreating(id);
    const luck = getRandomRange(0, 0.5);// 0.25;

    const quality = Math.min((commonExperience + analytics + luck), 1).toFixed(2);

    logger.log('improveFeature', id, featureGroup, featureName, quality);

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
      id,
      featureGroup,
      featureName,
      value: quality
    })
  },
};
