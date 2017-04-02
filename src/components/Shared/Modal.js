// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import messageStore from '../../stores/message-store';

import * as c from '../../constants/actions/message-actions';
import * as t from '../../constants/events';

import FreeMoneyEvent from '../Game/Events/FREE-MONEY-EVENT';

import s from './Modal.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Modal extends Component {
  state = {};

  componentWillMount() {
    this.getMessages();

    messageStore.addChangeListener(this.getMessages);
  }

  getMessages = () => {
    this.setState({
      messages: messageStore.getMessages(),
      drawable: messageStore.isDrawable()
    })
  };

  renderModalBody = (message, id) => {
    switch (message.data.type) {
      case t.GAME_EVENT_FREE_MONEY:
        return <FreeMoneyEvent message={message} id={id} />;
        break;
    }

    return <div>render modal body {JSON.stringify(message)}</div>
  };

  render() {
    const { state } = this;

    if (!state.drawable) return <div></div>;

    const message = state.messages[0];

    let body = this.renderModalBody(message);
    return (
      <div className={s.messageTab}>
        {JSON.stringify(message)}
        {body}
      </div>
    );
  }
}
//
export default withStyles(Modal, s);
