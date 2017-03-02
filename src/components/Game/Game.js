// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import ProductMenu from '../Game/ProductMenu';
import Schedule from '../Game/Schedule';
import DevelopPanel from '../Game/Product/DevelopPanel/develop-panel';
import AdsPanel from './Product/Ads/advert-planner-panel';

import Expenses from './Player/Expenses';

import productStore from '../../stores/product-store';
import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';

import playerActions from '../../actions/player-actions';

import gameRunner from '../../game';

import Button from '../Shared/Button';

import round from '../../helpers/math/round';

const GAME_MODE_PRODUCTS = 'GAME_MODE_PRODUCTS';

import s from './Game.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import moneyCalculator from '../../helpers/economics/money-difference';

class Game extends Component {
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

    day: 0,

    tasks: [],

    gameSpeed: 0,

    timerId: null,

    money: 0,

    id: 0, // productID

    mode: GAME_MODE_PRODUCTS
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
    // console.log('renderProduct', p, i);

    return (
      <div key={`product${i}`}>
        <ProductMenu product={p} i={i} />
      </div>
    )
  };

  renderProducts = state => {
    return state.products
      .map((p, i) => Object.assign(p, { rating: productStore.getRating(i) }))
      .map(this.renderProduct);
  };

  renderIncome = state => {
    // {JSON.stringify(state.income)}

    return (
      <div>
        <b>Доходы</b>
        <br />
        <div>Фриланс: 5000$</div>
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
    const loans = playerStore.getLoanSize();

    let loanTab = <div></div>;
    if (loans > 0) {
      loanTab = (
        <div>
          Суммарная задолженность {loans}$
        </div>
      );
    }

    const takeLoan = amount => {
      const repay = 1.3;
      return (
        <div>
          <div>
            Взять кредит на сумму {amount}$. Ежемесячный платёж составит: {amount * repay / 100}$
          </div>
          <Button text={`Взять кредит (${amount}$)`} onClick={() => playerActions.loans.take(amount)} />
        </div>
      )
    };

    return (
      <div>
        <div>На вашем счету: {round(state.money)}$</div>
        {takeLoan(1000)}
        {takeLoan(10000)}
        {takeLoan(100000)}
        {takeLoan(500000)}
        {loanTab}
        {this.renderIncome(state)}
        {this.renderExpenses(state)}
      </div>
    )
  };

  renderExpenses = state => {
    const expenses = state.products.map((p, i) => productStore.getProductExpensesStructure(i));

    return <Expenses expenses={expenses} />;
  };

  renderDevelopMode = state => {
    if (!state.products.length) return <div></div>;

    const id = state.id;
    const product = state.products[id];

    return <DevelopPanel product={product} id={id} />;
  };

  renderSchedule = state => {
    return <Schedule />;
  };

  render(props: PropsType) {
    const state = this.state;
    //        {this.renderSkills(state)}

    const day = state.day;

    const saldo = moneyCalculator.saldo() > 0;
    const arrow = saldo ? '\u2197' : '\u2198';
    const moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

    return (
      <div style={{ padding: '15px' }}>
        <div className={s.navigation}>
          <div>  day: {day}  </div>
        </div>
        <div className={s.navigation}>
          <Button text="||" onClick={this.pauseGame} />
        </div>
        <div className={s.navigation}>
          <Button text=">>" onClick={this.increaseGameSpeed} />
        </div>

        <div className={moneyIndication}>${state.money} {arrow}</div>

        <br />
        <hr />
        {this.renderSchedule(state)}
        <hr />
        <br />
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

export default withStyles(Game, s);
