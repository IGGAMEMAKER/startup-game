import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as IDEAS from '../constants/products/ideas';

const EC = 'PRODUCT_EVENT_CHANGE';

import computeRating from '../helpers/products/compute-rating';

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

  getAnalyticsValueForFeatureCreating(i) {
    // range: 0 - 1
    const analytics = _products[i].features.analytics;

    const feedback = analytics.feedback ? 2 : 0;
    const inexactSegmenting = analytics.inexactSegmenting ? 3 : 0;
    const exactSegmenting = analytics.exactSegmenting ? 5 : 0;

    return (feedback + inexactSegmenting + exactSegmenting) / 10;
  }

  getConversionRate(i) {
    const rating = this.getRating(i);
    const utility = 10;

    // let conversion = utility * Math.pow((rating), 1.5) / 1000; // rating 10 - 0.05
    let conversion = utility * rating / 1000; // rating 10 - 0.05

    if (conversion <= 0 || conversion > 15) {
      logger.error(`invalid conversion value ${conversion}`);
      // throw 'INVALID_CONVERSION_ERROR';
    }

    return conversion;
  }

  getProductIncome(i) {
    const conversion = this.getConversionRate(i); // rating 10 - 0.05

    const clients = this.getClients(i);
    const price = 100;
    const payAbility = 1;

    const payments = conversion * clients;

    // need app
    // want to pay
    // can pay
    return payments * price;
  }

  getChurnRate(i) {
    // TODO fix constant values in blog, email, support in getChurnRate(i)
    logger.shit('TODO fix constant values in blog, email, support in getChurnRate(i)');

    const rating = this.getRating(i);

    if (rating < 3) return 100;

    // logger.log('getChurnRate in ProductStore', rating, Math.pow(12 - rating, 1.7));
    const ratingModifier = Math.min(Math.pow(12 - rating, 1.7), 100);

    const blog = 0.5;
    const email = 0.15;
    const support = 0.35;
    const k = 0.35; // поправочный коэффициент

    const marketingModifier = blog + email + support;

    // 15: r7
    // bad 10-15+
    // good 1-5
    const churn = ratingModifier * (1 - k * marketingModifier);
    return churn.toFixed(0); // products[i].features.marketing;
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

  let change = true;
  switch (p.type) {
    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
      let previous = _products[p.id].features[p.featureGroup][p.featureName];
      _products[p.id].features[p.featureGroup][p.featureName] = previous > p.value ? previous : p.value;
      // _products[p.id].features[p.featureGroup][p.featureName] = p.value;
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
