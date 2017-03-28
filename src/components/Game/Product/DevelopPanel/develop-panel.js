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
  state = {};

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
      { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Просмотр статистики шеринга',
        points: { programming: 15 }
      },
      { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Просмотр статистики платежей',
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

  render() {
    const { props } = this;

    const { product } = props;
    const { idea } = product;

    const id = 0; // TODO FIX PRODUCT ID
    //
    // specify actual feature values
    const renderFeature = featureGroup => (feature, i) => {
      const featureName = feature.name;

      const currentFeatures = product.features[featureGroup];

      const quality = Math.floor((currentFeatures[featureName] || 0) * 100);

      const { cost, time } = feature;

      const key = `feature${featureGroup}${featureName}${i}`;
          // {JSON.stringify(feature)}

      const cb = () => {
        logger.log('deferred callback!!', feature, i);
        productActions.improveFeature(id, featureGroup, featureName);
      };

      const freelancerTime = time;
      // const efficiency = WORK_SPEED_NORMAL / WORK_SPEED_HAS_MAIN_JOB;
      const yourTime = Math.ceil(time * WORK_SPEED_NORMAL / WORK_SPEED_HAS_MAIN_JOB);

      const doTaskYourself = () => {
        scheduleActions.addTask(time, true, WORK_SPEED_HAS_MAIN_JOB, key, cb);
      };

      const sendTaskToFreelancer = () => {
        scheduleActions.addTask(time, false, WORK_SPEED_NORMAL, key, cb);
      };
      //
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
          // {`${featureName}: ${quality}%. Time: ${time}. Cost ${cost}$`}

      // <Button
      //   text={`Отдать задачу фрилансеру. (${freelancerTime} дней и ${cost}$)`}
      //   onClick={sendTaskToFreelancer}
      // />

      const description = feature.description || '';
      const isUpgraded = productStore.getFeatureStatus(id, featureGroup, featureName);

      const userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;
      if (isUpgraded) {
        return (
          <div key={key}>
            {userOrientedFeatureName}: Улучшено ({quality}%)
            <br />
            <div>{description}</div>
          </div>
        );
      }

          // <div>{JSON.stringify(feature)}</div>
      const mpColors = points.marketing < mp ? s.noPoints : s.enoughPoints;
      const ppColors = points.programming < pp ? s.noPoints : s.enoughPoints;
      const upgradeButtonClassName = '';

      return (
        <div key={key}>
          {userOrientedFeatureName}
          <br />
          <div>{description}</div>
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
      .map(renderFeature('offer'));

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

    // const payment = JSON.stringify(this
    const payment = this
      .getPaymentFeatures(idea)
      .map(renderFeature('payment'));

    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <div></div>
          <b>Основные показатели продукта</b>
          <Metrics product={product} id={id} />

          <div className={s.featureGroupTitle}>Основные характеристики продукта</div>
          <div className={s.featureGroupDescription}>
            Улучшая главные характеристики продукта, вы повышаете его рейтинг,
            что приводит к увеличению всех основных метрик
          </div>
          <div className={s.featureGroupBody}>{featureList}</div>

          <div className={s.featureGroupTitle}>Работа с клиентами</div>
          <div className={s.featureGroupDescription}>Позволяет снизить отток клиентов, повышая их лояльность</div>
          <div className={s.featureGroupBody}>{marketing}</div>

          <div className={s.featureGroupTitle}>Аналитика</div>
          <div className={s.featureGroupDescription}>Позволяет быстрее улучшать главные характеристики проекта</div>
          <div className={s.featureGroupBody}>{analytics}</div>

          <div className={s.featureGroupTitle}>Монетизация</div>
          <div className={s.featureGroupDescription}>Позволяет повысить доходы с продаж</div>
          <div className={s.featureGroupBody}>{payment}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(DevelopPanel, s);
