// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import messageStore from '../../stores/message-store';

import * as c from '../../constants/actions/message-actions';


import renderModal from '../Game/Events/event-renderer';


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

  renderModalBody = renderModal;

  render() {
    const { state } = this;

    if (!state.drawable) return <div></div>;

    const message = state.messages[0];

    let body = this.renderModalBody(message);
        // {JSON.stringify(message)}
    return (
      <div className={s.messageTab}>
        {body}
      </div>
    );
  }
}

export default withStyles(Modal, s);
