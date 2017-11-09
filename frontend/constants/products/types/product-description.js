export type FeatureType = {
  name: String,
  influence: Number,
  description: String,
  shortDescription: String,
  data: Number,
  time: Number
};

export type MarketDescription = {
  id: Number,
  name: String,
  userOrientedName: String,
  clients: Number,
  price: Number,
  rating: Array<Number>,
};

export type DefaultDescription = {
  description: String,
  features: Array<FeatureType>,
  utility: Number,
  virality: Number,
  price: Number,
  CAC: Number,
  mvp: Object,
  hypothesis: Object,
  support: Object,
  markets: Array
};
