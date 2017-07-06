import productStore from '../../stores/product-store';

import * as EXPENSES from '../../constants/expenses';

const calculate = () => {
  const ourCompanyId = 0;
  const products = productStore.getOurProducts();

  // check income
  const jobIncome = 2000;

  const rentIncome = productStore.getRentIncomes(ourCompanyId);

  const income = jobIncome + products
      .map((p, i) => productStore.getProductIncome(i))
      .reduce((p, c) => p + c, 0) + rentIncome.sum;

  // check expenses
  const nonProductExpenses = productStore.getExpenses()
    .filter(e => e.type !== EXPENSES.EXPENSES_LOAN)
    .map((e, i) => e.price)
    .reduce((p, c) => p + c, 0);


  const productExpenses = products
    .map((p, i) => productStore.getProductExpenses(i))
    .reduce((p, c) => p + c, 0);

  const loans = productStore.getLoanPaymentAmount();

  const teamExpenses = productStore.getTeamExpenses();

  const expenses = nonProductExpenses + productExpenses + loans + teamExpenses;

  const byProductIncome = products
    .map((p, i) => ({ name: p.name, income: productStore.getProductIncome(i) }));


  return {
    nonProductExpenses,
    productExpenses,
    loans,
    teamExpenses,
    rentIncome: rentIncome.sum,


    expenses,
    income,
    byProductIncome,

    saldo: income - expenses
  }
};

export default {
  structured: calculate,

  saldo: () => Math.floor(calculate().saldo)
}
