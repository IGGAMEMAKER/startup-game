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

  render(props, state) {

    if (!state.drawable) return <div></div>;

    const message = state.messages[0];

    let body = this.renderModalBody(message, 0, props.onclose);
        // {JSON.stringify(message)}

    if (!body) return <div></div>;

    return (
      <div className="messageTab">{body}</div>
    );
  }
}
