import Project from './Project';

export default class ProjectManager {
  constructor({ projects: Array }) {
    this.projects = projects;
  }

  getProject: Project = (projectId) => {
    return this.projects.find((p: Project) => p.getId() === projectId);
  }
}
