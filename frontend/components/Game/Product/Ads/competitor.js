import { h, Component } from 'preact';

import logger from '../../../../helpers/logger/logger';

import shortenValue from '../../../../helpers/math/shorten-value';

import Product from '../../../../classes/Product';

import UI from '../../../UI';

export default class Competitor extends Component {
  render({ i, isCompetitor, cost, income }) {
    const { c } : Product = this.props;

    const name = c.name;

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
        <div className="secondary-text">{c.style}</div>
      </td>
      <td>{companyCost}$</td>
      <td>{companyIncome}$ / мес</td>
      <td>{c.XP}XP</td>
    </tr>;
  }
}
