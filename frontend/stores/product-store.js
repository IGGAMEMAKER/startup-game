import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import companyCostHelper from '../helpers/products/compute-company-cost';

import * as JOB from '../constants/job';

import Product from '../classes/Product';

import { DefaultDescription, MarketDescription } from '../constants/products/types/product-description';


import sessionManager from '../helpers/session-manager';

import getSpecialization from '../helpers/team/specialization';
import skillHelper from '../helpers/team/skills';

import workerGenerator from '../helpers/team/create-random-worker';

import MarketManager from '../classes/MarketManager';

import defaults from '../helpers/products/product-descriptions';


import computeRating from '../helpers/products/compute-rating';
import round from '../helpers/math/round';


import stats from '../stats';

const EC = 'PRODUCT_EVENT_CHANGE';

let _money = 1000;

let _employees: Array;

let _team: Array;

let _products: Array<Product>;

let marketManager;

let _markets: Array;

const initialize = ({ markets, products, employees, team }) => {
  logger.log('trying to initialize productStore.js', products);

  _products = products.map(p => new Product().loadFromObject(p));

  logger.log('trying to initialize productStore.js', _products);


  _employees = employees;
  _team = team;


  _markets = markets;

  const idea = _products[0].getIdea();
  markets = [
    {
      id: 0,
      idea
    },
    {
      id: 1,
      idea
    },
    {
      id: 2,
      idea
    }
  ];

  marketManager = new MarketManager(idea);
  marketManager.load(markets, defaults(idea));

  _products.forEach(p => {
    markets.forEach(m => {
      marketManager.joinProduct(m.id, p.companyId);
    })
  });
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
      employees: _employees,
      team: _team,
      products: _products,
      markets: _markets
    }
  }


  getMoney(id) {
    return Math.floor(_products[id]._money);
  }

  getPoints(id) {
    return _products[id]._points;
  }

  enoughProgrammingPoints(pp, id) {
    return _products[id]._points.programming >= pp;
  }

  getTeam() {
    return _team.map((e, i) => Object.assign({}, e, { id: i }));
  }

  getProgrammers() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_PROGRAMMER)
  }

  getEmployees() {
    return _employees;
  }

  getProductSupportCost(id) {
    return _products[id].getProgrammingSupportCost() * 60;
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

  getMarkets(id): Array<MarketDescription> {
    return _products[id].getMarkets();
  }

  getBaseFeatureDevelopmentCost(id, featureId) {
    return _products[id].getBaseFeatureDevelopmentCost(featureId);
  }

  isShareableFeature(id, featureId) {
    return _products[id].isShareableFeature(featureId);
  }

  getMarketInfo(id, marketId) {
    return _products[id].getMarkets()[marketId];
  }

  getIdea(id) {
    return _products[id].getIdea();
  }




  getProductExpenses(id) {
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

  getProgrammingSupportCostModifier(id) {
    return _products[id].getProgrammingSupportCostModifier();
  }

  getProgrammingSupportCost(id) {
    return _products[id].getProgrammingSupportCost();
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

  getHypothesisPoints(id) {
    return _products[id].getHypothesisPoints();
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

  getProgrammingEfficiencyBonus(id) {
    return 1 + this.getBonusModifiers(id).programmingEfficiency / 100;
  }

  getBaseMonthlyProgrammerPoints(id) {
    return sum(this.getProgrammers().map(skillHelper.getProgrammingPointsProducedBy));
  }

  // getMonthlyProgrammerPoints(id) {
  //   return Math.floor(this.getBaseMonthlyProgrammerPoints(id) * this.getProgrammingEfficiencyBonus(id));
  // }

  getMercenaries() {
    return this.getTeam().filter(w => w.salary.pricingType === 1)
  }

  getTeamExpenses() {
    return sum(this.getMercenaries().map(worker => worker.salary.money));
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

  isPartneredOnMarket() {
    return false;
  }

  isMainMarket(id, marketId) {
    return marketManager.isMainMarket(id, marketId);
  }

  getPowerOfCompanyOnMarket(id, marketId) {
    return marketManager.getPowerOfCompanyOnMarket(id, marketId);
  }

  getPowerListOnMarket(marketId) {
    return marketManager.getPowerListOnMarket(marketId);
  }

  getMarketInfluenceOfCompany(id, marketId) {
    return marketManager.getMarketShare(id, marketId);
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


  getLeaderInTech(featureId) {
    const leader: Product = _products
      .map((p: Product) => ({
        id: p.companyId,
        value: p.features.offer[featureId],
        name: p.name
      }))
      .sort((p1, p2) => {
        const f1 = p1.value;
        const f2 = p2.value;

        return f2 - f1;
      })
      [0];

    return leader;
  }

  getRating(id, marketId, improvement = null) {
    const features = _products[id].features.offer.map(m => m);

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

  calculateMarketIncome(id, marketId, improvement = null) {
    const rating = this.getRating(id, marketId, improvement);

    const modifier = this.getPaymentModifier(id);

    const efficiency = rating * modifier / 10;

    const possible = marketManager.getPossibleIncome(marketId, id);

    return Math.floor(possible * efficiency);
  }

  getFeatureIncreaseXPCost(id) {
    return 3;
  }

  getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value) {
    const income = this.getMarketIncome(id, marketId);

    const rating = this.getRating(id, marketId);
    const nextRating = this.getRating(id, marketId, { featureId, value });

    // logger.log('getIncomeIncreaseForMarketIfWeUpgradeFeature', marketId, featureId, income);

    const willBe = Math.floor(income * (nextRating / rating));

    // const feature = this.getPrettyFeatureNameByFeatureId(id, featureId);
    // logger.log(`getIncomeIncreaseForMarketIfWeUpgradeFeature, ${feature} on market ${marketId},
    // income: ${income}$, willBe: ${willBe}$, rating: ${rating}, nextRating: ${nextRating}`);

    return willBe - income;
  }

  getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, value) {
    // return 154;
    return sum(
      this.getMarkets(id).map((m, marketId) => this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value))
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

  logger.log('product store', p);

  const id = p.id;

  let change = true;
  switch (p.type) {
    case c.PRODUCT_ACTIONS_TEST_HYPOTHESIS:
      _products[id].testHypothesis(p);
      break;

    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
      _products[id].switchStage(p.stage);
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      _products[id].improveFeature(p);
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
      _products[id].improveFeatureByPoints(p);
      break;



    case c.PRODUCT_ACTIONS_HYPE_ADD:
      logger.log('add hype', p);
      marketManager.addHype(p.marketId, id, p.hype);

      _products[id]._money -= p.cost;
      break;

    case c.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE:
      marketManager.loseMonthlyHype(p.id);
      break;



    case c.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN:
      marketManager.setMainMarket(p.id, p.marketId);
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
      _products[p.id || 0]._money += p.amount;
      break;

    case c.PLAYER_ACTIONS_INCREASE_POINTS:
      _products[p.id || 0]._points.programming += p.points.programming;
      break;

    case c.PLAYER_ACTIONS_DECREASE_POINTS:
      _products[p.id || 0]._points.programming -= p.pp;
      break;


    case c.PRODUCT_ACTIONS_BONUSES_ADD:
      _products[p.id].bonuses++;
      break;

    case c.PLAYER_ACTIONS_SET_TASK:
      _team[p.index].task = p.task;
      break;

    case c.PLAYER_ACTIONS_HIRE_WORKER:
      _team.push(p.player);

      _employees.splice(p.i, 1);
      break;

    case c.PLAYER_ACTIONS_FIRE_WORKER:
      _money -= _team[p.i].salary.money;

      _team.splice(p.i, 1);
      break;

    case c.PLAYER_ACTIONS_EMPLOYEE_ADD:
      _employees.push(p.player);
      break;

    case c.PLAYER_ACTIONS_UPDATE_EMPLOYEES:
      _employees = [
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create(),
        workerGenerator.create()
      ];
      break;

    case c.PLAYER_ACTIONS_EMPLOYEE_REMOVE:
      _employees.splice(p.i, 1);
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
