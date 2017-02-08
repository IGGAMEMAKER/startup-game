// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import ProductFeatureListItem from './ProductFeatureListItem';
import ProductDescriptions from '../../../../constants/products/product-descriptions';

export default class DevelopPanel extends Component {
  state = {};

  componentWillMount() {}

  getProductFeatureList = idea => {
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

  render() {
    const { props } = this;

    const { product } = props;
    const { idea } = product;

    const debt = product.KPI.debt;

    // specify actual feature values
    const renderFeature = currentFeatures => (feature, i) =>
      <ProductFeatureListItem currentFeatures={currentFeatures} feature={feature} i={i} />;

    const featureList = this.getProductFeatureList(idea).map(renderFeature(product.features.offer));
    const marketing = this.getMarketingFeatureList(idea).map(renderFeature(product.features.marketing));

    return (
      <div>
        <b>Развитие продукта</b>
        <div style={{padding: '15px'}}>
          <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
          <b>Основные фичи продукта</b>
          {featureList}
          <b>Маркетинг</b>
          {marketing}
        </div>
      </div>
    );
  }
};
