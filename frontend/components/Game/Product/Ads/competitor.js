import { h, Component } from 'preact';

import shortenValue from '../../../../helpers/math/shorten-value';

export default class Competitor extends Component {
  render({ name, isCompetitor, cost, income }) {
    let background = 'competitor competeable';
    let companyTitle = `${name} (Это мы)`;

    if (isCompetitor) {
      background = 'competitor uncompeteable';
      companyTitle = name;
    }

    const companyCost = shortenValue(cost);
    const companyIncome = shortenValue(income);

    return <tr className={background}>
      <td>
        <div>{companyTitle}</div>
      </td>
      <td>{companyCost}$</td>
      <td>{companyIncome}$ / мес</td>
    </tr>;
  }
}
