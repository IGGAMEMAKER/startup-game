import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import round from '../../../../helpers/math/round';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

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
    onExpertisePressed
  }, {}) {
    // const { idea } = product;
    //
    // const debt = product.KPI.debt;
    //
    // const rating = round(productStore.getRatingForMetricsTab(id));
    //
    // let expertise = productStore.getXP(id);
    // // const churn = percentify(productStore.getChurnRate(id));
    // const churn = productStore.getChurnRate(id).pretty;
    // const disloyalClients = productStore.getDisloyalClients(id);
    // const conversion = productStore.getConversionRate(id).pretty;
    // const clients = productStore.getClients(id);
    const income = round(productStore.getProductIncome(id));

    // const hype = productStore.getHypeValue(id);
    //
    // const newbies = productStore.getNewClients(id);
    //
    // let canShowRatingTab = productStore.getRatingForMetricsTab(id) != 0;
    // let canShowChurnTab = !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    //
    // let canShowPayingPercentage = !!productStore.getFeatureStatus(id, 'payment', 'mockBuying');
    // // let canShowPayingPercentage = !!productStore.getFeatureStatus(id, 'analytics', 'paymentAnalytics');
    // let canShowClientsTab =
    //   !!productStore.getFeatureStatus(id, 'analytics', 'webvisor') ||
    //   !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    // let canShowNewClientsTab =
    //   !!productStore.getFeatureStatus(id, 'analytics', 'webvisor') ||
    //   !!productStore.getFeatureStatus(id, 'analytics', 'segmenting');
    let canShowIncomeTab = !!productStore.getFeatureStatus(id, 'analytics', 'paymentAnalytics');
    // //
    // let ratingTab;
    // canShowRatingTab = true;
    // if (canShowRatingTab) {
    //     // <span className="metric-link" onClick={onRatingPressed}>Улучшить</span>
    //   ratingTab = <li>
    //     <b>Рейтинг: <ColoredRating rating={rating} /></b>
    //   </li>
    // } else {
    //   ratingTab = <li><b>Рейтинг: ???</b></li>;
    // }
    //
    // let churnTab;
    // canShowChurnTab = false;
    // if (canShowChurnTab) {
    //   churnTab = <li><b>Отток клиентов: {churn}% ({disloyalClients})</b>
    //     <span className="metric-link" onClick={onClientsPressed}>Улучшить</span>
    //   </li>;
    // }
    //
    // let newClientsTab;
    // if (canShowNewClientsTab) {
    //   newClientsTab = <li>
    //     <b>Новые клиенты: {newbies}</b>
    //   </li>
    // }
    //
    // let payingPercentageTab;
    // canShowPayingPercentage = false;
    // // if (canShowPayingPercentage) {
    // //   payingPercentageTab = <li>
    // //     <b>Платёжеспособность: {conversion}%</b>
    // //   </li>;
    // // } else {
    // //   payingPercentageTab = <li>
    // //     <b>Платёжеспособность: ???</b>
    // //     <span className="metric-link" onClick={onPaymentsPressed}>Разблокировать эту метрику</span>
    // //   </li>;
    // // }
    //
    // let clientsTab;
    // canShowClientsTab = true;
    // if (canShowClientsTab) {
    //     // <span className="metric-link" onClick={onClientsPressed}>Привлечь клиентов</span>
    //   clientsTab = <li>
    //     <b>Клиенты: {clients}</b>
    //   </li>
    // }
    //
    //
    // let expertiseTab = <li>
    //   {UI.icons.XP}
    //   <b>Экспертиза: {expertise}XP</b>
    //   <span className="metric-link" onClick={onExpertisePressed}>Повысить</span>
    // </li>;
    //
    // expertiseTab = '';
    //
    // let hypeTab = <li>
    //   <b>HYPE: {hype}</b>
    // </li>;

    let incomeTab;
    canShowIncomeTab = true;
    if (canShowIncomeTab) {
      if (stageHelper.canShowPaymentsTab()) {
          // <span className="metric-link" onClick={onPaymentsPressed}>Повысить</span>
        incomeTab = <li>
          <b>Ежемесячный доход: {income}$</b>
        </li>
      }
    }
    // {ratingTab}
    // {expertiseTab}
    // {clientsTab}
    // {churnTab}
    //
    // {hypeTab}
    return (
      <div>
        <div>
          <ul>


            {incomeTab}
          </ul>
        </div>
      </div>
    );
  }
};
