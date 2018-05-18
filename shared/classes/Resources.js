export default class Resources {
  constructor() {
    this.resources = {
      mp: 0,
      pp: 0,
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



  managerPoints(amount): Resources {
    return this.chainResource('mp', amount);
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



  static enoughResources(need: Resources, available: Resources) {
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
}
