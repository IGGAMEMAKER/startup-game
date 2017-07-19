export type FeatureType = {
  name: String,
  influence: Number,
  description: String,
  shortDescription: String,
  data: Number,
  time: Number
};

export type DefaultDescription = {
  description: String,
  features: Array<FeatureType>,
  utility: Number,
  virality: Number,
  price: Number,
  CAC: Number,
  marketSize: Number,
  mvp: Object,
  hypothesis: Object,
  support: Object,
  markets: Array
};
