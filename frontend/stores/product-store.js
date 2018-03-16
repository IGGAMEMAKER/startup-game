import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import logger from '../helpers/logger/logger';
import companyCostHelper from '../helpers/products/compute-company-cost';
import sessionManager from '../helpers/session-manager';
import defaults from '../helpers/products/product-descriptions';
import computeRating from '../helpers/products/compute-rating';
import round from '../helpers/math/round';

import bugGenerator from '../helpers/products/bug-generator';

import * as c from '../constants/actions/product-actions';
import * as ACTIONS from '../constants/actions/schedule-actions';

import payloads from '../constants/actions/payloads';
import {
  DefaultDescription,
  MarketDescription
} from '../constants/products/types/product-description';

import Product from '../classes/Product';
import MarketManager from '../classes/MarketManager';

import stats from '../stats';


const EC = 'PRODUCT_EVENT_CHANGE';

let _products: Array<Product>;

let marketManager;

let _markets: Array;

const initialize = ({ markets, products }) => {
  logger.log('trying to initialize productStore.js', products);

  _products = products.map(p => new Product().loadFromObject(p));

  _markets = markets;

  const idea = _products[0].getIdea();
  markets = defaults(idea).markets.map((m, i) => {
    return {
      idea,
      id: m.id
    }
  });

  marketManager = new MarketManager(idea);
  marketManager.load(markets, defaults(idea));

  _products.forEach(p => {
    markets.forEach(m => {
      if (p.companyId !== 0) {
        marketManager.joinProduct(m.id, p.companyId);
      }
    })
  });
  marketManager.joinProduct(0, 0);
};

initialize(sessionManager.getProductStorageData());

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

class ProductStore extends EventEmitter {
  addChangeListener(cb: Function) {
    this.addListener(EC, cb);
  }

  removeChangeListener(cb: Function) {
    this.removeListener(EC, cb);
  }

  emitChange() {
    this.emit(EC);
  }

  static getStoreData() {
    return {
      products: _products,
      markets: _markets
    }
  }


  getMoney(id) {
    return Math.floor(_products[id]._money);
  }

  getProductSupportCost(id) {
    return 0;
    return _products[id].getProductSupportCost();
  }


  getProducts(): Array<Product> {
    return _products;
  }

  getOurProducts() {
    return _products.filter(this.isOurProduct);
  }

  isOurProduct(p) {
    return p.owner;
  }

  getProduct(id): Product {
    return _products[id];
  }

  getCompanyCost(id) {
    return companyCostHelper.compute(_products[id], this.getProductIncome(id), 0);
  }

  getCompanyCostStructured(id) {
    return companyCostHelper.structured(_products[id], this.getProductIncome(id), 0);
  }

  getHype(id) {
    return 1000;
  }


  getMainFeatureQualityByFeatureId(id, featureId) {
    return _products[id].getMainFeatureQualityByFeatureId(featureId);
  }

  getPrettyFeatureNameByFeatureId(id, featureId) {
    return _products[id].getPrettyFeatureNameByFeatureId(featureId);
  }

  getDefaults(id): DefaultDescription {
    return _products[id].getDefaults();
  }

  getPaymentModifier(id) {
    return _products[id].getPaymentModifier();
  }

  getFeatures(id, featureGroup) {
    return _products[id].getFeatures(featureGroup);
  }

  getBaseFeatureDevelopmentCost(id, featureId) {
    return _products[id].getBaseFeatureDevelopmentCost(featureId);
  }

  isShareableFeature(id, featureId) {
    return _products[id].isShareableFeature(featureId);
  }

  getIdea(id) {
    return _products[id].getIdea();
  }

  getBugs(id) {
    return _products[id].getBugs();
  }

  getBugLoyaltyLoss(id) {
    const list = this.getBugs(id);

    return list.map(i => i.penalty).reduce((p, c) => p + c, 0);
  }

  getRatingBasedLoyaltyOnMarket(id, marketId) {
    const rating = this.getRating(id, marketId);

    let loyalty;

    if (rating === 10) loyalty = 0.3;
    if (rating < 10) loyalty = 0.25;
    if (rating < 9) loyalty = 0.15;
    if (rating < 8) loyalty = 0.1;
    if (rating < 7) loyalty = 0.05;
    if (rating < 6) loyalty = 0;
    if (rating < 5) loyalty = -0.1;
    if (rating < 4) loyalty = -0.2;
    if (rating < 3) loyalty = -0.3;
    if (rating < 2) loyalty = -0.4;
    if (rating < 1) loyalty = -0.5;

    let isLeaderOnMarket = true;

    if (isLeaderOnMarket) {
      loyalty += 0.15;
    }

    return loyalty;
  }

  isSegmentingOpened(id) {
    return false;
  }

  isBugFixable(productId, bugId) {
    const bug = this.getBugs(productId).find(b => b.id === bugId);

    if (bug && bug.cost) {
      return this.getProgrammerPoints(productId) >= bug.cost;
    }

    return false;
  }

  isCanGrabMoreClients(id, marketId, amountOfClients, price) {
    return this.getMoney(id) >= price
  }

  getManagerPoints(id) {
    return this.getProduct(id).getMP()
  }

  getProgrammerPoints(id) {
    return this.getProduct(id).getPP();
  }

  getPPProduction(id) {
    return this.getProduct(id).getPPProduction();
  }

  getMPProduction(id) {
    return this.getProduct(id).getMPProduction();
  }

  getProductExpenses(id) {
    return this.getProductSupportCost(id);
    return _products[id].getProductExpenses();
  }

  getName(id) {
    return _products[id].getName();
    return _products.find(p => p.companyId === id).getName();
  }

  getStage(id) {
    return _products[id].getStage();
  }

  getFeatureStatus(id, featureGroup, featureName) {
    return _products[id].getFeatureStatus(featureGroup, featureName);
  }

  getBonusStatus(id, bonusName) {
    return _products[id].getFeatureStatus('bonuses', bonusName);
  }

  getAvailableBonuses(id) {
    return _products[id].getAvailableBonuses();
  }

  getBonuses(id) {
    return Object.keys(_products[id].features.bonuses);
  }

  getBonusesList(id) {
    return _products[id].getBonusesList();
  }

  getMarketingFeatureList(id) {
    return _products[id].getMarketingFeatureList();
  }

  getPaymentFeatures(id) {
    return _products[id].getPaymentFeatures();
  }

  getImprovementChances(id) {
    return _products[id].getImprovementChances()
  }

  getXP(id) {
    return _products[id].getXP();
  }

  getDescriptionOfProduct(id) {
    return _products[id].getDescriptionOfProduct();
  }

  getBonusModifiers(id) {
    return _products[id].getBonusModifiers();
  }

  getTestsAmount(id) {
    return _products[id].getTestsAmount();
  }

  getImprovementsAmount(id) {
    return _products[id].getImprovementsAmount();
  }

  getBonusesAmount(id) {
    return _products[id].bonuses;
  }

  getMainFeatureUpgradeCost(id, featureId) {
    return this.getBaseFeatureDevelopmentCost(id, featureId);
  }

  getBenefitOnFeatureImprove(id, featureId) {
    return Math.floor(this.getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, 1));
  }

  getTeamExpenses() {
    return 0;
  }

  getMarketRatingComputationList(id, marketId) {
    return this.getDefaults(id).markets[marketId].rating;
  }

  getMainFeatureIterator(id): Array {
    return this.getDefaults(id).features;
  }

  getLeaderValues(id) {
    return this.getMainFeatureIterator(id).map((f, i) => this.getLeaderInTech(i))
  }

  getCompetitorsList() {
    return _products;
  }

  isMainMarket(id, marketId) {
    return marketManager.isMainMarket(id, marketId);
  }

  getClientsOnMarket(id, marketId) {
    return marketManager.getClients(marketId, id);
  }

  // getPowerOfCompanyOnMarket(id, marketId) {
  //   return marketManager.getPowerOfCompanyOnMarket(id, marketId);
  // }
  //
  // getPowerListOnMarket(marketId) {
  //   return marketManager.getPowerListOnMarket(marketId);
  // }
  //
  // getMarketInfluenceOfCompany(id, marketId) {
  //   return marketManager.getMarketShare(id, marketId);
  // }

  getMarketSize(marketId) {
    return marketManager.getMarketSize(marketId);
  }

  getHypeOnMarket(id, marketId) {
    return marketManager.getHype(marketId, id);
  }

  getCurrentMarketInfo(id, marketId) {
    return {
      min: 0,
      max: 100,
      value: this.getHypeOnMarket(id, marketId)
    }
  }

  isExploredMarket(id, mId) {
    return marketManager.isExploredMarket(id, mId);
  }


  getLeaderInTech(featureId) {
    const leaders: Array<Product> = _products
      .map((p: Product) => ({
        id: p.companyId,
        value: p.features.offer[featureId],
        name: p.name
      }))
      .sort((p1, p2) => {
        return p2.value - p1.value;
      });

    return leaders[0];
  }

  getMarketingKnowledge(id, marketId) {
    return marketManager.getMarketingKnowledge(marketId, id);
  }

  getRating(id, marketId, improvement = null) {
    const features = _products[id].features.offer.slice();

    const maxValues = this.getLeaderValues(id).map(l => l.value);

    if (improvement) {
      const featureId = improvement.featureId;
      const value = features[featureId];

      const leader = this.getLeaderInTech(featureId);
      const maxValue = leader.value;

      features[featureId] += 1;
      if (value + 1 > maxValue) {
        maxValues[featureId] += 1;
      }
    }

    const marketInfluences = marketManager.getRatingFormula(marketId);

    return Math.min(round(computeRating(features, maxValues, marketInfluences)), 10);
  }

  getSegmentLoyalty(id, marketId) {
    return this.getSegmentLoyaltyStructured(id, marketId).result;

    // return marketManager.getMarketLoyalty(marketId, id);
    // return 10;
  }

  getSegmentLoyaltyStructured(id, marketId) {
    const ratingBasedLoyalty = this.getRatingBasedLoyaltyOnMarket(id, marketId);
    const bugPenalty = this.getBugLoyaltyLoss(id);
    const isNewApp = 0.15;

    const result = Math.ceil(100 * (ratingBasedLoyalty + isNewApp - bugPenalty));

    return {
      ratingBasedLoyalty,
      bugPenalty,
      isNewApp,
      result
    }
  }

  getMarketExplorationCost(id, marketId) {
    return this.getDefaults(id).markets[marketId].explorationCost;
  }

  calculateMarketIncome(id, marketId, improvement = null) {
    const rating = this.getRating(id, marketId, improvement);

    const modifier = this.getPaymentModifier(id);

    const efficiency = rating * modifier / 10;

    const possible = marketManager.getPossibleIncome(marketId, id);

    return Math.floor(possible * efficiency);
  }

  getFeatureIncreaseXPCost(id) {
    return 1;
  }

  getMarkets(id) {
    return this.getDefaults(id).markets; // marketManager.markets;
  }

  getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value) {
    const income = this.getMarketIncome(id, marketId);

    const currRating = this.getRating(id, marketId);
    const nextRating = this.getRating(id, marketId, { featureId, value });

    const willBe = Math.floor(income * (nextRating / currRating));

    return willBe - income;
  }

  getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, value) {
    return sum(
      this.getMarkets(id)
        .map((m) => this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, m.id, featureId, value))
    );
  }

  getBestFeatureUpgradeVariantOnMarket(id, marketId) {
    const incomes = this.getMainFeatureIterator(id)
      .map((f, featureId) => {
        const value = this.getMainFeatureQualityByFeatureId(id, featureId);
        const income = this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, 1);

        return {
          income,
          featureId,
          level: value + 1
        }
      });

    return incomes.sort((a, b) => b.income - a.income)[0];
  }

  getMarketIncome(id, marketId, improvement = null) {
    return this.calculateMarketIncome(id, marketId, improvement);
  }

  getProductIncome(id) {
    return sum(marketManager.iterate((m, i) => this.getMarketIncome(id, i)))
  }

  getMarketIncomeList(id) {
    return marketManager.iterate((m) => {
      return {
        income: this.getMarketIncome(id, m.id),
        marketId: m.id
      }
    })
  }
}

const store = new ProductStore();

const payload = payloads.productStorePayload;
type PayloadType = payload.type;

Dispatcher.register((p: PayloadType) => {
  if (!p.type) {
    logger.error(`empty type prop in payload ${payload.name}`, p);
    return;
  }

  if (p.type !== ACTIONS.SCHEDULE_ACTIONS_DAY_TICK) {
    logger.log('product store', p);
  }

  const id = p.id;

  let change = true;
  switch (p.type) {
    case c.PRODUCT_ACTIONS_TEST_HYPOTHESIS:
      _products[id].testHypothesis(p);
      break;

    case c.PRODUCT_PRODUCE_RESOURCES:
      _products[id].produceResources();
      break;

    case c.PRODUCT_ACTIONS_FIX_BUG:
      _products[id].fixBug(p.bugId);
      break;

    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
      _products[id].switchStage(p.stage);
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      _products[id].improveFeature(p);

      _products[id].addBug(bugGenerator());
      _products[id].addBug(bugGenerator());
      _products[id].addBug(bugGenerator());
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
      _products[id].improveFeatureByPoints(p);
      break;

    case c.PRODUCT_ACTIONS_HYPE_ADD:
      marketManager.addHype(p.marketId, id, p.hype);

      _products[id]._money -= p.cost;
      break;

    case c.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE:
      marketManager.loseMonthlyHype(id);
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_ADD:
      marketManager.addClients(p.marketId, p.id, p.clients);

      _products[id]._money -= p.price;
      break;

    case c.PRODUCT_ACTIONS_MARKETS_JOIN:
      marketManager.joinProduct(p.marketId, id);

      _products[p.id].decreaseXP(p.xp);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN:
      marketManager.setMainMarket(id, p.marketId);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE:
      marketManager.breakPartnership(p.c1, p.c2, p.marketId);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER:
      marketManager.breakPartnership(p.c1, p.c2, p.marketId);
      break;

    case c.PRODUCT_ACTIONS_CREATE_COMPANY:
      _products.push(new Product(p.p));
      break;

    case c.PLAYER_ACTIONS_INCREASE_MONEY:
      _products[id]._money += p.amount;
      break;

    case c.PRODUCT_ACTIONS_BONUSES_ADD:
      _products[id].bonuses++;
      break;

    default:
      change = false;
      break;
  }

  if (change) {
    stats.saveAction(p.type, p);

    sessionManager.saveProductStorageData(ProductStore.getStoreData());

    store.emitChange();
  }
});

export default store;
