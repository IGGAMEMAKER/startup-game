// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';

import computeRating from '../../../../helpers/products/compute-rating';
import percentify from '../../../../helpers/math/percentify';
import round from '../../../../helpers/math/round';

type PropsType = {};

type StateType = {};

export default class Metrics extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;
    const id = props.id;

    const { product } = props;
    const { idea } = product;

    const debt = product.KPI.debt;

    const rating = computeRating(product);

    // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
    const churn = percentify(productStore.getChurnRate(id));
    const disloyalClients = productStore.getDisloyalClients(id);
    const conversion = percentify(productStore.getConversionRate(id));
    const clients = productStore.getClients(id);
    const income = round(productStore.getProductIncome(id));
    const virality = round(productStore.getViralityRate(id));
    const viralClients = productStore.getViralClients(id);

    return (
      <div>
        <div>
          <ul>
            <li>
              <b>Рейтинг: {rating}</b>
            </li>
            <li>
              <b>Отток клиентов: {churn}% ({disloyalClients})</b>
            </li>
            <li>
              <b>Виральность: {virality} ({viralClients})</b>
            </li>
            <li>
              <b>Процент платящих: {conversion}%</b>
            </li>
            <li>
              <b>Клиенты: {clients}</b>
            </li>
            <li>
              <b>Ежемесячный доход: {income}$</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};
