import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import round from '../helpers/math/round';

import * as IDEAS from '../constants/products/ideas';

const EC = 'PRODUCT_EVENT_CHANGE';

import percentify from '../helpers/math/percentify';

import computeRating from '../helpers/products/compute-rating';
import productDescriptions from '../constants/products/product-descriptions';

import * as PRODUCT_STAGES from '../constants/products/product-stages';

let _products = [{
  rating: 0, // computable value, so... needs to be deleted
  idea: IDEAS.IDEA_WEB_HOSTING,
  name: 'WWWEB HOSTING',
  stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA,

  owner: true,
  features: {
    offer: {
      // 'portfolio': 0.81,
      // 'website': 1
    }, // features, that are attached to main idea
    development: {}, // backups, more dev servers, e.t.c.

    marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
    analytics: {}, // simple analytics (main KPIs),
    // middle (segments analytics), mid+ (segments + versions),

    // not only chat with users, but also localisations, content updates
    // and all sort of things, that you need doing constantly
    support: {},

    payment: {},
  },
  XP: 0,
  KPI: {
    // accumulated values
    debt: 0, // technical debt. Shows, how fast can you implement new features
    clients: 10,
    newClients: 10,

    bugs: 10,

    currentUXBugs: 100,
    foundUXBugs: 50,
    fixedUXBugs: 50
  }
}];

class ProductStore extends EventEmitter {
  addChangeListener(cb:Function) {
    this.addListener(EC, cb);
  }

  removeChangeListener(cb:Function) {
    this.removeListener(EC, cb);
  }

  emitChange() {
    this.emit(EC);
  }

  getProducts() {
    return _products.filter(this.isOurProduct);
  }

  isOurProduct(p) {
    return p.owner;
  }

  getProduct(id) {
    return _products[id];
  }

  getRating(i, segmentId) {
    if (!segmentId) segmentId = 0;

    return round(computeRating(_products[i], segmentId));
  }

  getClients(i, segmentId) {
    const total =  _products[i].KPI.clients;
    if (segmentId === undefined || segmentId === null) return total;

    return Math.floor(this.getSegments(i)[segmentId].percentage * total / 100);
  }

  getSegmentedPriorities(i, segId) {
    const s = this.getSegments(i)[segId];
    const features = this.getDefaults(i).features;

    return s.rating.map((r, index) => {
      return {
        rating: r,
        feature: features[index].shortDescription,
      }
    }).sort((s1, s2) => s2.rating - s1.rating);
  }

  getNewClients(i) {
    return _products[i].KPI.newClients;
  }

  getDisloyalClients(i) {
    return Math.floor(this.getClients(i) * this.getChurnRate(i).raw);
  }

  getViralClients(i) {
    return Math.floor(this.getNewClients(i) * this.getViralityRate(i));
  }

  getMainFeatureQualityByFeatureId(i, featureId) {
    const feature = this.getDefaults(i).features[featureId];
    const value = _products[i].features.offer[feature.name] || 0;

    return value; // round(value / feature.data);
  }

  getMainFeatureDefaultQualityByFeatureId(i, featureId) {
    return this.getDefaults(i).features[featureId].data;
  }

  getPrettyFeatureNameByFeatureId(id, featureId){
    return this.getDefaults(id).features[featureId].shortDescription;
  }

  requirementsOKforSegment(i, segmentId) {
    const { segments } = this.getDefaults(i);
    const segment = segments[segmentId];
    const requirements = segment.requirements;

    let valid = true;

    let unmetRequirements = [];

    requirements.forEach((r, featureId) => {
      const max = this.getDefaults(i).features[featureId].data;

      const featureQuality = this.getMainFeatureQualityByFeatureId(i, featureId);
      const need = max * r / 100;

      const met = featureQuality >= need;

      if (!met) {
        valid = false;

        unmetRequirements.push({
          name: this.getPrettyFeatureNameByFeatureId(i, featureId),
          now: featureQuality,
          need
        });
      }
      // logger.debug(`feature quality #${featureId}: ${featureQuality}. Requirement is ${met}`)
    });

    return {
      valid,
      unmetRequirements
    };
  }

  getAnalyticsValueForFeatureCreating(i) {
    // range: 0 - 1
    // range: 0.1 - 0.4
    const analytics = _products[i].features.analytics;

    let value = 0;

    const feedback = analytics.feedback;
    const webvisor = analytics.webvisor;
    const segmenting = analytics.segmenting;

    if (segmenting) {
      value = 0.4;
    } else if (webvisor) {
      value = 0.3;
    } else if (feedback) {
      value = 0.1;
    }

    return value;
  }

  getDefaults(i) {
    return productDescriptions(this.getIdea(i));
  }

  getProductUtility(i) {
    return this.getDefaults(i).utility;
  }

  getPaymentModifier(i) {
    const payments = _products[i].features.payment;
    // mockBuying
    // basicPricing
    // segmentedPricing
    if (payments.segmentedPricing) {
      return 0.95;
    }

    if (payments.basicPricing) {
      return 0.5;
    }

    if (payments.mockBuying) {
      return 1;
    }

    return 0;
  }

  getConversionRate(i, segmentId) {
    const rating = this.getRating(i, segmentId);
    const utility = this.getProductUtility(i);

    const paymentModifier = this.getPaymentModifier(i);

    let conversion = utility * rating * paymentModifier / 1000; // rating 10 - 0.05

    let raw;
    let pretty;
    if (conversion < 0 || conversion > 15) {
      logger.error(`invalid conversion value ${conversion}`);
      // throw 'INVALID_CONVERSION_ERROR';
      conversion = 0;
    }

    if (segmentId > 0) {
      conversion = rating / 10;
    }

    raw = conversion;
    pretty = percentify(conversion);

    return {
      raw, pretty
    }
  }

  getProductPrice(i, segId) {
    if (!segId) return this.getDefaults(i).price;

    return this.getDefaults(i).segments[segId].price;
  }

  isPaymentEnabled(i, segmentId) {
    const payments = _products[i].features.payment;
    // mockBuying
    // basicPricing
    // segmentedPricing

    logger.shit('requirements for segment');

    if (!this.requirementsOKforSegment(i, segmentId).valid) return 0;

    if (payments.segmentedPricing || payments.basicPricing) {
      return 1;
    }

    return 0;
  }

  getSegmentIncome(i, segId) {
    const conversion = this.getConversionRate(i, segId).raw * this.isPaymentEnabled(i, segId); // rating 10 - 0.05

    const clients = this.getClients(i, segId);
    const price = this.getProductPrice(i, segId);

    logger.debug(`getSegmentIncome segment ${segId}, ${conversion}%, ${clients} cli, ${price}$`);
    const payments = conversion * clients;

    // logger.debug('getProductIncome', segId, payments);
    // need app
    // want to pay
    // can pay
    return payments * price;
  }

  getProductIncome(i) {
    const segments = this.getSegments(i);

    return segments.map((s, segId) => {
      return this.getSegmentIncome(i, segId);
    })
      .reduce((p, c) => p + c);
  }

  getIdea(i) {
    return _products[i].idea;
  }

  getViralityRate(i) {
    const rating = this.getRating(i);
    const multiplier = this.getDefaults(i).virality;
    const marketing = _products[i].features.marketing;

    let base = 0.1;

    if (rating >= 7) {
      base += (rating - 7) / 10;
    }

    let referralBonuses = 0;
    // if (marketing.improvedReferralProgram) {
    //   referralBonuses += 0.45;
    // }

    if (marketing.referralProgram) {
      // referralBonuses += 0.21;
      referralBonuses += 0.65 * marketing.referralProgram;
    }

    return (base + referralBonuses) * multiplier;
  }

  getChurnRate(i) {
    // TODO fix constant values in blog, email, support in getChurnRate(i)
    // return answer in partitions 0-1
    logger.shit('TODO fix constant values in blog, email, support in getChurnRate(i)');

    let rating = this.getRating(i);

    if (rating < 3) {
      rating = 3;
      // return {
      //   raw: 1,
      //   pretty: 100
      // };
    }

    // logger.log('getChurnRate in ProductStore', rating, Math.pow(12 - rating, 1.7));
    const ratingModifier = Math.min(Math.pow(12 - rating, 1.65));

    const marketing = _products[i].features.marketing;

    const blog = marketing.blog || 0;
    const emails = marketing.emails || 0;
    const support = marketing.support || 0;
    const k = 0.3; // поправочный коэффициент

    const marketingModifier = 0.35 * blog + 0.15 * emails + 0.5 * support; // max total sum = 1

    // 15: r7
    // bad 10-15+
    // good 1-5
    const churn = ratingModifier * (1 - k * marketingModifier) / 100;

    logger.log('product-store.js getChurnRate', churn);

    return {
      raw: churn,
      pretty: percentify(churn)
    };
  }

  getProductBlogCost(i) {
    const BASE_BLOG_COST = 1000;

    return _products[i].features.marketing.blog ? BASE_BLOG_COST : 0;
  }

  getProductSupportCost(i) {
    const marketing = _products[i].features.marketing;

    const support = marketing.support || 0;

    if (!support) return 0;

    const clients = this.getClients(i);

    if (clients < 1000) return 300;
    if (clients < 10000) return 500;
    if (clients < 100000) return 3000;

    return 10000;
  }

  getProductExpenses(i) {
    return this.getProductBlogCost(i) + this.getProductSupportCost(i);
  }

  getName(i) {
    return _products[i].name;
  }

  getStage(i) {
    return _products[i].stage;
  }

  getFeatureStatus(i, featureGroup, featureName) {
    return _products[i].features[featureGroup][featureName] > 0;
  }

  getCostPerClient(i) {
    return this.getDefaults(i).CAC;
  }

  getBugs(i) {
    return {
      ux: {
        max: 100,
        found: 50,
        fixed: 10
      },
      programming: {
        max: 100,
        found: 50,
        fixed: 10
      }
    }
  }

  getRatingForMetricsTab(i) {
    let phrase;
    const features = _products[i].features;
    const analytics = features.analytics;

    // rating depends on
    // number of users (stat pogreshnost)
    // feedback form
    // segmenting
    // webvisor

    // if (!analytics.feedback && !analytics.webvisor && !analytics.segmenting) {
    //   return 0;
    // }
    let analyticsModifier = 1;
    if (analytics.feedback) analyticsModifier -= 0.3;

    if (analytics.webvisor) {
      analyticsModifier -= 0.5;
    } else if (analytics.segmenting) {
      analyticsModifier -= 0.65;
    }

    const clients = this.getClients(i);
    let factor = 2;
    if (clients > 100000) {
      factor = 1;
    } else if (clients > 10000) {
      factor = 1.1;
    } else if (clients > 1000) {
      factor = 1.2;
    } else if (clients > 100) {
      factor = 1.5;
    } else {
      factor = 2;
    }

    const error = round(5 * factor * analyticsModifier);
    const offset = Math.random() * error;
    const rating = this.getRating(i);

    let leftValue = round(rating - offset);
    if (leftValue < 0) {
      leftValue = 0;
    }

    let rightValue = round(leftValue + error);
    if (rightValue < 0) {
      rightValue = 0;
    } else if (rightValue > 10) {
      rightValue = 10;
    }

    phrase = `${leftValue} - ${rightValue}`;
    phrase = rating;

    return phrase;
  }

  getClientAnalyticsModifier(i) {
    let factor;
    const clients = this.getClients(i);

    const CLIENTS_LOT = 10000;
    const CLIENTS_MID = 1000;
    const CLIENTS_LOW = 100;

    let clientMin;
    let clientMax;

    let index;

    if (clients > CLIENTS_LOT) {
      factor = 1;
      clientMax = CLIENTS_LOT;
      clientMin = CLIENTS_LOT;
      index = 0;
    } else if (clients > CLIENTS_MID) {
      factor = 0.9;
      clientMax = CLIENTS_LOT;
      clientMin = CLIENTS_MID;
      index = 1;
    } else if (clients > CLIENTS_LOW) {
      factor = 0.8;
      clientMax = CLIENTS_MID;
      clientMin = CLIENTS_LOW;
      index = 2;
    } else {
      factor = 0.3;
      clientMax = CLIENTS_LOW;
      clientMin = 0;
      index = 3;
    }

    return {
      modifier: factor,
      clientsRange: [CLIENTS_LOT, CLIENTS_MID, CLIENTS_LOW, 1],
      factors: [1, 0.9, 0.8, 0.3],
      index,
      clientMax,
      clientMin,
      clients
    }
  }

  getImprovementChances(i) {
    const analytics = _products[i].features.analytics;

    const feedback = analytics.feedback;
    const webvisor = analytics.webvisor;
    const segmenting = analytics.segmenting;

    // const analyticsChance = this.getAnalyticsValueForFeatureCreating(i);
    const clientModifier = this.getClientAnalyticsModifier(i);
    // const chance = analyticsChance * clientModifier.modifier; // h.baseChance +

    const feedbackBonus = 1000;
    const webvisorBonus = 1500;
    const segmentingBonus = 2000;
    const basicBonus = 500;

    let maxXP = basicBonus;
    if (feedback) {
      maxXP += feedbackBonus;
    }
    if (webvisor) {
      maxXP += webvisorBonus;
    }
    if (segmenting) {
      maxXP += segmentingBonus;
    }

    // maxXP *= clientModifier.modifier;

    return {
      middle: maxXP * clientModifier.modifier / 2,
      min: 0,
      max: maxXP * clientModifier.modifier,
      maxXPWithoutBonuses: maxXP,
      webvisorBonus,
      feedbackBonus,
      segmentingBonus,
      basicBonus,
      hasWebvisor: webvisor,
      hasFeedback: feedback,
      hasSegmenting: segmenting,
      clientModifier,
    }
  }

  getProductExpensesStructure(i) {
    return {
      name: this.getName(i),
      blog: this.getProductBlogCost(i),
      support: this.getProductSupportCost(i)
    };
  }

  getXP(i) {
    return _products[i].XP;
  }

  getHypothesisPoints(id) {
    const complexityModifier = this.getTechnologyComplexityModifier(id);

    logger.debug('getHypothesisPoints', complexityModifier);

    const defaults = this.getDefaults(id).hypothesis;

    return {
      mp: Math.ceil(defaults.mp * complexityModifier),
      pp: Math.ceil(defaults.pp * complexityModifier)
    }
  }

  getSegments(id) {
    return this.getDefaults(id).segments;
  }

  getSegmentById(id, segId) {
    return this.getSegments(id)[segId];
  }

  getDescriptionOfProduct(id) {
    return this.getDefaults(id).description;
  }

  getCompetitorsList(id) {
    return _products.filter(p => this.isOurProduct(p) && p.idea === this.getIdea(id))
      .map(p => {
        const name = p.name;
        const rating = computeRating(p, 0);
        const clients = p.KPI.clients;


        return {
          rating,
          clients,
          name
        }
      })
    // return [
    //   // { rating: 8.2, clients: 30000, name: 'WEB HOSTING 1' },
    //   // { rating: 3.5, clients: 15000, name: 'WEB HOSTING 2' },
    //   // { rating: 6, clients: 4500, name: 'WEB HOSTING 3' }
    // ]
      .sort((a, b) => a.rating > b.rating);
  }

  getMaxAmountOfPossibleClients(id, money) {
    const competitors = this.getCompetitorsList(id);

    const maxMarketSize = this.getDefaults(id).marketSize;
    const rating = this.getRating(id);
    const ourClients = this.getClients(id);
    const uncompeteableApps = competitors.filter(c => c.rating > rating - 1);
    const totalClients = ourClients + competitors.map(c => c.clients).reduce((p, c) => p + c, 0);

    let frozen = ourClients;
    const unbeatableClients = uncompeteableApps.map(c => c.clients).reduce((p, c) => p + c, 0);
    // if (uncompeteableApps.length) {
      frozen += unbeatableClients;
    // }

    const availableForYou = maxMarketSize - frozen;

    const costPerClient = this.getCostPerClient(id);
    const canAffordClientsAmount = Math.floor(money / costPerClient);
    let result;

    if (canAffordClientsAmount > availableForYou) {
      // we can buy all available clients
      result = availableForYou;
    } else {
      // we cannot
      result = canAffordClientsAmount;
    }

    // return canAffordClientsAmount;

    return {
      marketSize: maxMarketSize,
      potentialClients: maxMarketSize - frozen,
      amount: result,
      ourClients,
      unbeatableClients,
      freeClients: maxMarketSize - totalClients,
      competitors
    }
  }

  canShowPayPercentageMetric(id) {
    return this.getFeatureStatus(id, 'payment', 'mockBuying')
  }

  clientsEnoughToFormSegment(id, segId) {
    return this.getClients(id, segId) > 100;
  }

  getAvailableSegments(id) {
    const value = this.getSegments(id)
      .filter((s, segId) => this.requirementsOKforSegment(id, segId).valid && this.clientsEnoughToFormSegment(id, segId))

    logger.debug('getAvailableSegments', value);
    //
    return value;
  }

  getMarketShare(id) {
    const clients = this.getClients(id);
    const marketSize = this.getDefaults(id).marketSize;

    return {
      share: percentify(clients / marketSize),
      clients,
      marketSize
    }
  }

  getNextCompetitorInfo(id) {
    const competitors = this.getCompetitorsList(id);
    const rating = this.getRating(id);

    const betterCompetitors = competitors.filter(c => rating < c.rating + 1);

    return betterCompetitors.length ? betterCompetitors[0] : null;
  }

  // getConversionRate()
  getTechnologyComplexityModifier(id) {
    const tests = _products[id].tests || 1;
    const improvements = _products[id].improvements || 1;

    logger.shit('here must be technical debt modifier too! getTechnologyComplexityModifier(id)');

    return Math.pow(0.15 * tests + 0.6 * improvements, 1.045);
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
      _products[id].stage = PRODUCT_STAGES.PRODUCT_STAGE_NORMAL;
      _products[id].KPI = p.KPI;
      _products[id].features = p.features;
      _products[id].XP = 999;
      break;

    case c.PRODUCT_ACTIONS_TEST_HYPOTHESIS:
      _products[id].XP += p.value;
      const features = productDescriptions(_products[id].idea).features;

      let max = 0;
      features.forEach(f => {
        max += f.data;
      });

      if (_products[id].XP > max) {
        _products[id].XP = max;
      }

      if (_products[id].tests) {
        _products[id].tests++;
      } else {
        _products[id].tests = 1;
      }
      break;

    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
      _products[id].stage = p.stage;
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      let previous = _products[id].features[p.featureGroup][p.featureName] || 0;
      let sum = previous + p.value;
      max = p.max;
      // _products[id].features[p.featureGroup][p.featureName] = previous > p.value ? previous : p.value;
      _products[p.id].features[p.featureGroup][p.featureName] = sum > max ? max: sum;
      _products[p.id].XP -= p.value;
      if (_products[p.id].improvements) {
        _products[p.id].improvements++;
      } else {
        _products[p.id].improvements = 1;
      }
      break;

    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
      // let previous = _products[id].features[p.featureGroup][p.featureName];
      _products[id].features[p.featureGroup][p.featureName] = 1;
      logger.log('improved feature by points');
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_ADD:
      // not all users will become our clients. Some of them will vanish
      // if you got them from ads, efficiency will be less than 1
      const efficiency = p.efficiency || 1;
      let clients = Math.floor(efficiency * p.clients);

      _products[id].KPI.clients += clients;
      _products[id].KPI.newClients += clients;
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD:
      clients = p.clients;
      _products[id].KPI.clients += clients;
      _products[id].KPI.newClients = clients;
      break;

    case c.PRODUCT_ACTIONS_CLIENTS_REMOVE:
      // churn clients
      clients = p.clients;

      if (_products[id].KPI.clients - clients < 0) {
        _products[id].KPI.clients = 0;
      } else {
        _products[id].KPI.clients -= Math.floor(clients);
      }
      break;

    case c.PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY:
      // { features , KPI, idea, name }
      const competitor = p.p;

      _products.push(Object.assign({}, competitor, { XP: 0, stage: PRODUCT_STAGES.PRODUCT_STAGE_NORMAL }));
      // _products[id].stage = PRODUCT_STAGES.PRODUCT_STAGE_NORMAL;
      // _products[id].KPI = p.KPI;
      // _products[id].features = p.features;
      // _products[id].XP = 999;
      break;

    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
