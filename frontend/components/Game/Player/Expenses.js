import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import playerStore from '../../../stores/player-store';
import productStore from '../../../stores/product-store';
import playerActions from '../../../actions/player-actions';

import * as EXPENSES from '../../../constants/expenses';

import Button from '../../Shared/Button';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Expenses extends Component {
  componentWillMount() {
    this.setExpenses();

    playerStore.addChangeListener(this.setExpenses);
  }

  setExpenses = () => {
    this.setState({
      expenses: playerStore.getExpenses()
    });
  };

  // render(props: PropsType, state: StateType) {
  render() {
    const { props } = this;
    const state = this.state;

    const productExpenses = props.expenses;
    const basicExpenses = state.expenses;

    const renderExpense = (e, i) => {
      return (
        <div key={`product-expense${i}`}>
          Затраты на проект {e.name}
          <ul>
            <li>
              Затраты на ведение блога: {e.blog}
            </li>
            <li>
              Затраты на техподдержку: {e.support}
            </li>
          </ul>
        </div>
      );
    };

    let loanIndex = 0;
    const renderBasicExpense = (e, i) => {
      let phrase = '';

      if (e.type === EXPENSES.EXPENSES_FOOD) {
        phrase = `Затраты на еду: ${e.price}`;
      }

      if (e.type === EXPENSES.EXPENSES_LOAN) {
        loanIndex++;
        phrase = <div>
          Выплата процентов по долгу #${loanIndex}: ${e.price * 0.01}
          <Button text={`Погасить долг (${e.price})`} onClick={() => { playerActions.loans.repay(i); }} />
        </div>
      }

      return (
        <div key={`basic-expense${i}`}>
          {phrase}
        </div>
      );
    };

        // {JSON.stringify(state.expenses)}
    return (
      <div>
        <b>Расходы</b>
        <br />
        <h4>Базовые расходы</h4>
        {basicExpenses.map(renderBasicExpense)}
        <h4>Продуктовые расходы</h4>
        {productExpenses.map(renderExpense)}
      </div>
    )
  }
};
