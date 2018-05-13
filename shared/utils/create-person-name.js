import random from './random';

export default () => {
  const names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella', 'Lee', 'Manolo', 'James', 'Luka', 'George'];
  const index = Math.floor(random(0, names.length));
  const name = names[index];

  const surnames = ['Hernandez', 'Martinez', 'Chang', 'Ivanov', 'Alexeev', 'Stokes'];
  const index2 = Math.floor(random(0, surnames.length));
  const surname = surnames[index2];

  return `${name} ${surname}`;
};
