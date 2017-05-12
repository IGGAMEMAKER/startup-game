import { h, Component } from 'preact';
import AdsPanel from '../Ads/advert-planner-panel';


type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class ClientPanel extends Component {
  state = {};

  componentWillMount() {}

  render({ id, product }, state: StateType) {
    const { idea } = product;
    const marketing = this.plainifySameTypeFeatures(id, idea, 'marketing', 'Блок маркетинга полностью улучшен!');

    const churn = productStore.getChurnRate(id).pretty;
    const disloyalClients = productStore.getDisloyalClients(id);

    const rating = productStore.getRating(id);

    const market = productStore.getMarketShare(id);

    const competitor = productStore.getNextCompetitorInfo(id);
    let nearestCompetitor;

    if (competitor) {
      nearestCompetitor = (
        <div>
          <div>Наш ближайший конкурент</div>
          <Competitor rating={rating} c={competitor} i={-1} />
        </div>
      )
    } else {
      nearestCompetitor = (
        <div>Вы - №1 на рынке! Вы можете захватить вплоть до 100% рынка!</div>
      )
    }

    return (
      <div>
        <div className="featureGroupTitle">Работа с клиентами</div>
        <div>Наши клиенты: {market.clients} ({market.share}% рынка)</div>
        <div>
          <b>Рекламная кампания</b>
          <AdsPanel product={product} id={id} />
          <br />
        </div>

        {nearestCompetitor}
        <br />
        <div>Каждый месяц мы теряем {disloyalClients} клиентов (отток: {churn}%)</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Позволяет снизить отток клиентов, повышая их лояльность</div>
          <div className="featureGroupBody">{marketing}</div>
        </div>
      </div>
    );
  }
}
