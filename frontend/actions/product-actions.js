import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/product-store';

export default {
  improveFeature(id, featureGroup, featureName, XP) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
      id,
      featureGroup,
      featureName,
      value: XP || 1000
    })
  },
  refreshRents(ids: Array) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH,
      list: ids.reverse()
    })
  },

  setAsMainMarket(id, marketId) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN,
      id, marketId
    })
  },

  offerPartnership(c1, c2, marketId) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER,
      c1, c2, marketId
    })
  },
  revokePartnership(c1, c2, marketId) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE,
      c1, c2, marketId
    })
  },

  decreaseInfluenceOnMarket(id, marketId) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_INFLUENCE_DECREASE,
      id, marketId
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

  createCompany(p) {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CREATE_COMPANY,
      p
    })
  },


  increaseMoney: (amount, id) => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
      amount, id
    })
  },
  decreaseMoney: (amount, id) => {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
      amount: -amount, id
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
