import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/taskRepository';
import { TaskService } from '../services/taskService';
import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from '../dtos/task.dto';

export class TaskController {
    private taskService: TaskService;

    constructor(taskRepository: TaskRepository) {
        this.taskService = new TaskService(taskRepository);
    }
    async gettasks(_req: Request, res: Response) {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching tasks' });
        }
    }

    async createtask(req: Request, res: Response) {
        try {
            const taskData = new CreateTaskDTO(req.body);
            const newTask = await this.taskService.createTask(taskData);
            if (!newTask) return res.status(400).json({ error: 'Error creating task' });
            res.status(201).json(newTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating task' });
        }
    }

    async updatetask(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const updatedTask = await this.taskService.updateTask(id, req.body);
            if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
            res.json(updatedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating task' });
        }
    }

    async getTaskbyId(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const task = await this.taskService.getTaskById(id);
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching task' });
        }
    }

    async deleteTask(_req: Request, res: Response) {
        const { id } = _req.params;
        try {
            const task = await this.taskService.deleteTask(id);
            if (!task) return res.status(404).json({ error: 'Task not found'});
            res.json(task);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'Error Delete task'})
        }
    }
}