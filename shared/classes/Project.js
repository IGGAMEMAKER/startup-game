import Resources from './Resources';
import random from '../utils/random';

import {
  DefaultDescription
} from '../constants/products/types/product-description';

import * as balance from '../constants/balance';

import logger from '../../backend/helpers/logger';


const names = [
  'Alpha', 'Proxima', 'Sun', 'Magenta', 'Grapes',
  'Best Hosting', 'Tech Labs', 'Ginger bird', 'Mercury', 'Phantom',
  'Modern', 'Future Labs', 'Pineaple', 'Storm Technologies',
  'Unnamed'
];


export default class Project {
  constructor(data) {
    let {
      idea,
      name,
      projectId,
      clientProfiles,
      channels,
      resources,
      companyId
    } = data;

    if (!idea) throw 'no idea in classes/Project.js';

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
    this.spam = 0;
    this.improvements = 1;
    this.temporaryBonus = null;


    this.defence = 1;
    this.servers = 1;

    this.channels = channels;

    this.resources = resources;
    this.programmers = [0, 0, 0]; // junior, middle, senior
    this.marketers = [];
    this.managers = [];

  }

  printMainInfo() {
    console.log(`#${this.getId()} ${this.getName()} ${this.core}LVL. Cost: ${this.cost()}`, this.clientProfiles)
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
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

  getResources() {
    return this.resources;
  }

  getBugCost(bugId) {
    return this.bugs[bugId].cost;
  }

  cost() {
    return this.core < 3 ? '100000$' : '1bln';
  }

  getSpamLoyaltyLoss() {
    return Math.floor(this.spam * balance.SPAM_LOYALTY_IMPACT);
  }

  getBugLoyaltyLoss() {
    return this.bugs
      .map(i => i.penalty)
      .reduce((p, c) => p + c, 0);
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

  getSegmentQuality(clientType) {
    console.log('getSegmentQuality', clientType);

    return this.clientProfiles[clientType].quality;
  }

  getCoreLoyalty() {
    return this.core * 10;
  }

  getClientLoyalty(clientType) {
    return this.getCoreLoyalty() + this.getSegmentQuality(clientType);
  }

  isEnoughResources(resources: Resources) {
    return Resources.enough(resources, this.resources);
  }




  // ------------- modify -------------
  spendResources(resources: Resources) {
    if (Resources.enough(resources, this.resources)) {
      this.resources.spend(resources);
    }
  };

  addResources(resources: Resources) {
    this.resources.add(resources);
  }

  hireProgrammer(level) {
    this.programmers[level]++;
  }

  improveDefence() {
    this.defence++;
  }

  addServers(amount) {
    this.servers += amount;
  }

  addBug(p) {
    this.bugs.push({
      cost: p.cost,
      platform: p.platform,
      penalty: p.penalty,
      id: this.bugs.length
    });
  }

  addSpam(value) {
    this.spam = Math.min(this.spam + value, 100);
  }

  removeSpam(value) {
    this.spam = Math.min(this.spam - value, 0);
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
    this.improvements++;
    this.ideas -= ideas;
  }

  pickTemporaryProjectBonus(bonusId) {
    this.temporaryBonus = bonusId;
  };

  exploreChannel(channelId) {
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
