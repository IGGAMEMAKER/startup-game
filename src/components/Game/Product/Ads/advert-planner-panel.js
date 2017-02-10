// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';

import computeRating from '../../../../helpers/products/compute-rating';

export default class AdvertPlannerPanel extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;
    return (
      <div>
        <Button text="Start ad campaign" />
      </div>
    );
  }
};
