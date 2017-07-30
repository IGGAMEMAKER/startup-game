import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../stores/product-store';
import productActions from '../../../actions/product-actions';

import * as EXPENSES from '../../../constants/expenses';

import Button from '../../Shared/Button';

type PropsType = {};

export default class Expenses extends Component {
  renderProductExpense(e, i) {
    return (
      <div key={`product-expense${i}`}>
        <h6>Затраты на проект {e.name}</h6>
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

  render({ productExpenses, basicExpenses, teamExpenses, rentExpenses }) {
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
          <Button text={`Погасить долг (${Math.ceil(e.price)})`} onClick={() => { productActions.loans.repay(i); }} />
        </div>
      }

      return <div key={`basic-expense${i}`}>{phrase}</div>;
    };

    const rentList = rentExpenses
      .map(r => (<li>Аренда технологии "{r.techName}" у компании "{r.senderName}" за {r.price}$</li>) );


        // <div className="offset-mid">
        //   <h5>Базовые расходы</h5>
        //   {basicExpenses.length ? basicExpenses.map(renderBasicExpense) : `0$`}
        // </div>
    return (
      <div>
        <h4>Расходы</h4>
        <div className="offset-mid">
          <h5>Расходы на содержание команды</h5>
          <div>{teamExpenses}$</div>
        </div>
        <div className="offset-mid">
          <h5>Расходы на арендуемые технологии</h5>
          <div>{rentList}$</div>
        </div>
      </div>
    );
    // <h5>Продуктовые расходы</h5>
        // <div className="offset-mid">
        //   {productExpenses.map(this.renderProductExpense)}
        // </div>
  }
};
