import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import moneyCalculator from '../../helpers/economics/money-difference';
import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';

import UI from '../UI';

export default class Menu extends Component {
  componentWillMount() {
    this.getPlayerInfoFromStore();

    playerStore.addChangeListener(this.getPlayerInfoFromStore);
  }

  getPlayerInfoFromStore = () => {
    this.setState({
      money: playerStore.getMoney(),
      points: playerStore.getPoints()
    })
  };

  render(props, state) {
    const saldo = moneyCalculator.saldo() > 0;
    const arrow = saldo ? '\u2197' : '\u2198';

    const s = { navigation: 'navigation', moneyPositive: 'moneyPositive', moneyNegative: 'moneyNegative' };
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

    const navigation = s.navigation;
    return (
      <div>
        <div className={navigation}>
          <div className={moneyIndication}>${Math.floor(state.money)} {arrow}</div>
        </div>
        <div className={navigation}>
          <div>День: {props.day}</div>
        </div>
        <div className={navigation}>
          <UI.Button text="||" onClick={props.pauseGame} />
        </div>
        <div className={navigation}>
          <UI.Button text=">>" onClick={props.increaseGameSpeed} />
        </div>
        <div className={navigation}>MP: {state.points.marketing}</div>
        <div className={navigation}>PP: {state.points.programming}</div>

        <div>
          <div className={navigation} onClick={props.onRenderProjectsMenu}>Проекты</div>
          <div className={navigation} onClick={props.onRenderEconomicsMenu}>Экономика</div>
          <div className={navigation} onClick={props.onRenderStaffMenu}>Команда</div>
        </div>
      </div>
    );
  }
}
