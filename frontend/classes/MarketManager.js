import Market from './Market';

export default class MarketManager {
  constructor(idea) {
    this.idea = idea;
    this.markets = [];
  }

  loadMarkets(data) {

  }

  joinProduct(marketId, productId) {
    const market: Market = this.markets.find(m => m.id === marketId);

    market.join(productId);

    return this;
  }

  setMainMarket(productId, marketId) {
    const market: Market = this.markets.find(m => m.id === marketId);

    market.setAsMain(productId);
  }

  makePartnership(p1, p2, marketId) {
    const market: Market = this.markets.find(m => m.id === marketId);

    market.makePartnership(p1, p2);

    return this;
  }

  breakPartnership(p1, p2, marketId) {
    const market: Market = this.markets.find(m => m.id === marketId);

    market.breakPartnership(p1, p2);
  }
}
