import Product from '../../classes/Product';
import productStore from '../../stores/product-store';
import productActions from '../../actions/product-actions';

import logger from '../../helpers/logger/logger';

const timeUntilMoneyCollapse = (p) => { return 0; };
const isMoneyCollapsing = (p) => false;

const isMPCollapsing = (p) => false;
const timeUntilMPCollapse = (p) => false;

const isPPCollapsing = (p) => true;
const timeUntilPPCollapse = (p) => 5;

const needsMoney = () => { return 1000 };
const needsMP = () => { return 0 };
const needsPP = () => { return 100 };

const getIncomeOf = product => 2000;

import * as MANAGEMENT_STYLES from '../../constants/company-styles';

import * as NOTIFICATIONS from '../../constants/notifications';

import messageActions from '../../actions/message-actions';


function run (id) {
  // upgrade features
  const product: Product = productStore.getProduct(id);

  const upgradeFeature = (id, fId) => {
    logger.debug(`company ${id}: trying to upgrade feature ${fId}`);
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

    logger.debug(`company ${id}: trying to upgrade market ${mId}. their mpChange is: `, mpChange, `. While cost is: ${cost}.`, currentSupportCost, increasedCost);


    if (mpChange > cost) {
      productActions.increaseInfluenceOngMarket(id, mId);

      const companyName = productStore.getName(id);
      const marketName = productStore.getMarketName(id, mId);

      messageActions.addNotification(NOTIFICATIONS.NOTIFICATION_MARKETS_INFLUENCE_INCREASED, { id, mId, companyName, marketName })
    }
  };

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
  if (isBalancedCompany && Math.random() < 1 / 30 / 2) {
    const paymentFeature = productStore.getNearestPaymentFeature(id);
    logger.debug('payments nearest', id, paymentFeature);

    if (paymentFeature && paymentFeature.canUpgrade) {
      productActions.improveFeatureByPoints(id, 'payment', paymentFeature.name);
      const { points } = paymentFeature;

      productActions.spendPoints(points.programming, points.marketing, id);
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

  // analysedMarkets.forEach(m => {
  //   const mId = m.marketId;
  //   if (!m.isMaxLevelReached) hasMaxLevelOnAllMarkets = false;
  //
  //   if (m.canIncreaseInfluence) {
  //     if (m.isFreeMarket) {
  //       frees.push({ mId });
  //
  //       upgradedInfluence = true;
  //     }
  //
  //
  //   } else {
  //
  //   }
  // });


  // pick bonuses

  // productActions.increaseInfluenceOnMarket(id, 0);
  // productActions.increaseInfluenceOnMarket(id, 1);
  // productActions.increaseInfluenceOnMarket(id, 2);

  return;

  const baseValue = 0.5;

  const query = [
    -needsMoney(),
    -needsMP(),
    -needsPP()
  ];

  const priorities = new Array(3);

  priorities[0] = isMoneyCollapsing(product) ? 1 / (Math.pow(1 + timeUntilMoneyCollapse(product), 3)) : baseValue;
  priorities[1] = isMPCollapsing(product) ? 1 / (Math.pow(1 + timeUntilMPCollapse(product), 3)) : baseValue;
  priorities[2] = isPPCollapsing(product) ? 1 / (Math.pow(1 + timeUntilPPCollapse(product), 3)) : baseValue;

  const actions = [];

  actions.push({
    moneyDelta: 1000,
    mpDelta: -15,
    ppDelta: 0,
    cb: () => {

    }
  });
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
