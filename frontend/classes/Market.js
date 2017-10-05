export default class Market {
  constructor(data) {
    if (!data.idea) throw { err: 'no idea in classes/Market.js', data };

    this.records = data.records || [];
    this.partnerships = data.partnerships || [];
  }

  getBaseInfluence(productId) {
    const record = this.records[this.getRecordIdByProductId(productId)];
    const isMain = record.isMain ? 1.2 : 1;

    return record.hype * isMain;
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

  getRecordIdByProductId(productId) {
    return this.records.findIndex(r => r.productId === productId);
  }

  setAsMain(productId) {
    this.records.find(r => r.productId === productId).isMain = true;
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
