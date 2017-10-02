import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import percentify from '../helpers/math/percentify';

import companyCostHelper from '../helpers/products/compute-company-cost';

import * as PRODUCT_STAGES from '../constants/products/product-stages';
import * as EXPENSES from '../constants/expenses';
import * as JOB from '../constants/job';

import Product from '../classes/Product';

import { DefaultDescription, MarketDescription } from '../constants/products/types/product-description';


import productDescriptions from '../helpers/products/product-descriptions';

import sessionManager from '../helpers/session-manager';

import companyMerger from '../helpers/products/company-merger';


import getSpecialization from '../helpers/team/specialization';
import skillHelper from '../helpers/team/skills';

import workerGenerator from '../helpers/team/create-random-worker';

import rentHelper from '../helpers/products/rents';
import marketHelper from '../helpers/products/markets';


import computeRating from '../helpers/products/compute-rating';
import round from '../helpers/math/round';


import stats from '../stats';

const EC = 'PRODUCT_EVENT_CHANGE';

let _money = 1000;
let _expenses = [];

type DescribedRent = {
  in: Number,
  out: Number,
  featureId: Number,
  price: Number,
  until: Number,

  senderName: String,
  acceptorName: String,
  senderValue: Number,
  techName: String
};

type MarketRecord = {
  companyId: Number,
  marketId: Number,
  level: Number,
};

let _rents: Array<Rent> = [
  // { in: 2, out: 0, featureId: 3, price: 1000, until: 420 }
];

let _employees = [];

let _team = [
  {
    name: 'James',
    skills: {
      programming: 1000,
      marketing: 150,
      analyst: 300
    },
    task: JOB.JOB_TASK_PROGRAMMER_POINTS,
    jobMotivation: JOB.JOB_MOTIVATION_BUSINESS_OWNER,
    salary: {
      percent: 100,
      money: 100,
      pricingType: 0
    },
    isPlayer: true
  },
  {
    name: 'Lynda',
    skills: {
      programming: 0,
      marketing: 500,
      analyst: 150
    },
    task: JOB.JOB_TASK_MARKETING_POINTS,
    jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
    salary: {
      money: 500,
      percent: 0,
      pricingType: 1
    }
  },
  {
    name: 'Xavier',
    skills: {
      programming: 600,
      marketing: 100,
      analyst: 150
    },
    task: JOB.JOB_TASK_PROGRAMMER_POINTS,
    jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
    salary: {
      money: 700,
      percent: 0,
      pricingType: 1
    }
  }
];


let _reputation = 50; // neutral reputation
let _fame = 0; // nobody knows you

let _loan = 0; // no loans;

let _products: Array<Product> = [];

let _markets: Array<MarketRecord> = [];

const initialize = ({ markets, products, rents, expenses, employees, team, reputation, fame, loan }) => {
  _products = products;
  _markets = markets;

  _expenses = expenses;
  _employees = employees;
  _team = team;
  _reputation = reputation;
  _fame = fame;
  _loan = loan;
  _rents = rents;
};

initialize(sessionManager.getProductStorageData());

const getCurrentMainFeatureDefaultsByIdea = (idea) => {
  const productsWithSameIdea = _products;

  return productDescriptions(idea).features.map((f, featureId) => {
    let max = f.data;

    productsWithSameIdea.forEach((p) => {
      let temp = p.getMainFeatureQualityByFeatureId(featureId);

      if (temp > max) {
        max = temp;
      }
    });

    return max;
  });
};

const getCurrentMainFeatureDefaultsById = (id) => {
  const p = _products[id];

  const idea = p.getIdea();

  return getCurrentMainFeatureDefaultsByIdea(idea);
};

function isMercenary(worker) {
  return worker.salary.pricingType === 1;
}

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const getMarketRecordIndex = (id, marketId) => {
  return _markets.findIndex((m, i) => m.companyId === id && m.marketId === marketId);
};

const getCurrentMainMarket = (id) => {
  return _markets.findIndex((m, i) => m.companyId === id && m.isMainMarket);
};

const clearPartnershipOf = (id, marketId) => {
  const index = getMarketRecordIndex(id, marketId);

  if (index >= 0) {
    const partnerId = _markets[index].partnerId;

    if (partnerId >= 0) {
      _markets[partnerId].partnerId = -1;
    }

    _markets[index].partnerId = -1;
  }
};


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
      expenses: _expenses,
      employees: _employees,
      team: _team,
      reputation: _reputation,
      fame: _fame,
      loan: _loan,
      products: _products,
      rents: _rents,
      markets: _markets
    }
  }


  getMoney(id) {
    return Math.floor(_products[id]._money);
  }

  getExpenses() {
    return _expenses;
  }

  getLoanPaymentAmount() {
    return _loan ? _loan * 0.01 : 0;
  }

  getLoanSize() {
    return _loan;
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

  getMarketers() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_MARKETER)
  }

  getAnalysts() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_ANALYST)
  }

  getDesigners() {
    return _team.filter(p => getSpecialization(p) === JOB.PROFESSION_DESIGNER)
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


  getRentingStatus(id, featureId) {
    return rentHelper.getRentingStatus(_rents, id, featureId);
  }

  canRentTechFromAtoB(sender, acceptor, featureId) {
    return rentHelper.canRentTechFromAtoB(_rents, sender, acceptor, featureId);
  }

  isRentingAlready(sender, acceptor, featureId) {
    return rentHelper.isRentingAlready(_rents, sender, acceptor, featureId);
  }

  getRentIncomes(id) {
    return rentHelper.getRentIncomes(_rents, id);
  }

  getRentExpenses(id) {
    return rentHelper.getRentExpenses(_rents, id);
  }

  incomingRentList(id) {
    return rentHelper.incomingRentList(_rents, id);
  }

  outgoingRentList(id) {
    return rentHelper.outgoingRentList(_rents, id);
  }

  hasIncomingRents(id) {
    return rentHelper.hasIncomingRents(_rents, id);
  }

  hasOutgoingRents(id) {
    return rentHelper.hasOutgoingRents(_rents, id);
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
  };

  getHypothesisAnalyticsFeatures(id) {
    return _products[id].getHypothesisAnalyticsFeatures();
  };

  getPaymentFeatures(id) {
    return _products[id].getPaymentFeatures();
  };

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

  idHelper(p, i) {
    return { id: i, p };
  }

  getBenefitOnFeatureImprove(id, featureId) {
    return Math.floor(this.getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, 1));
  }

  getRents(): Array<DescribedRent> {
    return _rents.map(r => {
      const obj = Object.assign({} , r);

      obj.senderName = _products[r.out].getName();
      obj.acceptorName = _products[r.in].getName();
      obj.senderValue = this.getMainFeatureQualityByFeatureId(r.out, r.featureId);
      obj.techName = this.getPrettyFeatureNameByFeatureId(r.out, r.featureId);

      return obj;
    });
  };

  getMonthlyProgrammerPoints(id) {
    const bonus = 1 + this.getBonusModifiers(id).programmingEfficiency / 100;

    const base = sum(this.getProgrammers().map(skillHelper.getProgrammingPointsProducedBy));

    return Math.floor(base * bonus);
  }

  isNeedProgrammer(id) {
    const decrease = this.getProgrammingSupportCost(id);
    const increase = this.getMonthlyProgrammerPoints(id);

    return decrease > increase;
  }

  getTeamExpenses() {
    return sum(
      this.getTeam()
        .filter(isMercenary)
        .map(worker => worker.salary.money)
    );
  }

  getMarketRatingComputationList(id, marketId) {
    return this.getDefaults(id).markets[marketId].rating;
  };

  getMainFeatureIterator(id): Array {
    return this.getDefaults(id).features;
  }

  getLeaderValues(id) {
    return this.getMainFeatureIterator(id).map((f, i) => this.getLeaderInTech(i))
  };

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

  getSharesOnMarket() {

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

    const paymentModifier = this.getPaymentModifier(id);

    const efficiency = rating * paymentModifier / 10;

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


  getMarketIncome = (id, marketId, improvement) => {
    const influenceOnMarket = this.getMarketInfluenceOfCompany(id, marketId);

    return this.calculateMarketIncome(id, marketId, improvement, influenceOnMarket);
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
    const leader = _products
      .map(this.idHelper)
      .sort((obj1, obj2) => {
        const p1: Product = obj1.p;
        const p2: Product = obj2.p;

        const f1 = p1.getMainFeatureQualityByFeatureId(featureId);
        const f2 = p2.getMainFeatureQualityByFeatureId(featureId);

        return f2 - f1;
      })[0];

    return {
      id: leader.id,
      name: leader.p.name,
      value: leader.p.getMainFeatureQualityByFeatureId(featureId)
    }
  }

  getCurrentMainFeatureDefaultsById(id) {
    return getCurrentMainFeatureDefaultsById(id);
  }

  getCurrentMainFeatureDefaultsByIdea(idea) {
    return getCurrentMainFeatureDefaultsByIdea(idea);
  }

  getAbsoluteRating(id) {
    return this.getRating(id, 0, null);
  };

  getCompetitorsList() {
    return _products
      .map((p, i) => ({ p, id: i }))
      .map(obj => {
        const p: Product = obj.p;
        const id = obj.id;

        const rating = this.getAbsoluteRating(id);

        const features = p.features.offer;

        const offer = p.getMainFeatures()
          .map((f, i) => ({
            name: f.name,
            description: f.shortDescription,
            value: features[i]
          }));

        return {
          id,
          rating,
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
      const currentIndex = getCurrentMainMarket(p.id);

      if (currentIndex >= 0) {
        _markets[currentIndex].isMainMarket = false;
      }

      index = getMarketRecordIndex(p.id, p.marketId);
      if (index >= 0) {
        _markets[index].isMainMarket = true;
      }
      break;

    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE:
      let c1 = p.c1;
      let c2 = p.c2;

      clearPartnershipOf(c1, p.marketId);
      clearPartnershipOf(c2, p.marketId);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER:
      c1 = p.c1;
      c2 = p.c2;

      const record1 = getMarketRecordIndex(c1, p.marketId);
      const record2 = getMarketRecordIndex(c2, p.marketId);

      clearPartnershipOf(c1, p.marketId);
      clearPartnershipOf(c2, p.marketId);

      _markets[record1].partnerId = c2;
      _markets[record2].partnerId = c1;
      break;

    case c.PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY:
      const competitor: Product = p.p;

      competitor.setCompetitorProductDefaults(PRODUCT_STAGES.PRODUCT_STAGE_NORMAL, 0);

      _products.push(competitor);
      break;

    case c.PRODUCT_ACTIONS_COMPANY_BUY:
      logger.debug('buy company store');
      const { buyerId, sellerId } = p;

      const buyer = _products[buyerId];
      const seller = _products[sellerId];

      const difference = companyMerger.merge(buyer, seller);

      _products[buyerId].features.offer = difference.features;

      _products.splice(sellerId, 1);
      break;

    case c.PRODUCT_ACTIONS_TECHNOLOGY_RENT:
      _rents.push({
        in: p.acceptor,
        out: p.sender,
        featureId: p.featureId,
        price: p.price,
        until: p.until
      });
      break;

    case c.PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH:
      // it must be reversed in product-actions from max id to min id
      logger.debug(p, 'refresh');
      p.list.forEach((id) => {
        _rents.splice(id, 1);
      });
      break;

    case c.PLAYER_ACTIONS_INCREASE_MONEY:
      _products[p.id || 0]._money += p.amount;
      break;

    case c.PLAYER_ACTIONS_INCREASE_POINTS:
      logger.shit('|| 0 in PLAYER_ACTIONS_INCREASE_POINTS pr store');
      _products[p.id || 0]._points.programming += p.points.programming;
      break;

    case c.PLAYER_ACTIONS_DECREASE_POINTS:
      logger.shit('|| 0 in PLAYER_ACTIONS_DECREASE_POINTS pr store');
      _products[p.id || 0]._points.programming -= p.pp;
      break;



    case c.PLAYER_ACTIONS_EXPENSES_ADD:
      _expenses.push(p.expense);
      break;

    case c.PLAYER_ACTIONS_EXPENSES_REMOVE:
      _expenses.splice(p.id, 1);
      break;

    case c.PLAYER_ACTIONS_LOANS_TAKE:
      logger.shit('LOAN SIZE MUST BASE ON YOUR INCOME!!!. stores product-store.js');

      const repay = 1.3;
      _products[p.id || 0]._money += p.amount;
      _loan += p.amount * repay;

      _expenses.push({
        type: EXPENSES.EXPENSES_LOAN,
        price: p.amount * repay,
        regularity: 1
      });
      break;

    case c.PLAYER_ACTIONS_LOANS_REPAY:
      let loanSize = _expenses[p.id].price;
      if (loanSize <= _money) {
        _money -= loanSize;
        _loan -= loanSize;

        _expenses.splice(p.id, 1);
      } else {
        change = false;
      }
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
