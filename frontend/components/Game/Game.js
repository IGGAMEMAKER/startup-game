// import { React, h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import ProductMenu from '../Game/ProductMenu';
import Schedule from '../Game/Schedule';
import Staff from '../Game/Staff';
import Menu from '../Game/Menu';
import DevelopPanel from '../Game/Product/DevelopPanel/develop-panel';
import InitialProductTab from '../Game/Product/InitialPanel/InitialProductTab';
import AdsPanel from './Product/Ads/advert-planner-panel';
import Expenses from './Player/Expenses';
import PointShop from './Player/Point-shop';

import productStore from '../../stores/product-store';
import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';
import messageStore from '../../stores/message-store';

import playerActions from '../../actions/player-actions';

import gameRunner from '../../game';

import Button from '../Shared/Button';
import Range from '../../components/Shared/Range';
import ModalTab from '../Shared/Modal';

import round from '../../helpers/math/round';

const GAME_MODE_PRODUCTS = 'GAME_MODE_PRODUCTS';
const GAME_MODE_PRODUCT = 'GAME_MODE_PRODUCT';
const GAME_MODE_ECONOMICS = 'GAME_MODE_ECONOMICS';
const GAME_MODE_PLAYER = 'GAME_MODE_PLAYER';
const GAME_MODE_ADS = 'GAME_MODE_ADS';
const GAME_MODE_STAFF = 'GAME_MODE_STAFF';

import s from './Game.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import moneyCalculator from '../../helpers/economics/money-difference';

import * as PRODUCT_STAGES from '../../constants/products/product-stages';

class Game extends Component {
  state = {
    // player: {
    //   skills: {
    //     level: 0,
    //     // experience: 1000, // business experience... maybe equal to level
    //
    //     discipline: 1000, // ability to perform well even in low morale. Suffers less morale if fails
    //     charisma: 1000, // коммуникабельность + способность управлять людьми
    //
    //       // talent is not shown anywhere
    //       // is not upgradeable (level of difficulty)
    //       talent: 1000,
    //     // vision: 1000, // may be done in one parameter firstly
    //
    //     // профильный навык
    //     programming: 1000,
    //     design: 1000,
    //     ux: 1000,
    //
    //     marketing: 1000
    //     // SEO: 1000
    //   },
    //
    //   // temporaries
    //   morale: 100,
    //   energy: 100,
    //
    //   // friends: 100, // NEED MORE INFO.
    //
    //   reputation: 50,
    //   // fame: 0 - infinite
    //   money: 20000
    // },

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

  renderIncome = state => {
    // {JSON.stringify(state.income)}
    const productIncome = moneyCalculator.structured().byProductIncome
      .filter(p => p.income > 0)
      .map(p => (<div>{p.name} : {p.income}$</div>));

    return (
      <div>
        <b>Доходы</b>
        <br />
        <div>Фриланс: 5000$</div>
        <div>{productIncome}</div>
      </div>
    )
  };

  renderEconomy = state => {
    const loans = playerStore.getLoanSize();

    let loanStatusTab = <div>Долгов нет</div>;
    if (loans > 0) {
      loanStatusTab = (
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

    const onDrag = (value) => {
      this.setState({ possibleCredit: Math.floor(value) });
    };

    const { possibleCredit } =  state;

    const maxLoanSize = (moneyCalculator.structured().income - loans) * 12;
    let loanTakingTab;

    if (maxLoanSize <= 0) {
      loanTakingTab = <div>Вы больше не можете брать займы. Выплатите предыдущие займы!</div>
    } else {
      loanTakingTab = (
        <div>
          <Range min={0} max={maxLoanSize} onDrag={onDrag} />
          {takeLoan(possibleCredit)}
        </div>
      )
    }

    return (
      <div>
        <div>На вашем счету: {round(state.money)}$</div>
        {loanTakingTab}
        {loanStatusTab}
        {this.renderIncome(state)}
        {this.renderExpenses(state)}
      </div>
    )
  };

  renderExpenses = state => {
    const expenses = state.products.map((p, i) => productStore.getProductExpensesStructure(i));

    return <Expenses expenses={expenses} />;
  };

  renderSchedule = state => {
    return <Schedule />;
  };

  renderStaff = state => {
    return <Staff />;
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
        body = this.renderEconomy(state);
        break;
      case GAME_MODE_PRODUCTS:
        body = this.renderProducts(state);
        break;
      case GAME_MODE_STAFF:
        body = this.renderStaff(state);
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
      <div className={s.background}>
        <ModalTab />
        <div className={s.wrapper}>
          <Menu
            pauseGame={this.pauseGame}
            increaseGameSpeed={this.increaseGameSpeed}
            onRenderProjectsMenu={this.onRenderProjectsMenu}
            onRenderEconomicsMenu={this.onRenderEconomicsMenu}
            onRenderStaffMenu={this.onRenderStaffMenu}
          />
          <br />
          <hr />
          {this.renderSchedule(state)}

          {body}
          <br />
          <hr />
        </div>
      </div>
    );
  }
}

export default withStyles(Game, s);
