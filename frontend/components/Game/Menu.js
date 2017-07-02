import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import moneyCalculator from '../../helpers/economics/money-difference';
import pointCalculator from '../../helpers/points/modification';

import playerStore from '../../stores/player-store';

import logger from '../../helpers/logger/logger';

import stageHelper from '../../helpers/stages';

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

  renderSpeedIcons() {
    return [
      { speed: 1, icon: '>' },
      { speed: 10, icon: '>>>' }
    ].map(s => (
      <div className="navigation">
        <UI.Button
          text={s.icon}
          onClick={this.props.setGameSpeed(s.speed)}
        />
      </div>
    ));
  }

  render(props, state) {
    if (!stageHelper.canShowUpperTabInMenu()) return <div></div>;

    const {
      pause,
      pauseGame,
      setGameSpeed
    } = props;

    const speedIcons = this.renderSpeedIcons();

    let pauseOrContinue = '';
    if (!pause) {
      pauseOrContinue = <UI.Button text='Пауза' onClick={pauseGame} link />;
    }

    const negative = 'moneyNegative';
    const positive = 'moneyPositive';

    const saldoValue = moneyCalculator.saldo();
    const isMakingIncome = saldoValue > 0;

    const moneyIndication = isMakingIncome ? positive : negative;
    const moneyDifference = isMakingIncome ? `+${saldoValue}` : saldoValue;


    const mpIndication = pointCalculator.marketing().needToHireWorker ? negative : positive;
    const ppIndication = pointCalculator.programming().needToHireWorker ? negative : positive;


    const year = Math.floor(props.day / 360);
    const month = Math.floor((props.day - year * 360) / 30);
    const day = props.day - year * 360 - month * 30;

    // {day}.{month}.{year + 2016}
    //       <div>{new Date(year + 2016, month, day).toLocaleDateString()}</div>
    //       <div>Год: {year + 2016} Месяц: {month} День: {day}</div>
    return <div>
      <div>
        <div className="navigation">
          <div className={moneyIndication}>${state.money} ({moneyDifference}$)</div>
        </div>
        <div className="navigation">
          <div>{day + 1}.{month + 1}.{year + 2016}</div>
        </div>
        {speedIcons}
        <div className="navigation">{pauseOrContinue}</div>
        <div className="navigation">
          <span className={mpIndication}>MP: {state.points.marketing}</span>
        </div>
        <div className="navigation">
          <span className={ppIndication}>PP: {state.points.programming}</span>
        </div>
      </div>
    </div>;
  }
}
