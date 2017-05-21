import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Metrics from '../KPI/metrics';
import Schedule from '../../Schedule';
import UI from '../../../UI';

import * as PROFESSIONS from '../../../../constants/professions';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';

import playerStore from '../../../../stores/player-store';
import playerActions from '../../../../actions/player-actions';

import computeFeatureCost from '../../../../helpers/products/feature-price';

import scheduleActions from '../../../../actions/schedule-actions';

import { WORK_SPEED_NORMAL, WORK_SPEED_HAS_MAIN_JOB } from '../../../../constants/work-speed';

import c from '../../../../constants';

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

  getMarketingFeatureList(idea) {
    return [
      { name: 'blog', shortDescription: 'Блог проекта', description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150, programming: 0 }, time: 2 },
      { name: 'support', shortDescription: 'Техподдержка', description: 'Техподдержка снижает отток клиентов на 15%',
        points: { marketing: 50, programming: 100 }, time: 4 },
      { name: 'emails', shortDescription: 'Рассылка электронной почты', description: 'Рассылка электронной почти снижает отток клиентов на 5%',
        points: { marketing: 50, programming: 100 }, time: 10 },

      // { name: 'referralProgram', shortDescription: 'Реферальная программа', description: 'Реферальная программа повышает виральность проекта на 30%',
      //   points: { marketing: 50, programming: 100 }, time: 7 }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getDevelopmentFeatureList(idea) {
    return [
      { name: 'backups', description: ''},
      { name: 'clusters', description: ''},
      { name: 'tests', description: ''},
      { name: 'mobiles', description: ''} // ios android apps
    ];
    // ].map(computeFeatureCost(cost));
  };

  getFeedbackButton(idea, id) {
    return (
      <div className="offset-mid">
        {this.renderFeature('analytics', id, idea, true, stageHelper.onInstallPrimitiveAnalyticsMissionCompleted)(this.getHypothesisAnalyticsFeatures(idea)[0], 0)}
      </div>
    );
  }

  getWebvisorButton(idea, id) {
    return (
      <div className="offset-mid">
        {this.renderFeature('analytics', id, idea, true)(this.getHypothesisAnalyticsFeatures(idea)[1], 1)}
      </div>
    );
  }

  getSegmentingButton(idea, id) {
    return (
      <div className="offset-mid">
        {this.renderFeature('analytics', id, idea, true)(this.getHypothesisAnalyticsFeatures(idea)[2], 2)}
      </div>
    );
  }

  getHypothesisAnalyticsFeatures(idea) {
    return [
      { name: 'feedback', shortDescription: 'Форма для комментариев', description: '', // 'Общение с вашими клиентами позволяет вам улучшить ваш продукт. Повышает шансы при проверке гипотез',
        points: { programming: 50, marketing: 0 }
      },
      { name: 'webvisor', shortDescription: 'Вебвизор', description: '', // 'Позволяет просматривать действия пользователей. Повышает шансы при проверке гипотез',
        points: { programming: 50, marketing: 0 }
      },
      { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: '', // 'Повышает шансы при проверке гипотез',
        points: { programming: 150, marketing: 100 }
      }
    ];
  };

  getAnalyticFeatures(idea) {
    return [
      // { name: 'feedback', shortDescription: 'Форма для комментариев', description: 'Общение с вашими клиентами позволяет вам улучшить ваш продукт. Повышает шансы при проверке гипотез на 10%',
      //   points: { programming: 50, marketing: 0 }
      // },
      // { name: 'webvisor', shortDescription: 'Вебвизор', description: 'Позволяет просматривать действия пользователей. Повышает шансы при проверке гипотез на 30%',
      //   points: { programming: 50, marketing: 0 }
      // },
      // { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: 'Повышает шансы при проверке гипотез на 40%',
      //   points: { programming: 150, marketing: 100 }
      // },

      // { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Открывает метрику "Виральность"',
      //   points: { programming: 50, marketing: 0 }
      // },
      { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Открывает метрику "Платёжеспособность"',
        points: { programming: 50, marketing: 0 }
      }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getPaymentFeatures(idea) {
    const technicalDebtModifier = 1;
    const up = Math.ceil;

    return [
      { name: 'mockBuying', shortDescription: 'Тестовая покупка', description: 'Позволяет узнать платёжеспособность клиентов. Вы не извлекаете никаких доходов с продукта',
        points: { programming: up(50 * technicalDebtModifier), marketing: 0 }
      },
      { name: 'basicPricing', shortDescription: 'Один тарифный план', description: 'Одна цена для всех. Процент платящих снижается вдвое, однако вы начинаете зарабатывать деньги',
        points: { programming: up(150 * technicalDebtModifier), marketing: 50 }
      },
      { name: 'segmentedPricing', shortDescription: 'Несколько тарифных планов', description: 'Несколько ценовых сегментов. Максимально возможный доход с продукта',
        points: { programming: up(250 * technicalDebtModifier), marketing: 250 }
      }
    ];
  };


  getTechnicalDebtDescription(debt) {
    if (debt < 10) {
      return `Всё хорошо`;
    } else if (debt < 50) {
      return `Программисты начинают плакать`;
    } else {
      return `Ты мразь и п**ор, программисты ненавидят тебя!! Отрефакторь этот шлак!`;
    }
  };

  haveEnoughPointsToUpgrade = necessaryPoints => {
    const points = playerStore.getPoints();
    const mp = necessaryPoints.mp || 0;
    const pp = necessaryPoints.pp || 0;

    return points.marketing >= mp && points.programming >= pp;
  };

  renderHypothesisTab = (id, idea) => {
    if (!stageHelper.canShowHypothesisTab()) return '';

    const done = UI.symbols.ok;
    const cancel = UI.symbols.dot;

    const improvements = productStore.getImprovementChances(id);
    const webvisorStatus = improvements.hasWebvisor ? done : `${cancel} Не`;
    const segmentingStatus = improvements.hasSegmenting ? done : `${cancel} Не`;
    const feedbackStatus = improvements.hasFeedback ? done : `${cancel} Не`;


    const clientSizePenalty = (1 - improvements.clientModifier.modifier);

    const exp = (bonus) => Math.ceil(bonus * clientSizePenalty * 2);


    // const payment = this.plainifySameTypeFeatures(id, idea, 'payment', 'Блок монетизации полностью улучшен!');
    let improveTab;
    if (!improvements.hasFeedback) {
      improveTab = (
        <div>
          <div>{feedbackStatus} Установлена форма комментариев (+{exp(improvements.feedbackBonus)}XP)</div>
          {this.getFeedbackButton(idea, id)}
        </div>
      )
    } else if (!improvements.hasWebvisor) {
      improveTab = (
        <div>
          <div>{webvisorStatus} Установлен вебвизор (+{exp(improvements.webvisorBonus)}XP)</div>
          {this.getWebvisorButton(idea, id)}
        </div>
      )
    } else if (!improvements.hasSegmenting) {
      improveTab = (
        <div>
          <div>{segmentingStatus} Установлен модуль сегментации клиентов (+{exp(improvements.segmentingBonus)}XP)</div>
          {this.getSegmentingButton(idea, id)}
        </div>
      )
    } else {
      improveTab = (
        <div>Сегмент аналитики полностью улучшен</div>
      )
    }

    const hypothesisPoints = productStore.getHypothesisPoints(id);

    const { pp, mp } = hypothesisPoints;

    const notEnoughPPs = !this.haveEnoughPointsToUpgrade(hypothesisPoints);
    // const ratingOverflow = current >= max;
    // const currentXP = productStore.getXP(id);

    const disabled = notEnoughPPs;// || ratingOverflow;

    const testHypothesis = () => {
      const time = 30;
      const key = 'Тестирование гипотезы';

      playerActions.spendPoints(pp, mp);
      scheduleActions.addTask(time, false, WORK_SPEED_NORMAL, key, () => {
        productActions.testHypothesis(id, {}, 0);
      });
    };

    const possibleXPtext = <div>Каждый месяц вы получаете {improvements.middle} XP</div>;
      // (штраф -{clientSizePenalty}%)</div>;


    // <div>{feedbackStatus} Установлена форма обратной связи (+{improvements.feedbackBonus}XP)</div>
    // {this.getFeedbackButton(idea, id)}
    // <div>{webvisorStatus} Установлен вебвизор (+{improvements.webvisorBonus}XP)</div>
    // {this.getWebvisorButton(idea, id)}
    // <div>{segmentingStatus} Установлен модуль сегментации клиентов (+{improvements.segmentingBonus}XP)</div>
    // {this.getSegmentingButton(idea, id)}


    // <div>{done} Базовое значение: {improvements.basicBonus}XP</div>


    // <br />
    // <div>Итого: {improvements.maxXPWithoutBonuses}XP - {clientSizePenalty}% = {improvements.max}XP</div>

            // <UI.Info />
          // <div className="smallText">
          //   Если клиентов мало, то результаты исследований могут быть недостоверны (вы получаете штраф)&nbsp;&nbsp;
          // </div>

    let errorDescription = '';
    if (disabled) {
      errorDescription = 'У вас не хватает MP или PP. ' +
        'Возможно вам стоит нанять больше сотрудников или подождать до следующего месяца';
    }


    // <div>Стоимость тестирования гипотезы: {mp}MP и {pp}PP</div>
    // <div>{errorDescription}</div>
    // <UI.Button
    //   text="Запустить исследование"
    //   onClick={testHypothesis}
    //   disabled={disabled}
    //   primary
    // />
    // <br />
    // <Schedule />

          // <div className="smallText">После каждого цикла тестирования вы получаете очки экспертизы (XP points)</div>
    return (
      <div>
        <div className="featureGroupTitle">Тестирование гипотез</div>
        <div className="featureGroupDescription">
          <div className="smallText">Тестирование гипотез даёт возможность лучше узнать о потребностях ваших клиентов.</div>
          <div className="smallText">{possibleXPtext}</div>
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
        featureList = this.getMarketingFeatureList(idea);
        break;

      case 'payment':
        featureList = this.getPaymentFeatures(idea);
        break;

      case 'analytics':
        featureList = this.getHypothesisAnalyticsFeatures(idea);
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
    const analytics = this
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
      return (
        <div>
          <div>Наш ближайший конкурент</div>
          <Competitor rating={rating} c={competitor} i={-1} />
        </div>
      )
    }

    return (<div>Вы - №1 на рынке!</div>)
  }

  renderSegmentTab(id) {
    let segments = productStore.getSegments(id);

    if (!stageHelper.canShowSegments()) {
      segments = [segments[0]];
    }

    const segmentList = segments.map((s, i) => <Segment productId={id} segment={s} id={i} />);

    return (
      <div>
        <div>Сегменты пользователей</div>
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

      churnFeatures =
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Позволяет снизить отток клиентов, повышая их лояльность</div>
          <div className="featureGroupBody">{marketing}</div>
        </div>
    }

    return (
      <div>
        <div className="featureGroupTitle">Работа с клиентами</div>
        <div>Наши клиенты: {market.clients}</div>
        <div>Наша рыночная стоимость: {ourCompanyCost}$</div>
        {adTab}
        {nearestCompetitor}
        <br />
        {segmentTab}
        <div>Каждый месяц мы теряем {disloyalClients} клиентов (отток: {churn}%)</div>
        {churnFeatures}
      </div>
    );
  };

  renderAdTab = (id, product) => {
    return (
      <div>
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
            <span className={mpColors}>MP:{mp}&nbsp;</span>
            <span className={ppColors}>PP:{pp}</span>
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

  setMode = (mode) => {
    this.setState({ mode });
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
      hypothesis = this.renderNavbar(MODE_HYPOTHESIS, 'Исследования');
    }

    let improvements;
    if (stageHelper.canShowMainFeatureTab()) {
      improvements = this.renderNavbar(MODE_MAIN_FEATURES, 'Характеристики');
    }

    let payments;
    if (stageHelper.canShowPaymentsTab()) {
      payments = this.renderNavbar(MODE_PAYMENTS, 'Монетизация');
    }

    let ads;
    ads = this.renderNavbar(MODE_ADS, 'Реклама');

    let clients;
    // if (stageHelper.canShowClientsTab()) {
      clients = this.renderNavbar(MODE_MARKETING, 'Клиенты');
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
        {clients}
        {improvements}
        {payments}
        {competitors}
        {bonuses}
      </ul>
    );
  };

  render({ product, gamePhase }, state) {
    if (stageHelper.isFirstWorkerMission()) return <div></div>;
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

    return (
      <div>
        <b>Развитие продукта "{product.name}"</b>
        <div>Описание продукта: {productStore.getDescriptionOfProduct(id)}</div>
        {metrics}
        {menu}
        <div style={{padding: '15px', 'min-height': '500px'}}>
          {body}
        </div>
      </div>
    );
  }
}
