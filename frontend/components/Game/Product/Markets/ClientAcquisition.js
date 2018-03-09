import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class ClientAcquisition extends Component {
  renderBenefit(id, marketId) {
    const upgrade = productStore.getBestFeatureUpgradeVariantOnMarket(id, marketId);

    const maxBenefit = productStore.getProductIncomeIncreaseIfWeUpgradeFeature(id, upgrade.featureId, 1);

    const income =  shortenValue(maxBenefit);

    return <div className="segment-value">Доход: +${income}</div>;
  };

  renderBestFeatureButton(id, marketId) {
    const cost = productStore.getFeatureIncreaseXPCost(id);

    const XP = productStore.getXP(id);

    const upgrade = productStore.getBestFeatureUpgradeVariantOnMarket(id, marketId);

    const disabled = XP < cost;

    return <UI.Button
      onClick={() => this.improveFeature(id, upgrade.featureId, cost)}
      text="Улучшить"
      primary
      disabled={disabled}
    />;
  }

  renderGetMoreClientsButton(id, marketId, amountOfClients = 50) {
    return <div>
      <UI.Button
        onClick={() => this.getMoreClients(id, marketId, amountOfClients)}
        text={`Привлечь ${amountOfClients} клиентов`}
        primary
        disabled={false}
      />
      <br />
    </div>;
  }

  renderAcquisitionButtons(id, marketId) {
    const expertise = productStore.getMarketingKnowledge(id, marketId);

    const buttons = [];

    if (expertise < 10) {
      buttons.push({ clients: 50 })
    } else if (expertise < 30) {
      buttons.push({ clients: 125 })
    } else if (expertise < 55) {
      buttons.push({ clients: 225 })
    } else if (expertise < 75) {
      buttons.push({ clients: 500 })
    } else {
      buttons.push({ clients: 1500 })
    }

    return buttons.map(b => this.renderGetMoreClientsButton(id, marketId, b.clients, b.clients * 10));
  }

  getMoreClients(id, marketId, count) {
    productActions.addClients(id, marketId, count);
  }

  improveFeature(id, featureId, xp) {
    productActions.improveFeature(id, 'offer', featureId, 1, xp);
  }

  renderUnexploredMarket = (marketId, market, id) => {
    return <div>
      {id}
      {JSON.stringify(market)}
    </div>
  };

  render({ marketId, market, id, explored }) {
    if (!explored) return this.renderUnexploredMarket(marketId, market, id);

    const { clientType } = market;

    const clients = productStore.getClientsOnMarket(id, marketId);
    const maxAmountOfClients = market.clients; // productStore.getMaxClientsOnMarket(id, marketId);

    return (
      <div className="segment-block">
        <div className="content-block">
          <div className="client-market-item">
            <div>
              <div className="center segment-client-type">{clientType}</div>
              <div className="segment-attribute">
                <div className="segment-value">Клиенты: {clients}/{maxAmountOfClients}</div>
                <br />
                <div className="segment-value">{this.renderAcquisitionButtons(id, marketId)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
