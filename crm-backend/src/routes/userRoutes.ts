import { Router } from 'express';
import { UserController } from '../controllers/userController';
import type { AuthService } from '../services/auth.service';

export function userRoutes(authService: AuthService) {
  const router = Router();
  const controller = new UserController(authService);

  // Endpoint para obtener el usuario autenticado
  router.get('/me', controller.me.bind(controller));

  return router;
}
