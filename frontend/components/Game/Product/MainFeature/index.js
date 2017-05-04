import { h, Component } from 'preact';

import ProductDescriptions from '../../../../constants/products/product-descriptions';
import flux from '../../../../flux';
import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

import stageHelper from '../../../../helpers/stages';
type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class MainFeature extends Component {
  getSpecificProductFeatureListByIdea = idea => {
    return ProductDescriptions(idea).features;
  };

  renderMainFeature = (featureGroup, product, id) => (defaultFeature, i) => {
    const featureName = defaultFeature.name;
    const { time, shortDescription } = defaultFeature;

    const feature = product.features[featureGroup][featureName];

    const current = feature || 0;
    const max = defaultFeature.data;


    const key = `feature${featureGroup}${featureName}${i}`;

    const hypothesis = [{
      points: { mp: 100, pp: 200 },
      data: 4000,
      baseChance: 0.1
    }];

    const description = defaultFeature.description || '';
    const userOrientedFeatureName = shortDescription ? shortDescription : featureName;

    let hypothesisList = '   Улучшено';
    if (current < max) {
      hypothesisList = hypothesis.map(this.renderHypothesisItem(id, featureName, time, current, max, product));
    } else {
      return (
        <div key={key}>
          {userOrientedFeatureName} (Улучшено) {UI.symbols.ok}
          <br />
          <div className="featureDescription">{description}</div>
          <br />
        </div>
      )
    }

    return (
      <div key={key}>
        {userOrientedFeatureName} ({current}/{max}XP)
        <br />
        <div className="featureDescription">{description}</div>
        {hypothesisList}
        <br />
      </div>
    )
  };

  renderHypothesisItem = (id, featureName, time, current, max, product) => (hypothesis, i) => {
    const necessaryPoints = hypothesis.points;
    const key = `hypothesis${i}`;

    const { pp, mp } = necessaryPoints;

    const action = () => {
      // playerActions.spendPoints(pp, mp);
      flux.productActions.improveFeature(id, 'offer', featureName, hypothesis, max, 1000);
      
      if (stageHelper.isFirstFeatureMission()) {
        stageHelper.onFirstFeatureUpgradeMissionCompleted()
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

  render({ id }, state: StateType) {
    const product = flux.productStore.getProduct(id);
    // logger.debug('MainFeature', id, flux.productStore.getProducts(id), product.idea);

    const featureList = this
      .getSpecificProductFeatureListByIdea(product.idea)
      .map(this.renderMainFeature('offer', product, id));

    return (
      <div>
        <div className="featureGroupTitle">Основные характеристики продукта</div>
        <div className="featureGroupDescriptionWrapper">
          <div className="featureGroupDescription">
            Улучшая главные характеристики продукта, вы повышаете его рейтинг,
            что приводит к снижению оттока клиентов и увеличению доходов с продукта
          </div>
          <div>Доступно: {product.XP}XP</div>
          <div className="featureGroupBody">{featureList}</div>
        </div>
      </div>
    );
  }
}
