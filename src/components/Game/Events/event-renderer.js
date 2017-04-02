import React, { Component, PropTypes } from 'react';

import FreeMoneyEvent from './FREE-MONEY-EVENT';
import * as t from '../../../constants/events';

export default (message, id) => {
  switch (message.data.type) {
    case t.GAME_EVENT_FREE_MONEY:
      return <FreeMoneyEvent message={message} id={id} />;
      break;
  }

  return <div>render modal body {JSON.stringify(message)}</div>
};
