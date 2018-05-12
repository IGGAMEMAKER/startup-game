import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import logger from '../helpers/logger/logger';

import sessionManager from '../helpers/session-manager';

import * as c from '../../shared/constants/actions/product-actions';
import * as ACTIONS from '../../shared/constants/actions/schedule-actions';

import payloads from '../../shared/constants/actions/payloads';

import {
  DefaultDescription,
  MarketDescription
} from '../../shared/constants/products/types/product-description';


import stats from '../stats';


const EC = 'PRODUCT_EVENT_CHANGE';

const companyId = 0;
let companies: Array = [];
let projects: Array = [];
let channels: Array = [];

class ProductStore extends EventEmitter {
  addChangeListener(cb: Function) {
    this.addListener(EC, cb);
  }

  removeChangeListener(cb: Function) {
    this.removeListener(EC, cb);
  }

  emitChange() {
    this.emit(EC);
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
    case c.WORLD_UPGRADE:
      channels = p.data.channels;
      projects = p.data.projects;
      companies = p.data.companies;
      break;
  }

  if (change) {
    stats.saveAction(p.type, p);

    sessionManager.saveProductStorageData(ProductStore.getStoreData());

    store.emitChange();
  }
});

export default store;
