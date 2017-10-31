import logger from '../helpers/logger/logger';

export default class Market {
  constructor(data) {
    this.id = data.id;
    this.records = data.records || [];
    this.partnerships = data.partnerships || [];
  }

  getBaseInfluence(companyId) {
    const record = this.getRecordByProductId(companyId);

    return record.hype * this.getMainMarketModifier(companyId);
  }

  getMainMarketModifier(companyId) {
    const record = this.getRecordByProductId(companyId);

    return record.isMain ? 1.2 : 1;
  }

  getPowerList() {
    let total = 0;

    this.records.forEach(r => {
      total += r.hype;
    });

    return this.records
      .map(m =>
        ({
          power: m.hype,
          share: m.hype / total,
          companyId: m.companyId,
        })
      )
      .sort((a, b) => b.power - a.power);
  }

  getPowerOnMarket(companyId) {
    return this.getPowerList().find(p => p.companyId === companyId).power;
  }

  getHype(companyId) {
    const record = this.getRecordByProductId(companyId);

    return record.hype || 0; // * this.getMainMarketModifier(companyId);
  }

  getShareOnMarket(companyId) {
    return this.getPowerList().find(p => p.companyId === companyId).share;
  }

  getRecordByProductId(companyId) {
    return this.records.find(r => r.companyId === companyId);
  }

  getRecordIdByProductId(companyId) {
    return this.records.findIndex(r => r.companyId === companyId);
  }

  // setters
  join(companyId) {
    this.records.push({
      companyId,
      hype: 1 + Math.floor(Math.random() * 10),
      active: true,
      isMain: false
    });

    return this;
  }

  addHype(companyId, hype) {
    const index = this.getRecordIdByProductId(companyId);

    if (index < 0) return this;

    const was = this.records[index].hype;

    this.records[index].hype = Math.min(100, was + hype);

    return this;
  }

  loseMonthlyHype(companyId) {
    const index = this.getRecordIdByProductId(companyId);

    if (index < 0) return this;

    const hypeValue = this.records[index].hype;

    this.records[index].hype = hypeValue <= 1 ? 1 : Math.floor(hypeValue * 0.9);

    return this;
  }

  setAsMain(companyId) {
    this.records.find(r => r.companyId === companyId).isMain = true;

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
