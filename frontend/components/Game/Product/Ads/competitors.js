import { h, Component } from 'preact';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import flux from '../../../../flux';
import Competitor from './competitor';

export default class Competitors extends Component {
  componentWillMount() {}

  render({ id }) {
    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, flux.playerStore.getMoney());
    const {
      marketSize,
      ourClients,
      unbeatableClients,
      competitors,
    } = marketStats;
    const freeClients = marketSize - ourClients - unbeatableClients;

    const rating = flux.productStore.getRating(id);
    return (
      <div>
        <div className="offset-min competitor competeable">Свободные клиенты: {freeClients}</div>
        <div>{competitors.map((c, i) => <Competitor rating={rating} c={c} i={i} />)}</div>
      </div>
    );
  }
}
