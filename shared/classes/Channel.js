// import logger from '../../../'

export default class Channel {
  constructor(id, adCost, adComplexity, clientType, maxClients, language) {
    this.id = id;
    this.clientType = clientType;
    this.language = language;
    this.clients = maxClients;
    this.maxClients = maxClients;
    this.adCost = adCost;
    this.adComplexity = adComplexity;
    this.channelWidth = 50;
  }

  getId() {
    return this.id;
  }

  grabClients(adPower) {
    /// adPower from 0 to 1
    let clients = this.channelWidth * adPower;

    if (clients > this.clients) {
      clients = this.clients;
    }

    this.clients -= clients;

    return clients;
  }

  churnClients(returnedClients) {
    let clients;

    if (this.clients + returnedClients > this.maxClients) {
      clients = this.maxClients - this.clients;
    } else {
      clients = returnedClients;
    }

    this.clients += clients;
  };
}
