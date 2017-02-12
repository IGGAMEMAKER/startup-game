// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';

import productActions from '../../../../actions/product-actions';

import productStore from '../../../../stores/product-store';

export default class AdvertPlannerPanel extends Component {
  state = {};
  //
  componentWillMount() {}

  render() {
    const { props } = this;
    return (
      <div>
        <Button item="start-campaign" text="Start ad campaign" />
      </div>
    );
  }
};
