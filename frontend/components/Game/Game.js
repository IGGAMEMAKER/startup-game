import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../stores/store';
import scheduleActions from '../../actions/schedule-actions';


import stageHelper from '../../helpers/stages';
import logger from '../../helpers/logger/logger';

import Menu from './Menu';
import ProductPanel from './Product/ProductPanel/product-panel';
import UI from '../UI';


import * as sounds from '../../utils/sounds';

import stats from '../../stats';

const MODE_MARKETING = 'MODE_MARKETING';
const MODE_RESEARCH = 'MODE_RESEARCH';
const MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
const MODE_COMPETITORS = 'MODE_COMPETITORS';
const MODE_STATS = 'MODE_STATS';

export default class Game extends Component {
  state = {
    products: [],
    team: [],
    day: 0,
    tasks: [],

    pause: false,
    gameSpeed: 1.5,
    timerId: null,
    counter: 0,

    id: 0, // productID
    mode: MODE_MARKETING
  };

  initialize = () => {
    this.getProductsFromStore();
    // this.pickDataFromScheduleStore();

    this.runGame();
  };

  runGame = () => {
    if (!this.state.pause) {
      // gameRunner.run();
    }

    setTimeout(() => {
      this.runGame();
      // sounds.moneySound();

    }, 1000 / this.state.gameSpeed);
  };

  setGameSpeed = speed => () => {
    this.setState({
      pause: false,
      gameSpeed: speed
    });
  };

  pauseGame = () => {
    this.setState({
      pause: true,
      timerId: null
    });
  };

  resumeGame = () => {
    this.setState({
      pause: false
    })
  };

  getMessages = () => {
    if (messageStore.isDrawable()) {
      this.pauseGame();
    }
  };

  getProductsFromStore = () => {
    const productId = this.state.id;

    const xp = 100; // productStore.getXP(productId);
    const mp = 100; // productStore.getManagerPoints(productId);
    const pp = 100; // productStore.getProgrammerPoints(productId);

    const productionMP = 100; // productStore.getMPProduction(productId);
    const productionPP = 100; // productStore.getPPProduction(productId);

    const money = 10000; // productStore.getMoney(productId);
    const products = []; // productStore.getOurProducts();

    this.setState({
      products,
      xp,
      money,
      mp,
      pp,
      productionMP,
      productionPP
    });
  };


  componentWillMount() {
    this.initialize();

    productStore.addChangeListener(this.getProductsFromStore);
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
    const selected = this.state.mode === mode ? 'active' : '';

    return (
      <li
        className={`product-menu-toggler ${selected}`}
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
    clients = this.renderNavbar(MODE_MARKETING, 'Маркетинг');

    let metrics;
    // if (stageHelper.canShowMetricsTab()) {
    //   metrics = this.renderNavbar(MODE_STATS, 'Статистика');
    // }

    let research;
    if (true) {
      research = this.renderNavbar(MODE_RESEARCH, 'Исследования');
    }

    return (
      <div className="nav nav-tabs">
        {improvements}
        {clients}
        {research}
        {metrics}
      </div>
    );
  };

  render(props, state) {
    const modalActive = false; // messageStore.isDrawable();

    const resources = {
      mp: state.mp,
      pp: state.pp,
      xp: state.xp,
      money: state.money
    };

    const production = {
      mp: state.productionMP,
      pp: state.productionPP
    };

              // <Menu
              //   id={this.state.id}
              //   pause={state.pause}
              //   pauseGame={this.pauseGame}
              //   setGameSpeed={this.setGameSpeed}
              //   day={state.day}
              //   resources={resources}
              //   production={production}
              // />
              // {this.renderProductMenuNavbar()}
            // {this.renderProductMenu(state)}
    return (
      <div>
        <UI.Modal onclose={this.resumeGame} />
        <div className={`body-background ${modalActive ? 'blurred' : ''}`}>
          <div className="body-wrapper">
            <div className="menu-fixed">
              HI GIRLS
            </div>
            <hr />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );

            // <UI.Button link onClick={sessionManager.restartGame} text="Рестарт игры" />
    //   <h3>Два вопроса бизнеса</h3>
    //   <div>Готовы ли люди этим пользоваться</div>
    //   <div>Сколько они готовы заплатить за это</div>
  }
}
