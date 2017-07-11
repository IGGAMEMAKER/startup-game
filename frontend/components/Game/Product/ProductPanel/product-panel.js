import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Staff from '../../Staff';

import Employees from '../../Team/Employees';
import Economics from '../../Economics/Economics';
import Bonuses from '../../Product/Bonuses/list';


import Metrics from '../KPI/metrics';
import UI from '../../../UI';

import pointSaldoHelper from '../../../../helpers/points/modification';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import logger from '../../../../helpers/logger/logger';

import AdsPanel from '../Ads/advert-planner-panel';
import MainFeatureTab from '../MainFeature';

import stageHelper from '../../../../helpers/stages';

import Competitors from '../Ads/competitors';
import Segment from '../ClientPanel/segment';

import stats from '../../../../stats';

import Product from '../../../../classes/Product';

import coloringRange from '../../../../helpers/coloring-range';


const MODE_RATING = 'MODE_RATING';
const MODE_HYPOTHESIS = 'MODE_HYPOTHESIS';
const MODE_ADS = 'MODE_ADS';
const MODE_MARKETING = 'MODE_MARKETING';
const MODE_PAYMENTS = 'MODE_PAYMENTS';
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
      case 'marketing':
        featureList = productStore.getMarketingFeatureList(id);
        break;

      case 'payment':
        featureList = productStore.getPaymentFeatures(id);
        break;

      case 'analytics':
        featureList = productStore.getHypothesisAnalyticsFeatures(id);
        break;
    }

    let unlockedFeature;
    featureList.forEach(f => {
      if (!productStore.getFeatureStatus(id, groupType, f.name) && !unlockedFeature) {
        unlockedFeature = f.name;
      }
    });

    if (!unlockedFeature) return onImprovedPhrase;

    let feature = featureList.filter(f => f.name === unlockedFeature);

    return feature.map(this.renderFeature(groupType, id));
  }

  renderPaymentTab = (id) => {
    const payment = this.plainifySameTypeFeatures(id, 'payment', 'Блок монетизации полностью улучшен!');

    const isOpened = productStore.canShowPayPercentageMetric(id);
    const conversion = productStore.getConversionRate(id).pretty;

    const payAbility = Math.ceil(conversion * 10);

    const makeImprovementPhrase = 'Установите фичу "Тестовая покупка"';
    const payAbilityPhrase = `Платёжеспособность: ${isOpened ? `${payAbility}%` : makeImprovementPhrase}`;

    return (
      <div>
        <div className="content-block">
          <div className="featureGroupTitle">Монетизация</div>
          <div className="featureGroupDescriptionWrapper">
            <div>{payAbilityPhrase}</div>
            <div className="featureGroupDescription">Позволяет повысить доходы с продаж</div>
            <div className="featureGroupBody">{payment}</div>
          </div>
        </div>
        <Economics />
      </div>
    )
  };

  renderSegmentTab(id) {
    if (!stageHelper.canShowSegments()) return '';

    const segmentList = productStore.getSegments(id).map((s, i) => <Segment productId={id} segment={s} id={i} />);

    return (
      <div>
        <div className="client-segment-header">Группы пользователей</div>
        <div>{segmentList}</div>
      </div>
    )
  }

  renderClientTab = (id, product) => {
    const churn = productStore.getChurnRate(id).pretty;
    const disloyalClients = productStore.getDisloyalClients(id);

    const market = productStore.getMarketShare(id);

    const adTab = this.renderAdTab(id, product);

    let churnFeatures = '';
    if (stageHelper.canShowChurnFeatures()) {
      const marketing = this.plainifySameTypeFeatures(id, 'marketing', 'Блок маркетинга полностью улучшен!');

      churnFeatures = <div className="featureGroupDescriptionWrapper">
        <div className="featureGroupBody">{marketing}</div>
      </div>
    }

    let clientTab;
    if (stageHelper.canShowAdTab()) {
      clientTab = <div className="content-block">
        <div className="featureGroupTitle">Работа с клиентами</div>
        <div>Наши клиенты: {market.clients}</div>
        <br />
        <div>Каждый месяц мы теряем {disloyalClients} клиентов (отток: {churn}%)</div>
        {churnFeatures}
        <br />
      </div>
    }

    const support = pointSaldoHelper.marketing();
    let supportCostTab;

    supportCostTab = <div>
      <div>Наши маркетологи производят: {support.increase}MP в месяц</div>
      <div className={support.decrease ? '' : 'hide'}>
        <div>Ежемесячная стоимость поддержки: {support.decrease}MP</div>
        <ul className="offset-mid">
          <li>Затраты на блог: {support.detailed.blog}MP</li>
          <li>Затраты на техподдержку: {support.detailed.support}MP</li>
        </ul>
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
    </div>;

    return (
      <div>
        <div className="featureGroupTitle">Маркетинг</div>
        {supportCostTab}
        {adTab}
        {clientTab}
      </div>
    );
  };

  renderAdTab = (id, product) => {
    if (!stageHelper.canShowAdTab()) return '';

    return (
      <div>
        <br />
        <b>Рекламная кампания</b>
        <AdsPanel product={product} id={id} />
        <br />
      </div>
    );
  };

  renderMetrics = (id, product) => {
    if (!stageHelper.canShowMetricsTab()) return '';

    return (
      <div>
        <div>
          <b>Развитие продукта "{product.name}"</b>
          <div>Описание продукта: {productStore.getDescriptionOfProduct(id)}</div>
        </div>
        <br />
        <b>Основные показатели продукта</b>
        <Metrics
          product={product}
          id={id}
          onRatingPressed={() => this.setMode(MODE_MAIN_FEATURES)}
          onClientsPressed={() => this.setMode(MODE_MARKETING)}
          onPaymentsPressed={() => this.setMode(MODE_PAYMENTS)}
          onAdsPressed={() => this.setMode(MODE_ADS)}
          onExpertisePressed={() => this.setMode(MODE_HYPOTHESIS)}
        />
      </div>
    );
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
    const hypeDampingStructured = productStore.getHypeDampingStructured(id);
    const bonusesAmount = productStore.getBonusesAmount(id);

    const {
      blogRange,
      churnRange,
      techRange,
      base,
      blog,
      tech,
      churn,
      percent
    } = hypeDampingStructured;

    const blogStyleColor = coloringRange.ranged(-blog, blogRange[0], blogRange[1]);
    const techStyleColor = coloringRange.ranged(-tech, techRange[0], techRange[1]);
    const churnStyleColor = coloringRange.ranged(churn, churnRange[1], churnRange[0]);

    return <div>
      <div className="content-block">
        <div>Ежемесячное снижение известности (HYPE): {percent}%</div>
        <ul>
          <li>Базовое значение: {base}%</li>
          <li style={`color: ${blogStyleColor}`}>От блога: {blog}%</li>
          <li style={`color: ${churnStyleColor}`}>От рейтинга: {churn}%</li>
          <li style={`color: ${techStyleColor}`}>Технологическое лидерство: {tech}%</li>
        </ul>
      </div>
      <Bonuses productId={id} bonusesAmount={bonusesAmount} />
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

    return <div>Стоимость поддержки (ежемесячно) - {mp} {pp} {money}</div>;
  };

  renderFeature = (featureGroup, id, onUpgraded) => (feature, i) => {
    logger.shit('hardcoded companyId=0 in renderFeature in product-panel');

    const companyId = 0;
    const featureName = feature.name;

    const key = `feature${featureGroup}${featureName}${i}`;

    const standardPoints = feature.points || {};
    const mp = standardPoints.marketing || 0;
    const pp = standardPoints.programming || 0;
    const points = productStore.getPoints(companyId);

    const enoughPointsToUpgrade = points.marketing >= mp && points.programming >= pp;

    const upgradeFeature = event => {
      if (enoughPointsToUpgrade) {
        productActions.spendPoints(pp, mp);
        productActions.improveFeatureByPoints(id, featureGroup, featureName);

        if (featureGroup === 'analytics' && stageHelper.isInstallPrimitiveAnalyticsMission()) {
          stageHelper.onInstallPrimitiveAnalyticsMissionCompleted();
        }

        if (onUpgraded) {
          onUpgraded();
        }
      }
    };

    const description = feature.description || '';

    const userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;

    const mpColors = points.marketing < mp ? "noPoints": "enoughPoints";
    const ppColors = points.programming < pp ? "noPoints": "enoughPoints";

    return (
      <div key={key}>
        {userOrientedFeatureName}
        <br />
        <div className="featureDescription">
          <div>{description}</div>
          <br />
          <div>
            <div>
              Стоимость улучшения - &nbsp;
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

    let payments;
    if (stageHelper.canShowPaymentsTab()) {
      payments = this.renderNavbar(MODE_PAYMENTS, 'Монетизация');
    }

    let ads;
    ads = this.renderNavbar(MODE_ADS, 'Реклама');

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
      bonuses = this.renderNavbar(MODE_BONUSES, 'Бонусы');
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
        {payments}
        {bonuses}
      </ul>
    );
  };

  renderOurCostStructured(id) {
    if (!stageHelper.canShowCompetitorsTab()) return '';

    const ourCompanyCost = productStore.getCompanyCostStructured(id);

    return <div>
      <div>Наша рыночная стоимость: {ourCompanyCost.cost}$</div>
      <div>На нашу стоимость влияет количество клиентов и развитие технологий</div>
      <ul>
        <li>От технологий ({ourCompanyCost.technologyPart}%): {ourCompanyCost.technologyValue}$</li>
        <li>От клиентов ({ourCompanyCost.clientPart}%): {ourCompanyCost.clientValue}$</li>
      </ul>
    </div>
  }

  render({ product, gamePhase }, state) {
    const { mode } = state;

    const id = 0;
    logger.shit('develop-panel.js fix productID id=0'); // TODO FIX PRODUCT ID=0

    let body = '';
    switch (mode) {
      case MODE_PAYMENTS:
        body = this.renderPaymentTab(id);
        break;

      case MODE_MARKETING:
        body = this.renderClientTab(id, product);
        break;

      case MODE_ADS:
        body = this.renderAdTab(id, product);
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
          {this.renderSegmentTab(id)}
        </div>;
        break;

      case MODE_COMPETITORS:
        body = (
          <div>
            {this.renderOurCostStructured(id)}
            <Competitors id={id} />
          </div>
        );
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
      </div>
    );
  }
}
