import { h, Component } from 'preact';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import flux from '../../../../flux';
import Competitor from './competitor';

export default class Competitors extends Component {
  componentWillMount() {}

  render({ id }) {
    const money = flux.playerStore.getMoney();

    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, money);
    const {
      marketSize,
      ourClients,
      unbeatableClients,
      competitors,
    } = marketStats;
    const freeClients = marketSize - ourClients - unbeatableClients;

    const rating = flux.productStore.getRating(id);
        // <div className="offset-min competitor competeable">Свободные клиенты: {freeClients}</div>

    const buyCompany = (buyerId, sellerId, transferSum) => {
      flux.productActions.buyCompany(buyerId, sellerId);
      flux.playerActions.decreaseMoney(transferSum);
    };

    const competitorList = competitors.map((c, i) =>
      <Competitor
        c={c}
        i={i}
        rating={rating}
        money={money}
        onBuyCompany={() => { buyCompany(0, i + 1, c.cost) }}
      />
    );

    return <div>{competitorList}</div>;
  }
}
