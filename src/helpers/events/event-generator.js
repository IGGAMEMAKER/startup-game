import random from '../math/random';
import * as GAME_EVENTS from '../../constants/events';
import messageActions from '../../actions/message-actions';

const emit = () => {
  const rnd = random(0, 2);
  return;
  switch (rnd) {
    case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
      let money = Math.ceil(random(10000, 35000));
      messageActions.addGameEvent(rnd, {
        money
      });
      break;
    case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
      break;
  }
};

export default {
  emit
}
