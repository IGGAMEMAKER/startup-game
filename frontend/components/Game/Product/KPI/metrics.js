import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import coloringRange from '../../../../helpers/coloring-range';
import percentify from '../../../../helpers/math/percentify';
import round from '../../../../helpers/math/round';

type PropsType = {};

type StateType = {};

export default class Metrics extends Component {
  render({
    product,
    id,
    onRatingPressed,
    onClientsPressed,
    onPaymentsPressed,
    onAdsPressed
  }, {}) {
    const { idea } = product;

    const debt = product.KPI.debt;

    const rating = round(productStore.getRatingForMetricsTab(id));

    const ratingColor = coloringRange.standard(rating, 10);

    // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
    const churn = percentify(productStore.getChurnRate(id));
    const disloyalClients = productStore.getDisloyalClients(id);
    const conversion = percentify(productStore.getConversionRate(id));
    const clients = productStore.getClients(id);
    const income = round(productStore.getProductIncome(id));
    const virality = round(productStore.getViralityRate(id));
    const viralClients = productStore.getViralClients(id);

    const newbies = productStore.getNewClients(id);

    let canShowRatingTab = productStore.getRatingForMetricsTab(id) != 0;
    let canShowChurnTab = !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowViralityTab = !!productStore.getFeatureStatus(id, 'analytics', 'shareAnalytics');
    let canShowPayingPercentage = !!productStore.getFeatureStatus(id, 'analytics', 'paymentAnalytics');
    let canShowClientsTab =
      !!productStore.getFeatureStatus(id, 'analytics', 'webvisor') ||
      !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowNewClientsTab =
      !!productStore.getFeatureStatus(id, 'analytics', 'webvisor') ||
      !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowIncomeTab = !!productStore.getFeatureStatus(id, 'analytics', 'paymentAnalytics');

    let ratingTab;
    canShowRatingTab = true;
    if (canShowRatingTab) {
      ratingTab = <li>
        <b>Рейтинг: <span style={{ color: ratingColor }}>{rating}</span>/10</b>
        <span className="metric-link" onClick={onRatingPressed}>Улучшить</span>
      </li>
    } else {
      ratingTab = <li><b>Рейтинг: ???</b></li>;
    }

    let churnTab;
    if (canShowChurnTab) {
      churnTab = <li><b>Отток клиентов: {churn}% ({disloyalClients})</b>
        <span className="metric-link" onClick={onClientsPressed}>Улучшить</span>
      </li>;
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
    canShowClientsTab = true;
    if (canShowClientsTab) {
      clientsTab = <li>
        <b>Клиенты: {clients}</b>
        <span className="metric-link" onClick={onAdsPressed}>Привлечь клиентов</span>
      </li>
    }

    let incomeTab;
    canShowIncomeTab = true;
    if (canShowIncomeTab) {
      incomeTab = <li>
        <b>Ежемесячный доход: {income}$</b>
        <span className="metric-link" onClick={onPaymentsPressed}>Повысить</span>
      </li>
    }

    return (
      <div>
        <div>
          <ul>
            {ratingTab}
            {clientsTab}
            {churnTab}

            {viralityTab}

            {payingPercentageTab}
            {incomeTab}
          </ul>
        </div>
      </div>
    );
  }
};
