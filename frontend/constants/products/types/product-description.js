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
  markets: Array,
  ads: Array
};
