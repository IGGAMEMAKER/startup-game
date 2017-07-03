export default {
  productStorePayload: {
    name: 'productStorePayload',
    type: {
      type: String,
      id: Number, // product id
      featureGroup: String,
      featureName: String,
      value: Number
    }
  },
  scheduleStorePayload: {
    name: 'scheduleStorePayload',
    type: {
      type: String,
      task: Object,
      id: Number
    }
  },

  productStorePayload: {
    name: 'productStorePayload',
    type: {
      type: String,
      amount: Number
    }
  },
  messageStorePayload: {
    name: 'messageStorePayload',
    type: {
      type: String,
      amount: Number
    }
  }
};
