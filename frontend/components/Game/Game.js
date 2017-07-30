import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import sessionManager from '../../helpers/session-manager';

import Menu from '../Game/Menu';
import Product from './Product';
import Tutorial from './Tutorial';

import flux from '../../flux';

import gameRunner from '../../game';

import logger from '../../helpers/logger/logger';

import UI from '../UI';

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
    this.setState({
      products: flux.productStore.getOurProducts(),
      money: flux.productStore.getMoney(0),
      points: flux.productStore.getPoints(0)
    });
  };


  componentWillMount() {
    this.initialize();

    flux.productStore.addChangeListener(this.getProductsFromStore);
    flux.scheduleStore.addChangeListener(this.pickDataFromScheduleStore);
    flux.messageStore.addChangeListener(this.getMessages);
  }

  renderProductMenu = state => {
    if (!state.products.length) return <div></div>;

    const id = state.id;
    const product = state.products[id];

    return <Product product={product} id={id} />;
  };

  render(props: PropsType, state) {
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
              id={0}
            />
          </div>
          <hr />
          {this.renderProductMenu(state)}
          <br />
          <hr />
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
