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

    playerStore.addChangeListener(this.pickMoney)
    productStore.addChangeListener(this.pickProducts)
  }

  pickProducts = () => {
    this.setState({
      products: productStore.getProducts()
    })
  };

  pickMoney = () => {
    this.setState({
      money: playerStore.getMoney()
    })
  };

  renderIncome = state => {
    // {JSON.stringify(state.income)}
    const productIncome = moneyCalculator.structured().byProductIncome
      .filter(p => p.income > 0)
      .map(p => (<div>{p.name} : {p.income}$</div>));

    return (
      <div>
        <b>Доходы</b>
        <br />
        <div>Фриланс: 5000$</div>
        <div>{productIncome}</div>
      </div>
    )
  };

  renderExpenses = state => {
    const expenses = state.products.map((p, i) => productStore.getProductExpensesStructure(i));

    return <Expenses expenses={expenses} />;
  };

  render(props: PropsType, state: StateType) {
    const loans = playerStore.getLoanSize();

    let loanStatusTab = <div>Долгов нет</div>;
    if (loans > 0) {
      loanStatusTab = (
        <div>
          Суммарная задолженность {loans}$
        </div>
      );
    }

    const takeLoan = amount => {
      const repay = 1.3;
      return (
        <div>
          <div>
            Взять кредит на сумму {amount}$. Ежемесячный платёж составит: {amount * repay / 100}$
          </div>
          <UI.Button text={`Взять кредит (${amount}$)`} onClick={() => playerActions.loans.take(amount)} />
        </div>
      )
    };

    const onDrag = (value) => {
      this.setState({ possibleCredit: Math.floor(value) });
    };

    const { possibleCredit } =  state;

    const maxLoanSize = (moneyCalculator.structured().income - loans) * 12;
    let loanTakingTab;

    if (maxLoanSize <= 0) {
      loanTakingTab = <div>Вы больше не можете брать займы. Выплатите предыдущие займы!</div>
    } else {
      loanTakingTab = (
        <div>
          <UI.Range min={0} max={maxLoanSize} onDrag={onDrag} />
          {takeLoan(possibleCredit)}
        </div>
      )
    }

    return (
      <div>
        <div>На вашем счету: {round(state.money)}$</div>
        {loanTakingTab}
        {loanStatusTab}
        {this.renderIncome(state)}
        {this.renderExpenses(state)}
      </div>
    )
  }
}
