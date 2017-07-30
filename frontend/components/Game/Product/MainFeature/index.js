import { h, Component } from 'preact';

import flux from '../../../../flux';
import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';
import round from '../../../../helpers/math/round';

import stageHelper from '../../../../helpers/stages';

export default class MainFeature extends Component {
  render({ id, onHireProgrammerClick }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const product = flux.productStore.getProduct(id);
    const availableSegments = null; // flux.productStore.getAvailableSegments(id);
    const defaults = flux.productStore.getDefaults(id);

    const featureList = defaults.features
      .map(this.renderMainFeature('offer', product, id, availableSegments, defaults));

    return (
      <div>
        <div className="featureGroupTitle">Разработка</div>
        {this.renderProgrammingSupportTab(id, onHireProgrammerClick)}
        <br />
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">
            Улучшая главные характеристики продукта, вы повышаете его рейтинг,
            что приводит к снижению оттока клиентов и увеличению доходов с продукта
          </div>
          <br />
          <div className="featureGroupBody">{featureList}</div>
        </div>
      </div>
    );
  }

  renderProgrammingSupportTab(id, onHireProgrammerClick) {
    const support = flux.productStore.getProgrammingSupportCost(id);
    const ppIncrease = flux.productStore.getMonthlyProgrammerPoints(id);

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
    if (flux.productStore.isUpgradeWillResultTechBreakthrough(id, featureId)) {
      return `Мы задаём новые тренды, но это даётся нелегко. Стоимость улучшения повышается`;
    }

    if (flux.productStore.isWeAreRetards(id, featureId)) {
      return `Мы отстаём от конкурентов, поэтому копируем всё у них. Стоимость улучшения снижена`;
    }

    return '';
  }

  renderProgressBar(current, product, max) {
    const data = [
      { value: current }
    ];

    if (product.XP >= 1000) {
      data.push({ value: 1000, style: 'bg-success' })
    }

    return <UI.Bar min={0} max={max} data={data} />;
  }

  renderMainFeature = (featureGroup, product, id, segments, defaults) => (defaultFeature, featureId) => {
    const featureName = defaultFeature.name;
    const { shortDescription } = defaultFeature;

    const current = product.features[featureGroup][featureId] || 0;
    const max = flux.productStore.getCurrentMainFeatureDefaultsById(id)[featureId]; // defaultFeature.data;


    const description = defaultFeature.description || '';
    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureGroup}${featureName}${featureId}`;

    const leaderInTech = flux.productStore.getLeaderInTech(id, featureId);

    const minify = v => {
      return Math.floor(v / 1000);
    };

    let leaderInTechPhrase = `Лидер в этой технологии: Компания "${leaderInTech.name}" (${minify(leaderInTech.value)}lvl)`;
    if (leaderInTech.id === 0) {
      leaderInTechPhrase = `Мы лидируем в этой технологии!`;
    }

    const pp = flux.productStore.getMainFeatureUpgradeCost(id, featureId);

    const enoughPPs = flux.productStore.enoughProgrammingPoints(pp, id);

    const disabled = !enoughPPs;

    // <div>{this.renderSegmentRatingImprovementList(segments, id, featureId)}</div>

    const benefit = flux.productStore.getBenefitOnFeatureImprove(id, featureId);

    // Мы усилим наше лидерство на рынке, но и
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
            disabled={disabled}
            onClick={() => { this.improveFeature(id, featureId, max, pp) }}
            text={`Улучшить за ${pp}PP`}
            primary
          />
        </div>
      </div>

      <hr color="white" />
    </div>
  };

  improveFeature(id, featureId, max, pp) {
    flux.productActions.spendPoints(pp, 0);
    flux.productActions.improveFeature(id, 'offer', featureId, max, 1000);
  }
}
