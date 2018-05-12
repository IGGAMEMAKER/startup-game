// import Product from '../../classes/Project';
// import productStore from '../../stores/product-store';
// import productActions from '../../actions/product-actions';
//
// import logger from '../../helpers/logger/logger';
//
// import * as MANAGEMENT_STYLES from '../../constants/company-styles';
//
// import * as NOTIFICATIONS from '../../constants/notifications';
//
// import * as BONUSES from '../../constants/bonuses';
//
// import messageActions from '../../actions/message-actions';
//
// const upgradeFeature = (id, fId) => {
//   if (fId < 0) return;
//
//   const companyName = productStore.getName(id);
//   const featureName = productStore.getPrettyFeatureNameByFeatureId(id, fId);
//   const cost = productStore.getMainFeatureUpgradeCost(id, fId);
//
//   const hasEnoughPoints = productStore.enoughProgrammingPoints(cost, id);
//
//
//   if (hasEnoughPoints) {
//     const upgradeWillResultLeadership = productStore.isUpgradeWillResultTechBreakthrough(id, fId);
//
//     productActions.spendPoints(cost, 0, id);
//     productActions.improveFeature(id, 'offer', fId);
//
//     if (upgradeWillResultLeadership) {
//       const message = { id, fId, companyName, featureName };
//       messageActions.addNotification(NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER, message)
//     }
//   }
// };
//
// const upgradeMarket = (id, mId) => {
// };
//
// const pickBonus = (id, name) => {
//   productActions.pickBonus(id, name);
//
//   logger.debug('pickBonus', id, name);
// };
//
// class Bot {
//   constructor(id) {
//     this.id = id;
//     const product: Product = productStore.getProduct(id);
//
//     this.isBalancedCompany = product.style === MANAGEMENT_STYLES.COMPANY_STYLE_BALANCED;
//     this.isTechnologicalCompany = product.style === MANAGEMENT_STYLES.COMPANY_STYLE_FEATURE_ORIENTED;
//   }
//
//   upgradeFeatureIfPossible() {
//     const id = this.id;
//
//     let sumOfProbabilities = 0;
//     const featureProbabilities = [];
//
//     const features = productStore.getDefaults(id).features;
//     features.forEach(f => {
//       let probability = 10;
//
//       if (f.shareable && this.isTechnologicalCompany) {
//         probability = 100;
//       }
//
//       if (!f.shareable && this.isBalancedCompany) {
//         probability = 100;
//       }
//
//
//       featureProbabilities.push({
//         fId: f.id,
//         probability,
//         min: sumOfProbabilities,
//         max: sumOfProbabilities + probability
//       });
//
//       sumOfProbabilities += probability;
//     });
//
//     let value = Math.floor(Math.random(0, 1) * sumOfProbabilities);
//
//     const willUpgradeId = featureProbabilities.findIndex(f => f.min < value && f.max >= value);
//
//     upgradeFeature(id, willUpgradeId);
//   }
//
//   increaseInfluenceOnMarket() {
//     const id = this.id;
//
//     const analysedMarkets = productStore.getMarketingAnalysis(id);
//
//     const upgradeableMarkets = analysedMarkets
//       .sort((a, b) => b.ROI - a.ROI)
//       .filter(m => m.canIncreaseInfluence);
//
//     if (upgradeableMarkets.length) {
//       // there are markets, where we can improve influence
//       upgradeMarket(id, upgradeableMarkets[0].marketId);
//     }
//   }
//
//   pickBonus() {
//     return;
//
//     const id = this.id;
//
//     const bonuses = productStore.getAvailableBonuses(id);
//
//     let sumOfProbabilities = 0;
//     let value;
//
//     const probabilities = bonuses.map(b => {
//       let probability = 10;
//
//       if (this.isTechnologicalCompany) {
//         switch (b.name) {
//           case BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER:
//           case BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II:
//           case BONUSES.BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER:
//           case BONUSES.BONUSES_TECHNOLOGY_LEADER_MODIFIER:
//             probability = 100;
//             break;
//           default:
//             if (b.type === 'lowerDevelopmentCostOfFeature' && productStore.isShareableFeature(id, b.featureId)) {
//               probability = 100;
//             }
//             break;
//         }
//       }
//
//       if (this.isBalancedCompany) {
//         switch (b.name) {
//           case BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER:
//           case BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER_II:
//           case BONUSES.BONUSES_MARKETER_SUPPORT_COST_MODIFIER:
//           case BONUSES.BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER:
//             probability = 100;
//             break;
//           default:
//             if (b.type === 'lowerDevelopmentCostOfFeature' && !productStore.isShareableFeature(id, b.featureId)) {
//               probability = 100;
//             }
//             break;
//         }
//       }
//
//       const obj = {
//         name: b.name,
//         probability,
//         min: sumOfProbabilities,
//         max: sumOfProbabilities + probability
//       };
//
//       sumOfProbabilities += probability;
//
//       return obj;
//     });
//
//
//     value = Math.floor(Math.random(0, 1) * sumOfProbabilities);
//
//     const willPickBonusId = probabilities.findIndex(f => f.min < value && f.max >= value);
//
//     pickBonus(id, probabilities[willPickBonusId].name);
//   }
// }
//
// function run (id) {
//   // upgrade features
//   // if (Math.random() > 10 / 30) return;
//   return;
//
//   const bot = new Bot(id);
//
//   bot.upgradeFeatureIfPossible();
//
//   // get more influence on markets
//   bot.increaseInfluenceOnMarket();
//
//   // pick bonuses
//   if (productStore.getBonusesAmount(id)) {
//     bot.pickBonus();
//   }
//
//   // improve main features
//   // improve payments
//   // improve marketing block
//   // ad campaign
//   // pick bonus
//   // rent techs
// }
//
// export default {
//   run
// };
