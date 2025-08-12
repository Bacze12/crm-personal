import type { Task, UpdateTaskData } from '../../../shared/types/task';
import { TaskRepository } from '../repositories/taskRepository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(data: Partial<Task>): Promise<Task> {
    return  this.taskRepository.createTask(data);
  }

  async getTaskById(id: string): Promise<Task | null> {
    return  this.taskRepository.getTaskById(id);
  }

  async getAllTasks(): Promise<Task[]> {
    return  this.taskRepository.getAllTasks();
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<Task | null> {
    return  this.taskRepository.updateTask(id, data);
  }

  async deleteTask(id: string): Promise<Task | null> {
    return  this.taskRepository.deleteTask(id);
  }
};