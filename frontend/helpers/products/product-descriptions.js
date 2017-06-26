import * as IDEAS from '../../constants/products/ideas';

import webStudio from '../../content/products/WEB-STUDIO';
import webHosting from '../../content/products/WEB-HOSTING';

type FeatureType = {
  name: String,
  influence: Number,
  description: String,
  shortDescription: String,
  data: Number,
  time: Number
};

type DefaultDescription = {
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
  segments: Array
};

export default function (idea): DefaultDescription {
  switch (idea) {
    case IDEAS.IDEA_WEB_STUDIO:
      return webStudio;
      break;
    case IDEAS.IDEA_WEB_HOSTING:
      return webHosting.compute();
      break;
  }
};
