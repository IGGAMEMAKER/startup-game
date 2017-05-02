import { h, Component } from 'preact';

import UI from '../../UI';
import moneyCalculator from '../../../helpers/economics/money-difference';
import playerStore from '../../../stores/player-store';
import productStore from '../../../stores/product-store';
import playerActions from '../../../actions/player-actions';

import Expenses from '../Player/Expenses';

import round from '../../../helpers/math/round';


type PropsType = {};

type StateType = {};

export default class Economics extends Component {
  state = {
    possibleCredit: 0
  };

  componentWillMount() {
    this.pickProducts();
    this.pickMoney();

    playerStore.addChangeListener(this.pickMoney);
    productStore.addChangeListener(this.pickProducts);
  }

  pickProducts = () => {
    this.setState({
      products: productStore.getProducts()
    })
  };

  pickMoney = () => {
    this.setState({
      money: playerStore.getMoney(),
      basicExpenses: playerStore.getExpenses(),
    })
  };

  renderIncome = state => {
    // {JSON.stringify(state.income)}
    const productIncome = moneyCalculator.structured().byProductIncome
      .filter(p => p.income > 0)
      .map(p => (<div>{p.name} : {Math.floor(p.income)}$</div>));

    return (
      <div>
        <h4>Доходы</h4>
        <br />
        <div>Фриланс: 2000$</div>
        <div>{productIncome}</div>
        <hr />
      </div>
    )
  };

  renderExpenses = state => {
    const productExpenses = state.products.map((p, i) => productStore.getProductExpensesStructure(i));
    const basicExpenses = state.basicExpenses;
    const teamExpenses = moneyCalculator.structured().teamExpenses;

    return <div>
      <Expenses
        productExpenses={productExpenses}
        basicExpenses={basicExpenses}
        teamExpenses={teamExpenses}
      />
      <hr />
    </div>;
  };

  takeLoan = amount => {
    const repay = 1.3;

    const monthlyPayment = Math.ceil(amount * repay / 100);
    return (
      <div>
        <div>
          Взять кредит на сумму {amount}$. Ежемесячный платёж составит: {monthlyPayment}$
        </div>
        <UI.Button text={`Взять кредит (${amount}$)`} onClick={() => playerActions.loans.take(amount)} />
      </div>
    )
  };

  onDrag = (value) => {
    this.setState({ possibleCredit: Math.floor(value) });
  };

  getLoans = () => {
    return playerStore.getLoanSize();
  };

  renderLoanTakingTab = (state) => {
    const loans = this.getLoans();
    const { possibleCredit } =  state;

    const maxLoanSize = (moneyCalculator.structured().income - loans) * 12;

    if (maxLoanSize <= 0) {
      return <div>Вы больше не можете брать займы. Выплатите предыдущие займы!</div>;
    }

    return (
      <div>
        <UI.Range min={0} max={maxLoanSize} onDrag={this.onDrag} />
        {this.takeLoan(possibleCredit)}
      </div>
    )
  };

  renderLoanStatusTab = () => {
    const loans = this.getLoans();

    if (loans <= 0) {
     return <div>Долгов нет</div>;
    }

    return (
      <div>
        Суммарная задолженность {loans}$
      </div>
    );
  };

  renderCredits = (props, state) => {
    return (
      <div>
        <h4>Кредиты</h4>
        {this.renderLoanStatusTab()}
        <div>На вашем счету: {round(state.money)}$</div>
        {this.renderLoanTakingTab(state)}
      </div>
    )
  };

  render(props: PropsType, state: StateType) {
    return (
      <div>
        {this.renderIncome(state)}
        {this.renderExpenses(state)}
        {this.renderCredits(props, state)}
      </div>
    )
  }
}
