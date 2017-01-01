import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import ProductShortTab from '../Game/ProductShortTab';

export default class ProductMenu extends Component {
  render() {
    const { props, state } = this;
    console.log('ProductMenu', props, state);

    return (
      <div>
        <ProductShortTab {...props} />
      </div>
    );
  }
}
