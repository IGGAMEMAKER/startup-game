import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import UI from '../../../UI';

export default class SegmentExplorer extends Component {
  renderResearchButton(id, marketId, explored, needsToBeExplored, enoughXPsToExplore, explorationCost = 50) {
    if (explored) {
      return <div>Исследовано</div>;
    }

    if (!needsToBeExplored) {
      return <div>???</div>;
    }

    if (!enoughXPsToExplore) {
      return <div>Нужно {explorationCost}{UI.icons.XP} для исследования :(</div>;
    }

    return (
      <div>
        <div>Стоимость исследования: {explorationCost}{UI.icons.XP}</div>
        <UI.Button
          onClick={() => productActions.exploreMarket(id, marketId, explorationCost)}
          text="Исследовать рынок!"
          primary
        />
        <br />
      </div>
    );
  }

  render({ id, market, explored, explorable, enoughXPsToExplore }) {
    const { clientType, explorationCost } = market;

    const marketSize = market.clients * market.price;

    // return <div>Exploration of #{marketId}: costs ${explorationCost}XP, explored:{explored}, isExplorable:{explorable}</div>

    const fade = !explorable ? 'darken' : '';

    return (
      <div className={`segment-block ${fade}`}>
        <div className="content-block">
          <div className="client-market-item">
            <div>
              <div className="center segment-client-type">{clientType}</div>
              <div className="segment-attribute flexbox">
                <div className="flex-splitter">
                  <div className="segment-value"><UI.SmallIcon src="/images/coins.png" />Объём рынка: {marketSize}$</div>
                </div>
                <div className="flex-splitter">
                  <div className="segment-value"><UI.SmallIcon src="/images/clients.png" />Клиентов: {market.clients}</div>
                </div>
              </div>
              <br />
              <div className="segment-attribute">
                <div className="segment-value">{this.renderResearchButton(id, market.id, explored, explorable, enoughXPsToExplore, explorationCost)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
