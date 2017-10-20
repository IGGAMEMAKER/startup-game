import { h, Component } from 'preact';

import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

import stageHelper from '../../../../helpers/stages';

export default class MainFeature extends Component {
  render({ id }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const product = productStore.getProduct(id);
    const defaults = productStore.getDefaults(id);

    const featureListTableView = defaults.features.map(this.renderMainFeature(product, id));

    const supportTab = this.renderSupportTab(id);

    return (
      <div>
        <div className="featureGroupTitle">Разработка</div>
        {supportTab}
        <br />
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Улучшая главные характеристики продукта, вы увеличиваете доход с продукта</div>
          <br />
          <div className="featureGroupBody">
            <table className="table table-striped">
              <thead>
              <th>Технология</th>
              <th>Уровень</th>
              <th>Польза</th>
              <th>Стоимость</th>
              <th>Действие</th>
              </thead>
              <tbody>
              {featureListTableView}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderSupportTab(id) {
    const support = productStore.getProductSupportCost(id);

    return <div>Стоимость поддержки продукта: {support}$ в месяц</div>
  }

  renderMainFeature = (product, id) => (defaultFeature, featureId) => {
    const featureGroup = 'offer';
    const featureName = defaultFeature.name;
    const { shortDescription } = defaultFeature;

    const current = product.features[featureGroup][featureId] || 0;


    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureName}${featureId}`;

    const leaderInTech = productStore.getLeaderInTech(featureId);

    const isWeAreLeaders = leaderInTech.id === 0;


    const pp = productStore.getMainFeatureUpgradeCost(id, featureId);

    const upgradeCost = pp * 60;

    const upgradeable = productStore.getMoney(id) >= upgradeCost;

    const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

    const profitPhrase = isWeAreLeaders ? '---' : `+${benefit}$`;

    let leaderInTechPhrase = `Лидер: "${leaderInTech.name}"`;
    if (isWeAreLeaders) {
      leaderInTechPhrase = 'Мы лидируем!';
    }

    return <tr key={key}>
      <td>
        <div>{userOrientedFeatureName}</div>
        <div className="feature-item-secondary-text">{leaderInTechPhrase}</div>
      </td>
      <td>
        <div>{current}lvl</div>
        <div className="feature-item-secondary-text">{leaderInTech.value}lvl</div>
      </td>
      <td>
        <div>{profitPhrase}</div>
      </td>
      <td>
        <div>{upgradeCost}$</div>
      </td>
      <td>
        <UI.Button
          disabled={!upgradeable}
          onClick={() => { this.improveFeature(id, featureId, upgradeCost, 1) }}
          text="Улучшить"
          secondary={upgradeable}
          gray={!upgradeable}
        />
      </td>
    </tr>
  };

  improveFeature(id, featureId, money, xp) {
    productActions.decreaseMoney(money, 0);

    productActions.improveFeature(id, 'offer', featureId, 1);
  }
}
