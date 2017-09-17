import productDescriptions from './products/product-descriptions';

export default class Standards {
  constructor(idea) {
    this.features = productDescriptions(idea).features;
  }
};
