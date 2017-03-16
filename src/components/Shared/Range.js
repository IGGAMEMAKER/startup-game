// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Range extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const props = this.props;

    return (
        <input
          type="range"
          min={props.min}
          max={props.max}
          onChange={(event) => { props.onDrag(parseInt(event.target.value)) }}
        />
    );
  }
}
