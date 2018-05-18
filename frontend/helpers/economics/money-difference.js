import productStore from '../../stores/store';

const calculate = (id) => {
  const ourCompanyId = id ? id : 0;
  const products = productStore.getOurProducts();

  // check income
  const income = products
      .map((p, i) => productStore.getProductIncome(i))
      .reduce((p, c) => p + c, 0);


  const productExpenses = products
    .map((p, i) => productStore.getProductExpenses(i))
    .reduce((p, c) => p + c, 0);

  const teamExpenses = productStore.getTeamExpenses();

  const expenses = productExpenses + teamExpenses;

  const byProductIncome = products
    .map((p, i) => ({ name: p.name, income: productStore.getProductIncome(i) }));


  return {
    productExpenses,
    teamExpenses,

    expenses,
    income,
    byProductIncome,

    saldo: income - expenses
  }
};

export default {
  structured: calculate,

  saldo: (id) => Math.floor(calculate(id).saldo)
}
