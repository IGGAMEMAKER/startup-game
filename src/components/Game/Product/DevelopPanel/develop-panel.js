// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import ProductFeatureListItem from './ProductFeatureListItem';
import ProductDescriptions from '../../../../constants/products/product-descriptions';

export default class DevelopPanel extends Component {
  state = {};

  componentWillMount() {}

  getFeatureList = idea => {
    return ProductDescriptions(idea).features;
  };

  render() {
    const { props } = this;
    const idea = props.product.idea;
    const features = props.product.features;

    const featureList = this.getFeatureList(idea)
      .map((feature, i) => <ProductFeatureListItem features={features} feature={feature} i={i} />);

    return (
      <div>
        <b>Развитие продукта</b>

        {featureList}
      </div>
    );
  }
};
