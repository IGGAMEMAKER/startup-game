import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import percentify from '../../../../helpers/math/percentify';
import round from '../../../../helpers/math/round';

import ColoredRating from '../KPI/colored-rating';

type PropsType = {};

type StateType = {};

import stageHelper from '../../../../helpers/stages';

export default class Metrics extends Component {
  render({
    product,
    id,
    onRatingPressed,
    onClientsPressed,
    onPaymentsPressed,
    onAdsPressed,
    onAnalyticsPressed,
    onExpertisePressed
  }, {}) {
    const { idea } = product;

    const debt = product.KPI.debt;

    const rating = round(productStore.getRatingForMetricsTab(id));

    let expertise = productStore.getXP(id);
    // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
    // const churn = percentify(productStore.getChurnRate(id));
    const churn = productStore.getChurnRate(id).pretty;
    const disloyalClients = productStore.getDisloyalClients(id);
    const conversion = productStore.getConversionRate(id).pretty;
    const clients = productStore.getClients(id);
    const income = round(productStore.getProductIncome(id));
    const virality = round(productStore.getViralityRate(id));
    const viralClients = productStore.getViralClients(id);

    const newbies = productStore.getNewClients(id);

    let canShowRatingTab = productStore.getRatingForMetricsTab(id) != 0;
    let canShowChurnTab = !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowViralityTab = !!productStore.getFeatureStatus(id, 'analytics', 'shareAnalytics');
    let canShowPayingPercentage = !!productStore.getFeatureStatus(id, 'payment', 'mockBuying');
    // let canShowPayingPercentage = !!productStore.getFeatureStatus(id, 'analytics', 'paymentAnalytics');
    let canShowClientsTab =
      !!productStore.getFeatureStatus(id, 'analytics', 'webvisor') ||
      !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowNewClientsTab =
      !!productStore.getFeatureStatus(id, 'analytics', 'webvisor') ||
      !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowIncomeTab = !!productStore.getFeatureStatus(id, 'analytics', 'paymentAnalytics');
    //
    let ratingTab;
    canShowRatingTab = true;
    if (canShowRatingTab) {
      ratingTab = <li>
        <b>Рейтинг: <ColoredRating rating={rating} />/10</b>
        <span className="metric-link" onClick={onRatingPressed}>Улучшить</span>
      </li>
    } else {
      ratingTab = <li><b>Рейтинг: ???</b></li>;
    }

    let churnTab;
    canShowChurnTab = false;
    if (canShowChurnTab) {
      churnTab = <li><b>Отток клиентов: {churn}% ({disloyalClients})</b>
        <span className="metric-link" onClick={onClientsPressed}>Улучшить</span>
      </li>;
    }

    let viralityTab;
    if (canShowViralityTab) {
      viralityTab = <li>
        <b>Вирусность: {virality} ({viralClients})</b>
      </li>
    } else {
      viralityTab = <li>
        <b>Вирусность: ???</b>
        <span className="metric-link" onClick={onAnalyticsPressed}>Разблокировать эту метрику</span>
      </li>
    }
    viralityTab = '';

    let newClientsTab;
    if (canShowNewClientsTab) {
      newClientsTab = <li>
        <b>Новые клиенты: {newbies}</b>
      </li>
    }

    let payingPercentageTab;
    canShowPayingPercentage = false;
    // if (canShowPayingPercentage) {
    //   payingPercentageTab = <li>
    //     <b>Платёжеспособность: {conversion}%</b>
    //   </li>;
    // } else {
    //   payingPercentageTab = <li>
    //     <b>Платёжеспособность: ???</b>
    //     <span className="metric-link" onClick={onPaymentsPressed}>Разблокировать эту метрику</span>
    //   </li>;
    // }

    let clientsTab;
    canShowClientsTab = true;
    if (canShowClientsTab) {
      clientsTab = <li>
        <b>Клиенты: {clients}</b>
        <span className="metric-link" onClick={onClientsPressed}>Привлечь клиентов</span>
      </li>
    }

    let incomeTab;
    canShowIncomeTab = true;
    if (canShowIncomeTab) {
      if (stageHelper.canShowPaymentsTab()) {
        incomeTab = <li>
          <b>Ежемесячный доход: {income}$</b>
          <span className="metric-link" onClick={onPaymentsPressed}>Повысить</span>
        </li>
      }
    } else {
      incomeTab = <li onClick={onAnalyticsPressed}>Разблокировать эту метрику</li>
    }

    let expertiseTab = <li>
      <b>Экспертиза: {expertise}XP</b>
      <span className="metric-link" onClick={onExpertisePressed}>Повысить</span>
    </li>;

    return (
      <div>
        <div>
          <ul>
            {ratingTab}
            {expertiseTab}
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
