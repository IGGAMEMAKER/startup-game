import messageActions from '../../actions/message-actions';

const addModalMessage = (eType, obj) => {
  messageActions.addGameEvent(eType, obj, true);
};

const addPlainMessage = (eType, obj) => {
  messageActions.addNotification(eType, obj);
};

export default {
  addModalMessage,
  addPlainMessage
};
