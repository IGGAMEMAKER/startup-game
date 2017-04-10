import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';
export default class Range extends Component {
  render() {
    const props = this.props;

    return (
        <input
          type="range"
          min={props.min}
          max={props.max}
          onInput={(event) => { props.onDrag(parseInt(event.target.value)) }}
        />
    );
  }
}
