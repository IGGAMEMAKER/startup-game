import { h, Component } from 'preact';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import flux from '../../../../flux';
import Competitor from './competitor';

import logger from '../../../../helpers/logger/logger';

export default class Competitors extends Component {
  componentWillMount() {}

  render({ id }) {
    const money = flux.playerStore.getMoney();

    const competitors = flux.productStore.getCompetitorsList(id);

    const rating = flux.productStore.getRating(id);
        // <div className="offset-min competitor competeable">Свободные клиенты: {freeClients}</div>

    const buyCompany = (buyerId, sellerId, transferSum) => {
      // console.log('buyC', sellerId);

      flux.productActions.buyCompany(buyerId, sellerId);
      flux.playerActions.decreaseMoney(transferSum);
      // flux.messageActions.addGameEvent(transferSum);
    };

    const competitorList = competitors.map((c, i) =>
      <Competitor
        c={c}
        i={i}
        rating={rating}
        money={money}
        onBuyCompany={() => { buyCompany(0, c.id, c.cost) }}
        isCompetitor={c.id != 0}
      />
    );

    return <div>{competitorList}</div>;
  }
}
