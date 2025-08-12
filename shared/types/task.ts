// Define el tipo base que tendrá la DB
export interface Task {
    id: string;
    name: string;
    description?: string;
    projectId: string;
    statusId: string;
    priority: TaskPriority;
    assigneeId?: string;
    createdAt: Date;
    updatedAt?: Date;
}

// Tipo para crear una tarea (excluye campos autogenerados)
export type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

// Tipo para actualizar una tarea (todos los campos son opcionales)
export type UpdateTaskData = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;

export enum TaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high',
    urgent = 'urgent',
}