import productDescriptions from '../helpers/products/product-descriptions';
import random from '../helpers/math/random';

import {
  DefaultDescription
} from '../constants/products/types/product-description';

import * as balance from '../constants/balance';


const names = [
  'Alpha', 'Proxima', 'Sun', 'Magenta', 'Grapes',
  'Best Hosting', 'Tech Labs', 'Ginger bird', 'Mercury', 'Phantom',
  'Modern', 'Future Labs', 'Pineaple', 'Storm Technologies',
  'Unnamed'
];



export default class Product {
  constructor(data, createFromObject) {}

  createCompany(data): Product {
    let { idea, name, isCompetitor, companyId } = data;
    // logger.log('product constructor', data);

    if (!idea) throw 'no idea in classes/Product.js';

    if (companyId === null || companyId === undefined) throw 'no companyId in classes/Product.js';

    const defaultFeatures = productDescriptions(idea).features;

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));

      name = names[index];
    }

    let minRating = 1;
    let maxRating = 6;

    if (isCompetitor) {
      minRating = 4;
      maxRating = 10;
    }

    const offer = defaultFeatures.map((f, i) => Math.floor(random(minRating, maxRating)));

    const features = {
      offer, // features, that are attached to main idea
      development: {}, // backups, more dev servers, e.t.c.

      marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
      analytics: {}, // simple analytics (main KPIs),
      // middle (segments analytics), mid+ (segments + versions),

      // not only chat with users, but also localisations, content updates
      // and all sort of things, that you need doing constantly
      support: {},
      payment: {},

      bonuses: {}
    };

    this.bugs = [];
    // this.bugs = [
    //   { id: 0, cost: 15, penalty: 0.1, platform: 'web' },
    //   { id: 1, cost: 25, penalty: 0.2, platform: 'web' },
    //   { id: 2, cost: 35, penalty: 1, platform: 'back' }
    // ];

    this.companyId = companyId;
    this.features = features;
    this.idea = idea;
    this.name = name;

    this.bonuses = 1;

    this._points = {
      programming: 500,
      management: 100
    };

    this._money = 45000;


    this.XP = 10;
    this.totalXP = 0;
    this.spendedXP = 0;

    this.tests = 1;
    this.improvements = 1;

    this.owner = !isCompetitor;

    return this;
  }

  loadFromObject(obj) {
    for (let index in obj) {
      this[index] = obj[index];
    }

    return this;
  }

  isOurProduct() {
    return this.owner;
  }

  getIdea() {
    return this.idea;
  }

  getName() {
    return this.name;
  }

  getStage() {
    return this.stage;
  }

  getPP() {
    return this._points.programming;
  }

  getMP() {
    return this._points.management;
  }

  getXP() {
    return this.XP;
  }

  getTestsAmount() {
    return this.tests;
  }

  getSpendedXP() {
    return this.spendedXP;
  }

  getTotalXP() {
    return this.totalXP
  }

  getImprovementsAmount() {
    return this.improvements;
  }

  getBugs() {
    return this.bugs;
  }

  getFeatures(featureGroup) {
    return this.features[featureGroup];
  }

  getMainFeatureQualityByFeatureId(featureId) {
    return this.features.offer[featureId];
  }

  getMarketingFeatures() {
    return this.features.marketing;
  }

  getFeatureStatus(featureGroup, featureName) {
    return this.features[featureGroup][featureName] > 0;
  }

  getDefaults(): DefaultDescription {
    return productDescriptions(this.idea);
  }

  getMainFeatures() {
    return this.getDefaults().features;
  }

  getMaxMainFeatureQuality(featureId) {
    return this.getDefaults().features[featureId].data;
  }

  getBaseFeatureDevelopmentCost(featureId) {
    return this.getDefaults().features[featureId].development;
  }

  isShareableFeature(featureId) {
    return this.getDefaults().features[featureId].shareable;
  }

  //
  getPrettyFeatureNameByFeatureId(featureId){
    return this.getDefaults().features[featureId].shortDescription;
  }

  getDescriptionOfProduct() {
    return this.getDefaults().description;
  }


  getImprovementChances() {
    return 5;
  }

  getPaymentModifier() {
    return 1;
  }

  getProductExpenses() {
    return this.getProductSupportCost();
  }

  getProductSupportCost() {
    const base = this.getDefaults().support.pp;

    const modifier = Math.pow(this.getImprovementsAmount(), balance.SUPPORT_COST_MODIFIER);

    return Math.ceil(base * modifier);
  }


  // bonuses
  picked = (value) => {
    return this.features.bonuses[value]
  };

  getAvailableBonuses(): Array {
    const list = this.getBonusesList();

    const newList = [];

    const checkBonus = (b) => {
      if (this.picked(b.name)) {
        if (b.childs) {
          b.childs.forEach(checkBonus);
        }

        return;
      }

      newList.push(b);
    };

    list.forEach(checkBonus);

    return newList;
  }

  getBonusesList(): Array {
    // constants/products/bonuses-list
    return null;
  }

  getMarketingFeatureList() {
    // constants/products/marketing-feature-list
    return null;
  };

  getHypothesisAnalyticsFeatures() {
    return null;
  };

  getPaymentFeatures() {
    return null;
  };


  // modify
  switchStage(stage) {
    this.stage = stage;
  }

  setProductDefaults(stage, features, XP) {
    throw 'setProductDefaults';

    this.stage = stage;
    this.features = features;
    this.XP = XP;
  }

  spendPPs(pp) {
    this._points.programming -= pp;
  }

  spendMPs(mp) {
    this._points.management -= mp;
  }

  addBug(p) {
    this.bugs.push({
      cost: p.cost,
      platform: p.platform,
      penalty: p.penalty,
      id: this.bugs.length
    });
  }

  fixBug(bugId) {
    const index = this.bugs.findIndex(b => b.id === bugId);

    this.spendPPs(this.bugs[index].cost);

    this.bugs.splice(index, 1);
  }

  testHypothesis(p) {
    this.XP += p.value;
    this.totalXP += p.value;

    if (this.tests) {
      this.tests++;
    } else {
      this.tests = 1;
    }
  }

  decreaseXP(xp) {
    this.XP -= xp;
    this.spendedXP -= xp;
  }

  improveFeature(p) {
    let previous = this.features[p.featureGroup][p.featureName] || 0;

    this.features[p.featureGroup][p.featureName] = previous + p.value;

    if (this.improvements) {
      this.improvements++;
    } else {
      this.improvements = 1;
    }

    this.XP -= p.XP;
  }

  improveFeatureByPoints(p) {
    this.features[p.featureGroup][p.featureName] = 1;

    if (p.featureGroup === 'bonuses') {
      this.bonuses--;
    }
  }
}
