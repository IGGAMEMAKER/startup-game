import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

import ProductDescriptions from '../../../../constants/products/product-descriptions';
import Metrics from '../KPI/metrics';
import Button from '../../../Shared/Button';
import UI from '../../../UI';

import * as PROFESSIONS from '../../../../constants/professions';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';
import computeFeatureCost from '../../../../helpers/products/feature-price';

import scheduleActions from '../../../../actions/schedule-actions';

import { WORK_SPEED_NORMAL, WORK_SPEED_HAS_MAIN_JOB } from '../../../../constants/work-speed';

import logger from '../../../../helpers/logger/logger';

import playerStore from '../../../../stores/player-store';
import playerActions from '../../../../actions/player-actions';

export default class DevelopPanel extends Component {
  state = {
    marketing: false,
    payment: false,
    analytics: false,
    features: true
  };

  componentWillMount() {}

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

      { name: 'referralProgram', shortDescription: 'Реферальная программа', description: 'Реферальная программа повышает виральность проекта на 30%',
        points: { marketing: 50, programming: 100 }, time: 7 }
    ].map(computeFeatureCost(cost));
  };

  getDevelopmentFeatureList = idea => {
    const cost = 50 * WORK_SPEED_NORMAL;

    return [
      { name: 'backups', description: ''},
      { name: 'clusters', description: ''},
      { name: 'tests', description: ''},
      { name: 'mobiles', description: ''} // ios android apps
    ].map(computeFeatureCost(cost));
  };

  getAnalyticFeatures = idea => {
    const cost = 30 * WORK_SPEED_NORMAL;

    return [
      { name: 'feedback', shortDescription: 'Форма для комментариев', description: 'Общение с вашими клиентами позволяет вам улучшить ваш продукт. Повышает шансы при проверке гипотез на 10%',
        points: { programming: 50 }
      },
      { name: 'webvisor', shortDescription: 'Вебвизор', description: 'Позволяет просматривать действия пользователей. Повышает шансы при проверке гипотез на 30%',
        points: { programming: 50 }
      },
      { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: 'Повышает шансы при проверке гипотез на 40%',
        points: { programming: 150, marketing: 100 }
      },
      { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Открывает метрику "Виральность"',
        points: { programming: 50 }
      },
      { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Открывает метрики "процент платящих" и "ежемесячный доход"',
        points: { programming: 50 }
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

  // computeMarketingBonus

  toggleMainFeatureTab = () => {
    const value = this.state.features;
    this.setState({ features: !value });
  };
  toggleAnalyticsTab = () => {
    const value = this.state.analytics;
    this.setState({ analytics: !value });
  };
  togglePaymentTab = () => {
    const value = this.state.payment;
    this.setState({ payment: !value });
  };
  toggleMarketingTab = () => {
    const value = this.state.marketing;
    this.setState({ marketing: !value });
  };

  haveEnoughPointsToUpgrade = necessaryPoints => {
    const points = playerStore.getPoints();
    const mp = necessaryPoints.mp || 0;
    const pp = necessaryPoints.pp || 0;

    return points.marketing >= mp && points.programming >= pp;
  };

  renderHypothesisItem = (id, featureName, time, current, max) => (hypothesis, i) => {
    const necessaryPoints = hypothesis.points;
    const key = `${featureName}`;

    const { pp, mp } = necessaryPoints;

    const action = () => {
      playerActions.spendPoints(pp, mp);
      scheduleActions.addTask(time, false, WORK_SPEED_NORMAL, key, () => {
        productActions.improveFeature(id, 'offer', featureName, hypothesis, max);
      });
    };

    const chance = (hypothesis.baseChance + productStore.getAnalyticsValueForFeatureCreating(id)) * 100;

    const notEnoughPPs = !this.haveEnoughPointsToUpgrade(necessaryPoints);
    const ratingOverflow = current >= max;
    const disabled = notEnoughPPs || ratingOverflow;

    // let text = <span>Протестировать гипотезу ({time} дней)</span>;
    // let text = <span>Улучшить характеристику за </span>;

        // <div className="hypothesis">Гипотеза (Ценность - {hypothesis.data}XP, {chance}% шанс)</div>
    return (
      <div key={`hypothesis${i}`} className="hypothesis-wrapper">
        <div>Стоимость улучшения: {mp}MP и {pp}PP</div>
        <div>Срок улучшения: {time} дней</div>
        <UI.Button
          disabled={disabled}
          onClick={action}
          text="Улучшить"
          primary={!ratingOverflow}
        />
      </div>
    )
  };

  renderMainFeatureTab = () => {

  }

  render() {
    const { props, state } = this;

    const { product } = props;
    const { idea } = product;

    const id = 0; // TODO FIX PRODUCT ID
    logger.shit('develop-panel.js fix productID id=0');

    const renderMainFeature = featureGroup => (defaultFeature, i) => {
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
        hypothesisList = hypothesis.map(this.renderHypothesisItem(id, featureName, time, current, max));
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



    const renderFeature = featureGroup => (feature, i) => {
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

    // console.log('product', product);
    const featureList = this
      .getSpecificProductFeatureListByIdea(idea)
      .map(renderMainFeature('offer'));

    const marketing = this
      .getMarketingFeatureList(idea)
      .map(renderFeature('marketing'));

    const development = this
      .getDevelopmentFeatureList(idea)
      .map(renderFeature('development'));

    // <b>Разработка</b>
    // {development}

    const analytics = this
      .getAnalyticFeatures(idea)
      .map(renderFeature('analytics'));


    const payment = this
      .getPaymentFeatures(idea)
      .map(renderFeature('payment'));


    const upArrow = UI.symbols.up;

    const done = UI.symbols.ok;
    const cancel = 'X';

    const improvements = productStore.getImprovementChances(id);
    const webvisorStatus = improvements.hasWebvisor ? done : cancel;
    const segmentingStatus = improvements.hasSegmenting ? done : cancel;
    const feedbackStatus = improvements.hasFeedback ? done : cancel;

    const clientSizePenalty = Math.ceil((1 - improvements.clientModifier.modifier) * 100);
    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <b>Основные показатели продукта</b>
          <Metrics product={product} id={id} />

          <div
            className="featureGroupTitle"
            onClick={this.toggleMainFeatureTab}
          >1) Основные характеристики продукта</div>
          <div
            className="featureGroupDescriptionWrapper"
            style={{ display: state.features ? 'block' : 'none' }}
          >
            <div className="featureGroupDescription">
              Улучшая главные характеристики продукта, вы повышаете его рейтинг,
              что приводит к увеличению всех основных метрик
            </div>

            <div>Максимальное количество экспертизы (XP): {improvements.max}</div>
            <div>Базовое значение: {improvements.basicBonus}XP</div>
            <div>{feedbackStatus} Установлена форма обратной связи (+{improvements.feedbackBonus}XP)</div>
            <div>{webvisorStatus} Установлен вебвизор (+{improvements.webvisorBonus}XP)</div>
            <div>{segmentingStatus} Установлен модуль сегментации (+{improvements.segmentingBonus}XP)</div>
            <div>
              Штраф за размер тестовой группы ({improvements.clientModifier.clients})
              : {clientSizePenalty}% (клиентов меньше, чем {improvements.clientModifier.clientMax})
            </div>
            <div>Чтобы избавиться от этого штрафа, приведите больше клиентов</div>

            <div className="featureGroupBody">{featureList}</div>
            <div className="hide" onClick={this.toggleMainFeatureTab}>Свернуть {upArrow}</div>
          </div>

          <div
            className="featureGroupTitle"
            onClick={this.toggleAnalyticsTab}
          >2) Аналитика</div>
          <div
            className="featureGroupDescriptionWrapper"
            style={{ display: state.analytics ? 'block' : 'none' }}
          >
            <div className="featureGroupDescription">Позволяет быстрее улучшать главные характеристики проекта</div>
            <div className="featureGroupBody">{analytics}</div>
            <div className="hide" onClick={this.toggleAnalyticsTab}>Свернуть {upArrow}</div>
          </div>


          <div
            className="featureGroupTitle"
            onClick={this.toggleMarketingTab}
          >3) Работа с клиентами</div>
          <div
            className="featureGroupDescriptionWrapper"
            style={{ display: state.marketing ? 'block' : 'none' }}
          >
            <div className="featureGroupDescription">Позволяет снизить отток клиентов, повышая их лояльность</div>
            <div className="featureGroupBody">{marketing}</div>
            <div className="hide" onClick={this.toggleMarketingTab}>Свернуть {upArrow}</div>
          </div>


          <div
            className="featureGroupTitle"
            onClick={this.togglePaymentTab}
          >4) Монетизация</div>
          <div
            className="featureGroupDescriptionWrapper"
            style={{ display: state.payment ? 'block' : 'none' }}
          >
            <div className="featureGroupDescription">Позволяет повысить доходы с продаж</div>
            <div className="featureGroupBody">{payment}</div>
            <div className="hide" onClick={this.togglePaymentTab}>Свернуть {upArrow}</div>
          </div>

        </div>
      </div>
    );
  }
}
