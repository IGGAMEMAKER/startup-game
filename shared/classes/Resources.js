export default class Resources {
  constructor() {
    this.resources = {
      mp: 0,
      pp: 0,
      sp: 0,
      ideas: 0,
      money: 0
    };
  }

  getData() {
    return this.resources;
  }

  chainResource(name, amount): Resources {
    this.resources[name] = amount;

    return this;
  }

  iterate() {
    Object.keys(this.resources)
  }



  managerPoints(amount): Resources {
    return this.chainResource('mp', amount);
  }

  salesPoints(amount): Resources {
    return this.chainResource('sp', amount);
  }

  programmerPoints(amount): Resources {
    return this.chainResource('pp', amount);
  }

  money(amount): Resources {
    return this.chainResource('money', amount);
  }

  ideas(amount): Resources {
    return this.chainResource('ideas', amount);
  }

  // static iterateByKeys(resource: Resources) {
  //   const data = resource.getData();
  //   const keys = Object.keys(data);
  //
  //
  // }

  static enough(need: Resources, available: Resources) {
    let enough = true;

    const needResources = need.getData();
    const availableResources = available.getData();

    for (let item in needResources) {
      if (needResources[item] > availableResources[item]) {
        enough = false;
      }
    }

    return enough;
  }

  add(accumulation: Resources) {
    const accumulationResources = accumulation.getData();

    for (let item in accumulationResources) {
      this.resources[item] += accumulationResources[item];
    }

    return this;
  }

  spend(need: Resources) {
    const needResources = need.getData();

    for (let item in needResources) {
      this.resources[item] -= needResources[item];
    }

    return this;
  }
}
