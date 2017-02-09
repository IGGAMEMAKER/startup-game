// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import ProductDescriptions from '../../../../constants/products/product-descriptions';
import Button from '../../../Shared/Button';

import productActions from '../../../../actions/product-actions';

import computeRating from '../../../../helpers/products/compute-rating';

import productStore from '../../../../stores/product-store';

export default class DevelopPanel extends Component {
  state = {};

  componentWillMount() {}

  getSpecificProductFeatureListByIdea = idea => {
    return ProductDescriptions(idea).features;
  };

  getMarketingFeatureList = (idea) => {
    // VK + TG = 10
    // VK = 8
    // TG = 5

    return [
      { name: 'VK', influence: 8, description: '' },
      { name: 'Telegram', influence: 5, description: '' }
    ]
  };

  getDevelopmentFeatureList = idea => {
    return [
      { name: 'Бэкапы', influence: 7, description: ''}
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

    const debt = product.KPI.debt;

    const rating = computeRating(product);

    const id = 0; // TODO FIX PRODUCT ID

    // specify actual feature values
    const renderFeature = featureGroup => (feature, i) => {
      const currentFeatures = product.features[featureGroup];
      const featureName = feature.name;
      const quality = currentFeatures[featureName] || 0;

      return (
        <div>
          {`${featureName}: ${quality * 100}%`}
          <Button
            text="Improve"
            onClick={() => { productActions.improveFeature(id, featureGroup, featureName); }}
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

          // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <div></div>
          <b>Основные метрики продукта</b>
          <div>
            <ul>
              <li>
                <b>Рейтинг: {rating}</b>
              </li>
              <li>
                <b>Отток клиентов: {productStore.getChurnRate(id)}%</b>
              </li>
            </ul>
          </div>
          <b>Основные фичи продукта</b>
          {featureList}
          <b>Работа с клиентами</b>
          {marketing}
          <b>Разработка</b>
          {development}
        </div>
      </div>
    );
  }
};
