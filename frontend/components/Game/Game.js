import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import ProductMenu from '../Game/ProductMenu';
import Staff from '../Game/Staff';
import Menu from '../Game/Menu';
import Economics from './Economics/Economics';
import Product from './Product';

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
  };

  initialize = () => {
    this.getProductsFromStore();
    this.pickDataFromScheduleStore();

    this.runGame();
  };

  increaseCounter = () => {
    const counter = this.state.counter;
    this.setState({
      counter: counter < 10 ? counter + 1 : 0
    });
  };

  runGame = () => {
    if (!this.state.pause) {
      gameRunner.run();
    }

    setTimeout(() => {
      this.runGame();
    }, 1000 / this.state.gameSpeed);
  };

  runTimer = () => {
    let timerId = this.state.timerId;
    const speed = this.state.gameSpeed;

    if (timerId) {
      clearInterval(timerId);
    }

    timerId = setInterval(gameRunner.run, 1000 / speed);
    return timerId;
  };

  setGameSpeed = speed => () => {
    // const timerId = this.runTimer();
    // const object = { gameSpeed: speed };

    // object.timerId = timerId;
    // object.pause = false;
    // this.setState(object);
    this.setState({
      // timerId,
      pause: false,
      gameSpeed: speed
    });
  };

  pauseGame = () => {
    // let timerId = this.state.timerId;
    // clearInterval(timerId);
    this.setState({ pause: true, timerId: null });
  };

  resumeGame = () => {
    // let timerId = this.runTimer();
    this.setState({
      pause: false,
      // timerId
    })
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
      tasks: scheduleStore.getTasks()
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

  render(props: PropsType, state) {
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

    // <div>
    //   <h3>Два вопроса бизнеса</h3>
    //   <div>Готовы ли люди этим пользоваться</div>
    //   <div>Сколько они готовы заплатить за это</div>
    // </div>
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
          />
          <br />
          <hr />

          {body}
          <br />
          <hr />
        </div>
      </div>
    );
  }
}
