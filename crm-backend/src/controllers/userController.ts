import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/userRepository';

export class UserController {
  constructor(private authService: AuthService) {}

  async me(req: Request, res: Response) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const payload = this.authService.verifyToken(token);
      // Obtener usuario desde el repositorio
      const userRepo = this.authService['userRepo'] as UserRepository;
      const user = await userRepo.findById(payload.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const { password, ...userSafe } = user;
      res.json(userSafe);
    } catch (e: any) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
}
