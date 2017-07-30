import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import moneyCalculator from '../../helpers/economics/money-difference';

import productStore from '../../stores/product-store';

import logger from '../../helpers/logger/logger';

import stageHelper from '../../helpers/stages';

import UI from '../UI';

import shortenValue from '../../helpers/math/shorten-value';

export default class Menu extends Component {
  componentWillMount() {}

  renderSpeedIcons(setGameSpeed) {
    const icons = [
      { speed: 1, icon: '>' },
      { speed: 10, icon: '>>>' }
    ];

    return icons.map(s => <div className="navigation">
      <UI.Button
        text={s.icon}
        onClick={setGameSpeed(s.speed)}
      />
    </div>
    );
  }

  render(props, state) {
    if (!stageHelper.canShowUpperTabInMenu()) return <div></div>;

    const {
      pause,
      pauseGame,
      money,
      points,
      setGameSpeed,
      id
    } = props;

    const speedIcons = this.renderSpeedIcons(setGameSpeed);

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


    const mpIndication = productStore.getPointModificationStructured(id).marketing().needToHireWorker ? negative : positive;
    const ppIndication = productStore.getPointModificationStructured(id).programming().needToHireWorker ? negative : positive;


    const year = Math.floor(props.day / 360);
    const month = Math.floor((props.day - year * 360) / 30);
    const day = props.day - year * 360 - month * 30;

    // {day}.{month}.{year + 2016}
    //       <div>{new Date(year + 2016, month, day).toLocaleDateString()}</div>
    //       <div>Год: {year + 2016} Месяц: {month} День: {day}</div>

    let moneyPhrase = shortenValue(money);
    let moneyDifferencePhrase = shortenValue(moneyDifference);
    if (moneyDifference > 0) moneyDifferencePhrase = `+${moneyDifferencePhrase}`;

    return <div>
      <div>
        <div className="navigation">
          <div className={moneyIndication}>${moneyPhrase} ({moneyDifferencePhrase}$)</div>
        </div>
        <div className="navigation">
          <div>{day + 1}.{month + 1}.{year + 2016}</div>
        </div>
        {speedIcons}
        <div className="navigation">{pauseOrContinue}</div>
        <div className="navigation">
          <span className={mpIndication}>MP: {points.marketing}</span>
        </div>
        <div className="navigation">
          <span className={ppIndication}>PP: {points.programming}</span>
        </div>
      </div>
    </div>;
  }
}
