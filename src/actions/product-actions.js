import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  improveFeature: (id, featureGroup, featureName) => {
    const commonExperience = 0.3; // common business experience of team
    const analytics = 0.45; // business experience of team in specific theme
    const luck = getRandomRange(0, 0.25);// 0.25;

    const quality = (commonExperience + analytics + luck).toPrecision(2);

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
