import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Analysts from '../../Team/Analysts';
import Marketers from '../../Team/Marketers';
import Programmers from '../../Team/Programmers';

import Metrics from '../KPI/metrics';
import Schedule from '../../Schedule';
import UI from '../../../UI';

import * as PROFESSIONS from '../../../../constants/professions';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';

import playerStore from '../../../../stores/player-store';
import playerActions from '../../../../actions/player-actions';

import logger from '../../../../helpers/logger/logger';

import AdsPanel from '../Ads/advert-planner-panel';
import MainFeatureTab from '../MainFeature';

import stageHelper from '../../../../helpers/stages';

import Competitors from '../Ads/competitors';
import Competitor from '../Ads/competitor';
import Segment from '../ClientPanel/segment';


const MODE_METRICS = 'MODE_METRICS';
const MODE_RATING = 'MODE_RATING';
const MODE_HYPOTHESIS = 'MODE_HYPOTHESIS';
const MODE_ADS = 'MODE_ADS';
const MODE_MARKETING = 'MODE_MARKETING';
const MODE_PAYMENTS = 'MODE_PAYMENTS';
const MODE_ANALYTICS = 'MODE_ANALYTICS';
const MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
const MODE_COMPETITORS = 'MODE_COMPETITORS';
const MODE_BONUSES = 'MODE_BONUSES';

export default class ProductPanel extends Component {
  state = {
    marketing: true,
    payment: true,
    analytics: true,
    features: true,

    mode: MODE_MARKETING
  };

  componentWillMount() {}

  getDevelopmentFeatureList(idea) {
    return [
      { name: 'backups', description: ''},
      { name: 'clusters', description: ''},
      { name: 'tests', description: ''},
      { name: 'mobiles', description: ''} // ios android apps
    ];
    // ].map(computeFeatureCost(cost));
  };

  setMode = (mode) => {
    this.setState({ mode });
  };


  haveEnoughPointsToUpgrade = necessaryPoints => {
    const points = playerStore.getPoints();
    const mp = necessaryPoints.mp || 0;
    const pp = necessaryPoints.pp || 0;

    return points.marketing >= mp && points.programming >= pp;
  };

  renderHypothesisTab = (id, idea) => {
    if (!stageHelper.canShowHypothesisTab()) return '';

    const improvements = productStore.getImprovementChances(id);

    const improveTab = this.plainifySameTypeFeatures(id, idea, 'analytics', 'Блок аналитики полностью улучшен!');

    const hypothesisPoints = productStore.getHypothesisPoints(id);


    let errorDescription = '';
    if (!this.haveEnoughPointsToUpgrade(hypothesisPoints)) {
      errorDescription = 'У вас не хватает MP или PP. ' +
        'Возможно вам стоит нанять больше сотрудников или подождать до следующего месяца';
    }

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


  plainifySameTypeFeatures(id, idea, groupType, onImprovedPhrase) {
    let featureList;

    switch (groupType) {
      case 'marketing':
        featureList = productStore.getMarketingFeatureList(idea);
        break;

      case 'payment':
        featureList = productStore.getPaymentFeatures(id, idea);
        break;

      case 'analytics':
        featureList = productStore.getHypothesisAnalyticsFeatures(idea);
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

    if (groupType === 'payment' && stageHelper.isInstallPaymentModuleMission()) {
      return feature.map(this.renderFeature(groupType, id, idea, true, stageHelper.onInstallPaymentModuleMissionCompleted));
    } else {
      return feature.map(this.renderFeature(groupType, id, idea));
    }
  }

  renderPaymentTab = (id, idea) => {
    const payment = this.plainifySameTypeFeatures(id, idea, 'payment', 'Блок монетизации полностью улучшен!');

    const isOpened = productStore.canShowPayPercentageMetric(id);
    const payAbility = productStore.getConversionRate(id).pretty;

    return (
      <div>
        <div className="featureGroupTitle" >Монетизация</div>
        <div className="featureGroupDescriptionWrapper">
          <div>Платёжеспособность: {isOpened ? `${payAbility}%` : 'Установите фичу "Тестовая покупка"'}</div>
          <div className="featureGroupDescription">Позволяет повысить доходы с продаж</div>
          <div className="featureGroupBody">{payment}</div>
        </div>
      </div>
    )
  };

  renderAnalyticsTab = (id, idea) => {
    const analytics = productStore
      .getAnalyticFeatures(idea)
      .map(this.renderFeature('analytics', id, idea));

    return (
      <div>
        <div className="featureGroupTitle">Аналитика</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Позволяет быстрее улучшать главные характеристики проекта</div>
          <div className="featureGroupBody">{analytics}</div>
        </div>
      </div>
    );
  };

  renderCompetitors(id, rating) {
    if (!stageHelper.canShowCompetitorsTab()) return '';

    const competitor = productStore.getNextCompetitorInfo(id);

    if (competitor) {
      return <div>
        <div>Наш ближайший конкурент</div>
        <Competitor rating={rating} c={competitor} i={-1} />
        <br />
      </div>
    }

    return <div>Вы - №1 на рынке!</div>
  }

  renderSegmentTab(id) {
    let segments = productStore.getSegments(id);

    if (!stageHelper.canShowSegments()) {
      return '';
      // segments = [segments[0]];
    }

    const segmentList = segments.map((s, i) => <Segment productId={id} segment={s} id={i} />);

    return (
      <div>
        <div className="client-segment-header">Группы пользователей</div>
        <div>{segmentList}</div>
      </div>
    )
  }

  renderClientTab = (id, product) => {
    const { idea } = product;

    const churn = productStore.getChurnRate(id).pretty;
    const disloyalClients = productStore.getDisloyalClients(id);

    const market = productStore.getMarketShare(id);
    const ourCompanyCost = productStore.getCompanyCost(id);

    const nearestCompetitor = this.renderCompetitors(id, productStore.getRating(id));
    const segmentTab = this.renderSegmentTab(id);
    const adTab = this.renderAdTab(id, product);

    let churnFeatures = '';
    if (stageHelper.canShowChurnFeatures()) {
      const marketing = this.plainifySameTypeFeatures(id, idea, 'marketing', 'Блок маркетинга полностью улучшен!');

      churnFeatures = <div className="featureGroupDescriptionWrapper">
        <div className="featureGroupDescription">Позволяет снизить отток клиентов, повышая их лояльность</div>
        <div className="featureGroupBody">{marketing}</div>
      </div>
    }

    let companyCostTab;
    if (stageHelper.canShowCompetitorsTab()) {
      companyCostTab = <div>Наша рыночная стоимость: {ourCompanyCost}$</div>
    }

    let clientTab;
    if (stageHelper.canShowAdTab()) {
      clientTab = <div>
        <div className="featureGroupTitle">Работа с клиентами</div>
        <div>Наши клиенты: {market.clients}</div>
        <div>Каждый месяц мы теряем {disloyalClients} клиентов (отток: {churn}%)</div>
      </div>
    }

    return (
      <div>
        {clientTab}
        {companyCostTab}
        {adTab}
        {nearestCompetitor}
        {segmentTab}
        {churnFeatures}
        <Marketers />
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

  renderMetricsTab = (id, product) => {
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
          onAnalyticsPressed={() => this.setMode(MODE_ANALYTICS)}
          onExpertisePressed={() => this.setMode(MODE_HYPOTHESIS)}
        />
      </div>
    );
  };

  renderBonusesTab(id, product) {
    const improvements = productStore.getImprovementChances(id);

    const cliTabDescription = improvements.clientModifier.clientsRange
      .map((c, i, arr) => {
        const penalty = Math.ceil((1 - improvements.clientModifier.factors[i]) * 100);
        const isActivated = i === improvements.clientModifier.index ? UI.symbols.ok : UI.symbols.dot;

        let phrase;
        if (i === 0) {
          phrase = `Клиентов больше, чем ${c}`;
        } else {
          phrase = `Клиентов меньше, чем ${arr[i - 1]} - штраф ${penalty}%`;
        }
        return <div className="smallText">
          {isActivated} {phrase}
        </div>
      });

    return (
      <div>
        <div>Штраф достоверности (при тестировании гипотез)</div>
        <div className="offset-mid">{cliTabDescription}</div>
      </div>
    )
  }

  renderFeature = (featureGroup, id, idea, hideOnComplete, onUpgraded) => (feature, i) => {
    const featureName = feature.name;

    const key = `feature${featureGroup}${featureName}${i}`;

    const standardPoints = feature.points || {};
    const mp = standardPoints.marketing || 0;
    const pp = standardPoints.programming || 0;
    const points = playerStore.getPoints();

    const enoughPointsToUpgrade = points.marketing >= mp && points.programming >= pp;

    const upgradeFeature = event => {
      logger.debug('upgradeFeature', id, featureGroup, featureName, mp, pp);

      if (enoughPointsToUpgrade) {
        playerActions.spendPoints(pp, mp);
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
    const isUpgraded = productStore.getFeatureStatus(id, featureGroup, featureName);

    const separator = <hr width="60%" />;

    const userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;
    if (isUpgraded) {
      if (hideOnComplete) {
        return <div key={key}></div>;
      }

      return (
        <div key={key}>
          {userOrientedFeatureName}: Улучшено {UI.symbols.ok}
          <br />
          <div className="featureDescription">{description}</div>
          {separator}
        </div>
      );
    }

    const mpColors = points.marketing < mp ? "noPoints": "enoughPoints";
    const ppColors = points.programming < pp ? "noPoints": "enoughPoints";

    return (
      <div key={key}>
        {userOrientedFeatureName}
        <br />
        <div className="featureDescription">{description}</div>
        <div>
          <div>
            Стоимость улучшения - &nbsp;
            {mp > 0 ? <span className={mpColors}>MP:{mp}&nbsp;</span> : ''}
            {pp > 0 ? <span className={ppColors}>PP:{pp}</span> : ''}
          </div>
        </div>
        <UI.Button
          text="Улучшить"
          disabled={!enoughPointsToUpgrade}
          onClick={upgradeFeature}
          secondary
        />
        {separator}
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

    return (
      <ul className="nav nav-tabs">
        {hypothesis}
        {improvements}
        {clients}
        {payments}
        {competitors}
        {bonuses}
      </ul>
    );
  };

  render({ product, gamePhase }, state) {
    // if (stageHelper.isFirstWorkerMission()) return <div></div>;
    // return <div>Выполняйте миссии и вы откроете все возможности игры!</div>

    const { mode } = state;
    const { idea } = product;

    const id = 0;
    logger.shit('develop-panel.js fix productID id=0'); // TODO FIX PRODUCT ID=0

    let body = '';
    switch (mode) {
      case MODE_PAYMENTS:
        body = this.renderPaymentTab(id, idea);
        break;

      case MODE_MARKETING:
        body = this.renderClientTab(id, product);
        break;

      case MODE_ADS:
        body = this.renderAdTab(id, product);
        break;

      case MODE_ANALYTICS:
        body = this.renderAnalyticsTab(id, idea);
        break;

      case MODE_METRICS:
        body = this.renderMetricsTab(id, product);
        break;

      case MODE_MAIN_FEATURES:
        body = <MainFeatureTab id={id} product={product} />;
        break;

      case MODE_COMPETITORS:
        body = <Competitors id={id} />;
        break;

      case MODE_BONUSES:
        body = this.renderBonusesTab(id, product);
        break;

      default:
        body = this.renderHypothesisTab(id, idea, product);
        break;
    }

    const metrics = this.renderMetricsTab(id, product);
    const menu = this.renderProductMenuNavbar();

    // let description;
    // if (!stageHelper.isFirstWorkerMission()) {
    //   description = (
    //     <div>
    //       <b>Развитие продукта "{product.name}"</b>
    //       <div>Описание продукта: {productStore.getDescriptionOfProduct(id)}</div>
    //     </div>
    //   );
    // }

    return (
      <div>
        {metrics}
        {menu}
        <div style={{padding: '15px', 'min-height': '500px'}}>
          {body}
        </div>
      </div>
    );
  }
}

