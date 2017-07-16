import productStore from '../../stores/product-store';

export default function (productId, featureGroup, featureName) {
  const points = productStore.getPoints(productId);

}
