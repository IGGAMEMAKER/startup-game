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
    const availableSegments = flux.productStore.getAvailableSegments(id);
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

  renderSegmentRatingImprovementList(segments, id, featureId) {
    if (flux.productStore.isUpgradeWillResultTechBreakthrough(id, featureId)) return '';

    let openedInfluence = false;

    return segments
      .map((s, segId) => {
        const rating = s.rating[featureId];

        if (rating === 0) return '';

        const defaultQuality = flux.productStore.getCurrentMainFeatureDefaultsById(id)[featureId];
        const normalisedRatingDelta = round(rating * 1000 / defaultQuality);

        openedInfluence = true;

        const incomeIncrease = flux.productStore.getSegmentIncomeIncreasingOnRatingUpgrade(id, normalisedRatingDelta, segId);

        return <li>Рейтинг у группы "{s.userOrientedName}" повысится на {normalisedRatingDelta} (+{incomeIncrease}$/мес)</li>;
      });
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

  renderHypeIncreaseValue(id, featureId) {
    if (flux.productStore.isUpgradeWillResultTechBreakthrough(id, featureId)) {
      const hypeModifier = flux.productStore.getTechBreakthroughModifierForHype(id, featureId);

      if (hypeModifier) return `Наша известность увеличится! +${hypeModifier} HYPE`;
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

    return <div key={key}>
      <div className="content-block">
        <div>
          <div>{leaderInTechPhrase}</div>
          <span>{userOrientedFeatureName} {minify(current)}lvl</span>
        </div>
        <br />
        <div className="featureDescription">{description}</div>
        <div>{this.renderSegmentRatingImprovementList(segments, id, featureId)}</div>
        <div className="hypothesis-wrapper">
          <div>{this.renderUpgradeCostModifierBonus(id, featureId)}</div>
          <div>{this.renderHypeIncreaseValue(id, featureId)}</div>
          <UI.Button
            disabled={disabled}
            onClick={() => { this.improveFeature(id, featureId, max, pp) }}
            text={`Улучшить за ${pp}PP`}
            primary
          />
        </div>
      </div>

      <br />
      <hr color="white" />
    </div>
  };

  improveFeature(id, featureId, max, pp) {
    const willResultBreakthrough = flux.productStore.isUpgradeWillResultTechBreakthrough(id, featureId);

    flux.productActions.spendPoints(pp, 0);
    flux.productActions.improveFeature(id, 'offer', featureId, max, 1000);

    if (willResultBreakthrough) {
      const hypeModifier = flux.productStore.getTechBreakthroughModifierForHype(id, featureId);

      flux.productActions.addHype(id, hypeModifier);
    }
  }
}
