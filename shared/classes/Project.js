import productDescriptions from '../helpers/products/product-descriptions';
import random from '../utils/random';

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
  constructor(data): Project {
    let { idea, name, projectId, clientProfiles, channels, resources, companyId } = data;

    if (!idea) throw 'no idea in classes/Project.js';
    if (!projectId) throw 'no projectId in classes/Project.js';
    if (!companyId) throw 'no companyId in classes/Project.js';

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));

      name = names[index];
    }

    this.id = projectId;
    this.owner = companyId;

    this.idea = idea;
    this.name = name;

    this.core = 1;
    this.clientProfiles = clientProfiles;

    this.bugs = [];
    this.improvements = 1;
    this.temporaryBonus = null;

    this.channels = channels;


    this.programming = resources.programmerPoints;
    this.management = resources.managerPoints;
    this.ideas = resources.ideas;
    this.money = resources.money;

    this.programmers = [0, 0, 0, 0, 0]; // intern, junior, middle, senior, architect

    return this;
  }

  getId() {
    return this.id;
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

  getIdeaPoints() {
    return this.ideas;
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

  upgradeCore() {
    this.core++;
    this.improvements++;
  }

  upgradeOffer(clientType, ideas) {
    this.clientProfiles[clientType].quality++;
    this.ideas -= ideas;
    this.improvements++;
  }

  pickTemporaryProjectBonus(bonusId) {
    this.temporaryBonus = bonusId;
  };

  exploreClients(channelId) {
    this.channels.push({
      id: channelId,
      clients: 0,
      adPower: 0
    })
  }

  exploreOffer(clientType) {
    this.clientProfiles[clientType].potential++;
  }
}
