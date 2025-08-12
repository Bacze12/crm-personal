import { PrismaClient } from '@prisma/client';
// Asegúrate de importar los tipos correctos
import type { Task, CreateTaskData, UpdateTaskData } from '../../../shared/types/task';

const prisma = new PrismaClient();

export class TaskRepository {
  // Recibe los datos para crear la tarea
  async createTask(data: Partial<Task>): Promise<Task> {
    const createdTask = await prisma.task.create({ data:data as any });
    return createdTask as Task;
  }

  // Obtiene una tarea, incluyendo el proyecto, si es necesario
  async getTaskById(id: string): Promise<Task | null> {
    return await prisma.task.findUnique({
      include: { project: true, assignee: true },
      where: { id },
      // Puedes incluir relaciones para obtener más datos si lo necesitas
      // include: { project: true, assignee: true },
    }) as Task | null;
  }

  async getAllTasks(): Promise<Task[]> {
    return await prisma.task.findMany() as Task[];
  }

  // Recibe el ID y los datos opcionales para actualizar
  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const updatedTask = await prisma.task.update({
      include: { project: true, assignee: true },
      where: { id },
      data,
    });
    return updatedTask as Task;
  }

  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await prisma.task.delete({ where: { id } });
    return deletedTask as Task;
  }
};