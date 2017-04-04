import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import ProductMenu from '../Game/ProductMenu';
import Schedule from '../Game/Schedule';
import Staff from '../Game/Staff';
import Menu from '../Game/Menu';
import DevelopPanel from '../Game/Product/DevelopPanel/develop-panel';
import InitialProductTab from '../Game/Product/InitialPanel/InitialProductTab';
import AdsPanel from './Product/Ads/advert-planner-panel';
import Expenses from './Player/Expenses';
import Economics from './Economics/Economics';
import PointShop from './Player/Point-shop';

import productStore from '../../stores/product-store';
import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';
import messageStore from '../../stores/message-store';

import playerActions from '../../actions/player-actions';

import gameRunner from '../../game';

import UI from '../UI';

const GAME_MODE_PRODUCTS = 'GAME_MODE_PRODUCTS';
const GAME_MODE_PRODUCT = 'GAME_MODE_PRODUCT';
const GAME_MODE_ECONOMICS = 'GAME_MODE_ECONOMICS';
const GAME_MODE_PLAYER = 'GAME_MODE_PLAYER';
const GAME_MODE_ADS = 'GAME_MODE_ADS';
const GAME_MODE_STAFF = 'GAME_MODE_STAFF';

// import s from './Game.scss';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
//
import moneyCalculator from '../../helpers/economics/money-difference';

import * as PRODUCT_STAGES from '../../constants/products/product-stages';

export default class Game extends Component {
  state = {
    products: [],

    team: [],

    day: 0,

    tasks: [],

    gameSpeed: 0,

    timerId: null,

    money: 0,

    id: 0, // productID

    mode: GAME_MODE_PRODUCT,

    possibleCredit: 1000
  };

  initialize = () => {
    this.getProductsFromStore();
    this.pickDataFromScheduleStore();
    this.getPlayerInfoFromStore();
  };

  increaseGameSpeed = () => {
    const speed = this.state.gameSpeed + 1;
    const object = { gameSpeed: speed };

    let timerId = this.state.timerId;

    if (timerId) {
      clearInterval(timerId);
    }

    timerId = setInterval(gameRunner.run, 1000 / speed);
    object.timerId = timerId;
    this.setState(object);
  };

  pauseGame = () => {
    let timerId = this.state.timerId;
    clearInterval(timerId);
    this.setState({ gameSpeed: 0, timerId: null });
  };

  componentWillMount() {
    this.initialize();

    productStore.addChangeListener(this.getProductsFromStore);

    scheduleStore.addChangeListener(this.pickDataFromScheduleStore);

    playerStore.addChangeListener(this.getPlayerInfoFromStore);
  }

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

  getPlayerInfoFromStore = () => {
    this.setState({
      money: playerStore.getMoney(),
      skills: playerStore.getSkills()
    })
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

    let body;

    switch (product.stage) {
      case PRODUCT_STAGES.PRODUCT_STAGE_IDEA:
        body = <InitialProductTab product={product} id={id} />;
        break;
      default:
        // body = <DevelopPanel product={product} id={id} />;
        body = (
          <div>
            <DevelopPanel product={product} id={id} />
            <br />
            <hr />
            <div>
              <b>Рекламная кампания</b>
              <AdsPanel product={product} id={id} />
              <br />
            </div>
            <PointShop />
          </div>
        );
        break;
    }

    return body;
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

  render(props: PropsType) {
    const state = this.state;
    const mode = state.mode;

    const day = state.day;

    let body = '';

    switch (mode) {
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
        <UI.Modal />
        <div className="body-wrapper">
          <Menu
            pauseGame={this.pauseGame}
            increaseGameSpeed={this.increaseGameSpeed}
            onRenderProjectsMenu={this.onRenderProjectsMenu}
            onRenderEconomicsMenu={this.onRenderEconomicsMenu}
            onRenderStaffMenu={this.onRenderStaffMenu}
          />
          <br />
          <hr />
          <Schedule />

          {body}
          <br />
          <hr />
        </div>
      </div>
    );
  }
}