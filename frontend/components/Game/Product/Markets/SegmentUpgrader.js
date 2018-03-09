import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class SegmentUpgrader extends Component {
  renderSetMainMarketButton = (id, marketId) => {
    return <div></div>;
    return <div>
      <UI.Button
        link
        text="Сделать этот рынок приоритетным"
        onClick={() => productActions.setAsMainMarket(id, marketId)}
      />
      <span className="offset-mid">Это усилит наше влияние на 20%</span>
    </div>
  };

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

  improveFeature(id, featureId, xp) {
    productActions.improveFeature(id, 'offer', featureId, 1, xp);
  }

  render({ marketId, market, id, explored }) {
    if (!explored) return <div></div>;

    const { clientType } = market;

    const rating = productStore.getRating(id, marketId);

    return (
      <div className="segment-block">
        <div className="content-block">
          <div className="client-market-item">
            <div>
              <div className="center segment-client-type">{clientType}</div>
              <div className="segment-attribute">
                <div className="segment-value">Рейтинг: <ColoredRating rating={rating} /></div>
                <br />
                <div className="segment-value">{this.renderBestFeatureButton(id, marketId)}</div>
                <div className="segment-value">{this.renderBenefit(id, marketId)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
