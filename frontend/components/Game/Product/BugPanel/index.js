import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

const penaltyMultiplier = 100;

export default class BugPanel extends Component {
  renderBug = productId => bug => {
    const isFixable = productStore.isBugFixable(productId, bug.id);

    const button = <UI.Button text="Исправить" primary={isFixable} />;

    return (
      <tr>
        <td>{bug.cost}</td>
        <td>{bug.penalty * penaltyMultiplier}</td>
        <td>{button}</td>
      </tr>
    )
  };

  render() {
    const { props } = this;

    const list = [
      { id: 0, cost: 15, penalty: 0.1, platform: 'web' },
      { id: 1, cost: 25, penalty: 0.2, platform: 'web' },
      { id: 2, cost: 35, penalty: 1, platform: 'web' }
    ];

    const bugs = list.map(this.renderBug(props.id));

    const errorMoneyLoss = list.map(i => i.penalty).reduce((p, c) => p + c) * penaltyMultiplier;

    return (
      <div>
        <h2>Ошибки</h2>
        <div>Из-за ошибок падает лояльность наших клиентов!</div>
        <div>Мы должны исправлять их как можно скорее!</div>
        <div>Падение лояльности клиентов: {errorMoneyLoss}%</div>
        <br />
        <div>
          <table className="table table-striped" style={{ textAlign: 'center' }}>
            <thead>
              <th>Стоимость (P)</th>
              <th>Лояльность</th>
              <th>Польза</th>
              <th></th>
            </thead>
            <tbody>
              {bugs}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
