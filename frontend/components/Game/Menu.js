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

  render(props, state) {
    const {
      isChosenProjectsMenu,
      isChosenEconomicsMenu,
      isChosenStaffMenu,
      gameSpeed,
      pause,
      gamePhase,

      pauseGame,
      onNextMonth
    } = props;

    const saldoValue = Math.floor(moneyCalculator.saldo());
    const saldo = saldoValue  > 0;

    const s = { navigation: 'navigation', moneyPositive: 'moneyPositive', moneyNegative: 'moneyNegative' };
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

    const navigation = s.navigation;

    const mpIndication = pointCalculator.marketing().needToHireWorker ? s.moneyNegative : s.moneyPositive;
    const ppIndication = pointCalculator.programming().needToHireWorker ? s.moneyNegative : s.moneyPositive;

    const isRunning = !pause;

    // <UI.Button
    //   text={isRunning && gameSpeed === speed ? '||' : text}
    //   onClick={isRunning && gameSpeed === speed ? pauseGame : props.setGameSpeed(speed)}
    // />
    const speeder = (speed, text) => (
      <div className={navigation}>
        <UI.Button
          text={text}
          onClick={props.setGameSpeed(speed)}
        />
      </div>
    );

    const moneyDifference = saldo ? `+${saldoValue}` : saldoValue;
    const moneyPhrase = `$${Math.floor(state.money)} (${moneyDifference}$)`;

    const employees = playerStore.getEmployees().length;
    const employeePhrase = employees ? `(${employees})` : '';

    const pauser = (
      <UI.Button
        text='Пауза'
        onClick={pauseGame}
        link
      />
    );

    const resumer = (
      <UI.Button
        text='Возобновить'
        onClick={props.setGameSpeed(gameSpeed)}
        link
      />
    );

    const speedVariants = [
      { s: 1, icon: '>' },
      { s: 4, icon: '>>' },
      // { s: 7, icon: '>>>' },
      { s: 10, icon: '>>>>' }
    ];

    let pauseOrContinue;
    if (isRunning) {
      // pauseOrContinue = <div className={navigation}>{pauser}</div>;
      pauseOrContinue = pauser;
    } else {
      pauseOrContinue = ''; // <div className={navigation}>{resumer}</div>;
    }

    let nextSpeeder;

    // let currentSpeedIndex = speedVariants.findIndex(s => s.s === gameSpeed);
    // if (currentSpeedIndex < speedVariants.length - 1) {
    //   // can accelerate speed
    //   const s = speedVariants[currentSpeedIndex + 1];
    //
    //   nextSpeeder = speeder(s.s, s.icon);
    // } else {
    //   // we are on max speed
    //
    //   nextSpeeder = speeder(speedVariants[0].s, speedVariants[0].icon);
    // }

    nextSpeeder = speedVariants.map(s => speeder(s.s, s.icon));

    const onMPPP = () => {
      logger.debug('onMPPP');
      props.onRenderStaffMenu()
    };

    let upperTab;
            // <div>Месяц: {(props.day % 30) + 1}</div>
          // <div className={navigation} onClick={onNextMonth}>Следующий месяц</div>
    if (stageHelper.canShowUpperTabInMenu()) {
      const year = Math.floor(props.day / 360);
      const month = Math.floor((props.day - year * 360) / 30);
      const day = props.day - year * 360 - month * 30;

      let date = `Год: ${year} Месяц: ${month} День: ${day}`;

      upperTab = (
        <div>
          <div className={navigation}>
            <div className={moneyIndication}>{moneyPhrase}</div>
          </div>
          <div className={navigation}>
            <div>{date}</div>
          </div>
          {nextSpeeder}
          <div className={navigation}>{pauseOrContinue}</div>
          <div className={navigation}>
            <span className={mpIndication}>MP: {state.points.marketing}</span>
          </div>
          <div className={navigation}>
            <span className={ppIndication}>PP: {state.points.programming}</span>
          </div>
        </div>
      )
    }

        // <div>
        //   <div className={`${navigation} ${isChosenProjectsMenu}`} onClick={props.onRenderProjectsMenu}>Проекты</div>
        //   <div className={`${navigation} ${isChosenStaffMenu}`} onClick={props.onRenderStaffMenu}>Команда {employeePhrase}</div>
        // </div>
    return (
      <div>
        {upperTab}
      </div>
    );
  }
}
