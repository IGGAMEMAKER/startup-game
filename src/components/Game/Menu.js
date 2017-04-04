import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import moneyCalculator from '../../helpers/economics/money-difference';
import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';

import s from './Game.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import UI from '../UI';

class Menu extends Component {
  componentWillMount() {
    this.pickDataFromScheduleStore();
    this.getPlayerInfoFromStore();

    scheduleStore.addChangeListener(this.pickDataFromScheduleStore);
    scheduleStore.addChangeListener(this.getPlayerInfoFromStore);
  }

  pickDataFromScheduleStore = () => {
    this.setState({
      day: scheduleStore.getDay()
    })
  };

  getPlayerInfoFromStore = () => {
    this.setState({
      money: playerStore.getMoney(),
      points: playerStore.getPoints()
    })
  };

  render() {
    const { state, props } = this;
    // state: StateType, props: PropsType

    const saldo = moneyCalculator.saldo() > 0;
    const arrow = saldo ? '\u2197' : '\u2198';
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

    return (
      <div>
        <div className={s.navigation}>
          <div className={moneyIndication}>${Math.floor(state.money)} {arrow}</div>
        </div>
        <div className={s.navigation}>
          <div>День: {state.day}</div>
        </div>
        <div className={s.navigation}>
          <UI.Button text="||" onClick={props.pauseGame} />
        </div>
        <div className={s.navigation}>
          <UI.Button text=">>" onClick={props.increaseGameSpeed} />
        </div>
        <div className={s.navigation}>MP: {state.points.marketing}</div>
        <div className={s.navigation}>PP: {state.points.programming}</div>

        <div>
          <div className={s.navigation} onClick={props.onRenderProjectsMenu}>Проекты</div>
          <div className={s.navigation} onClick={props.onRenderEconomicsMenu}>Экономика</div>
          <div className={s.navigation} onClick={props.onRenderStaffMenu}>Команда</div>
        </div>
      </div>
    );
  }
}

export default withStyles(Menu, s);
