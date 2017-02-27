// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import playerStore from '../../../stores/player-store';
import productStore from '../../../stores/product-store';

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

    const expenses = props.expenses;

    const renderExpense = (e, i) => {
      return (
        <div>
          Затраты на проект {e.name}
          <ul>
            <li>
              Затраты на ведение блога:{e.blog}
            </li>
            <li>
              Затраты на техподдержку:{e.support}
            </li>
          </ul>
        </div>
      );
    };

    return (
      <div>
        <b>Расходы</b>
        <br />
        {JSON.stringify(state.expenses)}
        {expenses.map(renderExpense)}
      </div>
    )
  }
};
