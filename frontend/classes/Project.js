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

type Cost = {
  pp: Number,
  mp: Number,
  xp: Number,
  money: Number
};

const requireCost: Cost = (pp = 0, mp = 0, sp = 0, xp = 0, money = 0) => {
  return {
    pp,
    mp,
    xp,
    money
  }
};


const UPGRADES_TESTS_UNIT = 'UPGRADES_TESTS_UNIT';
const UPGRADES_TESTS_INTEGRATION = 'UPGRADES_TESTS_INTEGRATION';
const UPGRADES_TESTS_UI = 'UPGRADES_TESTS_UI';

const UPGRADES_MANAGEMENT_IDEA_NAPKIN = 'UPGRADES_MANAGEMENT_IDEA_NAPKIN';
const UPGRADES_MANAGEMENT_IDEA_VISION = 'UPGRADES_MANAGEMENT_IDEA_VISION';
const UPGRADES_MANAGEMENT_IDEA_CONCEPT = 'UPGRADES_MANAGEMENT_IDEA_CONCEPT';

// ---- TESTS -----

const unitTests = {
  name: UPGRADES_TESTS_UNIT,
  cost: requireCost(50),
  bonus: 5
};

const integrationTests = {
  name: UPGRADES_TESTS_INTEGRATION,
  cost: requireCost(50),
  bonus: 5
};

const uiTests = {
  name: UPGRADES_TESTS_UI,
  cost: requireCost(50),
  bonus: 5
};



// ---- IDEA ------

const ideaOnNapkin = {
  name: UPGRADES_MANAGEMENT_IDEA_NAPKIN,
  cost: requireCost(0, 15),
  bonus: 5
};

const visionDocument = {
  name: UPGRADES_MANAGEMENT_IDEA_VISION,
  cost: requireCost(0, 50),
  bonus: 5
};

const featuresDocument = {
  name: UPGRADES_MANAGEMENT_IDEA_CONCEPT,
  cost: requireCost(0, 100),
  bonus: 0
};

const conceptDocument = {
  name: UPGRADES_MANAGEMENT_IDEA_CONCEPT,
  cost: requireCost(0, 100),
  bonus: 0
};

export default class Project {
  createCompany(data): Project {
    let { idea, name, isCompetitor, companyId } = data;

    if (!idea) throw 'no idea in classes/Project.js';

    if (companyId === null || companyId === undefined) throw 'no companyId in classes/Project.js';

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
    
    this.core = 1;
    this.problems = {};

    this.bugs = [];

    this.servers = 1;

    this.companyId = companyId;
    this.features = features;
    this.idea = idea;
    this.name = name;

    this.bonuses = 1;


    this.programming = 500;
    this.management = 100;

    this.money = 45000;

    this.team = {
      programmers: [0, 0, 0, 0, 0] // intern, junior, middle, senior, architect
    };

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
    return this.programming;
  }

  getMP() {
    return this.management;
  }

  getPPProduction() {
    let value = balance.PROGRAMMER_EFFICIENCY_MIDDLE; // managerial

    const coders = this.team.programmers;

    value += coders[0] * balance.PROGRAMMER_EFFICIENCY_INTERN;
    value += coders[1] * balance.PROGRAMMER_EFFICIENCY_JUNIOR;
    value += coders[2] * balance.PROGRAMMER_EFFICIENCY_MIDDLE;
    value += coders[3] * balance.PROGRAMMER_EFFICIENCY_SENIOR;

    return value;
  }

  getMPProduction() {
    return 100;
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

  getBonuses() {
    return this.bonuses;
  }

  getExplorationData() {
    return {
      clients: [{
        explored: true,
        name: 'startups'
      }, {
        explorable: true,
        name: 'programmers',
        explorationCost: 100
      }],
      backend: [],
      frontend: [],
      testing: [],
      team: [],
      research: [],
      blog: [],
      support: [],

      segments: []
    }
  }

  getBugCost(bugId) {
    let bug = this.bugs.find(b => b.id === bugId);

    return bug ? bug.cost : 0;
  }

  getBugLoyaltyLoss() {
    return this.bugs.map(i => i.penalty).reduce((p, c) => p + c, 0);
  }

  getFeatures(featureGroup) {
    return this.features[featureGroup];
  }

  getMainFeatureQualityByFeatureId(featureId) {
    return this.features.offer[featureId];
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



  // ------------- modify -------------
  addPPs(pp) {
    this.programming += pp;
  }

  addMPs(mp) {
    this.management += mp;
  }

  spendPPs(pp) {
    this.programming -= pp;
  }

  spendMPs(mp) {
    this.management -= mp;
  }

  increaseMoney(amount) {
    this.money += amount;
  }

  decreaseMoney(amount) {
    this.money -= amount;
  }

  addBonuses() {
    this.bonuses++;
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

  produceResources() {
    this.testHypothesis({ value: this.getImprovementChances() });
    this.addPPs(this.getPPProduction());
    this.addMPs(this.getMPProduction());
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
