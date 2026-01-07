import type { Project } from "../domain";
import type { IProjectRepository } from "../ports";

export class ProjectService {
  constructor(private readonly projects: IProjectRepository) {}

  async createProject(input: {
    name: string;
    description?: string | null;
    userId?: string | null;
  }): Promise<Project> {
    // {TODO} add validation, limits, etc
    return this.projects.create(input);
  }

  async listProjects(userId?: string): Promise<Project[]> {
    if (userId) {
      return this.projects.findByUser(userId);
    }
    return this.projects.findAll();
  }
}
