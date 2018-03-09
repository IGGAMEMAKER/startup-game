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

  renderGetMoreClientsButton(id, marketId) {
    return <UI.Button
      onClick={() => this.getMoreClients(id, marketId, 50)}
      text="Привлечь 50 клиентов"
      primary
      disabled={false}
    />;
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
                <div className="segment-value">{this.renderGetMoreClientsButton(id, marketId)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
