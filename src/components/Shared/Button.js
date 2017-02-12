// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Button extends Component {
  render() {
    // props: PropsType, state: StateType
    const props = this.props;

    // send info to server, that user pressed the button with some id
    let { item } = props;
    if (!item) item = 'unknownButton';

    return (
      <div>
        <button {...props}>{props.text}</button>
      </div>
    );
  }
}
