import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import moneyCalculator from '../../helpers/economics/money-difference';

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
      xp,
      setGameSpeed,
      id
    } = props;

    const speedIcons = this.renderSpeedIcons(setGameSpeed);

    let action;

    let pauseOrContinue = '';
    if (!pause) {
      // pauseOrContinue = <UI.Button text='Пауза' onClick={pauseGame} link />;
      action = pauseGame;
    } else {
      action = setGameSpeed(10);
    }

    const negative = 'moneyNegative';
    const positive = 'moneyPositive';

    const saldoValue = moneyCalculator.saldo();
    const isMakingIncome = saldoValue > 0;

    const moneyIndication = isMakingIncome ? positive : negative;
    const moneyDifference = isMakingIncome ? `+${saldoValue}` : saldoValue;


    let year = Math.floor(props.day / 360);
    let month = Math.floor((props.day - year * 360) / 30);
    let day = props.day - year * 360 - month * 30;

    month++;
    day++;

    const monthModified = month < 10 ? `0${month}` : month;
    const dayModified = day < 10 ? `0${day}` : day;

    const time = `${dayModified}.${monthModified}.${year + 2016}`;
    // const time = `${day + 1}.${month + 1}.${year + 2016}`;

    let moneyPhrase = shortenValue(money);
    let moneyDifferencePhrase = shortenValue(moneyDifference);
    if (moneyDifference > 0) moneyDifferencePhrase = `+${moneyDifferencePhrase}`;


    return <div>
      <div>
        <div className="navigation">
          <div className={moneyIndication}>${moneyPhrase} ({moneyDifferencePhrase}$)</div>
        </div>
        <div className="navigation">
          <span className={positive}>XP: {xp}</span>
        </div>
        <div className="navigation">
          <UI.Button
            text={time}
            secondary={pause}
            alert={!pause}
            onClick={action}
          />
        </div>
      </div>
    </div>;
  }
}
