import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import round from '../../../../helpers/math/round';

import moneyCalculator from '../../../../helpers/economics/money-difference';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

type PropsType = {};

type StateType = {};

import stageHelper from '../../../../helpers/stages';

export default class Metrics extends Component {
  render({ id }, {}) {
    const income = round(productStore.getProductIncome(id));

    const data = moneyCalculator.structured(id);

    const productIncome = data.byProductIncome
      // .filter(p => p.income > 0)
      .map(p => <div>{p.name}: {Math.floor(p.income)}$</div>);

    const outgoingRents = productStore.getRentIncomes(id).outgoingRents;

    const outgoingRentsIncome = outgoingRents.map(r => r.price).reduce((p, c) => p + c, 0);
    const rentIncomeList = outgoingRents
      .map(r => <li>Аренда технологии "{r.techName}" компанией "{r.acceptorName}" за {r.price}$</li>);


    const teamExpenses = data.teamExpenses;
    const rentExpenses = productStore.getRentExpenses(id).incomingRents;

    const incomingRentsIncome = rentExpenses.map(r => r.price).reduce((p, c) => p + c, 0);

    const rentList = rentExpenses
      .map(r => (<li>Аренда технологии "{r.techName}" у компании "{r.senderName}" за {r.price}$</li>) );

    return (
      <div>
        <div>
          <ul>
            <li>
              <b>Ежемесячный доход: {income}$</b>
            </li>
            <ul>
              <li>{productIncome}</li>
            </ul>
            <ul>
              <li>Аренда технологий: {outgoingRentsIncome}$</li>
              <ul>{rentIncomeList}</ul>
            </ul>
            <li>Ежемесячные расходы: {data.expenses}$</li>
            <ul>
              <li>Аренда технологий: {incomingRentsIncome}$</li>
              <ul>{rentList}</ul>
              <li>Команда: {teamExpenses}$</li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
};
