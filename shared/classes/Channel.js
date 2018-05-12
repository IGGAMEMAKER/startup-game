export default class Channel {
  constructor(id, projects, clientType, maxClients, language, coreLevelRange) {
    this.id = id;
    this.projects = projects;
    this.clientType = clientType;
    this.maxClients = maxClients;
    this.language = language;
    // this.coreLevel = coreLevelRange;
  }

  getId() {
    return this.id;
  }

  getProjectInfoOrJoin(projectId) {
    let index = this.projects.findIndex(p => p.id === projectId);

    if (index < 0) {
      this.projects.push({
        id: projectId,
        clients: 0
      });

      index = this.projects.findIndex(p => p.id === projectId);
    }

    return this.projects[index];
  }

  join() {

  }

  prepareAd() {

  }

  makeAd() {

  }

  grabClients(projectId, loyalty) {
    const
  }
}
