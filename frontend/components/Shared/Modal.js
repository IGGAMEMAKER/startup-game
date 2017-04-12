import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import messageStore from '../../stores/message-store';

import * as c from '../../constants/actions/message-actions';


import renderModal from '../Game/Events/event-renderer';

export default class Modal extends Component {
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
    const { state, props } = this;

    if (!state.drawable) return <div></div>;

    const message = state.messages[0];

    let body = this.renderModalBody(message, 0, props.onclose);
        // {JSON.stringify(message)}

    return (
      <div className="messageTab">{body}</div>
    );
  }
}
