import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/store';

import round from '../../../../helpers/math/round';

import moneyCalculator from '../../../../helpers/economics/money-difference';

import shortenValue from '../../../../helpers/math/shorten-value';

export default class Metrics extends Component {
  render({ id }) {
    const income = round(productStore.getProductIncome(id));

    const data = moneyCalculator.structured(id);

    const productIncome = productStore.getMarketIncomeList(id)
      .map(item => <li>market #${item.marketId}: +{shortenValue(item.income)}$</li>);

    return (
      <div>
        <div>
          <ul>
            <li>
              <b>Доходы: {shortenValue(income)}$</b>
            </li>
            <ul>
              {productIncome}
            </ul>
            <li>
              <b>Расходы: {shortenValue(data.expenses)}$</b>
            </li>
            <ul>
              <li>Команда: {shortenValue(data.teamExpenses)}$</li>
              <li>Поддержка: {shortenValue(data.productExpenses)}$</li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
};
