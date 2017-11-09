import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import Competitor from './competitor';

import logger from '../../../../helpers/logger/logger';

export default class Competitors extends Component {
  render() {
    const competitors = productStore.getCompetitorsList();

    const competitorList = competitors
      .map(c => c.companyId)
      .sort((c1, c2) => {
        const cost1 = productStore.getCompanyCost(c1);
        const cost2 = productStore.getCompanyCost(c2);

        logger.log(c1, c2, cost1, cost2);

        return cost2 - cost1;
      })
      .map(companyId => {
        return <Competitor
          name={productStore.getName(companyId)}
          cost={productStore.getCompanyCost(companyId)}
          income={productStore.getProductIncome(companyId)}
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
        </thead>
        <tbody>
        {competitorList}
        </tbody>
      </table>
    </div>;
  }
}
