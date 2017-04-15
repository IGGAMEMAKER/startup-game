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
    const saldoValue = Math.floor(moneyCalculator.saldo());
    const saldo = saldoValue  > 0;
    const arrow = saldo ? UI.symbols.upRight : UI.symbols.downRight;

    const s = { navigation: 'navigation', moneyPositive: 'moneyPositive', moneyNegative: 'moneyNegative' };
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

    const navigation = s.navigation;

    const isRunning = !props.pause;
    const gameSpeed = props.gameSpeed;

    const speeder = (speed, text) => (
      <div className={navigation}>
        <UI.Button
          text={isRunning && gameSpeed === speed ? '||' : text}
          onClick={isRunning && gameSpeed === speed ? props.pauseGame : props.setGameSpeed(speed)}
        />
      </div>
    );

    const moneyDifference = saldo ? `+${saldoValue}` : saldoValue;

    return (
      <div>
        <div className={navigation}>
          <div className={moneyIndication}>${Math.floor(state.money)} ({moneyDifference}$)</div>
        </div>
        <div className={navigation}>
          <div>День: {props.day}</div>
        </div>
        {speeder(1, '>')}
        {speeder(4, '>>')}
        {speeder(8, '>>>')}
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
