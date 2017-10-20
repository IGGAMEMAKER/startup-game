import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Staff from '../../Staff';

import Employees from '../../Team/Employees';
import Economics from '../../Economics/Economics';
import Bonuses from '../../Product/Bonuses/list';


import Metrics from '../KPI/metrics';
import UI from '../../../UI';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import logger from '../../../../helpers/logger/logger';

import MainFeatureTab from '../MainFeature';

import stageHelper from '../../../../helpers/stages';

import Competitors from '../Ads/competitors';

import stats from '../../../../stats';


import Market from '../../Product/Markets/market';


const MODE_RATING = 'MODE_RATING';
const MODE_HYPOTHESIS = 'MODE_HYPOTHESIS';
const MODE_MARKETING = 'MODE_MARKETING';
const MODE_ANALYTICS = 'MODE_ANALYTICS';
const MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
const MODE_COMPETITORS = 'MODE_COMPETITORS';
const MODE_BONUSES = 'MODE_BONUSES';
const MODE_STAFF = 'MODE_STAFF';

export default class ProductPanel extends Component {
  state = {
    mode: MODE_MARKETING
  };

  componentWillMount() {}

  setMode = (mode) => {
    stats.saveAction('navigation', { mode });

    this.setState({ mode });
  };

  renderMarketingTab = (id) => {
    let marketsTab = productStore.getMarkets(id)
      .map((m, mId) => <Market id={id} marketId={mId} market={m} />);

    return <div>
      <div className="featureGroupTitle">Маркетинг</div>
      {marketsTab}
    </div>;
  };

  renderMetrics = (id, product) => {
    if (!stageHelper.canShowMetricsTab()) return '';

    return <div>
      <br />
      <div>
        <b>Развитие продукта "{product.name}"</b>
        <div>Описание продукта: {productStore.getDescriptionOfProduct(id)}</div>
      </div>
      <br />
      <div className="content-block">
        <b>Основные показатели продукта</b>
        <Metrics id={id} />
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

    return (
      <ul className="nav nav-tabs">
        {improvements}
        {clients}
        {competitors}
        {staff}
        {bonuses}
      </ul>
    );
  };

  renderCompetitorsTab(id) {
    return <div>
      {this.renderOurCostStructured(id)}
      <Competitors />
    </div>;
  }

  renderOurCostStructured(id) {
    if (!stageHelper.canShowCompetitorsTab()) return '';

    const ourCompanyCost = productStore.getCompanyCostStructured(id);

    return <div>
      <div>Наша рыночная стоимость: {ourCompanyCost.cost}$</div>
      <div>На нашу стоимость влияет развитие технологий и наши доходы</div>
      <ul>
        <li>От технологий ({ourCompanyCost.technologyPart}%): {ourCompanyCost.technologyValue}$</li>
        <li>От доходов ({ourCompanyCost.economicPart}%): {ourCompanyCost.economicValue}$</li>
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

      default: body = this.renderDevTab(id, product); break;
    }

    const metrics = this.renderMetrics(id, product);
    const menu = this.renderProductMenuNavbar();

    return (
      <div>
        {metrics}
        {menu}
        <div className="product-panel-body">
          {body}
        </div>
        {menu}
      </div>
    );
  }
}
