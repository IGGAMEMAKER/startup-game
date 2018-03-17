import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import UI from '../../../UI';

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
        <td>{Math.ceil(bug.penalty * 100)}</td>
        <td>{button}</td>
      </tr>
    )
  };

  sortByLoyalty = (b1, b2) => {
    if (b2.penalty > b1.penalty) {
      return 1;
    }

    if (b2.penalty < b1.penalty) {
      return -1;
    }

    if (b2.cost > b1.cost) {
      return -1;
    }

    if (b2.cost < b1.cost) {
      return 1;
    }

    return 0;
  };

  render() {
    const { props } = this;

    const list = productStore.getBugs(props.id);
    // const loyaltyLoss = productStore.getBugLoyaltyLoss(props.id);
    const loyaltyLoss = Math.ceil(productStore.getBugLoyaltyLoss(props.id) * 100);

    const bugs = list
      .sort(this.sortByLoyalty)
      .map(this.renderBug(props.id));

    if (!list.length) {
      return <div>
        <h2>Ошибки</h2>
        <div>Ошибок нет! Клиенты довольны :)</div>
      </div>
    }

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
