import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

import ProductDescriptions from '../../../../constants/products/product-descriptions';
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

import logger from '../../../../helpers/logger/logger';

import AdsPanel from '../Ads/advert-planner-panel';


const MODE_HYPOTHESIS = 'MODE_HYPOTHESIS';
const MODE_ADS = 'MODE_ADS';
const MODE_MARKETING = 'MODE_MARKETING';
const MODE_PAYMENTS = 'MODE_PAYMENTS';
const MODE_ANALYTICS = 'MODE_ANALYTICS';

export default class DevelopPanel extends Component {
  state = {
    marketing: true,
    payment: true,
    analytics: true,
    features: true,

    mode: MODE_HYPOTHESIS
  };

  getSpecificProductFeatureListByIdea = idea => {
    return ProductDescriptions(idea).features;
  };

  getMarketingFeatureList = (idea) => {
    const cost = 30 * WORK_SPEED_NORMAL;

    return [
      { name: 'blog', shortDescription: 'Блог проекта', description: 'Регулярное ведение блога снижает отток клиентов на 35%',
        points: { marketing: 150, programming: 0 }, time: 2 },
      { name: 'support', shortDescription: 'Техподдержка', description: 'Техподдержка снижает отток клиентов на 50%',
        points: { marketing: 50, programming: 100 }, time: 4 },
      { name: 'emails', shortDescription: 'Рассылка электронной почты', description: 'Рассылка электронной почти снижает отток клиентов на 15%',
        points: { marketing: 50, programming: 100 }, time: 10 },

      // { name: 'referralProgram', shortDescription: 'Реферальная программа', description: 'Реферальная программа повышает виральность проекта на 30%',
      //   points: { marketing: 50, programming: 100 }, time: 7 }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getDevelopmentFeatureList = idea => {
    const cost = 50 * WORK_SPEED_NORMAL;

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
        {this.renderFeature('analytics', id, idea, true)(this.getHypothesisAnalyticsFeatures(idea)[0], 0)}
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

  getHypothesisAnalyticsFeatures = idea => {
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

  getAnalyticFeatures = idea => {
    const cost = 30 * WORK_SPEED_NORMAL;

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

  getPaymentFeatures = idea => {
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

  getTechnicalDebtDescription = debt => {
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

  renderHypothesisItem = (id, featureName, time, current, max, product) => (hypothesis, i) => {
    const necessaryPoints = hypothesis.points;
    const key = `hypothesis${i}`;

    const { pp, mp } = necessaryPoints;

    const action = () => {
      // playerActions.spendPoints(pp, mp);
      productActions.improveFeature(id, 'offer', featureName, hypothesis, max, 1000);
    };

    // const notEnoughPPs = !this.haveEnoughPointsToUpgrade(necessaryPoints);
    const ratingOverflow = current >= max;
    const currentXP = productStore.getXP(id);

    // const disabled = notEnoughPPs || ratingOverflow || currentXP < 1000;
    const disabled = ratingOverflow || currentXP < 1000;

    return (
      <div key={key} className="hypothesis-wrapper">
        <UI.Button
          disabled={disabled}
          onClick={action}
          text="Улучшить за 1000XP"
          primary={!ratingOverflow}
        />
      </div>
    )
  };

  renderHypothesisTab = (id, idea) => {
    const done = UI.symbols.ok;
    const cancel = UI.symbols.dot;

    const improvements = productStore.getImprovementChances(id);
    const webvisorStatus = improvements.hasWebvisor ? done : `${cancel} Не`;
    const segmentingStatus = improvements.hasSegmenting ? done : `${cancel} Не`;
    const feedbackStatus = improvements.hasFeedback ? done : `${cancel} Не`;

    const clientSizePenalty = Math.ceil((1 - improvements.clientModifier.modifier) * 100);

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
        productActions.testHypothesis(id, {}, 0)
      });
    };

    return (
      <div>
        <div
          className="featureGroupTitle"
        >Тестирование гипотез</div>
        <div className="featureGroupDescription">
          <div className="smallText">Тестирование гипотез даёт возможность лучше узнать о потребностях ваших клиентов.</div>
          <div className="smallText">После каждого цикла тестирования вы получаете очки экспертизы (XP points)</div>
          <div className="smallText">
            Если клиентов мало, то результаты исследований могут быть недостоверны (вы получаете штраф)&nbsp;&nbsp;
            <UI.Info />
          </div>
          <div className="offset-mid">{cliTabDescription}</div>
          <div className="metric-link" onClick={() => this.setMode(MODE_ADS)}>Привести больше клиентов</div>
        </div>
        <br />
        <div>
          Запуская тестирование вы получите от 0 до {improvements.max} XP
          (штраф -{clientSizePenalty}%)
        </div>
        <div className="offset-mid">
          <div>{done} Базовое значение: {improvements.basicBonus}XP</div>

          <div>{feedbackStatus} Установлена форма обратной связи (+{improvements.feedbackBonus}XP)</div>
          {this.getFeedbackButton(idea, id)}
          <div>{webvisorStatus} Установлен вебвизор (+{improvements.webvisorBonus}XP)</div>
          {this.getWebvisorButton(idea, id)}
          <div>{segmentingStatus} Установлен модуль сегментации клиентов (+{improvements.segmentingBonus}XP)</div>
          {this.getSegmentingButton(idea, id)}

          <br />
          <div>Итого: {improvements.maxXPWithoutBonuses}XP - {clientSizePenalty}% = {improvements.max}XP</div>
        </div>
        <br />
        <div>
          <div>Стоимость тестирования гипотезы: {mp}MP и {pp}PP</div>
          <UI.Button
            text="Протестировать гипотезу"
            onClick={testHypothesis}
            disabled={disabled}
            primary
          />
          <Schedule />
        </div>
      </div>
    )
  };

  renderHypothesisAnalytics = (id) => (feature, i) => {
    const featureGroup = 'analytics';
    const featureName = feature.name;

    const key = `feature${featureGroup}${featureName}ii${i}`;

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
      }
    };

    const description = feature.description || '';
    const isUpgraded = productStore.getFeatureStatus(id, featureGroup, featureName);

    const separator = <hr width="60%" />;

    const userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;
    if (isUpgraded) {
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


  renderPaymentTab = (state, id, idea) => {
    const payment = this
      .getPaymentFeatures(idea)
      .map(this.renderFeature('payment', id, idea));

    return (
      <div>
        <div className="featureGroupTitle" >Монетизация</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Позволяет повысить доходы с продаж</div>
          <div className="featureGroupBody">{payment}</div>
        </div>
      </div>
    )
  };

  renderAnalyticsTab = (state, id, idea) => {
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

  renderClientTab = (state, id, idea) => {
    const marketing = this.getMarketingFeatureList(idea).map(this.renderFeature('marketing', id, idea));

    return (
      <div>
        <div className="featureGroupTitle">Работа с клиентами</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Позволяет снизить отток клиентов, повышая их лояльность</div>
          <div className="featureGroupBody">{marketing}</div>
        </div>
      </div>
    );
  };

  renderMainFeaturesTab = (state, id, idea, product) => {
    const featureList = this
      .getSpecificProductFeatureListByIdea(idea)
      .map(this.renderMainFeature('offer', product, id));

    return (
      <div>
        <div className="featureGroupTitle">Основные характеристики продукта</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">
            Улучшая главные характеристики продукта, вы повышаете его рейтинг,
            что приводит к снижению оттока клиентов и увеличению доходов с продукта
          </div>
          <div>Доступно: {product.XP}XP</div>
          <div className="featureGroupBody">{featureList}</div>
        </div>
      </div>
    );
  };

  renderMainFeature = (featureGroup, product, id) => (defaultFeature, i) => {
    const featureName = defaultFeature.name;
    const { time, shortDescription } = defaultFeature;

    const feature = product.features[featureGroup][featureName];

    const current = feature || 0;
    const max = defaultFeature.data;


    const key = `feature${featureGroup}${featureName}${i}`;

    const hypothesis = [{
      points: { mp: 100, pp: 200 },
      data: 4000,
      baseChance: 0.1
    }];

    const description = defaultFeature.description || '';
    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;

    let hypothesisList = '   Улучшено';
    if (current < max) {
      hypothesisList = hypothesis.map(this.renderHypothesisItem(id, featureName, time, current, max, product));
    } else {
      return (
        <div key={key}>
          {userOrientedFeatureName} (Улучшено) {UI.symbols.ok}
          <br />
          <div className="featureDescription">{description}</div>
          <br />
        </div>
      )
    }

    return (
      <div key={key}>
        {userOrientedFeatureName} ({current}/{max}XP)
        <br />
        <div className="featureDescription">{description}</div>
        {hypothesisList}
        <br />
      </div>
    )
  };


  renderFeature = (featureGroup, id, idea, hideOnComplete) => (feature, i) => {
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

  render({ product }, state) {
    const { mode } = state;
    const { idea } = product;

    const id = 0; // TODO FIX PRODUCT ID
    logger.shit('develop-panel.js fix productID id=0');

    let body = '';

    switch (mode) {
      case MODE_PAYMENTS:
        body = this.renderPaymentTab(state, id, idea);
        break;

      case MODE_MARKETING:
        body = this.renderClientTab(state, id, idea);
        break;

      case MODE_ADS:
        body = (
          <div>
            <b>Рекламная кампания</b>
            <AdsPanel product={product} id={id} />
            <br />
          </div>
        );
        break;

      case MODE_ANALYTICS:
        body = this.renderAnalyticsTab(state, id, idea);
        break;

      default:
        body = (
          <div>
            {this.renderHypothesisTab(id, idea)}
            <br />
            <hr />
            {this.renderMainFeaturesTab(state, id, idea, product)}
          </div>
        );
        break;
    }

    // renderAnalyticsTab
    return (
      <div>
        <b>Развитие продукта "{product.name}"</b>
        <div>Описание продукта: {productStore.getDescriptionOfProduct(id)}</div>
        <div style={{padding: '15px'}}>
          <b>Основные показатели продукта</b>
          <Metrics
            product={product}
            id={id}
            onRatingPressed={() => this.setMode(MODE_HYPOTHESIS)}
            onClientsPressed={() => this.setMode(MODE_MARKETING)}
            onPaymentsPressed={() => this.setMode(MODE_PAYMENTS)}
            onAdsPressed={() => this.setMode(MODE_ADS)}
            onAnalyticsPressed={() => this.setMode(MODE_ANALYTICS)}
          />

          <br />
          <hr />

          {body}
        </div>
      </div>
    );
  }
}
