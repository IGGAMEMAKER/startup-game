import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import productActions from '../../../actions/product-actions';
import messageActions from '../../../actions/message-actions';

import logger from '../../../helpers/logger/logger';

export default class FreeMoneyEvent extends Component {
  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const money = data.money;

    const onClick = () => {
      logger.shit('FREE-MONEY-EVENT.js Id=0');

      productActions.increaseMoney(money, 0);
      messageActions.closeEvent(id);
      props.onclose();
    };

    return (
      <div>
        <div className="modal-head">Некто, пожелавший остаться неизвестным, пожертвовал в ваш проект {money}$</div>
        <br />
        <Button onClick={onClick} text={`Получить халявные ${money}$ !`} primary />
      </div>
    );
  }
}
