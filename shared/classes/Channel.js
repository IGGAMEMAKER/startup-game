// import logger from '../../../'

export default class Channel {
  constructor(id, projects, adCost, clientType, maxClients, language) {
    this.id = id;
    this.projects = projects;
    this.clientType = clientType;
    this.language = language;
    this.maxClients = maxClients;
    this.adCost = adCost;
  }

  getId() {
    return this.id;
  }

  getProjectInfo(projectId) {
    return this.projects.find(p => p.id === projectId);
  }

  join() {
    this.projects.push({
      id: projectId,
      clients: 0,
      adPower: 0
    });
  }

  prepareAd(projectId) {
    const projectInfo = this.getProjectInfo(projectId);


  }

  grabClients(projectId, loyalty) {
    const projectInfo = this.getProjectInfo(projectId);

    
  }
}
