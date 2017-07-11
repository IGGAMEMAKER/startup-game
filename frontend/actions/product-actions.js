import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/product-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}


export default {
  improveFeature(id, featureGroup, featureName, max, XP) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
      id,
      featureGroup,
      featureName,
      value: XP || 1000,
      max
    })
  },
  refreshRents(ids: Array) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH,
      list: ids.reverse()
    })
  },
  improveMainFeature(id, featureId, max, XP) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_MAIN_FEATURE,
      id,
      featureId,
      value: XP || 1000,
      max
    })
  },
  buyCompany(buyerId, sellerId) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_COMPANY_BUY,
      buyerId, sellerId
    })
  },
  rentTech(sender, acceptor, featureId, price, until) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_TECHNOLOGY_RENT,
      sender, acceptor, featureId, price, until
    })
  },
  testHypothesis(id) {
    const range = productStore.getImprovementChances(id);

    const xp = range.middle; // Math.floor(getRandomRange(range.min, range.max));

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_TEST_HYPOTHESIS,
      id,
      value: xp
    })
  },
  improveFeatureByPoints(id, featureGroup, featureName) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
      id,
      featureGroup,
      featureName
    })
  },
  addBonus(id) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_BONUSES_ADD,
      id
    })
  },
  pickBonus(id, bonusName) {
    logger.shit('this function is same to improveFeatureByPoints()');

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
      id,
      featureGroup: 'bonuses',
      featureName: bonusName
    })
  },
  setInitialProductSettings(id, features, KPI) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS,
      id, features, KPI
    })
  },
  addClients(id, clients) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_ADD,
      id,
      clients
    })
  },
  addHype(id, hype) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_HYPE_ADD,
      id,
      hype
    })
  },
  viralClients(id, clients) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD,
      id,
      clients
    })
  },
  removeClients(id, clients) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_REMOVE,
      id,
      clients
    })
  },
  loseMonthlyHype(id, hypeDamping) {
    // hypeDamping MUST BE NEGATIVE!!
    logger.shit('loseMonthlyHype: hypeDamping must be negative');

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE,
      id,
      hypeDamping
    })
  },

  createCompetitorCompany(p) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY,
      p
    })
  },



  increaseMoney: (amount) => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
      amount
    })
  },
  decreaseMoney: (amount) => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
      amount: -amount
    })
  },
  hireWorker: (player, i) => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_HIRE_WORKER,
      player,
      i
    })
  },
  fireWorker(i) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_FIRE_WORKER,
      i
    })
  },
  addEmployee(player) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_EMPLOYEE_ADD,
      player
    })
  },
  updateEmployees() {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_UPDATE_EMPLOYEES
    })
  },
  rejectEmployee(i) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_EMPLOYEE_REMOVE,
      i
    })
  },

  increasePoints(points, id) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_INCREASE_POINTS,
      points,
      id
    })
  },
  spendPoints(pp, mp, id) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_DECREASE_POINTS,
      pp,
      mp,
      id
    })
  },
  buyProgrammingPoints: pp => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_BUY_PP,
      pp
    })
  },
  buyMarketingPoints: mp => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_BUY_MP,
      mp
    })
  },
  setTaskForPerson: (task, index) => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_SET_TASK,
      task,
      index
    })
  },

  loans: {
    take: (amount) => {
      Dispatcher.dispatch({
        type: ACTIONS.PLAYER_ACTIONS_LOANS_TAKE,
        amount
      })
    },
    repay: (id) => {
      Dispatcher.dispatch({
        type: ACTIONS.PLAYER_ACTIONS_LOANS_REPAY,
        id
      })
    }
  }
};
