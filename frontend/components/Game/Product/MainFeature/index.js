import { h, Component } from 'preact';

import flux from '../../../../flux';
import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';
import round from '../../../../helpers/math/round';

import stageHelper from '../../../../helpers/stages';

export default class MainFeature extends Component {
  state = {
    tick: 1,
  };

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
          <div>Доступно: {product.XP}XP</div>
          <div className="featureGroupBody">{featureList}</div>
        </div>
      </div>
    );
  }

  renderProgrammingSupportTab(id, onHireProgrammerClick) {
    const support = flux.productStore.getProgrammingSupportCost(id);
    const ppIncrease = flux.playerStore.getMonthlyProgrammerPoints();

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
    let openedInfluence = false;

    const segmentRatingImprovementList = segments
      .map((s) => {
        const rating = s.rating[featureId];

        if (rating === 0) return '';

        const defaultQuality = flux.productStore.getMainFeatureDefaultQualityByFeatureId(id, featureId);
        const normalisedRatingDelta = round(rating * 1000 / defaultQuality);

        openedInfluence = true;

        return <li>Рейтинг у группы "{s.userOrientedName}" повысится на {normalisedRatingDelta}</li>;
      });

    return segmentRatingImprovementList;
  }

  renderUpgradeCostModifierBonus(id, featureId) {
    if (flux.productStore.isUpgradeWillResultTechBreakthrough(id, featureId)) {
      return `Мы задаём новые тренды! Стоимость улучшения: +400%`;
    }

    if (flux.productStore.isWeAreRetards(id, featureId)) {
      return `Мы отстаём в развитии, поэтому копируем всё у конкурентов. Стоимость улучшения: -75%`;
    }

    return '';
  }

  renderMainFeature = (featureGroup, product, id, segments, defaults) => (defaultFeature, featureId) => {
    const featureName = defaultFeature.name;
    const { shortDescription } = defaultFeature;

    const feature = product.features[featureGroup][featureId];


    const current = feature || 0;
    const max = flux.productStore.getCurrentMainFeatureDefaultsById(id)[featureId]; // defaultFeature.data;


    const description = defaultFeature.description || '';
    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureGroup}${featureName}${featureId}`;


    const data = [
      { value: current }
    ];

    if (product.XP >= 1000) {
      data.push({ value: 1000, style: 'bg-success' })
    }

    const leaderInTech = flux.productStore.getLeaderInTech(id, featureId);

    let leaderInTechPhrase = `Лидер в этой технологии: Компания "${leaderInTech.name}" (${leaderInTech.value}XP)`;
    if (leaderInTech.id === 0) {
      leaderInTechPhrase = `Мы лидируем в этой технологии!`;
    }

    const pp = flux.productStore.getMainFeatureUpgradeCost(id, featureId);

    const notEnoughPPs = !flux.playerStore.enoughProgrammingPoints(pp);
    const currentXP = flux.productStore.getXP(id);

    const disabled = notEnoughPPs || currentXP < 1000;

    return <div key={key}>
      <div>
        <div>{leaderInTechPhrase}</div>
        <span>{userOrientedFeatureName} ({current}/{max}XP)</span>
        <div style="width: 300px;">
          <UI.Bar min={0} max={max} data={data} />
        </div>
      </div>
      <br />
      <div className="featureDescription">{description}</div>
      <div>{this.renderSegmentRatingImprovementList(segments, id, featureId)}</div>
      <div className="hypothesis-wrapper">
        <div>{this.renderUpgradeCostModifierBonus(id, featureId)}</div>
        <UI.Button
          disabled={disabled}
          onClick={() => { this.improveFeature(id, featureId, max, pp) }}
          text={`Улучшить за ${pp}PP`}
          primary
        />
      </div>
      <br />
      <hr color="white" />
    </div>
  };

  improveFeature(id, featureId, max, pp) {
    flux.playerActions.spendPoints(pp, 0);
    flux.productActions.improveFeature(id, 'offer', featureId, max, 1000);

    if (stageHelper.isFirstFeatureMission()) {
      stageHelper.onFirstFeatureUpgradeMissionCompleted()
    }

    if (stageHelper.isPaymentRatingMission()) {
      const rating = flux.productStore.getRating(id);

      if (rating >= 7) {
        stageHelper.onPaymentRatingMissionCompleted();
      }
    }

    // this.setState({ tick: this.state.tick + 1 });
  }
}
