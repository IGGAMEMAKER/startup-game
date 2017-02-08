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

    const idea = props.product.idea;
    const features = props.product.features;

    const debt = props.product.KPI.debt;

    const featureList = this.getProductFeatureList(idea)
      .map((feature, i) => <ProductFeatureListItem features={features} feature={feature} i={i} />);

    return (
      <div>
        <b>Развитие продукта</b>
        <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
        {featureList}
      </div>
    );
  }
};
