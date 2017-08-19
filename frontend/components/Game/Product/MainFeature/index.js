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

    const featureList = defaults.features.map(this.renderMainFeature('offer', product, id));
    const featureListTableView = defaults.features.map(this.renderMainFeature('offer', product, id, true));

          // <div className="featureGroupBody">{featureList}</div>
    return (
      <div>
        <div className="featureGroupTitle">Разработка</div>
        {this.renderProgrammingSupportTab(id, onHireProgrammerClick)}
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

    let hireProgrammerLink;

    if (support > ppIncrease) {
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

  renderUpgradeCostModifierBonus(id, featureId) {
    if (productStore.isUpgradeWillResultTechBreakthrough(id, featureId)) {
      return `Мы задаём новые тренды, но это даётся нелегко. Стоимость улучшения повышается`;
    }

    if (productStore.isWeAreRetards(id, featureId)) {
      return `Мы отстаём от конкурентов, поэтому копируем всё у них. Стоимость улучшения снижена`;
    }

    return '';
  }

  renderUpgradeCostModifierBonusInTable(id, featureId) {
    if (productStore.isUpgradeWillResultTechBreakthrough(id, featureId)) {
      return `+400%`;
    }

    if (productStore.isWeAreRetards(id, featureId)) {
      return `-80%`;
    }

    return '---';
  }

  renderMainFeature = (featureGroup, product, id, isTableView) => (defaultFeature, featureId) => {
    const featureName = defaultFeature.name;
    const { shortDescription } = defaultFeature;

    const current = product.features[featureGroup][featureId] || 0;


    const description = defaultFeature.description || '';
    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureGroup}${featureName}${featureId}`;

    const leaderInTech = productStore.getLeaderInTech(id, featureId);

    const minify = v => {
      return Math.floor(v / 1000);
    };

    let leaderInTechPhrase = `Лидер в этой технологии: Компания "${leaderInTech.name}" (${minify(leaderInTech.value)}lvl)`;

    const isWeAreLeaders = leaderInTech.id === 0;

    if (isWeAreLeaders) {
      leaderInTechPhrase = `Мы лидируем в этой технологии!`;
    }

    const pp = productStore.getMainFeatureUpgradeCost(id, featureId);

    const enoughPPs = productStore.enoughProgrammingPoints(pp, id);

    const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

    let profitPhrase = benefit ?
      <div>Мы заработаем на {benefit}$ больше в этом месяце</div>
      :
      <div>Изменение дохода непредсказуемо</div>;

    if (isTableView) {
      profitPhrase = benefit ? `+${benefit}$` : `???`;

      leaderInTechPhrase = `Лидер: "${leaderInTech.name}"`;
      if (isWeAreLeaders) leaderInTechPhrase = 'Мы лидируем!';

      let specificBenefit = '';
      if (benefit) {
        specificBenefit = `+${Math.floor(benefit / pp)}$/PP`;
      }


      return <tr key={key}>
        <td>
          <div>{userOrientedFeatureName}</div>
          <div className="feature-item-secondary-text">{leaderInTechPhrase}</div>
        </td>
        <td>
          <div>{minify(current)}lvl</div>
          <div className="feature-item-secondary-text">{minify(leaderInTech.value)}lvl</div>
        </td>
        <td>
          <div>{profitPhrase}</div>
          <div className="feature-item-secondary-text">{specificBenefit}</div>
        </td>
        <td>
          <div>{pp} PP</div>
        </td>
        <td>
          <UI.Button
            disabled={!enoughPPs}
            onClick={() => { this.improveFeature(id, featureId, pp) }}
            text="Улучшить"
            primary
          />
        </td>
      </tr>
    }

    return <div key={key}>
      <div className="content-block">
        <div>
          <div>{leaderInTechPhrase}</div>
          <span>{userOrientedFeatureName} {minify(current)}lvl</span>
        </div>
        <br />
        <div className="featureDescription">{description}</div>
        <div className="hypothesis-wrapper">
          {profitPhrase}
          <div>{this.renderUpgradeCostModifierBonus(id, featureId)}</div>
          <UI.Button
            disabled={!enoughPPs}
            onClick={() => { this.improveFeature(id, featureId, pp) }}
            text={`Улучшить за ${pp}PP`}
            primary
          />
        </div>
      </div>

      <hr color="white" />
    </div>
  };

  improveFeature(id, featureId, pp) {
    productActions.spendPoints(pp, 0);

    productActions.improveFeature(id, 'offer', featureId, 1000);
  }
}
