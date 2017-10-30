import Market from './Market';
import logger from '../helpers/logger/logger';

export default class MarketManager {
  constructor(idea) {
    this.idea = idea;
    this.markets = [];
  }

  load(markets, info) {
    this.info = info;
    this.markets = markets.map(m => {
      logger.log('load markets', m);

      return new Market(m);
    });
  }

  getPossibleIncome(marketId, productId) {
    return this.getMarketSize(marketId) * this.getMarketShare(marketId, productId);
  }

  getMarket(marketId): Market {
    return this.markets.find(m => m.id === marketId);
  }

  getHype(marketId, productId) {
    return this.getMarket(marketId).getHype(productId);
  }

  getPowerListOnMarket(marketId) {
    return this.getMarket(marketId).getPowerList()
  }

  getPowerOfCompanyOnMarket(productId, marketId) {
    return this.getMarket(marketId).getPowerOnMarket(productId);
  }

  getMarketShare(marketId, productId) {
    return this.getMarket(marketId).getShareOnMarket(productId);
  }

  getIncomesForCompany(productId) {
    return this.markets.map((m: Market) => {
      return this.getMarketSize(m.id) * m.getShareOnMarket(productId);
    })
  }

  isMainMarket(productId, marketId) {
    return false;
  }



  getInfo(marketId) {
    return this.info.markets[marketId];
  }

  getMarketSize(marketId) {
    const info = this.getInfo(marketId);

    return info.price * info.clients;
  }

  getRatingFormula(marketId) {
    return this.getInfo(marketId).rating;
  }

  iterate(cb) {
    return this.markets.map(cb)
  }


  // setters
  joinProduct(marketId, productId) {
    this.getMarket(marketId).join(productId);

    return this;
  }

  addHype(marketId, productId, hype) {
    this.getMarket(marketId).addHype(productId, hype);

    return this;
  }

  setMainMarket(productId, marketId) {
    this.getMarket(marketId).setAsMain(productId);

    return this;
  }

  makePartnership(p1, p2, marketId) {
    this.getMarket(marketId).makePartnership(p1, p2);

    return this;
  }

  breakPartnership(p1, p2, marketId) {
    this.getMarket(marketId).breakPartnership(p1, p2);

    return this;
  }
}
