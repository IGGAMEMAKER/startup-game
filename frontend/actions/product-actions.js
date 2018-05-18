import Dispatcher from '../dispatcher';
import * as ACTIONS from '../../shared/constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/store';

import * as transport from '../utils/network/send-data';

const sessionId = 'asd1-9jd-asjdaswqiwje';

const upgradeWorld = (result) => {
  Dispatcher.dispatch({
    type: ACTIONS.WORLD_UPGRADE,
    data: result
  })
};

const sendData = (url, data) => {
  return axios.post(url, data)
    .then(upgradeWorld)
};

export default {
  improveFeature(projectId, problemId) {
    sendData(`/solutions/upgrade`, {
      projectId,
      problemId
    });
  }
};
