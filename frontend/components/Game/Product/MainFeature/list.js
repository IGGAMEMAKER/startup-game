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
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Улучшая главные характеристики продукта, вы увеличиваете доход с продукта</div>
          {supportTab}
          <br />
          <div className="">
            <table className="table table-striped" style={{ textAlign: 'center' }}>
              <thead>
                <th style={{ textAlign: 'left' }}>Технология</th>
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

    let upgradeCost = pp * 60;

    const upgradeable = productStore.getXP(id) >= 1;

    const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

    let profitPhrase;
    let normalized;
    let roi;

    let leaderInTechPhrase;
    if (isWeAreLeaders) {
      leaderInTechPhrase = 'Мы лидируем!';
      profitPhrase = '---';
      roi = '---';
      normalized = '---';
    } else {
      leaderInTechPhrase = `Лидер: "${leaderInTech.name}"`;
      profitPhrase = `+${benefit}$`;
      roi = Math.ceil(upgradeCost / benefit);

      normalized = Math.ceil(10 * benefit / upgradeCost) / 10;

      profitPhrase = `+${benefit}$`;
      // if (benefit > upgradeCost) {
      // } else {
      //   profitPhrase = `Окупится за ${roi} месяцев`;
      // }
    }
    // <div className="feature-item-secondary-text">Окупаемость: {roi} мес</div>
    // <div className="feature-item-secondary-text">Эффективность: {normalized}</div>
    //     <div className="feature-item-secondary-text">{leaderInTechPhrase}</div>
    //     <div className="feature-item-secondary-text">{leaderInTech.value}lvl</div>

    upgradeCost = 1;

    const maxLevel = leaderInTech.value;

    return <tr key={key}>
      <td style={{ textAlign: 'left' }}>
        <div>{userOrientedFeatureName}</div>
      </td>
      <td>
        <div>{isWeAreLeaders ? current : `${current} / ${maxLevel}`}</div>
      </td>
      <td>
        <div>{profitPhrase}</div>
      </td>
      <td>
        <div>{upgradeCost}XP</div>
      </td>
      <td>
        <UI.Button
          text="Улучшить"
          onClick={() => { this.improveFeature(id, featureId, 0, 1) }}
          disabled={!upgradeable}
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
