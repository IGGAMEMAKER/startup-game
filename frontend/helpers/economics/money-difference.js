import productStore from '../../stores/product-store';
import playerStore from '../../stores/player-store';

import * as EXPENSES from '../../constants/expenses';

const calculate = () => {
  const products = productStore.getOurProducts();

  // check income
  const jobIncome = 2000;

  const income = jobIncome + products
      .map((p, i) => productStore.getProductIncome(i))
      .reduce((p, c) => p + c, 0);

  // check expenses
  const nonProductExpenses = playerStore.getExpenses()
    .filter(e => e.type !== EXPENSES.EXPENSES_LOAN)
    .map((e, i) => e.price)
    .reduce((p, c) => p + c, 0);


  const productExpenses = products
    .map((p, i) => productStore.getProductExpenses(i))
    .reduce((p, c) => p + c, 0);

  const loans = playerStore.getLoanPaymentAmount();

  const teamExpenses = playerStore.getTeamExpenses();

  const expenses = nonProductExpenses + productExpenses + loans + teamExpenses;

  const byProductIncome = products
    .map((p, i) => ({ name: p.name, income: productStore.getProductIncome(i) }));

  return {
    nonProductExpenses,
    productExpenses,
    loans,
    teamExpenses,


    expenses,
    income,
    byProductIncome,

    saldo: income - expenses
  }
};

export default {
  structured: calculate,

  saldo: () => calculate().saldo
}
