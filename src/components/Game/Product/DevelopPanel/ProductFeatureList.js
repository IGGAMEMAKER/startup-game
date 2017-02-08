// import { h, Component } from 'preact';

import React, { Component, PropTypes } from 'react';

type PropsType = {
  product: {
    idea: string,
    features: Array
  }
};

import * as IDEAS from '../../../../constants/Ideas';

import ProductFeatureListItem from './ProductFeatureListItem';

export default class ProductFeatureList extends Component {
  componentWillMount() {}

  getFeatureList = idea => {
    console.log('getFeatureList', IDEAS);

    switch (idea) {
      case IDEAS.IDEA_WEB_STUDIO:
        return [
          { name: 'portfolio', influence: 4 },
          { name: 'website', influence: 3 },
          { name: 'SM activity', influence: 3 }
        ];
        break;
    }
  };

  render() {
    const props: PropsType = this.props;

    const idea = props.product.idea;
    const features = props.product.features;

    const featureList = this
      .getFeatureList(idea)
      .map((feature, i) => <ProductFeatureListItem features={features} feature={feature} i={i} />);

    return (
      <div>
        {featureList}
      </div>
    );
  }
}
