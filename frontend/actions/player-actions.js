import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/player-actions';
import logger from '../helpers/logger/logger';

import playerStore from '../stores/player-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
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
  rejectEmployee(i) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_EMPLOYEE_REMOVE,
      i
    })
  },

  increasePoints(points) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_INCREASE_POINTS,
      points
    })
  },
  spendPoints(pp, mp) {
    Dispatcher.dispatch({
      type: ACTIONS.PLAYER_ACTIONS_DECREASE_POINTS,
      pp,
      mp
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
