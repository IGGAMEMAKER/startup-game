import { h, Component } from 'preact';

import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

import stageHelper from '../../../../helpers/stages';

export default class MainFeatures extends Component {
  render({ id }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const product = productStore.getProduct(id);
    const defaults = productStore.getDefaults(id);

    const featureListTableView = defaults.features.map(this.renderMainFeature(product, id));

    return (
      <div>
        <table className="table table-striped" style={{ textAlign: 'center' }}>
          <thead>
          <th>Уровень</th>
          <th style={{ textAlign: 'left' }}>Технология</th>
          <th>Польза</th>
          <th>Действие</th>
          </thead>
          <tbody>
          {featureListTableView}
          </tbody>
        </table>
      </div>
    );
  }

  renderMainFeature = (product, id) => (defaultFeature, featureId) => {
    const featureName = defaultFeature.shortDescription;

    const upgradeCost = productStore.getFeatureIncreaseXPCost(id);
    const upgradeable = productStore.getXP(id) >= upgradeCost;


    const leaderInTech = productStore.getLeaderInTech(featureId);
    const isWeAreLeaders = leaderInTech.id === 0;

    let profitPhrase, text, current;

    current = product.features.offer[featureId];

    if (isWeAreLeaders) {
      profitPhrase = <div>Совершить прорыв!</div>;
      text = 'Улучшить';
    } else {
      const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

      profitPhrase = `+${benefit}$`;
      text = `Улучшить`;
    }

    return <tr key={`feature-${featureId}`}>
      <td>
        <div>{current}</div>
      </td>
      <td style={{ textAlign: 'left' }}>
        <div>{featureName}</div>
      </td>
      <td>
        <div>{profitPhrase}</div>
      </td>
      <td>
        <UI.Button
          text={text}
          onClick={() => { this.improveFeature(id, featureId, upgradeCost) }}
          disabled={!upgradeable}
          secondary={upgradeable}
          gray={!upgradeable}
        />
      </td>
    </tr>
  };

  improveFeature(id, featureId, xp) {
    productActions.improveFeature(id, 'offer', featureId, 1, xp);
  }
}
