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
    const XP = productStore.getXP(id);

    const cost = productStore.getFeatureIncreaseXPCost(id);
    const upgrade = productStore.getBestFeatureUpgradeVariantOnMarket(id, marketId);

    return <UI.Button
      onClick={() => this.improveFeature(id, upgrade.featureId, cost)}
      text="Улучшить приложение"
      primary
      disabled={XP < cost}
    />;
  }

  renderLoyalty(id, marketId) {
    const loyaltyStructured = productStore.getSegmentLoyaltyStructured(id, marketId);
    const loyalty = productStore.getSegmentLoyalty(id, marketId);

    let loyaltyIndicator;
    if (loyalty < 20) {
      loyaltyIndicator = <UI.SmallIcon src="/images/face-sad.png" />;
    } else if (loyalty < 60) {
      loyaltyIndicator = <UI.SmallIcon src="/images/face-neutral.png" />;
    } else {
      loyaltyIndicator = <UI.SmallIcon src="/images/face-happy.png" />;
    }

    const rating = Math.ceil(loyaltyStructured.ratingBasedLoyalty * 100);
    const errors = Math.ceil(loyaltyStructured.bugPenalty * 100);
    const newApp = Math.ceil(loyaltyStructured.isNewApp * 100);

    return <div>
      <div className="segment-value">Лояльность клиентов: {loyalty}%</div>
      <div className="segment-value">{loyaltyIndicator}</div>
      <br />
      <div className="segment-value">От рейтинга: <UI.ColoredValue value={rating} text="%" /></div>
      <div className="segment-value">Ошибки: <UI.ColoredValue value={-errors} text="%" /></div>
      <div className="segment-value">Новинка: <UI.ColoredValue value={newApp} text="%" /></div>
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
                <br />
                <div className="segment-value">{this.renderBestFeatureButton(id, marketId)}</div>
                <div className="segment-value">{this.renderBenefit(id, marketId)}</div>
                <br />
                <hr className="horizontal-separator"/>
                <br />
                <div className="segment-value">{this.renderLoyalty(id, marketId)}</div>
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
