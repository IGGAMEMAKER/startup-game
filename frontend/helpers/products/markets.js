import logger from '../logger/logger';

export const isMarketFree = (_markets, marketId) => {
  return -1 === _markets.findIndex(m => m.marketId === marketId);
};
export const isFreeMarket = (_markets, marketId) => {
  return isMarketFree(_markets, marketId);
};


export const getMarketRecord = (_markets, companyId, marketId) => {
  return _markets.find(m => m.marketId === marketId && m.companyId === companyId);
};

export const isHaveInfluenceOnMarket = (_markets, companyId, marketId) => {
  return getMarketRecord(_markets, companyId, marketId);
};

export const isAvailableToLeaveMarket = (_markets, id, marketId) => {
  return isHaveInfluenceOnMarket(_markets, id, marketId);
};

export const isPartneredOnMarket = (_markets, c1, c2, marketId) => {
  const record = getMarketRecord(_markets, c1, marketId);

  if (!record) return false;

  return record.partnerId === c2;
};

export const isMainMarket = (_markets, id, marketId) => {
  const record = getMarketRecord(_markets, id, marketId);

  return record ? record.isMainMarket : false;
};

export default {
  isFreeMarket,
  isMarketFree,
  isMainMarket,
  isHaveInfluenceOnMarket,
  isAvailableToLeaveMarket,
  isPartneredOnMarket,

  getMarketRecord,
};
