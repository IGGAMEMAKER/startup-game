import { h, Component } from 'preact';

import flux from '../../../../flux';
import UI from '../../../UI';

import Programmers from '../../Team/Programmers';

import logger from '../../../../helpers/logger/logger';
import round from '../../../../helpers/math/round';

import stageHelper from '../../../../helpers/stages';

export default class MainFeature extends Component {
  render({ id }, state) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const product = flux.productStore.getProduct(id);
    const availableSegments = flux.productStore.getAvailableSegments(id);
    const defaults = flux.productStore.getDefaults(id);

    const featureList = defaults.features
      .map(this.renderMainFeature('offer', product, id, availableSegments, defaults));

    return (
      <div>
        <div className="featureGroupTitle">Разработка</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">
            Улучшая главные характеристики продукта, вы повышаете его рейтинг,
            что приводит к снижению оттока клиентов и увеличению доходов с продукта
          </div>
          <br />
          <div>Доступно: {product.XP}XP</div>
          <div className="featureGroupBody">{featureList}</div>
        </div>
        <Programmers />
      </div>
    );
  }

  renderMainFeature = (featureGroup, product, id, segments, defaults) => (defaultFeature, i) => {
    const featureName = defaultFeature.name;
    const { time, shortDescription } = defaultFeature;

    const feature = product.features[featureGroup][i];

    const current = feature || 0;
    const max = defaultFeature.data;


    const description = defaultFeature.description || '';
    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;
    const key = `feature${featureGroup}${featureName}${i}`;

    if (current >= max) {
      return (
        <div key={key}>
          {userOrientedFeatureName} (Улучшено) {UI.symbols.ok}
          <br />
          <div className="featureDescription">{description}</div>
          <br />
        </div>
      )
    }

    const hypothesis = [{
      points: { mp: 100, pp: 200 },
      data: 4000,
      baseChance: 0.1
    }];

    const hypothesisList = hypothesis
      .map(this.renderHypothesisItem(id, i, time, current, max, product));

    let openedInfluence = false;
    const segmentRatingImprovementList = segments
      .map((s) => {
        const rating = s.rating[i];
        const defaultQuality = flux.productStore.getMainFeatureDefaultQualityByFeatureId(id, i);
        const normalisedRatingDelta = round(rating * 1000 / defaultQuality);

        if (rating === 0) return '';

        openedInfluence = true;

        return <li>Рейтинг у группы "{s.userOrientedName}" повысится на {normalisedRatingDelta}</li>;
      });

    const data = [
      { value: current }
    ];

    if (product.XP >= 1000) {
      data.push({ value: 1000, style: 'bg-success' })
    }

    return <div key={key}>
      <div>
        <span>{userOrientedFeatureName} ({current}/{max}XP)</span>
        <div style="width: 300px;">
          <UI.Bar min={0} max={max} data={data} />
        </div>
      </div>
      <br />
      <div className="featureDescription">{description}</div>
      <div>{segmentRatingImprovementList}</div>
      {hypothesisList}
      <br />
      <hr color="white" />
    </div>
  };

  renderHypothesisItem = (id, featureId, time, current, max, product) => (hypothesis, i) => {
    const necessaryPoints = hypothesis.points;
    const key = `hypothesis${i}`;

    const { pp, mp } = necessaryPoints;

    const action = () => {
      // flux.playerActions.spendPoints(pp, mp);
      flux.productActions.improveFeature(id, 'offer', featureId, hypothesis, max, 1000);

      if (stageHelper.isFirstFeatureMission()) {
        stageHelper.onFirstFeatureUpgradeMissionCompleted()
      }

      if (stageHelper.isPaymentRatingMission()) {
        const rating = flux.productStore.getRating(id);

        if (rating >= 7) {
          stageHelper.onPaymentRatingMissionCompleted();
        }
      }
    };

    // const notEnoughPPs = !this.haveEnoughPointsToUpgrade(necessaryPoints);
    const ratingOverflow = current >= max;
    const currentXP = flux.productStore.getXP(id);

    // const disabled = notEnoughPPs || ratingOverflow || currentXP < 1000;
    const disabled = ratingOverflow || currentXP < 1000;

    return (
      <div key={key} className="hypothesis-wrapper">
        <UI.Button
          disabled={disabled}
          onClick={action}
          text="Улучшить за 1000XP"
          primary={!ratingOverflow}
        />
      </div>
    )
  };
}
