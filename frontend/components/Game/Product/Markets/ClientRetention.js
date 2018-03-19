import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class SegmentUpgrader extends Component {
  state = {
    toggle: false
  };

  toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  };

  improveFeature(id, featureId, xp) {
    productActions.improveFeature(id, 'offer', featureId, 1, xp);
  }

  renderImprovementVariants(id, marketId) {
    const upgrade = productStore.getBestFeatureUpgradeVariantOnMarket(id, marketId);

    if (!upgrade.loyaltyChange) {
      return <div>Нет доступных улучшений :(</div>;
    }

    const loyaltyChange = Math.ceil(upgrade.loyaltyChange * 1000) / 10;
    const ratingChange = Math.ceil(upgrade.ratingChange * 100) / 100;

    const XP = productStore.getXP(id);

    const cost = productStore.getFeatureIncreaseXPCost(id);

        // <div className="segment-value">{JSON.stringify(upgrade)}</div>
    return (
      <div>
        <div>
          <UI.Button
            onClick={() => this.improveFeature(id, upgrade.featureId, cost)}
            text="Улучшить приложение"
            primary
            disabled={XP < cost}
          />
        </div>
        <div className="segment-value">Рейтинг: +{ratingChange}</div>
        <div className="segment-value">Лояльность: +{loyaltyChange}%</div>
      </div>
    );
  }

  renderLoyaltyToggle() {
    return <span>(<span className="toggle" onClick={this.toggle}>Посмотреть отчёт</span>)</span>;
  }

  renderBugFixLink(errors) {
    if (!errors) return '';

    return <span>(<span className="toggle">Исправить</span>)</span>;
  }

  renderLoyaltyIndicator(id, marketId) {
    const loyalty = productStore.getSegmentLoyalty(id, marketId);

    if (loyalty < 20) {
      return <UI.SmallIcon src="/images/face-sad.png" />;
    } else if (loyalty < 60) {
      return <UI.SmallIcon src="/images/face-neutral.png" />;
    }

    return <UI.SmallIcon src="/images/face-happy.png" />;
  }

  renderLoyaltyDescription(id, marketId) {
    const loyaltyStructured = productStore.getSegmentLoyaltyStructured(id, marketId);

    const rating = Math.ceil(loyaltyStructured.ratingBasedLoyalty * 100);
    const errors = Math.ceil(loyaltyStructured.bugPenalty * 100);
    const newApp = Math.ceil(loyaltyStructured.isNewApp * 100);
    const isBestApp = Math.ceil(loyaltyStructured.isBestApp * 100);


    if (this.state.toggle) {
      return <div>
        <br />
        <div className="segment-value">От рейтинга: <UI.ColoredValue value={rating} text="%" /></div>
        <div className="segment-value">Ошибки: <UI.ColoredValue value={-errors} text="%" /> {this.renderBugFixLink(errors)}</div>
        <div className="segment-value">Новинка: <UI.ColoredValue value={newApp} text="%" /></div>
        {
          isBestApp > 0
            ?
            <div className="segment-value">Лидерство по рейтингу: <UI.ColoredValue value={isBestApp} text="%"/></div>
            :
            ''
        }
      </div>;
    }

    return '';
  }

  renderLoyalty(id, marketId) {
    const loyalty = productStore.getSegmentLoyalty(id, marketId);
    const loyaltyIndicator = this.renderLoyaltyIndicator(id, marketId);

    const description = this.renderLoyaltyDescription(id, marketId);
    const toggle = this.renderLoyaltyToggle(id, marketId);

    return <div>
      <div className="segment-value">Лояльность клиентов: {loyalty}% {toggle}</div>
      <div className="segment-value">{loyaltyIndicator}</div>
      {description}
    </div>
  }

  render({ marketId, market, id }) {
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
                <div className="segment-value">{this.renderImprovementVariants(id, marketId)}</div>
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
