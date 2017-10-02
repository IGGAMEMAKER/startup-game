import { h, Component } from 'preact';

import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

import stageHelper from '../../../../helpers/stages';

export default class MainFeature extends Component {
  render({ id, onHireProgrammerClick }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const product = productStore.getProduct(id);
    const defaults = productStore.getDefaults(id);

    logger.log('MainFeature', product);

    const featureListTableView = defaults.features.map(this.renderMainFeature(product, id));

    const supportTab = this.renderProgrammingSupportTab(id, onHireProgrammerClick);

          // {JSON.stringify(product.features.offer)}
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
              <th>Стоимость улучшения</th>
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

  renderProgrammingSupportTab(id, onHireProgrammerClick) {
    const support = productStore.getProgrammingSupportCost(id);
    const ppIncrease = productStore.getMonthlyProgrammerPoints(id);
    const isNeedProgrammer = productStore.isNeedProgrammer(id);

    let hireProgrammerLink;

    if (isNeedProgrammer) {
      hireProgrammerLink = <div className="alert alert-danger">
        <div>
          <strong>Наши программисты не справляются с нагрузкой</strong>
          <div>(мы теряем {support - ppIncrease}PP ежемесячно)</div>
        </div>
        <br />
        <UI.Button secondary text="Нанять программиста" onClick={onHireProgrammerClick} />
      </div>
    }

    return <div>
      <div>Стоимость поддержки продукта: {support}PP в месяц</div>
      <div>Наши программисты производят: {ppIncrease}PP в месяц</div>
      <div>{hireProgrammerLink}</div>
    </div>
  }

  renderMainFeature = (product, id) => (defaultFeature, featureId) => {
    const featureGroup = 'offer';
    const featureName = defaultFeature.name;
    const { shortDescription } = defaultFeature;

    const current = product.features[featureGroup][featureId] || 0;


    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureGroup}${featureName}${featureId}`;

    const leaderInTech = productStore.getLeaderInTech(featureId);

    const isWeAreLeaders = leaderInTech.id === 0;

    const pp = productStore.getMainFeatureUpgradeCost(id, featureId);

    const enoughPPs = productStore.enoughProgrammingPoints(pp, id);

    const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

    const profitPhrase = benefit ? `+${benefit}$` : `???`;

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
        <div>{pp} PP</div>
      </td>
      <td>
        <UI.Button
          disabled={!enoughPPs}
          onClick={() => { this.improveFeature(id, featureId, pp) }}
          text="Улучшить"
          secondary={enoughPPs}
          gray={!enoughPPs}
        />
      </td>
    </tr>
  };

  improveFeature(id, featureId, pp) {
    productActions.spendPoints(pp, 0);

    productActions.improveFeature(id, 'offer', featureId, 1);
  }
}
