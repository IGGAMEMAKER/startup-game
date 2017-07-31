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

    return (
      <div>
        <div className="featureGroupTitle">Разработка</div>
        {this.renderProgrammingSupportTab(id, onHireProgrammerClick)}
        <br />
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">Улучшая главные характеристики продукта, вы увеличиваете доход с продукта</div>
          <br />
          <div className="featureGroupBody">{featureList}</div>
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

  renderMainFeature = (featureGroup, product, id) => (defaultFeature, featureId) => {
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
    if (leaderInTech.id === 0) {
      leaderInTechPhrase = `Мы лидируем в этой технологии!`;
    }

    const pp = productStore.getMainFeatureUpgradeCost(id, featureId);

    const enoughPPs = productStore.enoughProgrammingPoints(pp, id);

    const benefit = productStore.getBenefitOnFeatureImprove(id, featureId);

    const profitPhrase = benefit ?
      <div>Мы заработаем на {benefit}$ больше в этом месяце</div>
      :
      <div>Изменение дохода непредсказуемо</div>;

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
