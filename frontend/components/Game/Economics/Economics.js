import { h, Component } from 'preact';

import UI from '../../UI';
import moneyCalculator from '../../../helpers/economics/money-difference';
import productStore from '../../../stores/product-store';
import productActions from '../../../actions/product-actions';

import Expenses from '../Player/Expenses';

import round from '../../../helpers/math/round';

import logger from '../../../helpers/logger/logger';

type PropsType = {};

type StateType = {};

export default class Economics extends Component {
  state = {
    possibleCredit: 0
  };

  componentWillMount() {
    this.pickData();

    productStore.addChangeListener(this.pickData);
  }

  pickData = () => {
    logger.shit('id=0 in components/Game/Economics/Economics');

    this.setState({
      money: productStore.getMoney(0),
      basicExpenses: productStore.getExpenses(),
      products: productStore.getOurProducts()
    })
  };

  renderIncome() {
    logger.shit('getRentIncomes(0) in renderIncome Economics/Economics');

    const productIncome = moneyCalculator.structured().byProductIncome
      .filter(p => p.income > 0)
      .map(p => (<div>{p.name} : {Math.floor(p.income)}$</div>));

    const rentIncomeList = productStore.getRentIncomes(0)
      .outgoingRents
      .map(r => (<li>Аренда технологии "{r.techName}" компанией "{r.acceptorName}" за {r.price}$</li>) );

    return (
      <div>
        <h4>Доходы</h4>
        <br />
        <div>Фриланс: 2000$</div>
        <div>{productIncome}</div>
        <div>Аренда технологий</div>
        <div>
          <ul>
            {rentIncomeList}
          </ul>
        </div>
        <hr />
      </div>
    )
  };

  renderExpenses = state => {
    const productExpenses = state.products.map((p, i) => productStore.getProductExpensesStructure(i));
    const basicExpenses = state.basicExpenses;
    const teamExpenses = moneyCalculator.structured().teamExpenses;
    const rentExpenses = productStore.getRentExpenses(0).incomingRents;
    logger.shit('getRentExpenses(0) in renderExpenses Economics/Economics');


    return <div>
      <Expenses
        productExpenses={productExpenses}
        basicExpenses={basicExpenses}
        teamExpenses={teamExpenses}
        rentExpenses={rentExpenses}
      />
      <hr />
    </div>;
  };

  takeLoan = amount => {
    const repay = 1.2;

    const monthlyPayment = Math.ceil(amount * repay / 100);
    return (
      <div>
        <div>
          Взять кредит на сумму {amount}$. Ежемесячный платёж составит: {monthlyPayment}$
        </div>
        <UI.Button text={`Взять кредит (${amount}$)`} onClick={() => productActions.loans.take(amount)} />
      </div>
    )
  };

  onDrag = (value) => {
    this.setState({ possibleCredit: Math.floor(value) });
  };

  getLoans = () => {
    return productStore.getLoanSize();
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
      </div>
    );
    // {this.renderCredits(props, state)}
  }
}
