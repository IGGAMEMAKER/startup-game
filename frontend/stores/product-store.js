import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import percentify from '../helpers/math/percentify';

import * as PRODUCT_STAGES from '../constants/products/product-stages';
import * as EXPENSES from '../constants/expenses';
import * as JOB from '../constants/job';

import Product from '../classes/Product';


import productDescriptions from '../helpers/products/product-descriptions';

import sessionManager from '../helpers/session-manager';

import mapper from '../helpers/math/mapper';

import companyCostComputer from '../helpers/products/compute-company-cost';
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

let _rents: Array<Rent> = [
  { in: 2, out: 0, featureId: 3, price: 1000, until: 420 },
  // { in: 2, out: 0, featureId: 4 },
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

let _products: Array<Product> = [
  // new Product({
  //   idea: IDEAS.IDEA_WEB_HOSTING,
  //   name: 'WWWEB HOSTING',
  //   stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA,
  //   defaultFeatures: productDescriptions(IDEAS.IDEA_WEB_HOSTING).features.map(f => f.data)
  // })
];

const initialize = ({ products, rents, money, expenses, points, employees, team, reputation, fame, loan}) => {
  _products = products;

  _money = money;
  _expenses = expenses;
  _points = points;
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

  // const suitableId = products.findIndex((p, i) => p.idea === idea);
  // return this.getUpgradedMaxDefaultFeatureValueList(suitableId);
};

const getCurrentMainFeatureDefaultsById = (id) => {
  const p = _products[id];
  // logger.debug('getCurrentMainFeatureDefaultsById', p, _products, id);
  const idea = p.getIdea();

  return getCurrentMainFeatureDefaultsByIdea(idea);
};

function isMercenary(worker) {
  return worker.salary.pricingType === 1;
}

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



  getMoney() {
    return Math.floor(_money);
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

  getRents() {
    return _rents.map(r => {
      const obj = Object.assign({} , r);

      obj.senderName = _products[r.out].getName();
      obj.acceptorName = _products[r.in].getName();
      obj.senderValue = this.getMainFeatureQualityByFeatureId(r.out, r.featureId);
      obj.techName = this.getPrettyFeatureNameByFeatureId(r.out, r.featureId);

      return obj;
    });
  };

  getPoints() {
    return _points;
  }

  enoughMarketingPoints(mp) {
    return _points.marketing >= mp;
  }

  enoughProgrammingPoints(pp) {
    return _points.programming >= pp;
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
      money: _money,
      expenses: _expenses,
      points: _points,
      employees: _employees,
      team: _team,
      reputation: _reputation,
      fame: _fame,
      loan: _loan,
      products: _products,
      rents: _rents
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
    return p.owner;
  }

  getProduct(id): Product {
    return _products[id];
  }

  getCompanyCost(id) {
    return _products[id].getCompanyCost();
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

  getRating(id, segmentId) {
    if (!segmentId) segmentId = 0;

    const rented = this.incomingRentList(id);
    const features = this.enforceFeaturesByRentedOnes(_products[id].features.offer, rented);

    return Product.getRating(_products[id], features, segmentId);
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

  getDisloyalClients(id) {
    const p = _products[id];
    const rating = this.getRating(id);

    return Math.floor(p.getClients() * Product.getChurnRate(rating, p).raw);
  }

  getMainFeatureQualityByFeatureId(id, featureId) {
    return _products[id].getMainFeatureQualityByFeatureId(featureId);
  }

  getPrettyFeatureNameByFeatureId(id, featureId){
    return _products[id].getPrettyFeatureNameByFeatureId(featureId);
  }

  requirementsOKforSegment(id, segmentId) {
    return _products[id].requirementsOKforSegment(segmentId);
  }

  getAnalyticsValueForFeatureCreating(id) {
    return _products[id].getAnalyticsValueForFeatureCreating();
  }

  getDefaults(id) {
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

  getConversionRate(id, segmentId) {
    const rating = this.getRating(id, segmentId);
    const utility = this.getProductUtility(id);

    const paymentModifier = this.getPaymentModifier(id);

    let conversion = utility * rating * paymentModifier / 1000; // rating 10 - 0.05

    let raw;
    let pretty;
    if (conversion < 0 || conversion > 15) {
      logger.error(`invalid conversion value ${conversion}`);
      conversion = 0;
    }

    raw = conversion;
    pretty = percentify(conversion);

    return { raw, pretty };
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

  getSegmentIncome(id, segId) {
    // rating 10 - 0.05
    const conversion = this.getConversionRate(id, segId).raw * this.isPaymentEnabled(id, segId);

    const clients = this.getClients(id, segId);
    const price = this.getProductPrice(id, segId);

    const payments = conversion * clients;

    return payments * price * (1 + _products[id].getSegmentPaymentBonus(segId) / 100);
  }

  getProductIncome(id) {
    // return _products[id].getProductIncome();

    const segments = this.getSegments(id);

    return segments
      .map((s, segId) => this.getSegmentIncome(id, segId))
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

  getChurnRate(id) {
    const p = _products[id];

    return Product.getChurnRate(this.getRating(id), p); //_products[id].getChurnRate();
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

  getBonuses(id) {
    return Object.keys(_products[id].features.bonuses);
  }

  getBonusesList(id) {
    return _products[id].getBonusesList();
  }

  getCostPerClient(id) {
    return _products[id].getCostPerClient();
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

  getMarketingSupportCost(id) {
    return _products[id].getMarketingSupportCost();
  }

  getMarketingFeatureList(idea) {
    return [
      {
        name: 'blog', shortDescription: 'Блог проекта',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150 },
        support: { marketing: 50 }
      },
      {
        name: 'support', shortDescription: 'Техподдержка',
        description: 'Техподдержка снижает отток клиентов на 15%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      },
      {
        name: 'blogII', shortDescription: 'Улучшенный блог проекта',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150 },
        support: { marketing: 150 }
      },
      {
        name: 'supportII', shortDescription: 'Улучшенная техподдержка',
        description: 'Техподдержка снижает отток клиентов на 15%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      },
      {
        name: 'emails', shortDescription: 'Рассылка электронной почты',
        description: 'Рассылка электронной почти снижает отток клиентов на 5%',
        points: { marketing: 50, programming: 100 },
        support: { programming: 20 }
      },
      {
        name: 'blogIII', shortDescription: 'Улучшенный блог проекта II',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150 },
        support: { marketing: 150 }
      },
      {
        name: 'supportIII', shortDescription: 'Улучшенная техподдержка II',
        description: 'Техподдержка снижает отток клиентов на 15%. ',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      }
      // { name: 'referralProgram', shortDescription: 'Реферальная программа', description: 'Реферальная программа повышает виральность проекта на 30%',
      //   points: { marketing: 50, programming: 100 }, time: 7 }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getHypothesisAnalyticsFeatures(idea) {
    return [
      { name: 'feedback', shortDescription: 'Форма для комментариев',
        description: 'Общение с вашими клиентами позволяет улучшить ваш продукт. +300XP/мес',
        points: { programming: 50, marketing: 0 }, bonus: 300
      },
      { name: 'webvisor', shortDescription: 'Вебвизор',
        description: 'Позволяет просматривать действия пользователей. +200XP/мес',
        points: { programming: 150, marketing: 0 }, bonus: 200
      },
      { name: 'AB', shortDescription: 'A/B тестирование',
        description: 'Позволяет тестировать несколько вариантов проекта. +400XP/мес',
        points: { programming: 175, marketing: 0 }, bonus: 400
      },
      { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей',
        description: '+500XP/мес',
        points: { programming: 250, marketing: 0 }, bonus: 500
      },
      { name: 'segmentingII', shortDescription: 'Автоматическое сегментирование пользователей II',
        description: '+600XP/мес',
        points: { programming: 500, marketing: 0 }, bonus: 600
      }
    ];
  };

  getAnalyticFeatures(idea) {
    return [
      // { name: 'feedback', shortDescription: 'Форма для комментариев', description: 'Общение с вашими клиентами позволяет вам улучшить ваш продукт. Повышает шансы при проверке гипотез на 10%',
      //   points: { programming: 50, marketing: 0 }
      // },
      // { name: 'webvisor', shortDescription: 'Вебвизор', description: 'Позволяет просматривать действия пользователей. Повышает шансы при проверке гипотез на 30%',
      //   points: { programming: 50, marketing: 0 }
      // },
      // { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: 'Повышает шансы при проверке гипотез на 40%',
      //   points: { programming: 150, marketing: 100 }
      // },

      // { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Открывает метрику "Виральность"',
      //   points: { programming: 50, marketing: 0 }
      // },
      { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Открывает метрику "Платёжеспособность"',
        points: { programming: 50, marketing: 0 }
      }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getPaymentFeatures(id, idea) {
    return _products[id].getPaymentFeatures(idea);
  };

  getTechnicalDebtDescription(debt) {
    if (debt < 10) {
      return `Всё хорошо`;
    } else if (debt < 50) {
      return `Программисты начинают плакать`;
    } else {
      return `Ты мразь и п**ор, программисты ненавидят тебя!! Отрефакторь этот шлак!`;
    }
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

  getSegments(id) {
    return _products[id].getSegments();
  }

  getSegmentById(id, segId) {
    return _products[id].getSegmentById(segId);
  }

  getDescriptionOfProduct(id) {
    return _products[id].getDescriptionOfProduct();
  }

  canShowPayPercentageMetric(id) {
    return _products[id].canShowPayPercentageMetric();
  }

  clientsEnoughToFormSegment(id, segId) {
    return _products[id].clientsEnoughToFormSegment(segId);
  }

  getAvailableSegments(id) {
    return _products[id].getAvailableSegments();
  }

  getMarketShare(id) {
    return _products[id].getMarketShare();
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

  getHypeValue(id) {
    return _products[id].getHypeValue();
  }

  getNumberOfTechnologiesWhereWeMadeBreakthrough(id) {
    return _products[id].getNumberOfTechnologiesWhereWeMadeBreakthrough();
  }

  getHypeDampingValue(id) {
    const current = this.getHypeValue(id);

    const data = this.getHypeDampingStructured(id);

    const v = Math.floor(current * data.percent / 100);

    return -v;
  }

  getHypeDampingStructured(id) {
    const numberOfTechnologiesWhereWeMadeBreakthrough = this.getNumberOfTechnologiesWhereWeMadeBreakthrough(id);
    const p = _products[id];

    const blogPower = p.getBlogHypeModifier();
    const rating = this.getRating(id);

    const blogRange = [0, 40];
    const churnRange = [10, 50];
    const techRange = [0, 25];

    const blog = Math.floor(mapper(blogPower, 0, 1, blogRange[0], blogRange[1]));
    const churn = Math.ceil(mapper(10 - rating, 0, 10, churnRange[0], churnRange[1]));


    const maxNumberOfTechnologies = productDescriptions(p.idea).features.length;
    const tech = Math.floor(mapper(numberOfTechnologiesWhereWeMadeBreakthrough, 0, maxNumberOfTechnologies, techRange[0], techRange[1]));

    const base = 90;
    const percent = Math.min(base - blog - tech + churn, 100);

    return {
      blogRange,
      churnRange,
      techRange,
      base,
      blog: -blog,
      tech: -tech,
      churn,
      percent,
      clientModifier: this.getClients(id) / 1000
    }
  }


  getTechnicalDebtModifier(id) {
    return _products[id].getTechnicalDebtModifier();
  }

  idHelper(p, i) {
    return { id: i, p };
  }

  getFreeClientsBatch() {
    const marketSize = _products[0].getMarketShare().marketSize;

    const currentSumOfUsers = _products.map((p, i) => p.getClients()).reduce((p, c) => p + c, 0);

    const value = marketSize - currentSumOfUsers;

    if (value <= 0) return 0;

    if (value > 2000) return 2000;

    return value;
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

    return current < 0.7 * max;
  }

  getTechBreakthroughModifierForHype(id, featureId) {
    return _products[id].getTechBreakthroughModifierForHype()
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
    // logger.debug('getCurrentMainFeatureDefaultsById in class', id);
    // const idea = this.getIdea(id);

    // return getCurrentMainFeatureDefaultsByIdea(idea);
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

  getCompetitorsList(id) {
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
          clients: p.KPI.clients,
          name: p.name,
          features: offer,
          cost: p.getCompanyCost(),
          id,
          hype: p.getHypeValue(),
          hypeDamping: this.getHypeDampingValue(id)
        }
      })
      .sort((a, b) => b.hype - a.hype);
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

    case c.PRODUCT_ACTIONS_IMPROVE_MAIN_FEATURE:
      _products[id].improveMainFeature(p);
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



    case c.PLAYER_ACTIONS_INCREASE_MONEY:
      _money += p.amount;
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
      _money += p.amount;
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

    case c.PLAYER_ACTIONS_SET_TASK:
      _team[p.index].task = p.task;
      break;

    case c.PLAYER_ACTIONS_INCREASE_POINTS:
      _points.marketing += p.points.marketing;
      _points.programming += p.points.programming;
      break;

    case c.PLAYER_ACTIONS_DECREASE_POINTS:
      _points.marketing -= p.mp;
      _points.programming -= p.pp;
      break;

    case c.PLAYER_ACTIONS_HIRE_WORKER:
      _team.push(p.player);
      _employees.splice(p.i, 1);
      break;

    case c.PLAYER_ACTIONS_FIRE_WORKER:
      logger.debug('PLAYER_ACTIONS_FIRE_WORKER', p);

      _money -= _team[p.i].salary.money;
      _team.splice(p.i, 1);
      break;

    case c.PLAYER_ACTIONS_EMPLOYEE_ADD:
      _employees.push(p.player);
      // logger.debug(_employees, c.PLAYER_ACTIONS_EMPLOYEE_ADD);
      // logger.debug(p.player, c.PLAYER_ACTIONS_EMPLOYEE_ADD);
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
