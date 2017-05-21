const merge = (buyer, seller) => {

  return {
    clients: buyer.KPI.clients,
    features: buyer.features
  }
};

export default {
  merge
}
