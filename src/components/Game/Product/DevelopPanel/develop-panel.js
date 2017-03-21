// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

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

export default class DevelopPanel extends Component {
  state = {};

  componentWillMount() {}

  getSpecificProductFeatureListByIdea = idea => {
    return ProductDescriptions(idea).features;
  };

  getMarketingFeatureList = (idea) => {
    const cost = 30 * WORK_SPEED_NORMAL;

    return [
      { name: 'blog', description: '', time: 2 },
      { name: 'support', description: '', time: 4 },
      { name: 'emails', description: '', time: 10 },

      { name: 'referralProgram', description: '', time: 7 }
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
      { name: 'feedback', description: '',
        points: { programming: 50 }
      },
      { name: 'segmenting', description: '',
        points: { programming: 100, marketing: 100 }
      },
      { name: 'shareAnalytics', description: 'Просмотр статистики шеринга',
        points: { programming: 15 }
      }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getMonetizationFeatures = idea => {
    const technicalDebtModifier = 1;
    const up = Math.ceil;

    return [
      { name: 'mockBuying', description: 'Заглушки вместо покупок',
        points: { programming: up(50 * technicalDebtModifier), marketing: 0 }
      },
      { name: 'basicPricing', description: 'Одна цена для всех',
        points: { programming: up(150 * technicalDebtModifier), marketing: 50 }
      },
      { name: 'segmentedPricing', description: 'Несколько ценовых сегментов',
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

      const upgradeFeature = event => {
        const mp = feature.points.marketing || 0;
        const pp = feature.points.programming || 0;

        logger.debug('upgradeFeature', id, featureGroup, featureName, mp, pp);

        const points = playerStore.getPoints();
        if (points.marketing >= mp && points.programming >= pp) {
          playerActions.spendPoints(pp, mp);
          productActions.improveFeatureByPoints(id, featureGroup, featureName, mp, pp);
        }
      };
          // {`${featureName}: ${quality}%. Time: ${time}. Cost ${cost}$`}

      // <Button
      //   text={`Отдать задачу фрилансеру. (${freelancerTime} дней и ${cost}$)`}
      //   onClick={sendTaskToFreelancer}
      // />

      const description = feature.description || '';
      return (
        <div key={key}>
          {featureName}: {quality}%
          <br />
          <div>{JSON.stringify(feature)}</div>
          <div>{description}</div>
          <div>Стоимость улучшения:</div>
          <Button text="Улучшить" onClick={upgradeFeature} />
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

    const monetization = JSON.stringify(this
      .getMonetizationFeatures(idea))
      // .map(renderFeature('monetization'));

    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <div></div>
          <b>Основные показатели продукта</b>
          <Metrics product={product} id={id} />
          <b>Основные характеристики продукта</b>
          <div>
            Улучшая главные характеристики продукта, вы повышаете его рейтинг,
            что приводит к увеличению всех основных метрик
          </div>
          {featureList}
          <b>Работа с клиентами</b>
          <div>Позволяет снизить отток клиентов, повышая их лояльность</div>
          {marketing}
          <b>Аналитика</b>
          <div>Позволяет быстрее улучшать главные характеристики проекта</div>
          {analytics}
          <b>Монетизация</b>
          <div>Позволяет повысить доходы с продаж</div>
          {monetization}
        </div>
      </div>
    );
  }
};
