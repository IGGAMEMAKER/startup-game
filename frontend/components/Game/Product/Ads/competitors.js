import { h, Component } from 'preact';

import flux from '../../../../flux';
import Competitor from './competitor';

import logger from '../../../../helpers/logger/logger';

export default class Competitors extends Component {
  buyCompany(buyerId, sellerId, transferSum) {
    flux.productActions.buyCompany(buyerId, sellerId);
    flux.playerActions.decreaseMoney(transferSum);
  }

  render({ id }) {
    const money = flux.playerStore.getMoney();

    const competitors = flux.productStore.getCompetitorsList(id);

    const rating = flux.productStore.getRating(id);

    logger.shit('competitors.js hardcoded isCompetitor check: c.id != 0');

    const competitorList = competitors.map((c, i) =>
      <Competitor
        c={c}
        i={i}
        rating={rating}
        money={money}
        onBuyCompany={() => { this.buyCompany(0, c.id, c.cost) }}
        isCompetitor={c.id != 0}
      />
    );

    return <div>{competitorList}</div>;
  }
}
