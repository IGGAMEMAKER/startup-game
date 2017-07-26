import Product from '../../classes/Product';
import productStore from '../../stores/product-store';
import productActions from '../../actions/product-actions';

import logger from '../../helpers/logger/logger';

import * as MANAGEMENT_STYLES from '../../constants/company-styles';

import * as NOTIFICATIONS from '../../constants/notifications';

import messageActions from '../../actions/message-actions';

const upgradeFeature = (id, fId) => {
  // logger.debug(`company ${id}: trying to upgrade feature ${fId}`);

  if (fId < 0) return;

  const cost = productStore.getMainFeatureUpgradeCost(id, fId);

  if (productStore.enoughProgrammingPoints(cost, id)) {
    const upgradeWillResultLeadership = productStore.isUpgradeWillResultTechBreakthrough(id, fId);

    productActions.spendPoints(cost, 0, id);
    productActions.improveFeature(id, 'offer', fId, 10000, 1000);

    const companyName = productStore.getName(id);
    const featureName = productStore.getPrettyFeatureNameByFeatureId(id, fId);

    if (upgradeWillResultLeadership) {
      messageActions.addNotification(NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER, { id, fId, companyName, featureName })
    }
  }
};

const upgradeMarket = (id, mId) => {
  // logger.debug(`company ${id}: trying to upgrade market ${mId}`);

  const currentSupportCost = productStore.getCurrentInfluenceMarketingCost(id, mId);
  const increasedCost = productStore.getNextInfluenceMarketingCost(id, mId);

  const mpChange = productStore.getPointModificationStructured(id).marketing().diff;
  const cost = increasedCost - currentSupportCost;

  // logger.debug(`company ${id}: trying to upgrade market ${mId}. their mpChange is: `, mpChange, `. While cost is: ${cost}.`, currentSupportCost, increasedCost);


  if (mpChange > cost && productStore.isCanIncreaseMarketLevel(id, mId)) {
    productActions.increaseInfluenceOnMarket(id, mId);

    const companyName = productStore.getName(id);
    const marketName = productStore.getMarketName(id, mId);

    messageActions.addNotification(NOTIFICATIONS.NOTIFICATION_MARKETS_INFLUENCE_INCREASED, { id, mId, companyName, marketName })
  }
};

function run (id) {
  // upgrade features
  const performAction = Math.random();

  if (performAction > 5 / 30) return;

  const product: Product = productStore.getProduct(id);

  const features = productStore.getDefaults(id).features;

  const isBalancedCompany = product.style === MANAGEMENT_STYLES.COMPANY_STYLE_BALANCED || product.style === MANAGEMENT_STYLES.COMPANY_STYLE_SEGMENT_ORIENTED;
  const isTechnologicalCompany = product.style === MANAGEMENT_STYLES.COMPANY_STYLE_FEATURE_ORIENTED;

  let sumOfProbabilities = 0;
  const featureProbabilities = [];
  const featuresChecked = features.map(f => {
    let probability = 10;

    if (f.shareable && isTechnologicalCompany) {
      probability = 100;
    }

    if (!f.shareable && isBalancedCompany) {
      probability = 100;
    }


    featureProbabilities.push({
      fId: f.id,
      probability,
      min: sumOfProbabilities,
      max: sumOfProbabilities + probability
    });

    sumOfProbabilities += probability;

    return f;
  });

  const value = Math.floor(Math.random(0, 1) * sumOfProbabilities);

  const willUpgradeId = featureProbabilities.findIndex(f => f.min < value && f.max >= value);

  upgradeFeature(id, willUpgradeId);


  // upgrade payments block
  // isBalancedCompany &&
  if (Math.random() < 7 / 30) {
    const paymentFeature = productStore.getNearestPaymentFeature(id);

    if (paymentFeature && paymentFeature.canUpgrade) {
      productActions.improveFeatureByPoints(id, 'payment', paymentFeature.name);
      const { points } = paymentFeature;

      productActions.spendPoints(points.programming, points.marketing, id);

      const companyName = productStore.getName(id);

      messageActions.addNotification(NOTIFICATIONS.NOTIFICATION_PAYMENTS_UPGRADED, { id, companyName });
    }
  }



  // get more influence on markets
  const analysedMarkets = productStore.getMarketingAnalysis(id);

  let hasMaxLevelOnAllMarkets = true;

  const nonUpgradeableMarkets = analysedMarkets.filter(m => !m.canIncreaseInfluence);
  const upgradeableMarkets = analysedMarkets.filter(m => m.canIncreaseInfluence);

  if (upgradeableMarkets.length) {
    // there are markets, where we can improve influence
    const competitiveMarkets = upgradeableMarkets.sort((a, b) => b.ROI - a.ROI);

    upgradeMarket(id, competitiveMarkets[0].marketId);
  } else {
    // nonUpgradeableMarkets.filter()
  }

  // pick bonuses
  if (productStore.getBonusesAmount(id)) {

  }

  return;
  // improve main features
  // improve payments
  // improve marketing block
  // ad campaign
  // pick bonus
  // rent techs
}

export default {
  run
};
