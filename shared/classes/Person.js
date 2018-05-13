import nameGenerator from '../utils/create-person-name';

export default class Person {
  constructor({
    name
  }) {
    this.name = name ? name : nameGenerator();
  }
}
