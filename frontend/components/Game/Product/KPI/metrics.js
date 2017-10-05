import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import round from '../../../../helpers/math/round';

import moneyCalculator from '../../../../helpers/economics/money-difference';

import shortenValue from '../../../../helpers/math/shorten-value';

export default class Metrics extends Component {
  render({ id }, {}) {
    const income = round(productStore.getProductIncome(id));

    const data = moneyCalculator.structured(id);

    const productIncome = data.byProductIncome
      .map(p => <div>{p.name}: {shortenValue(p.income)}$</div>);

    const teamExpenses = data.teamExpenses;

    return (
      <div>
        <div>
          <ul>
            <li>
              <b>Доходы: {shortenValue(income)}$</b>
            </li>
            <ul>
              <li>{productIncome}</li>
            </ul>
            <li>
              <b>Расходы: {shortenValue(data.expenses)}$</b>
            </li>
            <ul>
              <li>Команда: {shortenValue(teamExpenses)}$</li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
};
