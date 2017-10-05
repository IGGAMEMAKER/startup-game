import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import percentify from '../helpers/math/percentify';

import companyCostHelper from '../helpers/products/compute-company-cost';

import * as PRODUCT_STAGES from '../constants/products/product-stages';
import * as JOB from '../constants/job';

import Product from '../classes/Product';

import { DefaultDescription, MarketDescription } from '../constants/products/types/product-description';


import sessionManager from '../helpers/session-manager';

import getSpecialization from '../helpers/team/specialization';
import skillHelper from '../helpers/team/skills';

import workerGenerator from '../helpers/team/create-random-worker';

import marketHelper from '../helpers/products/markets';

import MarketManager from '../classes/MarketManager';


import computeRating from '../helpers/products/compute-rating';
import round from '../helpers/math/round';


import stats from '../stats';

const EC = 'PRODUCT_EVENT_CHANGE';

let _money = 1000;

type MarketRecord = {
  companyId: Number,
  marketId: Number,
  level: Number
};

let _employees = [];

let _team = [
  // {
  //   name: 'James',
  //   skills: {
  //     programming: 1000,
  //     marketing: 150,
  //     analyst: 300
  //   },
  //   task: JOB.JOB_TASK_PROGRAMMER_POINTS,
  //   jobMotivation: JOB.JOB_MOTIVATION_BUSINESS_OWNER,
  //   salary: {
  //     percent: 100,
  //     money: 100,
  //     pricingType: 0
  //   },
  //   isPlayer: true
  // },
  // {
  //   name: 'Lynda',
  //   skills: {
  //     programming: 0,
  //     marketing: 500,
  //     analyst: 150
  //   },
  //   task: JOB.JOB_TASK_MARKETING_POINTS,
  //   jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
  //   salary: {
  //     money: 500,
  //     percent: 0,
  //     pricingType: 1
  //   }
  // },
  // {
  //   name: 'Xavier',
  //   skills: {
  //     programming: 600,
  //     marketing: 100,
  //     analyst: 150
  //   },
  //   task: JOB.JOB_TASK_PROGRAMMER_POINTS,
  //   jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
  //   salary: {
  //     money: 700,
  //     percent: 0,
  //     pricingType: 1
  //   }
  // }
];

let _products: Array<Product> = [];

const marketManager = new MarketManager();

let _markets: Array<MarketRecord> = [];

const initialize = ({ markets, products, employees, team }) => {
  logger.log('trying to initialize productStore.js', products);

  _products = products.map(p => new Product().loadFromObject(p));
  logger.log('trying to initialize productStore.js', _products);
  _markets = markets;

  _employees = employees;
  _team = team;

  marketManager.loadMarkets(_markets);
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

  getMarketName(id, mId) {
    return this.getMarketInfo(id, mId).name;
  }

  getPoints(id) {
    return _products[id]._points;
  }

  enoughMarketingPoints(mp, id) {
    return _products[id]._points.marketing >= mp;
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

  getMarketingFeatures(id) {
    return _products[id].getMarketingFeatures();
  }




  getProductExpenses(id) {
    return _products[id].getProductExpenses();
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

  getBonusesList(id) {
    return _products[id].getBonusesList();
  }

  getMarketRecord(id, marketId) {
    return marketHelper.getMarketRecord(_markets, id, marketId);
  }

  isMainMarket(id, marketId) {
    return marketHelper.isMainMarket(_markets, id, marketId);
  }

  getClientAnalyticsModifier(id) {
    return _products[id].getClientAnalyticsModifier();
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

  getHypothesisAnalyticsFeatures(id) {
    return _products[id].getHypothesisAnalyticsFeatures();
  }

  getPaymentFeatures(id) {
    return _products[id].getPaymentFeatures();
  }

  getImprovementChances(id) {
    return _products[id].getImprovementChances()
  }

  getProductExpensesStructure(id) {
    return _products[id].getProductExpensesStructure();
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


  isPartneredOnMarket(c1, c2, marketId) {
    return marketHelper.isPartneredOnMarket(_markets, c1, c2, marketId);
  }

  isMarketFree(marketId) {
    return marketHelper.isMarketFree(_markets, marketId);
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

  getMonthlyProgrammerPoints(id) {
    return Math.floor(this.getBaseMonthlyProgrammerPoints(id) * this.getProgrammingEfficiencyBonus(id));
  }

  isNeedProgrammer(id) {
    logger.log('isNeedProgrammer', _products, id);
    return this.getProgrammingSupportCost(id) > this.getMonthlyProgrammerPoints(id);
  }

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

  getRating(id, marketId, improvement = null) {
    const features = _products[id].features.offer.map(m => m);

    const maxValues = this.getLeaderValues(id).map(l => l.value);
    const marketInfluences = this.getMarketRatingComputationList(id, marketId);

    if (improvement) {
      features[improvement.featureId] += 1;
    }

    return Math.min(round(computeRating(features, maxValues, marketInfluences)), 10);
  }




  getPowerOfCompanyOnMarket(id, marketId) {
    const base = this.getBaseMarketingInfluence(id, marketId);

    const mainMarketBonus = this.isMainMarket(id, marketId) ? 1.2 : 1;

    let partnershipBonus = 0;
    const record = this.getMarketRecord(id, marketId);

    if (record && record.partnerId >= 0) {
      partnershipBonus = this.getBaseMarketingInfluence(record.partnerId, marketId) * 0.3;
    }

    return base * mainMarketBonus + partnershipBonus;
  }

  getPowerListOnMarket(marketId) {
    const influences = _products
      .map((p, i) =>
        ({
          power: this.getPowerOfCompanyOnMarket(i, marketId),
          companyId: i,
          marketId,
          name: this.getName(i)
        })
      );

    const total = sum(influences.map(i => i.power));

    return influences
      .map(m => Object.assign({}, m, { share: percentify(m.power / total) }))
      .sort((a, b) => b.power - a.power);
  }

  getPowerListWithCompanyNames(marketId) {
    return this.getPowerListOnMarket(marketId)
  }


  getBaseMarketingInfluence(id, marketId) {
    return this.getRating(id, marketId);
  }

  getMarketInfluenceOfCompany(id, marketId) {
    const powers = this.getPowerListOnMarket(marketId);

    const powerOfCompany = powers.find(c => c.companyId === id);

    const power = powerOfCompany ? powerOfCompany.power : 0;

    const total = sum(powers.map(p => p.power));

    return power / total;
  }

  getMarketSize(id, marketId) {
    const { price, clients } = this.getMarketInfo(id, marketId);

    return price * clients;
  }

  calculateMarketIncome(id, marketId, improvement, influenceOnMarket) {
    const rating = this.getRating(id, marketId, improvement);

    const modifier = this.getPaymentModifier(id);

    const efficiency = rating * modifier / 10;

    return Math.floor(this.getMarketSize(id, marketId) * efficiency * influenceOnMarket);
  }

  getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value) {
    const now = this.getMarketIncome(id, marketId, null);

    const rating = this.getRating(id, marketId, null);
    const nextRating = this.getRating(id, marketId, { featureId, value });

    const willBe = Math.floor(now * (nextRating / rating));

    return willBe - now;
  }

  getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, value) {
    return sum(
      this.getMarkets(id).map((m, marketId) => this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value))
    );
  }


  getMarketIncome(id, marketId, improvement) {
    return this.calculateMarketIncome(id, marketId, improvement, this.getMarketInfluenceOfCompany(id, marketId));
  };

  getProductIncome(id) {
    return sum(
      this.getMarkets(id).map((m, i) => this.getMarketIncome(id, i, null))
    );
  }



  isUpgradeWillResultTechBreakthrough(id, featureId) {
    const current = this.getMainFeatureQualityByFeatureId(id, featureId);
    const max = this.getLeaderValues(id)[featureId];

    return current + 1 > max;
  }

  getMainFeatureUpgradeCost(id, featureId) {
    return this.getBaseFeatureDevelopmentCost(id, featureId);
  }

  getLeaderInTech(featureId) {
    const leader: Product = _products
      .sort((p1: Product, p2: Product) => {
        const f1 = p1.getMainFeatureQualityByFeatureId(featureId);
        const f2 = p2.getMainFeatureQualityByFeatureId(featureId);

        return f2 - f1;
      })[0];

    return {
      id: leader.companyId,
      name: leader.name,
      value: leader.getMainFeatureQualityByFeatureId(featureId)
    }
  }

  getCompetitorsList() {
    return _products
      .map((p: Product) => {
        const id = p.companyId;
        const features = p.features.offer;

        const offer = p.getMainFeatures()
          .map((f, i) => ({
            name: f.name,
            description: f.shortDescription,
            value: features[i]
          }));

        return {
          id,
          rating: 0,
          company: p,
          style: p.style,
          name: p.name,
          features: offer,
          XP: p.XP,
          cost: this.getCompanyCost(id),
          income: this.getProductIncome(id),
          expenses: this.getProductExpenses(id)
        }
      });
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
    case c.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS:
      _products[id].setProductDefaults(PRODUCT_STAGES.PRODUCT_STAGE_NORMAL, p.features, 1999);
      break;

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
      _products[id].addHype(p.hype);
      break;

    case c.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE:
      _products[id].loseMonthlyHype(p.hypeDamping);
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
      let competitor: Product;
      competitor = new Product(p.p);

      _products.push(competitor);
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
