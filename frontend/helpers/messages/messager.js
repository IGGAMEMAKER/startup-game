import flux from '../../flux';

const addModalMessage = (eType, obj) => {
  flux.messageActions.addGameEvent(eType, obj, true);
};

const addPlainMessage = (eType, obj) => {
  flux.messageActions.addGameEvent(eType, obj, false);
};

export default {
  addModalMessage,
  addPlainMessage
};
