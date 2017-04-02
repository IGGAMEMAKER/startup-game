// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import playerActions from '../../../actions/player-actions';
import messageActions from '../../../actions/message-actions';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class FreeMoneyEvent extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const money = data.money;

    const onClick = () => {
      playerActions.increaseMoney(money);
      messageActions.closeEvent(id);
    };

    return (
      <div>
        Free money event
        {JSON.stringify(props)}
        <Button onClick={onClick} text={`Получить халявные ${money}$`} primary />
      </div>
    );
  }
}
