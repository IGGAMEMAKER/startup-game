import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/product-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  improveFeature: (id, featureGroup, featureName, h, max) => {
    const range = productStore.getImprovementChances(id);

    const quality = Math.floor(getRandomRange(range.min, range.max));

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
      id,
      featureGroup,
      featureName,
      value: quality,
      max
    })
  },
  improveFeatureByPoints: (id, featureGroup, featureName) => {
    logger.debug('improveFeatureByPoints', arguments);
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
      id,
      featureGroup,
      featureName
    })
  },
  setInitialProductSettings: (id, features, KPI) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS,
      id, features, KPI
    })
  },
  addClients: (id, clients) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_ADD,
      id,
      clients
    })
  },
  viralClients: (id, clients) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD,
      id,
      clients
    })
  },
  removeClients: (id, clients) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_REMOVE,
      id,
      clients
    })
  }
};
