import type { Project } from '../../../shared/types/project';
import { ProjectRepository } from '../repositories/projectRepository';

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.getAll();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.getById(id);
  }

  async createProject(data: Partial<Project>): Promise<Project> {
    return this.projectRepository.create(data);
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
    return this.projectRepository.update(id, data);
  }

  async deleteProject(id: string): Promise<boolean> {
    //Debemos agregar la eliminacion en cascada a las Tasks relacionadas
    return this.projectRepository.delete(id);
  }

  // async deleteManyProjects(ids: string[]): Promise<boolean> {
  //   return this.projectRepository.deleteMany(ids);
  // }
}