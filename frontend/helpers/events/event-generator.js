import random from '../math/random';
import * as GAME_EVENTS from '../../constants/events';
import messageActions from '../../actions/message-actions';

import logger from '../../helpers/logger/logger';

const emit = () => {
  const rnd = Math.floor(random(0, 30));

  switch (rnd) {
    case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
      let money = Math.ceil(random(10000, 35000));
      messageActions.addGameEvent(rnd, { money });
      break;
    case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
      let points = Math.ceil(random(100, 275));
      messageActions.addGameEvent(rnd, { points });
      break;
  }
};

export default {
  emit
}
