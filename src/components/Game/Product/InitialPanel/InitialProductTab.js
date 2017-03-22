// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import s from './InitialProductTab.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Button from '../../../Shared/Button';

import mvpCreator from './mvp-creator';

class InitialProductTab extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;

    const { product } = props;
    const { idea } = product;

    return (
      <div>
        <Button
          text="Создать прототип"
          onClick={e => mvpCreator.create(props.id, [])}
        />
      </div>
    );
  }
}

export default withStyles(InitialProductTab, s);
