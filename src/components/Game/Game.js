// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import ProductMenu from '../Game/ProductMenu';
import DevelopPanel from '../Game/Product/DevelopPanel/develop-panel';
import AdsPanel from './Product/Ads/advert-planner-panel';

import productStore from '../../stores/product-store';
import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';

import gameRunner from '../../game';

import Button from '../Shared/Button';

import round from '../../helpers/math/round';

export default class Game extends Component {
  state = {
    player: {
      skills: {
        level: 0,
        // experience: 1000, // business experience... maybe equal to level

        discipline: 1000, // ability to perform well even in low morale. Suffers less morale if fails
        charisma: 1000, // коммуникабельность + способность управлять людьми

          // talent is not shown anywhere
          // is not upgradeable (level of difficulty)
          talent: 1000,
        // vision: 1000, // may be done in one parameter firstly

        // профильный навык
        programming: 1000,
        design: 1000,
        ux: 1000,

        marketing: 1000
        // SEO: 1000
      },

      // temporaries
      morale: 100,
      energy: 100,

      // friends: 100, // NEED MORE INFO.

      reputation: 50,
      // fame: 0 - infinite
      money: 20000
    },

    products: [],

    team: [],

    expenses: [{
      type: 'EXPENSES_FOOD',
      quality: 0, // poor. Eat doshik and be happy (no). costs low money
      price: 100,
      regularity: 1 // everyday, 2 - once a week, 3 - once a month, 4 - once in half of the year, 5 - yearly
    }],

    day: 0,

    tasks: [],

    gameSpeed: 0,

    timerId: null,

    money: 0,

    id: 0, // productID
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

  renderSkills = state => {
    return (
      <div>
        <b>Навыки</b>
        <div>Ранг {state.player.skills.level}</div>
        <b>Психологические</b>
        <div alt="Способность работать даже при плохом настрое">Дисциплина {state.player.skills.discipline}</div>
        <div title="Влияет на переговорный процесс, найм сотрудников и.т.д.">Харизма {state.player.skills.charisma}</div>
        <br />
        <b>Специализация</b>
        <div>Программирование {state.player.skills.programming}</div>
        <div>Маркетинг {state.player.skills.marketing}</div>
        <div>Дизайн {state.player.skills.design}</div>
        <div>UX {state.player.skills.ux}</div>
        <div>SEO-продвижение {state.player.skills.SEO}</div>
        <br />
        <div>Maybe need to merge marketing and SEO</div>
      </div>
    )
  };

  renderProduct = (p, i) => {
    console.log('renderProduct', p, i);

    return (
      <div key={`product${i}`}>
        <ProductMenu product={p} i={i} />
      </div>
    )
  };

  renderProducts = state => {
    return state.products.map(this.renderProduct);
  };

  renderIncome = state => {
    return (
      <div>
        <b>Доходы</b>
        <br />
        {JSON.stringify(state.income)}
      </div>
    )
  };

  renderAdCampaignGenerator = state => {
    if (!state.products.length) return <div></div>;

    const id = state.id;
    const product = state.products[id];

    return (
      <div>
        <b>Рекламная кампания</b>
        <AdsPanel product={product} id={id} />
        <br />
      </div>
    )
  };

  renderEconomy = state => {
    return (
      <div>
        <div>На вашем счету: {round(state.money)}$</div>
        {this.renderIncome(state)}
        {this.renderExpenses(state)}
      </div>
    )
  };

  renderExpenses = state => {
    return (
      <div>
        <b>Расходы</b>
        <br />
        {JSON.stringify(state.expenses)}
      </div>
    )
  };

  renderDevelopMode = state => {
    if (!state.products.length) return <div></div>;

    const id = state.id;
    const product = state.products[id];

    return <DevelopPanel product={product} id={id} />;
  };

  render(props: PropsType) {
    const state = this.state;
    //        {this.renderSkills(state)}

    const day = state.day;
    return (
      <div style={{padding: '15px'}}>
        <Button text="increase game speed" onClick={this.increaseGameSpeed} />
        <Button text="pause" onClick={this.pauseGame} />

        <div>day: {day}</div>
        <br />
        <hr />
        {this.renderEconomy(state)}
        <hr />
        <br />
        {this.renderProducts(state)}
        <br />
        <hr />
        {this.renderDevelopMode(state)}
        <br />
        <hr />
        {this.renderAdCampaignGenerator(state)}
        <br />
        <hr />
      </div>
    );
  }
}
