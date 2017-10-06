export default class Market {
  constructor(data) {
    this.id = data.id;
    this.records = data.records || [];
    this.partnerships = data.partnerships || [];

    // market size?
  }

  getBaseInfluence(productId) {
    const record = this.getRecordByProductId(productId);

    return record.hype * this.getMainMarketModifier(productId);
  }

  getMainMarketModifier(productId) {
    const record = this.getRecordByProductId(productId);

    return record.isMain ? 1.2 : 1;
  }

  getPowerList() {
    let total = 0;

    this.records.forEach(r => {
      total += r.hype; // * this.getMainMarketModifier(r.companyId);
    });

    return this.records
      .map(m => Object.assign({}, m, { power: m.hype, share: m.hype / total }))
      .sort((a, b) => b.power - a.power);
  }

  getPowerOnMarket(productId) {
    return this.getPowerList().find(p => p.companyId === productId).power;
  }

  getShareOnMarket(productId) {
    return this.getPowerList().find(p => p.companyId === productId).share;
  }

  getRecordByProductId(productId) {
    return this.records.find(r => r.productId === productId);
  }

  getRecordIdByProductId(productId) {
    return this.records.findIndex(r => r.productId === productId);
  }

  // setters
  join(productId) {
    this.records.push({
      productId,
      hype: 10,
      active: true,
      isMain: false
    });

    return this;
  }

  setAsMain(productId) {
    this.records.find(r => r.productId === productId).isMain = true;

    return true;
  }

  makePartnership(p1, p2) {
    // productId1, productId2
    if (this.partnerships.find(p => p.a === p1 || p.b === p1 || p.a === p2 || p.b === p2)) return false;

    this.partnerships.push({ a: p1, b: p2 });

    return true;
  }

  breakPartnership(p1, p2) {
    return true;
  }

}
