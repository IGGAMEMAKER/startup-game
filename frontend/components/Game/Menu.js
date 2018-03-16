import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import moneyCalculator from '../../helpers/economics/money-difference';

import logger from '../../helpers/logger/logger';

import stageHelper from '../../helpers/stages';

import UI from '../UI';

import shortenValue from '../../helpers/math/shorten-value';

export default class Menu extends Component {
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

  negativeOrPositiveClass = value => {
    return value >= 0 ? 'moneyPositive' : 'moneyNegative';
  };

  render(props, state) {
    if (!stageHelper.canShowUpperTabInMenu()) return <div></div>;

    const {
      pause,
      pauseGame,
      resources,
      production,
      setGameSpeed,
      id
    } = props;

    const { money, mp, pp, xp } = resources;


    // time and date
    let action;

    if (!pause) {
      action = pauseGame;
    } else {
      action = setGameSpeed(10);
    }

    let year = Math.floor(props.day / 360);
    let month = Math.floor((props.day - year * 360) / 30);
    let day = props.day - year * 360 - month * 30;

    month++;
    day++;

    const monthModified = month < 10 ? `0${month}` : month;
    const dayModified = day < 10 ? `0${day}` : day;

    const time = `${dayModified}.${monthModified}.${year + 2016}`;

    // money and XP

    const saldo = moneyCalculator.saldo();


    const moneyDifferenceIndication = this.negativeOrPositiveClass(saldo);

    const moneyDiffSign = saldo >= 0 ? '+' : '';

    // <div className="navigation">
    //   <span className="menu-money-indicator-icon">HYPE</span>
    //   <span className="moneyPositive"> <UI.Changeable value={hype} /></span>
    // </div>

    // <div className="navigation">
    //   <UI.Button
    //     text={time}
    //     secondary={pause}
    //     alert={!pause}
    //     onClick={action}
    //   />
    // </div>

    const moneySaldoText = `${moneyDiffSign}${shortenValue(saldo)}$ ежемесячно`;
    const managementSaldoText = `+${production.mp} ежемесячно`;
    const programmingSaldoText = `+${production.pp} ежемесячно`;
    const xpSaldoText = `+${5} ежемесячно`;
    // <span className={moneyDifferenceIndication}>   ({moneyDiffSign}<UI.Changeable value={shortenValue(saldo)} />$/мес)</span>



    return (
      <div className="menu-point-container">
        <div className="navigation">
          {UI.icons.money}
          <span title={moneySaldoText} className={moneyDifferenceIndication}> <UI.Changeable value={shortenValue(money)} /></span>
        </div>
        <div className="navigation">
          {UI.icons.MP}
          <span title={managementSaldoText} className="moneyPositive"> <UI.Changeable value={mp} /></span>
        </div>
        <div className="navigation">
          {UI.icons.PP}
          <span title={programmingSaldoText} className="moneyPositive"> <UI.Changeable value={pp} /></span>
        </div>
        <div className="navigation">
          {UI.icons.XP}
          <span title={xpSaldoText} className="moneyPositive"> <UI.Changeable value={xp} /></span>
        </div>
      </div>
    );
    // <div className="navigation">
    //   <UI.Button
    //     text={time}
    //     disabled
    //   />
    // </div>
  }
}
