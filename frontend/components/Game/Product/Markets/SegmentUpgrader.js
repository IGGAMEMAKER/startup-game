import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class SegmentUpgrader extends Component {
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

  renderLoyalty(id, marketId) {
    const rating = productStore.getRating(id, marketId);
    const loyalty = productStore.getSegmentLoyalty(id, marketId);

    let loyaltyIndicator;
    if (rating < 5) {
      loyaltyIndicator = <UI.SmallIcon src="/images/face-sad.png" />;
    } else if (rating < 8) {
      loyaltyIndicator = <UI.SmallIcon src="/images/face-neutral.png" />;
    } else {
      loyaltyIndicator = <UI.SmallIcon src="/images/face-happy.png" />;
    }

    return <div>
      <div className="segment-value">Лояльность клиентов</div>
      <div className="segment-value">{loyalty}</div>
      <br />
      <div className="segment-value">{loyaltyIndicator}</div>
    </div>
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
                <div className="segment-value">{this.renderLoyalty(id, marketId)}</div>
                <br />
                <div className="segment-value">{this.renderBestFeatureButton(id, marketId)}</div>
                <div className="segment-value">{this.renderBenefit(id, marketId)}</div>
              </div>

              <div className="segment-attribute">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
