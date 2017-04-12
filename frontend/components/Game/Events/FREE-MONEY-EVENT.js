import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import playerActions from '../../../actions/player-actions';
import messageActions from '../../../actions/message-actions';

export default class FreeMoneyEvent extends Component {
  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const money = data.money;

    const onClick = () => {
      playerActions.increaseMoney(money);
      messageActions.closeEvent(id);
      props.onclose();
    };

    return (
      <div>
        <div className="text">Некто, пожелавший остаться неизвестным, пожертвовал в ваш проект {money}$</div>
        <br />
        <Button onClick={onClick} text={`Получить халявные ${money}$ !`} primary />
      </div>
    );
  }
}
