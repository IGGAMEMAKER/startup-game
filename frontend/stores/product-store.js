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


import Project from '../classes/Project';

import MarketManager from '../classes/MarketManager';

import stats from '../stats';


const EC = 'PRODUCT_EVENT_CHANGE';

let _products: Array<Project>;

let marketManager;

let _markets: Array;

const initialize = (world) => {
  let { products, markets } = world;

  _products = products.map(p => new Project().loadFromObject(p));

  _markets = markets;

  const idea = _products[0].getIdea();
  markets = defaults(idea).markets.map(m => {
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

  getExplorationData(id) {
    return _products[id].getExplorationData();
  }

  getMoney(id) {
    return Math.floor(_products[id]._money);
  }


  getProducts(): Array<Project> {
    return _products;
  }

  getCompanyCost(id) {
    return companyCostHelper.compute(_products[id], this.getProductIncome(id), 0);
  }

  getCompanyCostStructured(id) {
    return companyCostHelper.structured(_products[id], this.getProductIncome(id), 0);
  }

  getOurProducts() {
    return _products.filter(this.isOurProduct);
  }

  isOurProduct(p) {
    return p.owner;
  }

  getProduct(id): Project {
    return _products[id];
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

  getIdea(id) {
    return _products[id].getIdea();
  }

  getBugs(id) {
    return _products[id].getBugs();
  }

  getBugLoyaltyLoss(id) {
    return _products[id].getBugLoyaltyLoss();
  }

  isBugFixable(productId, bugId) {
    return this.getProgrammerPoints(productId) >= _products[productId].getBugCost(bugId);
  }

  getMaxAmountOfClientsOnMarket(id, marketId) {
    return this.getMarkets(id)[marketId].clients;
  }

  isCanGrabMoreClients(id, marketId, amountOfClients, price) {
    const enoughMoney = this.getMoney(id) >= price;
    const noClientOverflow = this.getClientsOnMarket(id, marketId) + amountOfClients < this.getMaxAmountOfClientsOnMarket(id, marketId);

    return enoughMoney && noClientOverflow;
  }

  getManagerPoints(id) {
    return _products[id].getMP()
  }

  getProgrammerPoints(id) {
    return _products[id].getPP();
  }

  getPPProduction(id) {
    return _products[id].getPPProduction();
  }

  getMPProduction(id) {
    return _products[id].getMPProduction();
  }

  getProductExpenses(id) {
    return this.getProductSupportCost(id);
  }

  getProductSupportCost(id) {
    return 0;
  }

  getName(id) {
    return _products[id].getName();
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

  getImprovementChances(id) {
    return _products[id].getImprovementChances()
  }

  getXP(id) {
    return _products[id].getXP();
  }

  getDescriptionOfProduct(id) {
    return _products[id].getDescriptionOfProduct();
  }

  getBonusesAmount(id) {
    return _products[id].getBonuses();
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

  isSegmentingOpened(id) {
    return false;
  }

  getMarketingKnowledge(id, marketId) {
    return marketManager.getMarketingKnowledge(marketId, id);
  }


  getLeaderInTech(featureId) {
    const leaders: Array<Project> = _products
      .map((p: Project) => ({
        id: p.companyId,
        value: p.features.offer[featureId],
        name: p.name
      }))
      .sort((p1, p2) => {
        return p2.value - p1.value;
      });

    return leaders[0];
  }

  getRatingBasedLoyaltyOnMarket(id, marketId, improvement = null) {
    const rating = this.getRating(id, marketId, improvement);

    let loyalty;

    if (rating <= 6) {
      loyalty = -0.1 * (6 - rating);
    } else {
      loyalty = 0.15 * (rating - 6);
    }

    return loyalty;
  }

  getRating(id, marketId, improvement = null) {
    const features = _products[id].features.offer.slice();

    const standards = this.getLeaderValues(id).map(l => l.value);

    if (improvement) {
      const featureId = improvement.featureId;
      const value = features[featureId];

      const leader = this.getLeaderInTech(featureId);
      const maxValue = leader.value;

      features[featureId] += 1;
      if (value + 1 > maxValue) {
        standards[featureId] += 1;
      }
    }

    const marketInfluences = marketManager.getRatingFormula(marketId);

    return Math.min(round(computeRating(features, standards, marketInfluences)), 10);
  }

  getSegmentLoyalty(id, marketId, improvement = null) {
    return this.getSegmentLoyaltyStructured(id, marketId, improvement).result;
  }

  getSegmentLoyaltyStructured(id, marketId, improvement = null) {
    const ratingBasedLoyalty = this.getRatingBasedLoyaltyOnMarket(id, marketId, improvement);
    const bugPenalty = this.getBugLoyaltyLoss(id);

    const isNewApp = 0.15;
    const isBestApp = 0.15;

    const designPenalty = 0;

    const result = Math.ceil(100 * (ratingBasedLoyalty + isNewApp - bugPenalty - designPenalty + isBestApp));

    return {
      ratingBasedLoyalty,
      bugPenalty,
      isNewApp,
      isBestApp,
      result
    }
  }

  getMarketExplorationCost(id, marketId) {
    return this.getDefaults(id).markets[marketId].explorationCost;
  }

  getExploredMarkets(id) {
    return this.getMarkets(id).filter((m, mId) => this.isExploredMarket(id, m.id));
  }

  getMarketsWithExplorationStatuses(id) {
    return this.getMarkets(id)
      .map(m => {
        return {
          id: m.id,
          info: m,
          explored: this.isExploredMarket(id, m.id),
          enoughXPsToExplore: this.getXP(id) >= m.explorationCost
        }
      })
  }

  getExplorableMarkets(id) {
    const markets = this.getMarkets(id)
      .filter((m, mId) => !this.isExploredMarket(id, m.id));

    if (markets.length) {
      return markets[0];
    }

    return [];
  }

  calculateMarketIncome(id, marketId, improvement = null) {
    const loyalty = this.getSegmentLoyalty(id, marketId, improvement);

    const loyaltyModifier = loyalty < 0 ? 0 : loyalty / 10;

    const paymentModifier = this.getPaymentModifier(id);

    const possible = marketManager.getPossibleIncome(marketId, id);

    return Math.floor(possible * loyaltyModifier * paymentModifier / 10);
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
        .map(m => this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, m.id, featureId, value))
    );
  }

  getBestFeatureUpgradeVariantOnMarket(id, marketId) {
    const incomes = this.getMainFeatureIterator(id)
      .map((f, featureId) => {
        const improvementSize = 1;
        const improvement = {
          featureId,
          value: improvementSize
        };

        const value = this.getMainFeatureQualityByFeatureId(id, featureId);
        const income = this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, improvementSize);
        const loyaltyChange = this.getRatingBasedLoyaltyOnMarket(id, marketId, improvement) - this.getRatingBasedLoyaltyOnMarket(id, marketId);
        const ratingChange = this.getRating(id, marketId, improvement) - this.getRating(id, marketId);

        return {
          income,
          loyaltyChange,
          ratingChange,
          featureId,
          featureName: this.getPrettyFeatureNameByFeatureId(id, featureId),
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
    return marketManager.iterate(m => {
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

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      _products[id].improveFeature(p);

      _products[id].addBug(bugGenerator());
      _products[id].addBug(bugGenerator());
      _products[id].addBug(bugGenerator());
      break;

    case c.PRODUCT_ACTIONS_EXPLORE_MARKET:
      marketManager.exploreMarket(p.marketId, id);

      _products[id].decreaseXP(p.explorationCost);
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
      _products[id].improveFeatureByPoints(p);
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_ADD:
      marketManager.addClients(p.marketId, p.id, p.clients);

      _products[id].decreaseMoney(p.price);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_JOIN:
      marketManager.joinProduct(p.marketId, id);

      _products[p.id].decreaseXP(p.xp);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN:
      marketManager.setMainMarket(id, p.marketId);
      break;

    case c.PRODUCT_ACTIONS_CREATE_COMPANY:
      _products.push(new Project(p.p));
      break;

    case c.PLAYER_ACTIONS_INCREASE_MONEY:
      _products[id].increaseMoney(p.amount);
      break;

    case c.PRODUCT_ACTIONS_BONUSES_ADD:
      _products[id].addBonuses();
      break;

    default: change = false; break;
  }

  if (change) {
    stats.saveAction(p.type, p);

    sessionManager.saveProductStorageData(ProductStore.getStoreData());

    store.emitChange();
  }
});

export default store;
