import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import productActions from '../../../actions/product-actions';
import messageActions from '../../../actions/message-actions';


export default class HireEnthusiastEvent extends Component {
  render() {
    const { props } = this;
    const id = props.id;

    const cancel = () => {
      messageActions.closeEvent(id);
      props.onclose();
    };

    return (
      <div>
        <div className="text">
          Оо! Один из наших фанатов нашего проекта хочет помочь в разработке БЕСПЛАТНО!
        </div>
        <br />
        <Button className="button1" onClick={cancel} text="Увы, наша команда укомплектована" primary />
      </div>
    );
  }
}
