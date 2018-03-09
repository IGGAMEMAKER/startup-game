import logger from '../helpers/logger/logger';

const proceed = (target, property, descriptor) => {
  // if (getStage() >= stage || isTestMode) {
    // descriptor.value = () => true;
    descriptor.value = () => true;
    descriptor.enumerable = false;
    descriptor.configurable = true;
    descriptor.writable = true;

  logger.log(target, property, descriptor);
  // }
};

export default class Market {
  constructor(data) {
    this.id = data.id;
    this.records = data.records || [];
    this.partnerships = data.partnerships || [];
  }

  isExploredMarket(companyId) {
    return this.getRecordByProductId(companyId);
  }

  getMainMarketModifier(companyId) {
    const record = this.getRecordByProductId(companyId);

    return record.isMain ? 1.2 : 1;
  }

  getMarketingKnowledge(productId) {
    const record = this.getRecordByProductId(productId);

    if (!record) return 0;

    return record.knowledgeOfMarket || 0;
  }

  getClients(companyId) {
    const record = this.getRecordByProductId(companyId);

    if (!record) return 0;

    return record.clients || 0;
  }

  getRecordByProductId(companyId) {
    return this.records.find(r => r.companyId === companyId);
  }

  getRecordIdByProductId(companyId) {
    return this.records.findIndex(r => r.companyId === companyId);
  }


  // setters
  join(companyId, level = 0) {
    this.records.push({
      companyId,
      hype: 1 + Math.floor(Math.random() * 10),
      active: true,
      isMain: false,
      level,
      clients: 0,
      knowledgeOfMarket: 0
    });

    return this;
  }

  addClients(companyId, clients) {
    const index = this.getRecordIdByProductId(companyId);

    if (index < 0) return this;

    this.records[index].clients += clients;
    this.records[index].knowledgeOfMarket += 1;
  }

  levelUp(companyId, maxLevel = 0) {
    const index = this.getRecordIdByProductId(companyId);

    if (index < 0) return this;

    const lvl = this.records[index].level;

    if (lvl < maxLevel) {
      this.records[index].level = lvl + 1;
    }

    return this;
  }

  addHype(companyId, hype) {
    const index = this.getRecordIdByProductId(companyId);

    if (index < 0) return this;

    const was = this.records[index].hype;

    this.records[index].hype = Math.min(100, was + hype);

    return this;
  }

  setAsMain(companyId) {
    this.records.find(r => r.companyId === companyId).isMain = true;

    return true;
  }
}
