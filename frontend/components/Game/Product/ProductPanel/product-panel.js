import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Staff from '../../Staff';

import Employees from '../../Team/Employees';
import Bonuses from '../../Product/Bonuses/list';


import Metrics from '../KPI/metrics';

import productStore from '../../../../stores/product-store';

import logger from '../../../../helpers/logger/logger';

import MainFeatureTab from '../MainFeature/list';

import stageHelper from '../../../../helpers/stages';

import Competitors from '../Ads/competitors';

import stats from '../../../../stats';


import Market from '../../Product/Markets/market';

import shortenValue from '../../../../helpers/math/shorten-value';


const MODE_RATING = 'MODE_RATING';
const MODE_HYPOTHESIS = 'MODE_HYPOTHESIS';
const MODE_MARKETING = 'MODE_MARKETING';
const MODE_ANALYTICS = 'MODE_ANALYTICS';
const MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
const MODE_COMPETITORS = 'MODE_COMPETITORS';
const MODE_BONUSES = 'MODE_BONUSES';
const MODE_STAFF = 'MODE_STAFF';
const MODE_MONEY = 'MODE_MONEY';

export default class ProductPanel extends Component {
  state = {
    mode: MODE_MARKETING
  };

  setMode = (mode) => {
    stats.saveAction('navigation', { mode });

    this.setState({ mode });
  };

  renderMarketingTab = (id) => {
    let marketsTab = productStore.getMarkets(id)
      .map((m, mId) => {
        const explored = productStore.isExploredMarket(id, mId);

        return <Market
          id={id}
          marketId={mId}
          market={m}
          explored={explored}
        />
      });

    return <div>
      {marketsTab}
    </div>;
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

  renderStaffPanel() {
    return (
      <div>
        <Staff />
        <br />
        <div className="staff-group-title">Найм сотрудников</div>
        <Employees />
      </div>
    )
  }

  renderBonusesTab(id) {
    return <div>
      <Bonuses productId={id} bonusesAmount={productStore.getBonusesAmount(id)} />
    </div>;
  }

  renderNavbar = (mode, name) => {
    return (
      <li
        className={`product-menu-toggler ${this.state.mode === mode ? 'active' : ''}`}
        onClick={() => this.setMode(mode)}
      >
        <span>{name}</span>
      </li>
    );
  };

  renderProductMenuNavbar = () => {
    let hypothesis;
    if (stageHelper.canShowHypothesisTab()) {
      hypothesis = this.renderNavbar(MODE_HYPOTHESIS, 'Аналитика');
    }
    hypothesis = '';

    let improvements;
    if (stageHelper.canShowMainFeatureTab()) {
      improvements = this.renderNavbar(MODE_MAIN_FEATURES, 'Разработка');
    }

    let clients;
    // if (stageHelper.canShowClientsTab()) {
    clients = this.renderNavbar(MODE_MARKETING, 'Маркетинг');
    // }

    let competitors;
    if (stageHelper.canShowCompetitorsTab()) {
      competitors = this.renderNavbar(MODE_COMPETITORS, 'Конкуренты');
    }

    let bonuses;
    if (stageHelper.canShowBonusesTab()) {
      logger.shit('hardcoded id=0, canShowBonusesTab');

      const amount = productStore.getBonusesAmount(0);

      bonuses = this.renderNavbar(MODE_BONUSES, `Бонусы${amount > 0 ? ` (${amount})`: ''}`);
    }
    bonuses = '';

    let staff;
    // staff = this.renderNavbar(MODE_STAFF, 'Команда');

    let economics;
    if (stageHelper.canShowMetricsTab()) {
      economics = this.renderNavbar(MODE_MONEY, 'Экономика');
    }

    return (
      <ul className="nav nav-tabs">
        {improvements}
        {clients}
        {competitors}
        {staff}
        {economics}
        {bonuses}
      </ul>
    );
  };

  renderCompetitorsTab(id) {
    return <div>
      <Competitors />
    </div>;
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
    return <div>
      <MainFeatureTab
        id={id}
        product={product}
        onHireProgrammerClick={() => this.setMode(MODE_STAFF)}
      />
    </div>;
  }

  render({ product, gamePhase }, state) {
    const id = 0;

    let body = '';
    switch (state.mode) {
      case MODE_MARKETING: body = this.renderMarketingTab(id); break;

      case MODE_STAFF: body = this.renderStaffPanel(); break;

      case MODE_MAIN_FEATURES: body = this.renderDevTab(id, product); break;

      case MODE_COMPETITORS: body = this.renderCompetitorsTab(id); break;

      case MODE_BONUSES: body = this.renderBonusesTab(id); break;

      case MODE_MONEY: body = this.renderMetrics(id, product); break;

      default: body = this.renderDevTab(id, product); break;
    }

    return (
      <div>
        {this.renderProductMenuNavbar()}
        <div className="product-panel-body">
          {body}
        </div>
      </div>
    );
  }
}
