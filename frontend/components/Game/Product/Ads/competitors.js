import { h, Component } from 'preact';

import flux from '../../../../flux';
import Competitor from './competitor';

import logger from '../../../../helpers/logger/logger';

export default class Competitors extends Component {
  buyCompany(buyerId, sellerId, transferSum) {
    const buyerName = flux.productStore.getName(buyerId);
    const sellerName = flux.productStore.getName(sellerId);

    flux.productActions.buyCompany(buyerId, sellerId);
    flux.productActions.decreaseMoney(transferSum);

    flux.messageActions.addNotification('company-merge', {
      buyerName,
      sellerName
    });
  }

  render({ id }) {
    const money = flux.productStore.getMoney(id);

    const competitors = flux.productStore.getCompetitorsList(id);

    logger.shit('competitors.js hardcoded isCompetitor check: c.id != 0');

    const competitorList = competitors.map((c, i) =>
      <Competitor
        c={c}
        i={i}
        money={money}
        rents={rents}
        onBuyCompany={() => { this.buyCompany(0, c.id, c.cost) }}
        isCompetitor={c.id != 0}
      />
    );

    return <div>
      <div className="content-title">Рейтинг компаний</div>
      <table className="table">
        <thead>
          <th>Компания</th>
          <th>Стоимость</th>
          <th>Доходы</th>
          <th>Технологии</th>
          <th>XP</th>
        </thead>
        <tbody>
          {competitorList}
        </tbody>
      </table>
    </div>;
  }
}
