import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as IDEAS from '../constants/products/ideas';

const EC = 'PRODUCT_EVENT_CHANGE';

import computeRating from '../helpers/products/compute-rating';
import productDescriptions from '../constants/products/product-descriptions';

let _products = [{
  rating: 0, // computable value, so... needs to be deleted
  idea: IDEAS.IDEA_WEB_STUDIO,
  name: 'WWWEB STUDIO',

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
    support: {}
  },

  KPI: {
    // accumulated values
    debt: 0, // technical debt. Shows, how fast can you implement new features
    clients: 10,
    newClients: 10,
    bugs: 10

    // computable values. Need to be deleted
    // virality: 1.15, // computable value. We DO NOT need it here!!
    // churn: 10 // churn rate. // computable value too! DELETE IT!
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
    const analytics = _products[i].features.analytics;

    const feedback = analytics.feedback ? 2 : 0;
    const inexactSegmenting = analytics.inexactSegmenting ? 3 : 0;
    const exactSegmenting = analytics.exactSegmenting ? 5 : 0;

    // const segmenting = inexactSegmenting + exactSegmenting;
    const segmenting = (analytics.segmenting || 0) * 8;
    return (feedback + segmenting) / 10;
  }

  getProductUtility(i) {
    const idea = this.getIdea(i);
    return productDescriptions(idea).utility;
  }

  getConversionRate(i) {
    const rating = this.getRating(i);
    const utility = this.getProductUtility(i);

    // let conversion = utility * Math.pow((rating), 1.5) / 1000; // rating 10 - 0.05
    let conversion = utility * rating / 1000; // rating 10 - 0.05

    if (conversion < 0 || conversion > 15) {
      logger.error(`invalid conversion value ${conversion}`);
      // throw 'INVALID_CONVERSION_ERROR';
    }

    return conversion;
  }

  getProductPrice(i) {
    return productDescriptions(this.getIdea(i)).price;
  }

  getProductIncome(i) {
    const conversion = this.getConversionRate(i); // rating 10 - 0.05

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
    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      let previous = _products[id].features[p.featureGroup][p.featureName];
      _products[id].features[p.featureGroup][p.featureName] = previous > p.value ? previous : p.value;
      // _products[p.id].features[p.featureGroup][p.featureName] = p.value;
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
