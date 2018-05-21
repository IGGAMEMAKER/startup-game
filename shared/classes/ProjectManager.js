import Project from './Project';

export default class ProjectManager {
  constructor(projects: Array, sessionId) {
    this.projects = projects;
    this.sessionId = sessionId;
  }

  printMainInfo() {
    console.log(`-----------------`);
    console.log(`printProjectsInfo`);

    this.projects.forEach((p: Project) => {
      p.printMainInfo();
    });
  }

  spendResources = (projectId, resources) => {
    this.getProjectById(projectId).spendResources(resources);
  }

  isEnoughResources = (projectId, resources) => {
    return this.getProjectById(projectId).isEnoughResources(resources);
  }

  getProjectById = (projectId: Project) => {
    const item = this.projects.find(p => p.getId() === projectId);

    if (!item) throw `no project ${projectId} in session ${this.sessionId}`;

    return item;
  };




  addServer = (projectId) => {
    this.getProjectById(projectId).addServers(1);
  };

  improveDefence = (projectId) => {
    this.getProjectById(projectId).improveDefence();
  };

  addResources = (projectId, resources) => {
    this.getProjectById(projectId).addResources(resources);
  };

  exploreCore = (projectId) => {
    this.getProjectById(projectId).exploreCore();
  };

  upgradeCore = (projectId) => {
    this.getProjectById(projectId).upgradeCore();
  };

  upgradeOffer = (projectId, clientType) => {
    this.getProjectById(projectId).upgradeOffer(clientType, 1);
  };

  exploreOffer = (projectId, clientType) => {
    this.getProjectById(projectId).exploreOffer(clientType);
  };

  exploreChannel = (projectId, channelId) => {
    this.getProjectById(projectId).exploreChannel(channelId);
  };

  pickTemporaryProjectBonus = (projectId, bonusId) => {
    this.getProjectById(projectId).pickTemporaryProjectBonus(bonusId);
  };

  hireProgrammer = (projectId, level) => {
    this.getProjectById(projectId).hireProgrammer(level);
  };
}
