import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import * as c from '../constants/actions/product-actions';
import payloads from '../constants/actions/payloads';
import logger from '../helpers/logger/logger';

import * as IDEAS from '../constants/products/ideas';

const EC = 'PRODUCT_EVENT_CHANGE';

let _products = [{
  rating: 0, // computable value, so... needs to be deleted
  idea: IDEAS.IDEA_WEB_STUDIO,
  name: 'WWWEB STUDIO',

  features: {
    offer: {
      'portfolio': 0.81,
      'website': 1
    }, // features, that are attached to main idea
    programming: {}, // backups, more dev servers, e.t.c.

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
      logger.log('rewrite value', 'PRODUCT_ACTIONS_IMPROVE_FEATURE', _products[p.id], p);
      _products[p.id].features[p.featureGroup][p.featureName] = p.value;
      break;
    default:
      break;
  }

  if (change) store.emitChange();
});

export default store;
