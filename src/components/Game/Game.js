// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import ProductMenu from '../Game/ProductMenu';
import DevelopPanel from '../Game/Product/DevelopPanel/develop-panel';
import * as IDEAS from '../../constants/products/ideas';

import store from '../../stores/product-store';

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
    }]
  };

  componentWillMount() {
    this.getProductsFromStore();

    store.addChangeListener(() => {
      this.setState({
        products: store.getProducts()
      });
    });
  }

  getProductsFromStore = () => {
    this.setState({
      products: store.getProducts()
    });
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
      <div>
        <ProductMenu key={i} a="1" product={p} i={i} />
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

  renderEconomy = state => {
    return (
      <div>
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

  renderDevelopMode = product => {
    return <DevelopPanel product={product} />;
  };

  render(props: PropsType) {
    const state = this.state;
    //        {this.renderSkills(state)}

    return (
      <div style={{padding: '15px'}}>
        <br />
        <hr />
        {this.renderEconomy(state)}
        <hr />
        <br />
        {this.renderProducts(state)}
        <br />
        <hr />
        {state.products.length === 0 ? '' : this.renderDevelopMode(state.products[0])}
        <br />
        <hr />
      </div>
    );
  }
}
