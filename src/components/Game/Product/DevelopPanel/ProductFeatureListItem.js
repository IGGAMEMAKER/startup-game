import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';

export default class ProductFeatureListItem extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const props = this.props;

    const level = props.features[props.i];

    return (
      <div>
        {`${props.feature.name}:${props.feature.influence}`}
        {level}
        <Button text="Improve" />
      </div>
    );
  }
}
