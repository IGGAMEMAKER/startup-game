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

export default class DevelopPanel extends Component {
  state = {};

  componentWillMount() {}

  getSpecificProductFeatureListByIdea = idea => {
    return ProductDescriptions(idea).features;
  };

  getMarketingFeatureList = (idea) => {
    const cost = 1500 * WORK_SPEED_NORMAL;

    return [
      { name: 'blog', description: '', time: 2 },
      { name: 'support', description: '', time: 4 },
      { name: 'emails', description: '', time: 10 },

      { name: 'referralProgram', influence: 5, description: '', time: 7 }
    ].map(computeFeatureCost(cost));
  };

  getDevelopmentFeatureList = idea => {
    const cost = 1500 * WORK_SPEED_NORMAL;

    return [
      { name: 'backups', description: ''},
      { name: 'clusters', description: ''},
      { name: 'tests', description: ''},
      { name: 'mobiles', description: ''} // ios android apps
    ].map(computeFeatureCost(cost));
  };

  getAnalyticFeatures = idea => {
    const cost = 1000 * WORK_SPEED_NORMAL;

    return [
      { name: 'feedback', description: '', time: 1 },
      { name: 'segmenting', description: '', time: 7 }
    ].map(computeFeatureCost(cost));
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

    // specify actual feature values
    const renderFeature = featureGroup => (feature, i) => {
      const featureName = feature.name;

      const currentFeatures = product.features[featureGroup];

      const quality = Math.floor((currentFeatures[featureName] || 0) * 100);

      const { cost, time } = feature;

      const key = `feature${featureGroup}${featureName}${i}`;
          // {JSON.stringify(feature)}

      const cb = () => {
        logger.log('deferred callback!!');
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

          // {`${featureName}: ${quality}%. Time: ${time}. Cost ${cost}$`}
      return (
        <div key={key}>
          {featureName}: {quality}%
          <Button
            text={`Отдать задачу фрилансеру. (${freelancerTime} дней и ${cost}$)`}
            onClick={sendTaskToFreelancer}
          />
          <br />
          <Button
            text={`Сделать самому (${yourTime} дней)`}
            onClick={doTaskYourself}
          />
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
        </div>
      </div>
    );
  }
};
