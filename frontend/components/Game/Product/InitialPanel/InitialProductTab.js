import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';
import logger from '../../../../helpers/logger/logger';
import Button from '../../../Shared/Button';

import mvpCreator from './mvp-creator';

import productDescriptions from '../../../../constants/products/product-descriptions';

export default class InitialProductTab extends Component {
  render({ product, id, onCreatePrototype }) {
    logger.debug('InitialProductTab', product, id);
    const { idea } = product;

    return (
      <div>
        <div>{productDescriptions(idea).description}</div>
        <Button
          text="Создать прототип"
          onClick={onCreatePrototype ? onCreatePrototype : e => mvpCreator.create(id, [], idea)}
          primary
        />
      </div>
    );
  }
}
