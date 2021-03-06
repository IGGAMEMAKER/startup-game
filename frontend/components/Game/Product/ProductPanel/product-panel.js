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

  getDevelopmentFeatureList() {
    return [
      { name: 'backups', description: ''},
      { name: 'clusters', description: ''},
      { name: 'tests', description: ''},
      { name: 'mobiles', description: ''} // ios android apps
    ];
  };

  setMode = (mode) => {
    stats.saveAction('navigation', { mode });

    this.setState({ mode });
  };

  renderHypothesisTab = (id) => {
    if (!stageHelper.canShowHypothesisTab()) return '';

    const improvements = productStore.getImprovementChances(id);

    const improveTab = this.plainifySameTypeFeatures(id, 'analytics', 'Блок аналитики полностью улучшен!');

    return (
      <div>
        <div className="featureGroupTitle">Аналитика</div>
        <div className="featureGroupDescription">
          <div className="smallText">Аналитика даёт возможность лучше узнать о потребностях ваших клиентов.</div>
          <div className="smallText">
            <div>Каждый месяц вы получаете {improvements.middle} XP</div>
          </div>
        </div>
        <br />
        <div>{improveTab}</div>
        <br />
      </div>
    )
  };

  plainifySameTypeFeatures(id, groupType, onImprovedPhrase) {
    let featureList;

    switch (groupType) {
      case 'marketing': featureList = productStore.getMarketingFeatureList(id); break;
      case 'payment':   featureList = productStore.getPaymentFeatures(id); break;
      case 'analytics': featureList = productStore.getHypothesisAnalyticsFeatures(id); break;
    }

    let unlockedFeature = '';
    featureList.forEach(f => {
      if (!productStore.getFeatureStatus(id, groupType, f.name) && !unlockedFeature) {
        unlockedFeature = f.name;
      }
    });

    if (!unlockedFeature) return onImprovedPhrase;

    const feature = featureList.find(f => f.name === unlockedFeature);

    return this.renderFeature(groupType, id, feature);
  }

  renderMarketingTab = (id) => {
    const support = productStore.getPointModificationStructured(id).marketing();

    const influences = support.detailed.markets
      .map(c => <li>Влияние на рынке {c.name}: {c.cost}MP</li>);

    let marketsTab = productStore.getMarkets(id)
      .map((m, mId) => <Market id={id} marketId={mId} market={m} />);

    return <div>
      <div className="featureGroupTitle">Маркетинг</div>

      <div>
        <div>Наши маркетологи производят: {support.increase}MP в месяц</div>
        <div className={support.decrease ? '' : 'hide'}>
          <div>Ежемесячная стоимость поддержки: {support.decrease}MP</div>
          <ul className="offset-mid">{influences}</ul>
        </div>

        <div className={support.needToHireWorker ? '' : 'hide'}>
          <div className="alert alert-danger">
            <strong>Наши маркетологи не справляются с нагрузкой</strong>
            <div>(мы теряем {support.diff}MP ежемесячно)</div>
            <br />
            <UI.Button secondary text="Нанять маркетолога" onClick={() => this.setMode(MODE_STAFF)} />
          </div>
        </div>
        <br />
      </div>

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

  renderFeatureSupportCost(feature) {
    if (!feature.support) return '';

    const { support } = feature;

    let money;
    let mp;
    let pp;

    if (support.money) money = `${support.money}$/мес `;
    if (support.marketing) mp = `${support.marketing}MP/мес `;
    if (support.programming) pp = `${support.programming}PP/мес `;

    if (!money && !mp && !pp) {
      return <div></div>;
    }

    return <div>Стоимость поддержки - {mp} {pp} {money}</div>;
  };

  renderFeature = (featureGroup, id, feature) => {
    const featureName = feature.name;

    const key = `feature-${featureGroup}-${featureName}`;

    const standardPoints = feature.points;
    const mp = standardPoints.marketing || 0;
    const pp = standardPoints.programming || 0;
    const points = productStore.getPoints(id);

    const enoughPointsToUpgrade = points.marketing >= mp && points.programming >= pp;


    const description = feature.description || '';
    const userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;

    const mpColors = points.marketing < mp ? "noPoints": "enoughPoints";
    const ppColors = points.programming < pp ? "noPoints": "enoughPoints";

    const upgradeFeature = () => {
      productActions.spendPoints(pp, mp);
      productActions.improveFeatureByPoints(id, featureGroup, featureName);
    };

    return (
      <div key={key} className="content-block">
        {userOrientedFeatureName}
        <br />
        <div className="featureDescription">
          <div>{description}</div>
          <br />
          <div>
            <div>
              <span>Стоимость улучшения - &nbsp;</span>
              {mp > 0 ? <span className={mpColors}>{mp}MP&nbsp;</span> : ''}
              {pp > 0 ? <span className={ppColors}>{pp}PP</span> : ''}
            </div>
            <div>{this.renderFeatureSupportCost(feature)}</div>
          </div>
          <UI.Button
            text="Улучшить"
            disabled={!enoughPointsToUpgrade}
            onClick={upgradeFeature}
            secondary
          />
        </div>
        <hr width="60%" />
      </div>
    )
  };

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

    let staff;
    staff = this.renderNavbar(MODE_STAFF, 'Команда');

    return (
      <ul className="nav nav-tabs">
        {improvements}
        {clients}
        {competitors}
        {staff}
        {hypothesis}
        {bonuses}
      </ul>
    );
  };

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

  render({ product, gamePhase }, state) {
    const id = 0;
    logger.shit('develop-panel.js fix productID id=0'); // TODO FIX PRODUCT ID=0

    let body = '';
    switch (state.mode) {
      case MODE_MARKETING:
        body = this.renderMarketingTab(id);
        break;

      case MODE_STAFF:
        body = this.renderStaffPanel();
        break;

      case MODE_MAIN_FEATURES:
        body = <div>
          <MainFeatureTab
            id={id}
            product={product}
            onHireProgrammerClick={() => this.setMode(MODE_STAFF)}
          />
        </div>;
        break;

      case MODE_COMPETITORS:
        body = <div>
          {this.renderOurCostStructured(id)}
          <Competitors id={id} />
        </div>;
        break;

      case MODE_BONUSES:
        body = this.renderBonusesTab(id);
        break;

      default:
        body = this.renderHypothesisTab(id);
        break;
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
