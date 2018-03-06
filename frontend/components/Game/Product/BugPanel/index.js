import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import UI from '../../../UI';

const penaltyMultiplier = 100;

export default class BugPanel extends Component {
  renderBug = productId => bug => {
    const isFixable = productStore.isBugFixable(productId, bug.id);

    const action = () => productActions.fixBug(productId, bug.id);

    const button = <UI.Button
      text="Исправить"
      primary={isFixable}
      disabled={!isFixable}
      onClick={action}
    />;

    return (
      <tr>
        <td>{UI.icons[bug.platform]}</td>
        <td>{bug.cost}</td>
        <td>{bug.penalty * penaltyMultiplier}</td>
        <td>{button}</td>
      </tr>
    )
  };

  render() {
    const { props } = this;

    const list = productStore.getBugs(props.id);

    const bugs = list.map(this.renderBug(props.id));

    const loyaltyLoss = list.map(i => i.penalty).reduce((p, c) => p + c, 0) * penaltyMultiplier;

    return (
      <div>
        <h2>Ошибки</h2>
        <div>Из-за ошибок падает лояльность наших клиентов!</div>
        <div>Исправьте их как можно скорее!</div>
        <div>Падение лояльности клиентов: {loyaltyLoss}%</div>
        <br />
        <div>
          <table className="table table-striped" style={{ textAlign: 'center' }}>
            <thead>
              <th>Платформа</th>
              <th>Стоимость, {UI.icons.PP}</th>
              <th>Лояльность, %</th>
              <th>Действие</th>
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
