import logger from '../logger/logger';

export const isRentingAlready = (_rents, sender, acceptor, featureId) => {
  return _rents.find(r => r.featureId === featureId && ((r.in === acceptor && r.out === sender) || (r.out === acceptor && r.in === sender)));
};

export const incomingRentList = (_rents, id) => {
  return _rents.filter(r => r.in === id);
};

export const outgoingRentList = (_rents, id) => {
  return _rents.filter(r => r.out === id);
};

export const hasIncomingRents = (_rents, id) => {
  return _rents.find(r => r.in === id);
};

export const hasOutgoingRents = (_rents, id) => {
  return _rents.find(r => r.out === id);
};

export const canRentTechFromAtoB = (_rents, sender, acceptor, featureId) => {
  return !_rents.find(r => r.featureId === featureId && (r.in === acceptor || r.out === acceptor || r.in === sender));
};

export const getRentingStatus = (_rents, id, featureId) => {
  const canSend = !_rents.find(r => r.featureId === featureId && r.in === id);
  const canAccept = !_rents.find(r => r.featureId === featureId && (r.out === id || r.in === id));

  return {
    canSend,
    canAccept
  };
};

export const getRentIncomes = (_rents, id) => {
  const outgoingRents = _rents.filter(r => r.out === id);

  const sum = outgoingRents.map(r => r.price).reduce((p, c) => p + c, 0);

  return {
    outgoingRents,
    sum
  };
};

export const getRentExpenses = (_rents, id) => {
  const incomingRents = _rents.filter(r => r.in === id);

  const sum = incomingRents.map(r => r.price).reduce((p, c) => p + c, 0);

  return {
    incomingRents,
    sum
  };
};

export const enforceFeaturesByRentedOnes = (_rents, features: Array<Number>, rented: Array<Rent>) => {
  logger.shit('enforceFeaturesByRentedOnes in /helpers/products/rents.js');
  const list = features.map(v => v);

  rented.forEach(r => {
    const featureId = r.featureId;

    const current = list[featureId];
    const next = this.getMainFeatureQualityByFeatureId(r.out, featureId);

    if (next >= current) {
      list[featureId] = next;
    }
  });

  return list;
};


export default {
  isRentingAlready,
  incomingRentList,
  outgoingRentList,
  hasIncomingRents,
  hasOutgoingRents,
  getRentingStatus,
  getRentIncomes,
  getRentExpenses,
  canRentTechFromAtoB,
  enforceFeaturesByRentedOnes
}
