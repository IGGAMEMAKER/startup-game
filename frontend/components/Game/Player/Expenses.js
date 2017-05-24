import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import playerStore from '../../../stores/player-store';
import productStore from '../../../stores/product-store';
import playerActions from '../../../actions/player-actions';

import * as EXPENSES from '../../../constants/expenses';

import Button from '../../Shared/Button';

type PropsType = {};

export default class Expenses extends Component {
  renderProductExpense(e, i) {
    return (
      <div key={`product-expense${i}`}>
        Затраты на проект {e.name}
        <ul>
          <li>
            Затраты на ведение блога: {e.blog}$
          </li>
          <li>
            Затраты на техподдержку: {e.support}$
          </li>
        </ul>
      </div>
    );
  };

  render({ productExpenses, basicExpenses, teamExpenses }) {
    let loanIndex = 0;
    const renderBasicExpense = (e, i) => {
      let phrase = '';

      if (e.type === EXPENSES.EXPENSES_FOOD) {
        phrase = `Затраты на еду: ${e.price}$`;
      }

      if (e.type === EXPENSES.EXPENSES_LOAN) {
        loanIndex++;
        phrase = <div>
          Выплата процентов по долгу #${loanIndex}: ${Math.ceil(e.price * 0.01)}
          <Button text={`Погасить долг (${Math.ceil(e.price)})`} onClick={() => { playerActions.loans.repay(i); }} />
        </div>
      }

      return <div key={`basic-expense${i}`}>{phrase}</div>;
    };

        // <h5>Базовые расходы</h5>
        // {basicExpenses.map(renderBasicExpense)}
    return (
      <div>
        <h4>Расходы</h4>
        <h5>Расходы на содержание команды</h5>
        <div>{teamExpenses}$</div>
        <h5>Продуктовые расходы</h5>
        <div className="offset-mid">
          {productExpenses.map(this.renderProductExpense)}
        </div>
      </div>
    )
  }
};
