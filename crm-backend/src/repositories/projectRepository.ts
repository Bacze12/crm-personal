import type { Project } from '../../../shared/types/project';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectRepository {
  async getAll(): Promise<Project[]> {
    const projects = await prisma.project.findMany({ include: { client: true, tasks: true } });
    return projects.map(project => ({
      ...project,
      startDate: project.startDate instanceof Date ? project.startDate.toISOString() : project.startDate,
      endDate: project.endDate ? (project.endDate instanceof Date ? project.endDate.toISOString() : project.endDate) : undefined,
    }));
  }

  async getById(id: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({ where: { id }, include: { client: true, tasks: true } });
    if (!project) return null;
    return {
  ...project,
  description: project.description ?? "", // nunca null
  endDate: project.endDate ? (project.endDate instanceof Date ? project.endDate.toISOString() : project.endDate) : undefined,
  budget: project.budget ?? undefined,
  team: project.team ?? [],
  startDate: project.startDate instanceof Date ? project.startDate.toISOString() : project.startDate,
  // agrega otros campos si tu modelo los tiene
};
  }

async create(data: Partial<Project>): Promise<Project> {
  const { clientId, startDate, progress, ...rest } = data;
  const today = new Date().toISOString();
  const defaultProgress = 0;

  // Limpia campos undefined
  const cleanedRest = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v !== undefined)
  );

  const prismaData: any = {
    ...cleanedRest,
    startDate: startDate ?? today,
    progress: progress ?? defaultProgress,
    ...(clientId ? { client: { connect: { id: clientId } } } : {})
  };

  const project = await prisma.project.create({ data: prismaData, include: { client: true } });

  return {
  ...project,
  description: project.description ?? "", // nunca null
  endDate: project.endDate ? (project.endDate instanceof Date ? project.endDate.toISOString() : project.endDate) : undefined,
  budget: project.budget ?? undefined,
  team: project.team ?? [],
  startDate: project.startDate instanceof Date ? project.startDate.toISOString() : project.startDate,
// agrega otros campos si tu modelo los tiene
};
}

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    const updatedProject = await prisma.project.update({ include: { client: true }, where: { id }, data: data as any });
    return {
      ...updatedProject,
      startDate: updatedProject.startDate instanceof Date ? updatedProject.startDate.toISOString() : updatedProject.startDate,
      endDate: updatedProject.endDate ? (updatedProject.endDate instanceof Date ? updatedProject.endDate.toISOString() : updatedProject.endDate) : undefined,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.project.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}