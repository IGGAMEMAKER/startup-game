import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class ProductShortTab extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props, state } = this;

    const p = props.product;
    const i = props.i;

    const text = (
      <div style={{ padding: 15 }}>
        <div>№ {i + 1}</div>
        <div>{p.name}</div>
        <div>Тип: {p.idea}</div>
        <i>Рейтинг {p.rating}/10</i>
        <br />
        <a href="#" style={{cursor: 'pointer'}}>Улучшения</a>
        <div>Технический долг: {p.bonuses.debt}</div>
        {JSON.stringify(p)}
      </div>
    );

    return (
      <div>
        {text}
      </div>
    );
  }
}
