import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import round from '../helpers/math/round';

import * as IDEAS from '../constants/products/ideas';

const EC = 'PRODUCT_EVENT_CHANGE';

import computeRating from '../helpers/products/compute-rating';
import productDescriptions from '../constants/products/product-descriptions';

import * as PRODUCT_STAGES from '../constants/products/product-stages';

let _products = [{
  rating: 0, // computable value, so... needs to be deleted
  idea: IDEAS.IDEA_WEB_HOSTING,
  name: 'WWWEB HOSTING',
  stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA,

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
    return _products;
  }

  getRating(i) {
    return computeRating(_products[i]);
  }

  getClients(i) {
    return _products[i].KPI.clients;
  }

  getNewClients(i) {
    return _products[i].KPI.newClients;
  }

  getDisloyalClients(i) {
    return Math.floor(this.getClients(i) * this.getChurnRate(i));
  }

  getViralClients(i) {
    return Math.floor(this.getNewClients(i) * this.getViralityRate(i));
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

  getProductUtility(i) {
    const idea = this.getIdea(i);
    return productDescriptions(idea).utility;
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

  getConversionRate(i) {
    const rating = this.getRating(i);
    const utility = this.getProductUtility(i);

    const paymentModifier = this.getPaymentModifier(i);

    // let conversion = utility * Math.pow((rating), 1.5) / 1000; // rating 10 - 0.05
    let conversion = utility * rating * paymentModifier / 1000; // rating 10 - 0.05

    if (conversion < 0 || conversion > 15) {
      logger.error(`invalid conversion value ${conversion}`);
      return 0;
      // throw 'INVALID_CONVERSION_ERROR';
    }

    return conversion;
  }

  getProductPrice(i) {
    return productDescriptions(this.getIdea(i)).price;
  }

  getPaymentSwitcher(i) {
    const payments = _products[i].features.payment;
    // mockBuying
    // basicPricing
    // segmentedPricing
    if (payments.segmentedPricing || payments.basicPricing) {
      return 1;
    }

    return 0;
  }

  getProductIncome(i) {
    const conversion = this.getConversionRate(i) * this.getPaymentSwitcher(i); // rating 10 - 0.05

    const clients = this.getClients(i);
    const price = this.getProductPrice(i);
    const payAbility = 1;

    const payments = conversion * clients;

    // need app
    // want to pay
    // can pay
    return payments * price;
  }

  getIdea(i) {
    return _products[i].idea;
  }

  getViralityRate(i) {
    const rating = this.getRating(i);
    const multiplier = productDescriptions(this.getIdea(i)).virality;
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

    const rating = this.getRating(i);

    if (rating < 3) return 1;

    // logger.log('getChurnRate in ProductStore', rating, Math.pow(12 - rating, 1.7));
    const ratingModifier = Math.min(Math.pow(12 - rating, 1.65));

    const marketing = _products[i].features.marketing;

    const blog = marketing.blog || 0;
    const emails = marketing.emails || 0;
    const support = marketing.support || 0;
    const k = 0.35; // поправочный коэффициент

    const marketingModifier = 0.35 * blog + 0.15 * emails + 0.5 * support; // max total sum = 1

    // 15: r7
    // bad 10-15+
    // good 1-5
    const churn = ratingModifier * (1 - k * marketingModifier) / 100;
    return churn;
    // return churn.toFixed(0); // products[i].features.marketing;
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
    return productDescriptions(this.getIdea(i)).CAC;
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

    if (!analytics.feedback && !analytics.webvisor && !analytics.segmenting) {
      return 0;
    }
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

    if (clients > CLIENTS_LOT) {
      factor = 1;
    } else if (clients > CLIENTS_MID) {
      factor = 0.9;
    } else if (clients > CLIENTS_LOW) {
      factor = 0.8;
    } else {
      factor = 0.3;
    }

    return {
      modifier: factor,
      clients: [CLIENTS_LOT, CLIENTS_MID, CLIENTS_LOW],
      factors: [1, 0.9, 0.8, 0.3]
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

    const feedbackBonus = 2000;
    const webvisorBonus = 3000;
    const segmentingBonus = 4000;
    const basicBonus = 1000;

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

    maxXP *= clientModifier.modifier;

    return {
      min: 0.1 * maxXP,
      max: maxXP,
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
      break;
    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
      _products[id].stage = p.stage;
      break;
    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      let previous = _products[id].features[p.featureGroup][p.featureName] || 0;
      let sum = previous + p.value;
      let max = p.max;
      // _products[id].features[p.featureGroup][p.featureName] = previous > p.value ? previous : p.value;
      _products[p.id].features[p.featureGroup][p.featureName] = sum > max ? max: sum;
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
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
