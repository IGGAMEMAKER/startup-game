import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import moneyCalculator from '../../helpers/economics/money-difference';
import pointCalculator from '../../helpers/points/modification';

import scheduleStore from '../../stores/schedule-store';
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
    return speedIcons = [
      { speed: 1, icon: '>' },
      { speed: 4, icon: '>>' },
      { speed: 10, icon: '>>>>' }
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
      pauseGame
    } = props;

    const speedIcons = this.renderSpeedIcons();

    const s = { navigation: 'navigation', moneyPositive: 'moneyPositive', moneyNegative: 'moneyNegative' };

    const saldoValue = Math.floor(moneyCalculator.saldo());
    const saldo = saldoValue > 0;

    const moneyDifference = saldo ? `+${saldoValue}` : saldoValue;
    const moneyPhrase = `$${state.money} (${moneyDifference}$)`;
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;


    const mpIndication = pointCalculator.marketing().needToHireWorker ? s.moneyNegative : s.moneyPositive;
    const ppIndication = pointCalculator.programming().needToHireWorker ? s.moneyNegative : s.moneyPositive;

    let pauseOrContinue = '';
    if (!pause) {
      pauseOrContinue = <UI.Button text='Пауза' onClick={pauseGame} link />;
    }

    const year = Math.floor(props.day / 360);
    const month = Math.floor((props.day - year * 360) / 30);
    const day = props.day - year * 360 - month * 30;

    return <div>
      <div>
        <div className="navigation">
          <div className={moneyIndication}>{moneyPhrase}</div>
        </div>
        <div className="navigation">
          <div>Год: {year} Месяц: {month} День: {day}</div>
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
