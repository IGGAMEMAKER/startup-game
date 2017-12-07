export default (features, maxValues, influenceValuesOnRating) => {
  let rating = 0;

  features.forEach((current, i) => {
    const quality = features[i] / maxValues[i];

    const influence = influenceValuesOnRating[i];

    rating += quality * influence;
  });

  return rating;
};
