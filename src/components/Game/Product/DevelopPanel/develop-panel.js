// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import s from './develop-panel.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ProductDescriptions from '../../../../constants/products/product-descriptions';
import Metrics from '../KPI/metrics';
import Button from '../../../Shared/Button';

import * as PROFESSIONS from '../../../../constants/professions';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';
import computeFeatureCost from '../../../../helpers/products/feature-price';

import scheduleActions from '../../../../actions/schedule-actions';

import { WORK_SPEED_NORMAL, WORK_SPEED_HAS_MAIN_JOB } from '../../../../constants/work-speed';

import logger from '../../../../helpers/logger/logger';

import playerStore from '../../../../stores/player-store';
import playerActions from '../../../../actions/player-actions';

class DevelopPanel extends Component {
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
      { name: 'blog', shortDescription: 'Блог проекта', description: '',
        points: { marketing: 150, programming: 0 }, time: 2 },
      { name: 'support', shortDescription: 'Техподдержка', description: '',
        points: { marketing: 50, programming: 100 }, time: 4 },
      { name: 'emails', shortDescription: 'Рассылка электронной почты', description: '',
        points: { marketing: 50, programming: 100 }, time: 10 },

      { name: 'referralProgram', shortDescription: 'Реферальная программа', description: '',
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
      { name: 'feedback', shortDescription: 'Форма для комментариев', description: '',
        points: { programming: 50 }
      },
      { name: 'webvisor', shortDescription: 'Вебвизор', description: 'Позволяет просматривать действия пользователей',
        points: { programming: 50 }
      },
      { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: '',
        points: { programming: 150, marketing: 100 }
      },
      { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Открывает метрику "Виральность"',
        points: { programming: 15 }
      },
      { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Открывает метрики "процент платящих" и "ежемесячный доход"',
        points: { programming: 15 }
      }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getPaymentFeatures = idea => {
    const technicalDebtModifier = 1;
    const up = Math.ceil;

    return [
      { name: 'mockBuying', shortDescription: 'Тестовая покупка', description: 'Заглушки вместо покупок',
        points: { programming: up(50 * technicalDebtModifier), marketing: 0 }
      },
      { name: 'basicPricing', shortDescription: 'Один тарифный план', description: 'Одна цена для всех',
        points: { programming: up(150 * technicalDebtModifier), marketing: 50 }
      },
      { name: 'segmentedPricing', shortDescription: 'Несколько тарифных планов', description: 'Несколько ценовых сегментов',
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

  renderHypothesisItem = (id, featureName, time, current, max) => (h, i) => {
    const necessaryPoints = h.points;
    const key = `${featureName}`;

    const { pp, mp } = necessaryPoints;

    const action = () => {
      playerActions.spendPoints(pp, mp);
      scheduleActions.addTask(time, false, WORK_SPEED_NORMAL, key, () => {
        productActions.improveFeature(id, 'offer', featureName, h, max);
      });
    };

    const chance = (h.baseChance + productStore.getAnalyticsValueForFeatureCreating(id)) * 100;

    let text = `Протестировать гипотезу (${time}дней)`;
    if (current >= max) {
      text = 'Эта фича огонь';
    }

    return (
      <div key={`hypothesis${i}`}>
        <div>Гипотеза #{i} (Ценность - {h.data}XP, {chance}% шанс)</div>
        <div>Стоимость тестирования ({mp}MP и {pp}PP)</div>
        <Button
          disabled={!this.haveEnoughPointsToUpgrade(necessaryPoints) || current >= max}
          onClick={action}
          text={text}
          primary={current < max}
        />
      </div>
    )
  };

  render() {
    const { props, state } = this;

    const { product } = props;
    const { idea } = product;

    const id = 0; // TODO FIX PRODUCT ID
    logger.shit('develop-panel.js fix productID id=0');

    const renderMainFeature = featureGroup => (defaultFeature, i) => {
      const featureName = defaultFeature.name;
      const { cost, time, shortDescription } = defaultFeature;

      const feature = product.features[featureGroup][featureName];

      const current = feature || 0;
      const max = defaultFeature.data;


      const key = `feature${featureGroup}${featureName}${i}`;

      const hypothesis = [{
        points: { mp: 100, pp: 100 },
        data: 1000,
        baseChance: 0.3
      }, {
        points: { mp: 100, pp: 200 },
        data: 4000,
        baseChance: 0.1
      }];

      const hypothesisList = hypothesis.map(this.renderHypothesisItem(id, featureName, time, current, max));
      const description = defaultFeature.description || '';
      const userOrientedFeatureName = shortDescription ? shortDescription : featureName;

      return (
        <div key={key}>
          {userOrientedFeatureName} ({current}/{max}XP)
          <br />
          <div className={s.featureDescription}>{description}</div>
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

      const userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;
      if (isUpgraded) {
        return (
          <div key={key}>
            {userOrientedFeatureName}: Улучшено
            <br />
            <div className={s.featureDescription}>{description}</div>
          </div>
        );
      }

      const mpColors = points.marketing < mp ? s.noPoints : s.enoughPoints;
      const ppColors = points.programming < pp ? s.noPoints : s.enoughPoints;

      return (
        <div key={key}>
          {userOrientedFeatureName}
          <br />
          <div className={s.featureDescription}>{description}</div>
          <div>
            <div>
              Стоимость улучшения - &nbsp;
              <span className={mpColors}>MP:{mp}&nbsp;</span>
              <span className={ppColors}>PP:{pp}</span>
            </div>
          </div>
          <Button
            disabled={!enoughPointsToUpgrade}
            onClick={upgradeFeature}
            text="Улучшить"
            secondary
          />
          <br />
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

    // var arrow = saldo ? '\u2197' : '\u2198';
    const upArrow = '\u2191';
    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <b>Основные показатели продукта</b>
          <Metrics product={product} id={id} />

          <div
            className={s.featureGroupTitle}
            onClick={this.toggleMainFeatureTab}
          >Основные характеристики продукта</div>
          <div
            className={s.featureGroupDescriptionWrapper}
            style={{ display: state.features ? 'block' : 'none' }}
          >
            <div className={s.featureGroupDescription}>
              Улучшая главные характеристики продукта, вы повышаете его рейтинг,
              что приводит к увеличению всех основных метрик
            </div>
            <div className={s.featureGroupBody}>{featureList}</div>
            <div className={s.hide} onClick={this.toggleMainFeatureTab}>Свернуть {upArrow}</div>
          </div>


          <div
            className={s.featureGroupTitle}
            onClick={this.toggleMarketingTab}
          >Работа с клиентами</div>
          <div
            className={s.featureGroupDescriptionWrapper}
            style={{ display: state.marketing ? 'block' : 'none' }}
          >
            <div className={s.featureGroupDescription}>Позволяет снизить отток клиентов, повышая их лояльность</div>
            <div className={s.featureGroupBody}>{marketing}</div>
            <div className={s.hide} onClick={this.toggleMarketingTab}>Свернуть {upArrow}</div>
          </div>


          <div
            className={s.featureGroupTitle}
            onClick={this.toggleAnalyticsTab}
          >Аналитика</div>
          <div
            className={s.featureGroupDescriptionWrapper}
            style={{ display: state.analytics ? 'block' : 'none' }}
          >
            <div className={s.featureGroupDescription}>Позволяет быстрее улучшать главные характеристики проекта</div>
            <div className={s.featureGroupBody}>{analytics}</div>
            <div className={s.hide} onClick={this.toggleAnalyticsTab}>Свернуть {upArrow}</div>
          </div>


          <div
            className={s.featureGroupTitle}
            onClick={this.togglePaymentTab}
          >Монетизация</div>
          <div
            className={s.featureGroupDescriptionWrapper}
            style={{ display: state.payment ? 'block' : 'none' }}
          >
            <div className={s.featureGroupDescription}>Позволяет повысить доходы с продаж</div>
            <div className={s.featureGroupBody}>{payment}</div>
            <div className={s.hide} onClick={this.togglePaymentTab}>Свернуть {upArrow}</div>
          </div>

        </div>
      </div>
    );
  }
}

export default withStyles(DevelopPanel, s);
