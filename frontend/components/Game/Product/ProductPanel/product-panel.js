import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import MainFeatureTab from '../MainFeature/list';
import Metrics from '../KPI/metrics';
import Competitors from '../Ads/competitors';
import Market from '../../Product/Markets/market';

import shortenValue from '../../../../helpers/math/shorten-value';
import stageHelper from '../../../../helpers/stages';
import logger from '../../../../helpers/logger/logger';



const MODE_MARKETING = 'MODE_MARKETING';
const MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
const MODE_COMPETITORS = 'MODE_COMPETITORS';
const MODE_MONEY = 'MODE_MONEY';

export default class ProductPanel extends Component {
  renderMarketingTab = (id) => {
    let marketsTab = [];

    let hasUnexploredMarkets = false;

    productStore.getMarkets(id)
      .forEach((m, mId) => {
        const explored = productStore.isExploredMarket(id, mId);

        if (!hasUnexploredMarkets) {
          marketsTab.push(<Market id={id} marketId={mId} market={m} explored={explored} />);
        }

        if (!explored) {
          hasUnexploredMarkets = true;
        }
      });

    return <div>{marketsTab}</div>;
  };

  renderMetrics = (id, product) => {
    if (!stageHelper.canShowMetricsTab()) return '';

    return <div>
      <div>
        <b>Развитие продукта "{product.name}"</b>
        <div>Описание продукта: {productStore.getDescriptionOfProduct(id)}</div>
      </div>
      <br />
      <div className="content-block">
        <b>Основные показатели продукта (ежемесячно)</b>
        <Metrics id={id} />
      </div>
      <div className="content-block">
        {this.renderOurCostStructured(id)}
      </div>
    </div>;
  };

  renderCompetitorsTab(id) {
    return <Competitors />;
  }

  renderOurCostStructured(id) {
    if (!stageHelper.canShowCompetitorsTab()) return '';

    const ourCompanyCost = productStore.getCompanyCostStructured(id);

    return <div>
      <div>Наша рыночная стоимость: {shortenValue(ourCompanyCost.cost)}$</div>
      <div>На нашу стоимость влияет развитие технологий и наши доходы</div>
      <ul>
        <li>От технологий ({ourCompanyCost.technologyPart}%): {shortenValue(ourCompanyCost.technologyValue)}$</li>
        <li>От доходов ({ourCompanyCost.economicPart}%): {shortenValue(ourCompanyCost.economicValue)}$</li>
      </ul>
    </div>
  }

  renderDevTab(id, product) {
    return <MainFeatureTab id={id} product={product} />;
  }

  render({ product, gamePhase, mode }, state) {
    const id = 0;

    let body = '';
    switch (mode) {
      case MODE_MARKETING: body = this.renderMarketingTab(id); break;

      case MODE_MAIN_FEATURES: body = this.renderDevTab(id, product); break;

      case MODE_COMPETITORS: body = this.renderCompetitorsTab(id); break;

      case MODE_MONEY: body = this.renderMetrics(id, product); break;
    }

    return (
      <div className="product-panel-body">
        {body}
      </div>
    );
  }
}
