import React, { Component, PropTypes } from 'react';

export default class ProductShortTab extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;

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
        <div>Технический долг: {p.KPI.debt}</div>
      </div>
    );
        // {JSON.stringify(p)}

    return <div>{text}</div>;
  }
}
