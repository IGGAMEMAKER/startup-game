import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

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

    let className = '';

    if (props.primary) {
      className = 'btn-primary';
    }

    if (props.secondary) {
      className = 'btn-success';
    }

    if (props.link) {
      className = 'btn-link';
    }

    if (props.cancel) {
      className = 'btn-danger';
    }

    if (props.gray) {
      className = 'btn-danger'
    }

    if (props.alert) {
      className = 'btn-danger';
    }

    return (
      <div>
        <button {...props} className={`btn ${className}`}>{props.text}</button>
      </div>
    );
  }
}
