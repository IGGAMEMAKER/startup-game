// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Select extends Component {
  render() {
    // props: PropsType, state: StateType
    const props = this.props;

    // send info to server, that user pressed the button with some id
    let { options } = props;

    const optionList = options.map((o, i) => {
      return <option value={o.value}>{o.text}</option>;
    });

    const onchange = props.onChange ? (e) => props.onChange(e.target.value) : () => {};
    return (
      <select value={props.value} onChange={onchange}>
        {optionList}
      </select>
    );
  }
}
