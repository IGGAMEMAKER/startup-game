// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';
import ProductFeatureList from './ProductFeatureList'; //<ProductFeatureList product={props.product} />

export default class DevelopPanel extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;
    return (
      <div>
        <b>Развитие продукта</b>
        <ProductFeatureList product={props.product} />
        <div>Feature 1</div>
        <Button text="Improve" />
      </div>
    );
  }
};
