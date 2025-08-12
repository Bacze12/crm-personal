// src/routes/taskRoutes.ts

import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { TaskController } from '../controllers/taskController';
import { TaskRepository } from '../repositories/taskRepository';
import { TaskPriority } from '../../../shared/types/task'; // Import the TaskPriority enum

export function taskRoutes() {
  const router = Router();
  const taskRepository = new TaskRepository();
  const taskController = new TaskController(taskRepository);

  router.get('/', taskController.gettasks.bind(taskController));
  router.get('/:id', taskController.getTaskbyId.bind(taskController));
  router.delete('/:id', taskController.deleteTask.bind(taskController)); 

  router.post(
    '/',
    [
      // `name` corresponds to your DTO
      body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

      // `description` is optional but should be a string if provided
      body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

      // `projectId` is required and must be a string (assuming it's a UUID)
      body('projectId')
        .isString()
        .withMessage('Project ID must be a string')
        .notEmpty()
        .withMessage('Project ID is required'),

      // `statusId` is required and must be a string (assuming it's a UUID)
      body('statusId')
        .isString()
        .withMessage('Status ID must be a string')
        .notEmpty()
        .withMessage('Status ID is required'),

      // `priority` must be one of the values in your enum
      body('priority')
        .isIn(Object.values(TaskPriority))
        .withMessage('Priority must be a valid value: ' + Object.values(TaskPriority).join(', ')),

      // `assigneeId` is optional but should be a string if provided
      body('assigneeId')
        .optional()
        .isString()
        .withMessage('Assignee ID must be a string'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    taskController.createtask.bind(taskController)
  );

  router.patch(
    '/:id',
    [
      body('name').optional().isString().withMessage('Name must be a string'),
      body('description').optional().isString().withMessage('Description must be a string'),
      body('projectId').optional().isString().withMessage('Project ID must be a string'),
      body('statusId').optional().isString().withMessage('Status ID must be a string'),
      body('priority')
        .optional()
        .isIn(Object.values(TaskPriority))
        .withMessage('Priority must be a valid value: ' + Object.values(TaskPriority).join(', ')),
      body('assigneeId').optional().isString().withMessage('Assignee ID must be a string'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    taskController.updatetask.bind(taskController)
  );


  return router;
}