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

    let companyName = `Компания "${data.companyName}"`;

    let bold = '';

    if (data.id === 0) {
      bold = 'bold';
    }

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
      case NOTIFICATIONS.NOTIFICATION_RENT_EXPIRED:
        body = <div>Окончание срока аренды: Компания "{JSON.stringify(data)}"</div>;
        break;
      case NOTIFICATIONS.NOTIFICATION_PAYMENTS_UPGRADED:
        body = <div>Компания "{data.companyName}" повышает свои доходы за счёт улучшения блока монетизации</div>;
        break;
      case NOTIFICATIONS.NOTIFICATION_COMPETITORS_ADD:
        body = <div>У нас появился новый конкурент: "{data.name}"!</div>;
        break;
      default:
        body = JSON.stringify(message);
        break;
    }

    // сообщений: {state.messages.length}

    return (
      <div className={bold}>{body}</div>
    );
  }
}
