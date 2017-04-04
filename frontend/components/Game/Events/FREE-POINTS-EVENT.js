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

class FreePointsEvent extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const points = data.points;

    const pickProgrammingPoints = () => {
      playerActions.increasePoints({ marketing: 0, programming: points * 2 });
      messageActions.closeEvent(id);
    };

    const pickMarketingPoints = () => {
      playerActions.increasePoints({ marketing: points * 2, programming: 0 });
      messageActions.closeEvent(id);
    };

    const pickBoth = () => {
      playerActions.increasePoints({ marketing: points, programming: points });
      messageActions.closeEvent(id);
    };

    return (
      <div>
        <div className={s.text}>
          В свободное от работы время вы много читаете и это приносит плоды! На что сделаете ставку?
        </div>
        <br />
        <Button className={s.button1} onClick={pickMarketingPoints} text={`Маркетинг наше всё! (+${points * 2}MP)`} primary />
        <br />
        <Button className={s.button1} onClick={pickProgrammingPoints} text={`Технологии рулят! (+${points * 2}PP)`} primary />
        <br />
        <Button className={s.button1} onClick={pickBoth} text={`Баланс во всём! (+${points}PP и +${points}MP)`} primary />
      </div>
    );
  }
}

export default withStyles(FreePointsEvent, s);
