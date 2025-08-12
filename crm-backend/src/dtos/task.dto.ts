import { TaskPriority } from "../../../shared/types/task";

// DTO para CREAR una nueva tarea
export class CreateTaskDTO {
  name: string;
  description?: string;
  projectId: string;
  statusId: string;
  priority: TaskPriority;
  assigneeId?: string;

  constructor(data: CreateTaskDTO) {
    this.name = data.name;
    this.description = data.description;
    this.projectId = data.projectId;
    this.statusId = data.statusId;
    this.priority = data.priority;
    this.assigneeId = data.assigneeId;
  }
}

// DTO para ACTUALIZAR una tarea existente
export class UpdateTaskDTO {
  name?: string;
  description?: string;
  projectId?: string;
  statusId?: string;
  priority?: TaskPriority;
  assigneeId?: string;
}

// DTO para LEER/MOSTRAR una tarea completa
export class TaskDTO {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  statusId: string;
  priority: TaskPriority;
  assigneeId?: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(data: TaskDTO) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.projectId = data.projectId;
    this.statusId = data.statusId;
    this.priority = data.priority;
    this.assigneeId = data.assigneeId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}