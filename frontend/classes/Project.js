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


export default class Project {
  createCompany(data): Project {
    let { idea, name, isCompetitor, companyId } = data;

    if (!idea) throw 'no idea in classes/Project.js';

    if (companyId === null || companyId === undefined) throw 'no companyId in classes/Project.js';

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));

      name = names[index];
    }

    this.companyId = companyId;
    this.idea = idea;
    this.name = name;

    this.core = 1;
    this.personas = [{
      clientType: 1,
      quality: 1
    }];

    this.bugs = [];


    this.programming = 500;
    this.management = 100;
    this.XP = 10;

    this.money = 45000;

    this.programmers = [0, 0, 0, 0, 0]; // intern, junior, middle, senior, architect

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

  getImprovementsAmount() {
    return this.improvements;
  }

  getBugs() {
    return this.bugs;
  }

  getBonuses() {
    return this.bonuses;
  }

  getBugCost(bugId) {
    return this.bugs[bugId].cost;
  }

  getBugLoyaltyLoss() {
    return this.bugs.map(i => i.penalty).reduce((p, c) => p + c, 0);
  }

  getSystemComplexityModifier() {
    return Math.pow(balance.TECHNOLOGY_COST_MODIFIER, this.improvements * (1 + ((this.personas.length - 1) / 10)))
  }

  getDefaults(): DefaultDescription {
    return productDescriptions(this.idea);
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

  addBug(p) {
    this.bugs.push({
      cost: p.cost,
      platform: p.platform,
      penalty: p.penalty,
      id: this.bugs.length
    });
  }

  removeBug(bugId) {
    this.bugs.splice(bugId, 1);
  }

  produceResources() {
    this.addPPs(this.getPPProduction());
    this.addMPs(this.getMPProduction());
  }

  testHypothesis(p) {
    this.XP += p.value;
  }

  decreaseXP(xp) {
    this.XP -= xp;
  }

  incrementImprovements() {
    this.improvements++;
  }

  improveCore() {
    this.core++;
    this.incrementImprovements();
  }

  improveOffer({ clientType, xp }) {
    const index = this.personas.findIndex(p => p.clientType === clientType);

    this.personas[index].quality++;

    this.incrementImprovements();

    this.XP -= xp;
  }
}
