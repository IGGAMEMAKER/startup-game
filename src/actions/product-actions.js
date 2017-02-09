import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

export default {
  improveFeature: (id, featureGroup, featureName) => {
    const commonExperience = 0.4; // common business experience of team
    const specificExperience = 0.5; // business experience of team in specific theme
    const luck = 0.1;

    const quality = commonExperience + specificExperience + luck;

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
