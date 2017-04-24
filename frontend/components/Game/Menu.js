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

    const s = { navigation: 'navigation', moneyPositive: 'moneyPositive', moneyNegative: 'moneyNegative' };
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

    const navigation = s.navigation;

    const {
      isChosenProjectsMenu,
      isChosenEconomicsMenu,
      isChosenStaffMenu,
      gameSpeed,
      pause
    } = props;

    const isRunning = !pause;

    const speeder = (speed, text) => (
      <div className={navigation}>
        <UI.Button
          text={isRunning && gameSpeed === speed ? '||' : text}
          onClick={isRunning && gameSpeed === speed ? props.pauseGame : props.setGameSpeed(speed)}
        />
      </div>
    );

    const moneyDifference = saldo ? `+${saldoValue}` : saldoValue;
    const moneyPhrase = `$${Math.floor(state.money)} (${moneyDifference}$)`;

    return (
      <div>
        <div className={navigation}>
          <div className={moneyIndication} onClick={props.onRenderEconomicsMenu}>{moneyPhrase}</div>
        </div>
        <div className={navigation}>
          <div>День: {props.day}</div>
        </div>
        {speeder(1, '>')}
        {speeder(8, '>>>')}
        <div className={navigation} onClick={props.onRenderStaffMenu}>MP: {state.points.marketing}</div>
        <div className={navigation} onClick={props.onRenderStaffMenu}>PP: {state.points.programming}</div>

        <div>
          <div className={`${navigation} ${isChosenProjectsMenu}`} onClick={props.onRenderProjectsMenu}>Проекты</div>
          <div className={`${navigation} ${isChosenEconomicsMenu}`} onClick={props.onRenderEconomicsMenu}>Экономика</div>
          <div className={`${navigation} ${isChosenStaffMenu}`} onClick={props.onRenderStaffMenu}>Команда</div>
        </div>
      </div>
    );
  }
}
