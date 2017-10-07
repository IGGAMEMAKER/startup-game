import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import Competitor from './competitor';

import logger from '../../../../helpers/logger/logger';

export default class Competitors extends Component {
  render() {
    const competitors = productStore.getCompetitorsList();

    logger.shit('competitors.js hardcoded isCompetitor check: c.id != 0');

    logger.log('competitors', competitors);

    const competitorList = competitors.map((c, i) => {
      const companyId = c.companyId;
      const cost = productStore.getCompanyCost(companyId);
      const income = productStore.getProductIncome(companyId);

      return <Competitor
        c={c}
        i={i}
        cost={cost}
        income={income}
        isCompetitor={companyId != 0}
      />
    });

    return <div>
      <div className="content-title">Рейтинг компаний</div>
      <table className="table">
        <thead>
        <th>Компания</th>
        <th>Стоимость</th>
        <th>Доходы</th>
        <th>XP</th>
        </thead>
        <tbody>
        {competitorList}
        </tbody>
      </table>
    </div>;
  }
}
