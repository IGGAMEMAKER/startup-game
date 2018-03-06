import { h, Component } from 'preact';

import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

import stageHelper from '../../../../helpers/stages';

export default class MainFeatures extends Component {
  render({ id }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const product = productStore.getProduct(id);
    const defaults = productStore.getDefaults(id);

    const featureListTableView = defaults.features.map(this.renderMainFeature(product, id));

    const supportTab = this.renderSupportTab(id);

    return (
      <div>
        <div className="featureGroupDescription">Улучшая главные характеристики продукта, вы увеличиваете доход с продукта</div>
        {supportTab}
        <br />
        <div>
          <table className="table table-striped" style={{ textAlign: 'center' }}>
            <thead>
            <th style={{ textAlign: 'left' }}>Технология</th>
            <th>Польза</th>
            <th>Действие</th>
            </thead>
            <tbody>
            {featureListTableView}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderSupportTab(id) {
    const XP = productStore.getXP(id);

    return <div>Очки улучшений: {XP}</div>;
  }

  renderMainFeature = (product, id) => (defaultFeature, featureId) => {
    const featureName = defaultFeature.name;
    const { shortDescription } = defaultFeature;

    const current = product.features.offer[featureId];


    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureName}${featureId}`;

    const leaderInTech = productStore.getLeaderInTech(featureId);

    const isWeAreLeaders = leaderInTech.id === 0;

    const upgradeCost = productStore.getFeatureIncreaseXPCost(id);



    const upgradeable = productStore.getXP(id) >= upgradeCost;

    const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

    let profitPhrase;

    if (isWeAreLeaders) {
      profitPhrase = '???';
    } else {
      profitPhrase = `+${benefit}$`;
    }

    const maxLevel = leaderInTech.value;

        // <div>{isWeAreLeaders ? current : `${current} / ${maxLevel}`}</div>
      // <td>
      //   <div>{current}</div>
      // </td>

    const text = current + 1 > maxLevel ? 'Совершить прорыв!' : `Улучшить до ${current + 1} lvl`;

    return <tr key={key}>
      <td style={{ textAlign: 'left' }}>
        <div>{userOrientedFeatureName}</div>
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
