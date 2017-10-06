import Market from './Market';

export default class MarketManager {
  constructor(idea) {
    this.idea = idea;
    this.markets = [];
  }

  getMarketById(marketId): Market {
    return this.markets.find(m => m.id === marketId);
  }

  getPowerListOnMarket(marketId) {
    return this.getMarketById(marketId).getPowerList()
  }

  getPowerOfCompanyOnMarket(productId, marketId) {
    return this.getMarketById(marketId).getPowerOnMarket(productId);
  }

  getMarketShare(marketId, productId) {
    return this.getMarketById(marketId).getShareOnMarket(productId);
  }

  getIncomesForCompany(productId) {
    return this.markets.map((m: Market) => m.getMaxIncomeForCompany(productId))
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
