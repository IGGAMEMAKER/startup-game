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
    return this.getInfo(marketId).price * this.getClients(marketId, productId);
  }

  getMarket(marketId): Market {
    return this.markets.find(m => m.id === marketId);
  }

  getClients(marketId, productId) {
    return this.getMarket(marketId).getClients(productId);
  }

  getMarketLoyalty(marketId, productId) {
    return this.getMarket(marketId).getLoyalty(productId);
  }

  getHype(marketId, productId) {
    return this.getMarket(marketId).getHype(productId);
  }

  // getPowerListOnMarket(marketId) {
  //   return this.getMarket(marketId).getPowerList()
  // }

  // getPowerOfCompanyOnMarket(productId, marketId) {
  //   return this.getMarket(marketId).getPowerOnMarket(productId);
  // }

  getMarketShare(marketId, productId) {
    return this.getMarket(marketId).getShareOnMarket(productId);
  }

  getMarketingKnowledge(marketId, productId) {
    return this.getMarket(marketId).getMarketingKnowledge(productId);
  }

  getIncomesForCompany(productId) {
    return this.markets.map((m: Market) => {
      return this.getMarketSize(m.id) * m.getShareOnMarket(productId);
    })
  }

  isMainMarket(productId, marketId) {
    return false;
  }

  markets() {
    return this.markets;
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

  isExploredMarket(productId, marketId) {
    // return true;
    return this.getMarket(marketId).isExploredMarket(productId);
  }

  iterateByCompanyMarkets(productId, cb) {
    return this.markets.filter(m => m.isExploredMarket(productId)).forEach(cb);
  }


  // setters
  joinProduct(marketId, productId) {
    this.getMarket(marketId).join(productId);

    return this;
  }

  exploreMarket(marketId, productId) {
    this.joinProduct(marketId, productId);
  }

  addHype(marketId, productId, hype) {
    this.getMarket(marketId).addHype(productId, hype);

    return this;
  }

  addClients(marketId, productId, clients) {
    this.getMarket(marketId).addClients(productId, clients);
  }

  loseMonthlyHype(id) {
    this.iterate(m => {
      m.loseMonthlyHype(id)
    })
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
