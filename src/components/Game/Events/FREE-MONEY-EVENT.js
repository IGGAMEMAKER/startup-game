// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import playerActions from '../../../actions/player-actions';
import messageActions from '../../../actions/message-actions';

import s from './Events.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

type PropsType = {};

type StateType = {};

type ResponseType = {};

class FreeMoneyEvent extends Component {
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

    //
    // Free money event
    // {JSON.stringify(props)}
    return (
      <div>
        <div className={s.text}>Некто, пожелавший остаться неизвестным, пожертвовал в ваш проект {money}$</div>
        <br />
        <Button onClick={onClick} text={`Получить халявные ${money}$ !`} primary />
      </div>
    );
  }
}

export default withStyles(FreeMoneyEvent, s);
