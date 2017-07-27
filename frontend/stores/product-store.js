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


import stats from '../stats';

const EC = 'PRODUCT_EVENT_CHANGE';

let _money = 1000;
let _expenses = [];

let _points = {
  programming: 5300,
  marketing: 5200,
  analyst: 300
};

type Rent = {
  in: Number,
  out: Number,
  featureId: Number,
  price: Number,
  until: Number
};

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
  { in: 2, out: 0, featureId: 3, price: 1000, until: 420 }
];

let _employees = [
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
  const productsWithSameIdea = _products.filter((p, i) => p.idea === idea);

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

    if (partnerId) {
      _markets[partnerId].partnerId = null;
    }

    _markets[index].partnerId = null;
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

  getMarketName(id, mId) {
    return this.getMarkets(id)[mId].name;
  }

  getPoints(id) {
    return _products[id]._points;
  }

  enoughMarketingPoints(mp, id) {
    // logger.debug('enough points', id, _products);
    return _products[id]._points.marketing >= mp;
  }

  enoughProgrammingPoints(pp, id) {
    // logger.debug('enough points', id, _products);
    return _products[id]._points.programming >= pp;
  }

  getTeam() {
    return _team.map((e, i) => Object.assign({}, e, { id: i }));
  }

  getMonthlyMarketerPoints(id) {
    const bonus = 1 + _products[id].getBonusModifiers().marketingEfficiency / 100;

    const base = sum(this.getMarketers().map(skillHelper.getMarketingPointsProducedBy));

    return Math.floor(base * bonus);
  }

  getMonthlyProgrammerPoints(id) {
    const bonus = 1 + _products[id].getBonusModifiers().programmingEfficiency / 100;

    const base = sum(this.getProgrammers().map(skillHelper.getProgrammingPointsProducedBy));

    return Math.floor(base * bonus);
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

  getTeamExpenses() {
    return sum(
      this.getTeam()
        .filter(isMercenary)
        .map(worker => worker.salary.money)
    );
  }

  getMaxPossibleFreelanceMarketingPoints() {
    return Math.floor(_money / JOB.PRICE_OF_ONE_MP)
  }

  getMaxPossibleFreelanceProgrammingPoints() {
    return Math.floor(_money / JOB.PRICE_OF_ONE_PP)
  }

  getMaxPossibleAdClients() {
    const CLIENT_PRICE = 1;

    return Math.floor(_money / CLIENT_PRICE);
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
    // logger.debug('isOurProduct', p);
    return p.owner;
  }

  getProduct(id): Product {
    return _products[id];
  }

  getCompanyCost(id) {
    return companyCostHelper.compute(_products[id], this.getProductIncome(id), 0);
    return _products[id].getCompanyCost();
  }

  getCompanyCostStructured(id) {
    return companyCostHelper.structured(_products[id], this.getProductIncome(id), 0);
    return _products[id].getCompanyCostStructured();
  }

  enforceFeaturesByRentedOnes(offer: Array<Number>, rented: Array<Rent>) {
    const list = offer.map(v => v);

    rented.forEach(r => {
      const id = r.featureId;

      const current = list[id];
      const next = this.getMainFeatureQualityByFeatureId(r.out, id);

      if (next >= current) {
        list[id] = next;
      }
    });

    return list;
  }

  canRentTechFromAtoB(sender, acceptor, featureId) {
    const result = _rents.find(r => r.featureId === featureId && (r.in === acceptor || r.out === acceptor || r.in === sender));

    logger.debug('can rent', sender, acceptor, featureId, result);
    return !result
  }

  getRentIncomes(id) {
    const outgoingRents = this.getRents()
      .filter(r => r.out === id);

    const sum = outgoingRents.map(r => r.price).reduce((p, c) => p + c, 0);

    return {
      outgoingRents,
      sum
    };
  }

  getRentExpenses(id) {
    const incomingRents = this.getRents()
      .filter(r => r.in === id);

    const sum = incomingRents.map(r => r.price).reduce((p, c) => p + c, 0);

    return {
      incomingRents,
      sum
    };
  }

  getRentingStatus(id, featureId) {
    const canSend = !_rents.find(r => r.featureId === featureId && r.in === id);
    const canAccept = !_rents.find(r => r.featureId === featureId && (r.out === id || r.in === id));

    return {
      canSend,
      canAccept
    };
  }

  isRentingAlready(sender, acceptor, featureId) {
    return _rents.find(r => r.featureId === featureId && ((r.in === acceptor && r.out === sender) || (r.out === acceptor && r.in === sender)));
  }

  getRating(id, marketId, improvement = null) {
    if (!marketId) marketId = 0;

    const rented = this.incomingRentList(id);
    const features = this.enforceFeaturesByRentedOnes(_products[id].features.offer, rented);

    return Product.getRating(_products[id], features, marketId, improvement);
  }

  getClients(id, segmentId) {
    return _products[id].getClients(segmentId);
  }

  getSegmentBySegmentId(id, segId) {
    return _products[id].getSegmentBySegmentId(segId);
  }

  getHypeDamping(id) {
    return _products[id].getHypeDamping();
  }

  getSegmentedPriorities(id, segId) {
    return _products[id].getSegmentedPriorities(segId);
  }

  getNewClients(id) {
    return _products[id].getNewClients();
  }

  getMainFeatureQualityByFeatureId(id, featureId) {
    return _products[id].getMainFeatureQualityByFeatureId(featureId);
  }

  getPrettyFeatureNameByFeatureId(id, featureId){
    return _products[id].getPrettyFeatureNameByFeatureId(featureId);
  }

  requirementsOKforMarket(id, marketId) {
    // return true;
    return _products[id].requirementsOKforMarket(marketId);
  }

  getAnalyticsValueForFeatureCreating(id) {
    return _products[id].getAnalyticsValueForFeatureCreating();
  }

  getDefaults(id): DefaultDescription {
    return _products[id].getDefaults();
  }

  incomingRentList(id) {
    return _rents.filter(r => r.in === id);
  }

  outgoingRentList(id) {
    return _rents.filter(r => r.out === id);
  }

  hasIncomingRents(id) {
    return _rents.find(r => r.in === id);
  }

  hasOutgoingRents(id) {
    return _rents.find(r => r.out === id);
  }

  getProductUtility(id) {
    return _products[id].getProductUtility();
  }

  getPaymentModifier(id) {
    return _products[id].getPaymentModifier();
  }

  getProductPrice(id, segId) {
    return _products[id].getProductPrice(segId);
  }

  getFeatures(id, featureGroup) {
    return _products[id].getFeatures(featureGroup);
  }

  isPaymentEnabled(id, segmentId) {
    return _products[id].isPaymentEnabled(segmentId);
  }

  getNextFeature(id, groupType, featureList) {
    let unlockedFeature = '';
    featureList.forEach(f => {
      if (!this.getFeatureStatus(id, groupType, f.name) && !unlockedFeature) {
        unlockedFeature = f.name;
      }
    });

    if (!unlockedFeature) return null;

    let f = featureList.find(f => f.name === unlockedFeature);

    return Object.assign({}, f, { canUpgrade: this.enoughMarketingPoints(f.points.marketing, id) && this.enoughProgrammingPoints(f.points.programming, id) })
  }

  enoughPointsToUpgradeFeature(id, featureGroup, featureName) {

  }

  getNearestMarketingFeature(id) {
    return this.getNextFeature(id, 'marketing', this.getMarketingFeatureList(id));
  }

  getNearestPaymentFeature(id) {
    return this.getNextFeature(id, 'payment', this.getPaymentFeatures(id));
  }



  getBenefitOnFeatureImprove(id, featureId) {
    return Math.floor(this.getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, 1000));
  }

  getMarkets(id): Array<MarketDescription> {
    return productDescriptions(_products[id].idea).markets;
  }

  getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value) {
    if (this.isUpgradeWillResultTechBreakthrough(id, featureId)) return 0;

    const now = this.getMarketIncome(id, marketId, null);

    const willBe = this.getMarketIncome(id, marketId, { featureId, value });

    return willBe - now;
  }

  getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, value) {
    return this.getMarkets(id)
      .map((m, marketId) => {
        return this.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value)
      })
      .reduce((p, c) => p + c, 0);
  }

  getPowerOfCompanyOnMarket(id, marketId) {
    logger.shit('need to count edicts, market-oriented features, campaigns');

    const base = this.getBaseMarketingInfluence(id, marketId);

    const mainMarketBonus = this.isMainMarket(id, marketId) ? 1.2 : 1;

    return base * mainMarketBonus;
  }

  getPowerListOnMarket(marketId) {
    const marketRecords = _markets.filter(m => m.marketId === marketId);

    let sum = 0;
    const influences = marketRecords
      .map(({ companyId, marketId }) => {
        let power = this.getPowerOfCompanyOnMarket(companyId, marketId);

        sum += power;

        return {
          name: this.getName(companyId),
          power,
          companyId,
          marketId
        };
      });

    return influences
      .map(m => Object.assign({}, m, { share: percentify(m.power / sum) }))
      .sort((a, b) => b.power - a.power);
  }

  isPartneredOnMarket(c1, c2, marketId) {
    const record = this.getMarketRecord(c1, marketId);

    if (!record) return false;

    return record.partnerId === c2;
  }

  getMarketInfo(id, marketId) {
    return this.getDefaults(id).markets[marketId];
  }

  getMarketInfluenceOfCompany(id, marketId) {
    const powers = this.getPowerListOnMarket(marketId);

    const power = powers.find(c => c.companyId === id).power;

    let sum = powers.map(p => p.power).reduce((p, c) => p + c, 0);

    return power / sum;
  }

  getMarketSize(id, marketId) {
    const { price, clients } = this.getMarkets(id)[marketId];

    return price * clients;
  }

  calculateMarketIncome(id, marketId, improvement, influenceOnMarket) {
    const rating = this.getRating(id, marketId, improvement);

    const paymentModifier = this.getPaymentModifier(id);

    const efficiency = rating * paymentModifier / 10;

    return Math.floor(this.getMarketSize(id, marketId) * efficiency * influenceOnMarket);
  }

  isMarketFree(marketId) {
    return -1 === _markets.findIndex(m => m.marketId === marketId);
  }

  getPointModificationStructured(id) {
    const monthlyProgrammingPointsDifferenceStructured = (id = 0) => {
      logger.shit('getProgrammingSupportCost with zero index... ' +
        'we need real ID of our product!! /helpers/points/modification.js');

      const decrease = this.getProgrammingSupportCost(id);
      const increase = this.getMonthlyProgrammerPoints(id);

      return {
        increase,
        decrease,
        needToHireWorker: decrease > increase,
        diff: Math.abs(decrease - increase)
      }
    };

    const monthlyMarketingPointsDifferenceStructured = (id = 0) => {
      const decrease = this.getMarketingSupportCost(id);
      const increase = this.getMonthlyMarketerPoints(id);


      return {
        increase,
        decrease,
        detailed: {
          markets: this.getOurMarketsSupportCostList(id),
          blog: this.getBlogStatusStructured(id).supportCost,
          support: this.getMarketingSupportTechTotalCost(id),
          base: this.getBaseSupportCost()
        },
        needToHireWorker: decrease > increase,
        diff: Math.abs(decrease - increase)
      }
    };

    return {
      programming: () => monthlyProgrammingPointsDifferenceStructured(id),
      marketing: () => monthlyMarketingPointsDifferenceStructured(id)
    }
  }

  getIncomeIncreaseIfWeIncreaseInfluenceOnMarket(id, marketId) {
    if (this.isHaveInfluenceOnMarket(id, marketId)) {
      const powerIncreaseMultiplier = this.getNextInfluenceMarketingCost(id, marketId) / this.getCurrentInfluenceMarketingCost(id, marketId);

      const powers = this.getPowerListOnMarket(marketId);

      const index = powers.findIndex(p => p.companyId === id);

      const prevShare = powers[index].share;
      powers[index].share = prevShare * powerIncreaseMultiplier;

      const shares = powers.map(p => p.share).reduce((p, c) => p + c, 0);

      const nextShare = powers[index].share * 100 / shares;

      const income = this.getMarketIncome(id, marketId) * (nextShare / prevShare - 1);

      // logger.debug('getIncomeIncreaseIfWeIncreaseInfluenceOnMarket', id, marketId, powerIncreaseMultiplier, powers);
      // logger.debug('getIncomeIncreaseIfWeIncreaseInfluenceOnMarket', index, shares, prevShare, nextShare);
      return Math.floor(income);
    } else if (this.isMarketFree(marketId)) {
      return this.calculateMarketIncome(id, marketId, null, 1);
    } else {
      // market is not free, and we are trying entering it
      logger.shit('count edicts too!');

      const powers = this.getPowerListOnMarket(marketId);

      const newPower = this.getNextInfluenceMarketingCost(id, marketId);

      const shares = powers.map(p => p.power).reduce((p, c) => p + c, 0) + newPower;

      return this.calculateMarketIncome(id, marketId, null, newPower / shares);
    }
  }

  isHaveInfluenceOnMarket(id, marketId) {
    return _markets.find(m => m.companyId === id && m.marketId === marketId);
  }

  isAvailableToLeaveMarket(id, marketId) {
    return this.isHaveInfluenceOnMarket(id, marketId);
  }

  getBaseMarketingInfluence(id, marketId) {
    const level = _markets.find(m => m.companyId === id && m.marketId === marketId).level;

    return this.getMarketInfo(id, marketId).levels[level];
  }

  getCurrentInfluenceMarketingCost(id, marketId) {
    if (!this.isAvailableToLeaveMarket(id, marketId)) return 0;

    const level = this.getMarketLevelOfCompany(id, marketId);

    return this.getMarketInfo(id, marketId).levels[level];
  }

  getNextInfluenceMarketingCost(id, marketId) {
    if (!this.isCanIncreaseMarketLevel(id, marketId)) return 0;

    const level = this.getMarketLevelOfCompany(id, marketId);

    return this.getMarketInfo(id, marketId).levels[level + 1];
  }

  getMarketLevelOfCompany(id, marketId) {
    const record = _markets.find(m => m.companyId === id && m.marketId === marketId);

    if (record) return record.level;

    return -1;
  }

  getMonthlyMPChange(id) {
    return this.getMonthlyMarketerPoints(id) - this.getMarketingSupportCost(id);
  }

  isMaxLevelReached(id, marketId) {
    const max = this.getMarkets(id)[marketId].levels.length;
    const current = this.getMarketLevelOfCompany(id, marketId);

    return max === current;
  }

  isFreeMarket(marketId) {
    return _markets.filter(m => m.marketId === marketId).length
  }

  getShareableFeatureIdList(id) {
    return this.getDefaults(id).features.filter((f, fId) => this.isShareableFeature(id, fId)).map((f, fId) => f.id)
  }

  getMarketingAnalysis(id) {
    const markets = this.getMarkets(id);

    return markets.map(m => {
      let cost, enoughMPs, benefitOnLevelUp, isFreeMarket;
      isFreeMarket = this.isFreeMarket(m.id);

      const requirementsOk = this.requirementsOKforMarket(id, m.id).valid;

      const isMaxLevelReached = this.isMaxLevelReached(id, m.id);

      if (isMaxLevelReached) {
        cost = 0;
        enoughMPs = true;
        benefitOnLevelUp = 0;
      } else {
        cost = this.getNextInfluenceMarketingCost(id, m.id) - this.getCurrentInfluenceMarketingCost(id, m.id);
        enoughMPs = this.getMonthlyMPChange(id) >= cost;
        benefitOnLevelUp = this.getIncomeIncreaseIfWeIncreaseInfluenceOnMarket(id, m.id);
      }

      const canIncreaseInfluence = requirementsOk && !isMaxLevelReached && enoughMPs;

      let ROI = 0;
      if (cost) {
        ROI = benefitOnLevelUp / cost;
      }

      return {
        canIncreaseInfluence,
        isMaxLevelReached,
        requirementsOk,
        enoughMPs,
        isFreeMarket,
        cost,
        benefitOnLevelUp,
        ROI,
        marketId: m.id,

      }
    })
  }


  getBestOpportunityForMarketInfluenceIncreasing(id) {
    const markets = this.getMarketingAnalysis(id);

    // search for free markets
    const freeMarketIndex = markets.findIndex(m => m.isFreeMarket && m.canIncreaseInfluence);

    if (freeMarketIndex >= 0) {
      return {
        canImproveInfluence: true,
        marketId: freeMarketIndex
      }
    }

    // if there are no free markets
    // search markets with lowest influence cost


    // meet requirements?

    let canImproveInfluence = true;
    let marketId = 2;

    return {
      canImproveInfluence,
      marketId
    }
  }

  isCanIncreaseMarketLevel(id, marketId) {
    if (!this.requirementsOKforMarket(id, marketId).valid) return false;

    const max = this.getMarkets(id)[marketId].levels.length - 1;

    return this.getMarketLevelOfCompany(id, marketId) < max;
  }

  getMarketIncome = (id, marketId, improvement) => {
    if (!this.requirementsOKforMarket(id, marketId).valid) return 0;

    if (!this.isHaveInfluenceOnMarket(id, marketId)) return 0;

    const influenceOnMarket = this.getMarketInfluenceOfCompany(id, marketId);

    return this.calculateMarketIncome(id, marketId, improvement, influenceOnMarket);
  };

  getProductIncome(id) {
    const records = _markets
      .filter(m => m.companyId === id);

    if (!records.length) return 0;

    return records
      .map((m, i) => this.getMarketIncome(id, m.marketId, null))
      .reduce((p, c) => p + c, 0);
  }



  getIdea(id) {
    return _products[id].getIdea();
  }

  getMarketingFeatures(id) {
    return _products[id].getMarketingFeatures();
  }

  getBlogPower(id) {
    return _products[id].getBlogPower();
  }

  getBlogStatusStructured(id) {
    return _products[id].getBlogStatusStructured();
  }

  getSupportPower(id) {
    return _products[id].getSupportPower();
  }

  getEmailPower(id) {
    return _products[id].getEmailPower();
  }

  getMarketingSupportCostPerClientForSupportFeature(id) {
    return _products[id].getMarketingSupportCostPerClientForSupportFeature();
  }

  getProductBlogCost(id) {
    return _products[id].getProductBlogCost();
  }

  getProductSupportCost(id) {
    return _products[id].getProductSupportCost();
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

  getCostPerClient(id) {
    return _products[id].getCostPerClient();
  }

  getMarketRecord(id, marketId) {
    return _markets.find(m => m.marketId === marketId && m.companyId === id);
  }

  isMainMarket(id, marketId) {
    const record = this.getMarketRecord(id, marketId);

    if (!record) return false;

    return record.isMainMarket;
  }

  getRatingForMetricsTab(id) {
    return this.getRating(id);
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

  getMarketingSupportTechTotalCost(id) {
    return _products[id].getMarketingSupportTechTotalCost();
  }

  getBaseSupportCost(id = 0) {
    return _products[id].getBaseSupportCost();
  }

  getOurMarketsSupportCostList(id) {
    const getMarketName = (marketId) => {
      return this.getMarkets(id)[marketId].name;
    };

    return _markets
      .filter(m => m.companyId === id)
      .map(m => {
        return {
          cost: this.getCurrentInfluenceMarketingCost(id, m.marketId),
          name: getMarketName(m.marketId)
        }
      })
  }

  getMarketingSupportCost(id) {
    const baseCost = this.getOurMarketsSupportCostList(id).map(item => item.cost).reduce((p, c) => p + c, 0);

    return Math.ceil(baseCost * (1 - _products[id].getMarketingSupportCost() / 100));
    // return _products[id].getMarketingSupportCost();
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

  canShowPayPercentageMetric(id) {
    return _products[id].canShowPayPercentageMetric();
  }

  getTestsAmount(id) {
    return _products[id].getTestsAmount();
  }

  getImprovementsAmount(id) {
    return _products[id].getImprovementsAmount();
  }

  getTechnologyComplexityModifier(id) {
    return _products[id].getTechnologyComplexityModifier();
  }

  getBonusesAmount(id) {
    return _products[id].bonuses;
  }


  getNumberOfTechnologiesWhereWeMadeBreakthrough(id) {
    return _products[id].getNumberOfTechnologiesWhereWeMadeBreakthrough();
  }


  getTechnicalDebtModifier(id) {
    return _products[id].getTechnicalDebtModifier();
  }

  idHelper(p, i) {
    return { id: i, p };
  }

  isUpgradeWillResultTechBreakthrough(id, featureId) {
    const current = this.getMainFeatureQualityByFeatureId(id, featureId);
    const max = this.getCurrentMainFeatureDefaultsById(id)[featureId];

    // logger.debug('isUpgradeWillResultTechBreakthrough ?', current, max);

    return current + 1000 > max;
  }

  isWeAreRetards(id, featureId) {
    const current = this.getMainFeatureQualityByFeatureId(id, featureId);
    const max = this.getCurrentMainFeatureDefaultsById(id)[featureId];

    // logger.debug('isWeAreRetards ?', current, max);

    return current < 0.6 * max;
  }

  getBonusModifiers(id) {
    return _products[id].getBonusModifiers();
  }

  getMainFeatureUpgradeCost(id, featureId) {
    let modifier = 1;

    logger.shit('write isUpgradeWillResultTechBreakthrough function!!');

    // we are able to make breakthrough
    if (this.isUpgradeWillResultTechBreakthrough(id, featureId)) {
      modifier = 4  - _products[id].getBonusModifiers().techBreakthroughDiscount / 100;
    }


    // we are retards
    if (this.isWeAreRetards(id, featureId)) {
      modifier = 0.25 - _products[id].getBonusModifiers().followerDiscount / 100;
    }

    const specificFeatureModifier = 1 - _products[id].getSpecificFeatureDevelopmentCostModifier(featureId) / 100;

    modifier *= specificFeatureModifier;

    return Math.ceil(productDescriptions(this.getIdea(id)).features[featureId].development * modifier);
  }

  getLeaderInTech(id, featureId) {
    const leader = _products.map(this.idHelper)
      .filter((obj, i) => obj.p.idea === this.getIdea(id))
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

  ceilXPtoThousandValue(value) {
    return Math.ceil(value / 1000) * 1000;
  }

  getCurrentMainFeatureDefaultsById(id) {
    return getCurrentMainFeatureDefaultsById(id);
  }

  isShareableFeature(id, featureId) {
    return productDescriptions(this.getIdea(id)).features[featureId].shareable;
  }

  temporaryMaxFeatureValue(id, featureId) {
    return this.ceilXPtoThousandValue(this.getLeaderInTech(id, featureId).value);
  }

  getUpgradedMaxDefaultFeatureValueList(id) {
    return this.getDefaults(id).features.map((f, featureId) => {
      const base = this.getMainFeatureQualityByFeatureId(id, featureId);

      const leader = (Math.floor(this.getLeaderInTech(id, featureId).value / 1000) + 1) * 1000;

      return leader > base ? leader : base;
    });
  }

  isUpgradingMainFeatureWillResultTechLeadership(id, featureId) {
    const current = this.getMainFeatureQualityByFeatureId(id, featureId);

    const max = this.temporaryMaxFeatureValue(id, featureId);

    return current + 1000 > max;
  }

  getCurrentMainFeatureDefaultsByIdea(idea) {
    return getCurrentMainFeatureDefaultsByIdea(idea);
  }

  getCompetitorsList() {
    logger.shit('getCompetitorsList shows ALL COMPANIES with different ideas! ' +
      'You need an opportunity to toggle between all/same idea companies');

    return _products
      .map((p, i) => ({ p, id: i }))
      .map(obj => {
        const p: Product = obj.p;
        const id = obj.id;

        const rating = this.getRating(id, 0);

        const features = p.features.offer;

        const offer = this.getDefaults(id).features
          .map((f, i) => ({
            name: f.name,
            description: f.shortDescription,
            value: features[i]
          }));

        return {
          rating,
          style: p.style,
          clients: p.KPI.clients,
          name: p.name,
          features: offer,
          cost: this.getCompanyCost(id),
          id,
          hype: p.getHypeValue(),
          company: p,
          income: this.getProductIncome(id),
          expenses: this.getProductExpenses(id)
        }
      });
      // .sort((a, b) => b.cost - a.cost);
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

  const id = p.id;

  let change = true;
  switch (p.type) {
    case c.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS:
      _products[id].setProductDefaults(PRODUCT_STAGES.PRODUCT_STAGE_NORMAL, p.KPI, p.features, 1999);
      break;

    case c.PRODUCT_ACTIONS_TEST_HYPOTHESIS:
      _products[id].testHypothesis(p);
      break;

    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
      _products[id].switchStage(p.stage);
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      _products[id].improveFeature(p);

      // logger.debug('IMPROVE FEATURE BY POINTS', upgradedDefaults);

      logger.shit('rewrite upgradedDefaults updating in Product.js class. ' +
        'You need updating it only on improve Main Feature actions');

      const upgradedDefaults = getCurrentMainFeatureDefaultsById(id);
      const idea = _products[id].getIdea();

      // logger.debug('IMPROVE FEATURE BY POINTS', upgradedDefaults);

      _products
        .filter(p => p.idea === idea)
        .forEach((p) => {
          // logger.debug('upgrading for product', p.name);
          p.setMainFeatureDefaults(upgradedDefaults);
          // arr[i].setMainFeatureDefaults(upgradedDefaults);
        });
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
      _products[id].improveFeatureByPoints(p);
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_ADD:
      _products[id].addClients(p);
      break;

    case c.PRODUCT_ACTIONS_HYPE_ADD:
      _products[id].addHype(p.hype);
      break;

    case c.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE:
      _products[id].loseMonthlyHype(p.hypeDamping);
      break;

    case c.PRODUCT_ACTIONS_MARKETS_INFLUENCE_INCREASE:
      let index = getMarketRecordIndex(p.id, p.marketId);

      if (index >= 0) {
        _markets[index].level++;
      } else {
        _markets.push({ companyId: p.id, marketId: p.marketId, level: 0, partnerId: null });
      }
      break;

    case c.PRODUCT_ACTIONS_MARKETS_INFLUENCE_DECREASE:
      index = getMarketRecordIndex(p.id, p.marketId);

      if (index >= 0) {
        _markets.splice(index, 1)
      }
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

    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER:
      const { c1, c2 } = p;

      const record1 = getMarketRecordIndex(c1, p.marketId);
      const record2 = getMarketRecordIndex(c2, p.marketId);

      clearPartnershipOf(c1, p.marketId);
      clearPartnershipOf(c2, p.marketId);

      _markets[record1].partnerId = c2;
      _markets[record2].partnerId = c1;
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_REMOVE:
      _products[id].removeClients(p);
      break;

    case c.PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY:
      // { features , KPI, idea, name }
      const competitor: Product = p.p;
      // _products.push(Object.assign({}, competitor, { XP: 0, stage: PRODUCT_STAGES.PRODUCT_STAGE_NORMAL }));
      competitor.setCompetitorProductDefaults(PRODUCT_STAGES.PRODUCT_STAGE_NORMAL, 0);
      _products.push(competitor);
      break;

    case c.PRODUCT_ACTIONS_COMPANY_BUY:
      logger.debug('buy company store');
      const { buyerId, sellerId } = p;

      const buyer = _products[buyerId];
      const seller = _products[sellerId];

      const difference = companyMerger.merge(buyer, seller);

      _products[buyerId].KPI.clients = difference.clients;
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
      _products[p.id || 0]._points.marketing += p.points.marketing;
      _products[p.id || 0]._points.programming += p.points.programming;
      break;

    case c.PLAYER_ACTIONS_DECREASE_POINTS:
      logger.shit('|| 0 in PLAYER_ACTIONS_DECREASE_POINTS pr store');
      _products[p.id || 0]._points.marketing -= p.mp;
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
      break;
  }

  if (change) {
    stats.saveAction(p.type, p);
    sessionManager.saveProductStorageData(ProductStore.getStoreData());

    store.emitChange();
  }
});

export default store;
