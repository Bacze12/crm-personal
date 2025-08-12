import { Request, Response } from 'express';
import { ProjectRepository } from '../repositories/projectRepository';
import { ProjectService } from '../services/projectService';
import { ProjectDTO, ProjectUpdateDTO } from '../dtos/project.dto';

export class ProjectController {
  private projectService: ProjectService;

  constructor(projectRepository: ProjectRepository) {
    this.projectService = new ProjectService(projectRepository);
  }

  async getProjects(_req: Request, res: Response) {
    try {
      const projects = await this.projectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching projects' });
    }
  }

  async getProjectById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const project = await this.projectService.getProjectById(id);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching project' });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const projectData = new ProjectDTO(req.body);
      const newProject = await this.projectService.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error creating project' });
    }
  }

  async updateProject(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const projectUpdateData = new ProjectUpdateDTO(req.body);
      const updatedProject = await this.projectService.updateProject(id, projectUpdateData);
      if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
      res.json(updatedProject);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error updating project' });
    }
  }

  async deleteProject(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleted = await this.projectService.deleteProject(id);
      if (!deleted) return res.status(404).json({ error: 'Project not found' });
      res.status(204).send("Project deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting project' });
    }
  }

  // async deleteManyProjects(req: Request, res: Response) {
  //   const { ids } = req.body;
  //   try {
  //     const deleted = await this.projectService.deleteManyProjects(ids);
  //     res.json(deleted);    
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Error deleting projects' });
  //   }
  // } 
}