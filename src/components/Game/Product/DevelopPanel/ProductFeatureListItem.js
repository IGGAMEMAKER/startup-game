import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';

export default class ProductFeatureListItem extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const props = this.props;
    const { currentFeatures } = props;
    const { name } = props.feature;
    const level = currentFeatures[name] || JSON.stringify(currentFeatures); // props.currentFeatures[props.i];

        // {JSON.stringify(props)}
    return (
      <div>
        {`${name}:${props.feature.influence}`}
        {level}
        <Button text="Improve" />
      </div>
    );
  }
}
