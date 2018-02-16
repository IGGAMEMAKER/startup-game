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
      setGameSpeed,
      id,
      hype
    } = props;

    const { money, mp, pp, sp } = resources;


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

    const moneyIndication = this.negativeOrPositiveClass(money);
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
    const managementSaldoText = `+${100} ежемесячно`;
    const programmingSaldoText = `+${133} ежемесячно`;
    const sellSaldoText = `+${123} ежемесячно`;
    // <span className={moneyDifferenceIndication}>   ({moneyDiffSign}<UI.Changeable value={shortenValue(saldo)} />$/мес)</span>



    return <div>
      <div className="menu-point-container">
        <div title={moneySaldoText} className="navigation">
          <span className="menu-money-indicator-icon">$</span>
          <span className={moneyDifferenceIndication}> <UI.Changeable value={shortenValue(money)} /></span>
        </div>
        <div title={managementSaldoText} className="navigation">
          <span className="menu-money-indicator-icon">{UI.icons.MP}</span>
          <span className="moneyPositive"> <UI.Changeable value={mp} /></span>
        </div>
        <div title={programmingSaldoText} className="navigation">
          <span className="menu-money-indicator-icon">{UI.icons.PP}</span>
          <span className="moneyPositive"> <UI.Changeable value={pp} /></span>
        </div>
        <div title={sellSaldoText} className="navigation">
          <span className="menu-money-indicator-icon">{UI.icons.SP}</span>
          <span className="moneyPositive"> <UI.Changeable value={sp} /></span>
        </div>
      </div>
    </div>;
  }
}
        // <div className="navigation">
        //   <UI.Button
        //     text={time}
        //     disabled
        //   />
        // </div>
