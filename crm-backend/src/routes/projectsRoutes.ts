import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ProjectController } from '../controllers/projectController';
import { ProjectRepository } from '../repositories/projectRepository';

export function projectRoutes() {
  const router = Router();
  // Instance of the project repository
  const projectRepository = new ProjectRepository();
  const controller = new ProjectController(projectRepository);

  // Endpoint to get all projects
  router.get('/', controller.getProjects.bind(controller));

  // Endpoint to get a project by ID
  router.get('/:id', controller.getProjectById.bind(controller));

  // Endpoint to create a new project
  router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('clientId').notEmpty().withMessage('Client ID is required'),
    body('status').isIn(['active', 'completed', 'on_hold']).withMessage('Invalid status'),
    body('priority').isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
    body('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid ISO date'),
    body('budget').optional().isNumeric().withMessage('Budget must be a number'),
    body('team').optional().isArray().withMessage('Team must be an array'),
    body('progress').optional().isNumeric().withMessage('Progress must be a number'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  controller.createProject.bind(controller)
);

  // Endpoint to update a project
  router.patch('/:id', controller.updateProject.bind(controller));

  // Endpoint to delete a project
  router.delete('/:id', controller.deleteProject.bind(controller));

  // Endpoint to delete multiple projects
  router.post('/delete-many', controller.deleteProject.bind(controller));

  return router;
}