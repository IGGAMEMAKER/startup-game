import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import ProductMenu from '../Game/ProductMenu';
import Staff from '../Game/Staff';
import Menu from '../Game/Menu';
import Economics from './Economics/Economics';
import Product from './Product';
import AdviceTab from './Advice';
import Tutorial from './Tutorial';

import productStore from '../../stores/product-store';
import scheduleStore from '../../stores/schedule-store';
import messageStore from '../../stores/message-store';

import gameRunner from '../../game';

import logger from '../../helpers/logger/logger';

import UI from '../UI';

const GAME_MODE_PRODUCTS = 'GAME_MODE_PRODUCTS';
const GAME_MODE_PRODUCT = 'GAME_MODE_PRODUCT';
const GAME_MODE_ECONOMICS = 'GAME_MODE_ECONOMICS';
const GAME_MODE_PLAYER = 'GAME_MODE_PLAYER';
const GAME_MODE_ADS = 'GAME_MODE_ADS';
const GAME_MODE_STAFF = 'GAME_MODE_STAFF';

import * as GAME_STAGES from '../../constants/game-stages';

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
    mode: GAME_MODE_PRODUCT,
    gamePhase: GAME_STAGES.GAME_STAGE_INIT
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

  componentWillMount() {
    this.initialize();

    productStore.addChangeListener(this.getProductsFromStore);

    scheduleStore.addChangeListener(this.pickDataFromScheduleStore);

    messageStore.addChangeListener(this.getMessages);
  }

  getMessages = () => {
    // logger.debug('MessageStore callback pausing');
    if (messageStore.isDrawable()) {
      this.pauseGame();
    }
  };

  pickDataFromScheduleStore = () => {
    this.setState({
      day: scheduleStore.getDay(),
      tasks: scheduleStore.getTasks(),
      gamePhase: scheduleStore.getGamePhase(),
    })
  };

  getProductsFromStore = () => {
    this.setState({
      products: productStore.getProducts()
    });
  };

  renderProducts = state => {
    return state.products
      .map((p, i) => Object.assign(p, { rating: productStore.getRating(i) }))
      .map((p, i) => (
        <div key={`product${i}`}>
          <ProductMenu product={p} i={i} onChooseProject={event => this.onRenderProjectMenu(i)} />
        </div>
      ));
  };

  renderProductMenu = state => {
    if (!state.products.length) return <div></div>;

    const id = state.id;
    const product = state.products[id];

    return <Product product={product} id={id} />;
  };

  onRenderProjectMenu = (i) => {
    this.setState({ mode: GAME_MODE_PRODUCT, id: i })
  };

  onRenderProjectsMenu = () => {
    if (this.state.products.length === 1) {
      this.onRenderProjectMenu(0);
      return;
    }

    this.setState({ mode: GAME_MODE_PRODUCTS })
  };

  onRenderEconomicsMenu = () => {
    this.setState({ mode: GAME_MODE_ECONOMICS })
  };

  onRenderStaffMenu = () => {
    this.setState({ mode: GAME_MODE_STAFF })
  };

  renderGameInNormalMode = (props, state) => {
    const { gamePhase } = state;
    let body = '';

    switch (state.mode) {
      case GAME_MODE_ECONOMICS:
        body = <Economics />;
        break;
      case GAME_MODE_PRODUCTS:
        body = this.renderProducts(state);
        break;
      case GAME_MODE_STAFF:
        body = <Staff />;
        break;
      case GAME_MODE_PRODUCT:
        body = this.renderProductMenu(state);
        break;
    }

    return (
      <div className="body-background">
        <UI.Modal onclose={this.resumeGame} />
        <div className="body-wrapper">
          <Menu
            pauseGame={this.pauseGame}
            resumeGame={this.resumeGame}
            setGameSpeed={this.setGameSpeed}
            onRenderProjectsMenu={this.onRenderProjectsMenu}
            onRenderEconomicsMenu={this.onRenderEconomicsMenu}
            onRenderStaffMenu={this.onRenderStaffMenu}
            pause={state.pause}
            gameSpeed={state.gameSpeed}
            day={state.day}

            isChosenProjectsMenu={state.mode === GAME_MODE_PRODUCTS || state.mode === GAME_MODE_PRODUCT ? 'active' : ''}
            isChosenEconomicsMenu={state.mode === GAME_MODE_ECONOMICS ? 'active' : ''}
            isChosenStaffMenu={state.mode === GAME_MODE_STAFF ? 'active' : ''}

            gamePhase={gamePhase}
          />
          <hr />

          <AdviceTab
            gamePhase={gamePhase}
          />
          <br />
          <hr />

          {body}
          <br />
          <hr />
        </div>
      </div>
    );
  };

  render(props: PropsType, state) {
    let body = '';

    switch (state.gamePhase) {
      case GAME_STAGES.GAME_STAGE_INIT:
        // render hero description tab
        body = <Tutorial />;
        break;
      default:
        // run game in normal mode
        body = this.renderGameInNormalMode(props, state);
        break;
    }

    return body;
    //   <h3>Два вопроса бизнеса</h3>
    //   <div>Готовы ли люди этим пользоваться</div>
    //   <div>Сколько они готовы заплатить за это</div>
  }
}
