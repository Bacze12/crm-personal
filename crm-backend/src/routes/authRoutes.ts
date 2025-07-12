import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import type { AuthService } from '../services/auth.service';

// Recibe la instancia del servicio de autenticación por parámetro
export function authRoutes(authService: AuthService) {
  const router = Router();
  const controller = new AuthController(authService);

  router.post('/register', controller.register.bind(controller));
  router.post('/login', controller.login.bind(controller));
  router.post('/logout', controller.logout.bind(controller));

  return router;
}
