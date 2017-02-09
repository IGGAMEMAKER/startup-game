// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import ProductDescriptions from '../../../../constants/products/product-descriptions';
import Button from '../../../Shared/Button';

import productActions from '../../../../actions/product-actions';

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

  getTechnicalDebtDescription = debt => {
    if (debt < 10) {
      return `Всё хорошо`;
    } else if (debt < 50) {
      return `Программисты начинают плакать`;
    } else {
      return `Ты мразь и п**ор, программисты ненавидят тебя!! Отрефакторь этот шлак!`;
    }
  };

  computeRating = product => {
    // TODO: include other features too
    let rating = 0;

    const { idea } = product;

    const idealFeatures = this.getSpecificProductFeatureListByIdea(idea);
    idealFeatures.forEach(f => {
      const value = product.features.offer[f.name] || 0;
      // console.log('idealFeature', f.name, value, weight);
      rating += value * f.influence;
    });

    return rating;
  };

  // computeMarketingBonus

  render() {
    const { props } = this;

    const { product } = props;
    const { idea } = product;

    const debt = product.KPI.debt;

    const rating = this.computeRating(product);

    const id = 0; // TODO FIX PRODUCT ID

    // specify actual feature values
    const renderFeature = featureGroup => (feature, i) => {
      const currentFeatures = product.features[featureGroup];
      const featureName = feature.name;
      const level = currentFeatures[featureName] || 0;

      return (
        <div>
          {`${featureName}: ${level * 100}%`}
          <Button
            text="Improve"
            onClick={() => {
              productActions.improveFeature(id, featureGroup, featureName);
            }}
          />
        </div>
      )
    };
      // <ProductFeatureListItem currentFeatures={currentFeatures} feature={feature} i={i} />;

    console.log('product', product);
    const featureList = this
      .getSpecificProductFeatureListByIdea(idea)
      .map(renderFeature('offer'));

    const marketing = this
      .getMarketingFeatureList(idea)
      .map(renderFeature('marketing'));

          // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <b>Рейтинг: {rating}</b>
          <div></div>
          <b>Основные фичи продукта</b>
          {featureList}
          <b>Работа с клиентами</b>
          {marketing}
        </div>
      </div>
    );
  }
};
