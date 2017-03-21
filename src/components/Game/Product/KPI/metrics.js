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

    const rating = round(computeRating(product));

    // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
    const churn = percentify(productStore.getChurnRate(id));
    const disloyalClients = productStore.getDisloyalClients(id);
    const conversion = percentify(productStore.getConversionRate(id));
    const clients = productStore.getClients(id);
    const income = round(productStore.getProductIncome(id));
    const virality = round(productStore.getViralityRate(id));
    const viralClients = productStore.getViralClients(id);

    const newbies = productStore.getNewClients(id);

    const canShowRatingTab = true;
    const canShowChurnTab = true;
    const canShowViralityTab = true;
    const canShowPayingPercentage = false;
    const canShowClientsTab = true;
    const canShowNewClientsTab = true;
    const canShowIncomeTab = true;

    let ratingTab;
    if (canShowRatingTab) {
      ratingTab = <li><b>Рейтинг: {rating}</b></li>;
    }

    let churnTab;
    if (canShowChurnTab) {
      churnTab = <li><b>Отток клиентов: {churn}% ({disloyalClients})</b></li>;
    }

    let viralityTab;
    if (canShowViralityTab) {
      viralityTab = <li>
        <b>Виральность: {virality} ({viralClients})</b>
      </li>
    }

    let newClientsTab;
    if (canShowNewClientsTab) {
      newClientsTab = <li>
        <b>Новые клиенты: {newbies}</b>
      </li>
    }

    let payingPercentageTab;
    if (canShowPayingPercentage) {
      payingPercentageTab = <li>
        <b>Процент платящих: {conversion}%</b>
      </li>;
    }

    let clientsTab;
    if (canShowClientsTab) {
      clientsTab = <li>
        <b>Клиенты: {clients}</b>
      </li>
    }

    let incomeTab;
    if (canShowIncomeTab) {
      incomeTab = <li>
        <b>Ежемесячный доход: {income}$</b>
      </li>
    }

    return (
      <div>
        <div>
          <ul>
            {ratingTab}
            {churnTab}
            {viralityTab}
            {newClientsTab}
            {payingPercentageTab}
            {clientsTab}
            {incomeTab}
          </ul>
        </div>
      </div>
    );
  }
};
