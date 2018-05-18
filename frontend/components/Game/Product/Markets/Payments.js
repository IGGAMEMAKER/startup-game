import { h, Component } from 'preact';

import productStore from '../../../../stores/store';
import productActions from '../../../../actions/product-actions';

import UI from '../../../UI';

export default class Payments extends Component {
  renderAcquisitionButtons(id, marketId) {
    const expertise = productStore.getMarketingKnowledge(id, marketId);

    const buttons = [{ clients: 50 }];

    if (expertise >= 10) {
      buttons.push({ clients: 125 })
    }

    if (expertise >= 30) {
      buttons.push({ clients: 225 })
    }

    if (expertise >= 55) {
      buttons.push({ clients: 500 })
    }

    if (expertise >= 75) {
      buttons.push({ clients: 1500 })
    }

    return buttons.reverse().map(b => this.renderGetMoreClientsButton(id, marketId, b.clients, b.clients * 10));
  }

  renderGetMoreClientsButton(id, marketId, amountOfClients = 50, price) {
    const isCanGrabMoreClients = productStore.isCanGrabMoreClients(id, marketId, amountOfClients, price);

    return (
      <div>
        <UI.Button
          onClick={() => productActions.addClients(id, marketId, amountOfClients, price)}
          text={`Привлечь ${amountOfClients} клиентов`}
          primary
          disabled={!isCanGrabMoreClients}
        />
        <br />
      </div>
    );
  }

  renderUnexploredMarket = (marketId, market, id) => {
    return '';

    return <div>
      {id}
      {JSON.stringify(market)}
    </div>
  };

  render({ marketId, market, id, explored }) {
    if (!explored) return this.renderUnexploredMarket(marketId, market, id);

    const clients = productStore.getClientsOnMarket(id, marketId);
    const income = productStore.getMarketIncome(id, marketId);
    const marketSize = productStore.getMarketSize(marketId);

    // const isServersExplored = true;
    // if (isServersExplored) {
    //
    // }
    // <div className="segment-attribute flexbox">
    //   <div className="flex-splitter">
    //     <div className="segment-value"><UI.SmallIcon title="Ежемесячные доходы" src="/images/coins.png" /> +{income}</div>
    //   </div>
    //   <div className="flex-splitter">
    //     <div className="segment-value"><UI.SmallIcon src="/images/coins.png" />Max: {marketSize}</div>
    //   </div>
    // </div>

    return (
      <div className="segment-block">
        <div className="content-block">
          <div className="client-market-item">
            <div>
              <div className="center segment-client-type">{market.clientType}</div>
              <div className="segment-attribute flexbox">
                <div className="flex-splitter">
                  <div className="segment-value"><UI.SmallIcon src="/images/clients.png" />{clients}</div>
                </div>
                <div className="flex-splitter">
                  <div className="segment-value"><UI.SmallIcon src="/images/clients.png" />Max: {market.clients}</div>
                </div>
              </div>
              <br />
              <div className="segment-attribute">
                <div className="segment-value">{this.renderAcquisitionButtons(id, marketId)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
