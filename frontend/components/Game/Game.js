import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import sessionManager from '../../helpers/session-manager';

import Menu from './Menu';
import ProductPanel from './Product/ProductPanel/product-panel';
import Tutorial from './Tutorial';

import flux from '../../flux';

import gameRunner from '../../game';

import logger from '../../helpers/logger/logger';

import UI from '../UI';

import * as GAME_STAGES from '../../constants/game-stages';

import stageHelper from '../../helpers/stages';


import stats from '../../stats';


const MODE_MARKETING = 'MODE_MARKETING';
const MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
const MODE_COMPETITORS = 'MODE_COMPETITORS';
const MODE_MONEY = 'MODE_MONEY';

export default class Game extends Component {
  state = {
    products: [],
    team: [],
    day: 0,
    tasks: [],

    pause: true,
    gameSpeed: 3,
    timerId: null,
    counter: 0,

    id: 0, // productID
    gamePhase: GAME_STAGES.GAME_STAGE_INIT,
    mode: MODE_MARKETING
  };

  initialize = () => {
    this.getProductsFromStore();
    this.pickDataFromScheduleStore();

    this.runGame();
  };

  runGame = () => {
    if (!this.state.pause) {
      gameRunner.run();
    }

    setTimeout(() => {
      this.runGame();
    }, 1000 / this.state.gameSpeed);
  };

  setGameSpeed = speed => () => {
    this.setState({
      pause: false,
      gameSpeed: speed
    });
  };

  pauseGame = () => {
    this.setState({ pause: true, timerId: null });
  };

  resumeGame = () => {
    this.setState({ pause: false })
  };

  getMessages = () => {
    if (flux.messageStore.isDrawable()) {
      this.pauseGame();
    }
  };

  pickDataFromScheduleStore = () => {
    this.setState({
      day: flux.scheduleStore.getDay(),
      tasks: flux.scheduleStore.getTasks(),
      gamePhase: flux.scheduleStore.getGamePhase()
    })
  };

  getProductsFromStore = () => {
    const products = flux.productStore.getOurProducts();
    const xp = products[0].getXP();

    this.setState({
      products: products,
      money: flux.productStore.getMoney(0),
      xp
    });
  };


  componentWillMount() {
    this.initialize();

    flux.productStore.addChangeListener(this.getProductsFromStore);
    flux.scheduleStore.addChangeListener(this.pickDataFromScheduleStore);
    flux.messageStore.addChangeListener(this.getMessages);
  }

  setMode = (mode) => {
    stats.saveAction('navigation', { mode });

    this.setState({ mode });
  };

  renderProductMenu = state => {
    if (!state.products.length) return <div></div>;

    const id = state.id;
    const product = state.products[id];

    return <ProductPanel product={product} id={id} mode={state.mode} />;
  };

  renderNavbar = (mode, name) => {
    return (
      <li
        className={`product-menu-toggler ${this.state.mode === mode ? 'active' : ''}`}
        onClick={() => this.setMode(mode)}
      >
        <span>{name}</span>
      </li>
    );
  };

  renderProductMenuNavbar = () => {
    let improvements;
    if (stageHelper.canShowMainFeatureTab()) {
      improvements = this.renderNavbar(MODE_MAIN_FEATURES, 'Разработка');
    }

    let clients;
    // if (stageHelper.canShowClientsTab()) {
    clients = this.renderNavbar(MODE_MARKETING, 'Маркетинг');
    // }

    let competitors;
    if (stageHelper.canShowCompetitorsTab()) {
      competitors = this.renderNavbar(MODE_COMPETITORS, 'Конкуренты');
    }

    let economics;
    if (stageHelper.canShowMetricsTab()) {
      economics = this.renderNavbar(MODE_MONEY, 'Экономика');
    }

    return (
      <div className="nav nav-tabs">
        {improvements}
        {clients}
        {competitors}
        {economics}
      </div>
    );
  };

  render(props, state) {
    if (state.gamePhase === GAME_STAGES.GAME_STAGE_INIT) return <Tutorial />;

    return (
      <div className="body-background">
        <UI.Modal onclose={this.resumeGame} />
        <div className="body-wrapper">
          <div className="menu-fixed">
            <Menu
              pause={state.pause}
              pauseGame={this.pauseGame}
              setGameSpeed={this.setGameSpeed}
              day={state.day}
              money={state.money}
              points={state.points}
              xp={state.xp}
              id={0}
            />
            {this.renderProductMenuNavbar()}
          </div>
          <hr />
          <br />
          <br />
          {this.renderProductMenu(state)}
          <br />
          <UI.Button link onClick={sessionManager.restartGame} text="Рестарт игры" />
          <br />
          <br />
          <div className="bottom-fixed">
            <UI.Notification />
          </div>
        </div>
      </div>
    );

    //   <h3>Два вопроса бизнеса</h3>
    //   <div>Готовы ли люди этим пользоваться</div>
    //   <div>Сколько они готовы заплатить за это</div>
  }
}
