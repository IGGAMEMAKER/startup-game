import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import messageStore from '../../stores/message-store';

import * as NOTIFICATIONS from '../../../shared/constants/notifications';

import * as c from '../../../shared/constants/actions/message-actions';


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
        body = <span>Компания "{data.companyName}" улучшает технологию "{data.featureName}"</span>;
        break;
      case NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER:
        body = <span>Компания "{data.companyName}" становится лидером в технологии "{data.featureName}"!</span>;
        break;
      case NOTIFICATIONS.NOTIFICATION_MARKETS_INFLUENCE_INCREASED:
        body = <span>Компания "{data.companyName}" усиливает влияние на рынке "{data.marketName}"! Наши доходы снизились</span>;
        break;
      case NOTIFICATIONS.NOTIFICATION_RENT_EXPIRED:
        body = <span>Окончание срока аренды: Компания "{JSON.stringify(data)}"</span>;
        break;
      case NOTIFICATIONS.NOTIFICATION_PAYMENTS_UPGRADED:
        body = <span>Компания "{data.companyName}" повышает свои доходы за счёт улучшения блока монетизации</span>;
        break;
      case NOTIFICATIONS.NOTIFICATION_COMPETITORS_ADD:
        body = <span>У нас появился новый конкурент: компания "{data.name}"!</span>;
        break;
      default:
        body = JSON.stringify(message);
        break;
    }

    // сообщений: {state.messages.length}

    return (
      <div className={bold}>
        <span className="">Новости : </span>
        {body}
      </div>
    );
  }
}
