import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import messageStore from '../../stores/message-store';

import * as NOTIFICATIONS from '../../constants/notifications';

import * as c from '../../constants/actions/message-actions';


import renderModal from '../Game/Events/event-renderer';

export default class Modal extends Component {
  componentWillMount() {
    this.getMessages();

    messageStore.addChangeListener(this.getMessages);
  }

  getMessages = () => {
    this.setState({
      messages: messageStore.getNotifications()
    })
  };

  renderModalBody = renderModal;

  render(props, state) {
    const message = state.messages[0];
    if (!message) return '';

    // let body = this.renderModalBody(message, 0, props.onclose);
    let body = JSON.stringify(message);

    const { data } = message;

    switch (message.type) {
      case NOTIFICATIONS.NOTIFICATION_FEATURE_UPGRADED:
        body = <div>Компания "{data.companyName}" улучшает технологию "{data.featureName}"</div>;
        break;
      case NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER:
        body = <div>Компания "{data.companyName}" становится лидером в технологии "{data.featureName}"!</div>;
        break;
      case NOTIFICATIONS.NOTIFICATION_MARKETS_INFLUENCE_INCREASED:
        body = <div>Компания "{data.companyName}" усиливает влияние на рынке "{data.marketName}"! Наши доходы снизились</div>;
        break;
      default:
        body = JSON.stringify(message);
        break;
    }

    // сообщений: {state.messages.length}

    return (
      <div className="">{body}</div>
    );
  }
}
