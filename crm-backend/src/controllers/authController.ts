import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token, user } = await this.authService.login(req.body);


      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // solo HTTPS en prod
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hora
      });

      res.json({ user });
    } catch (error) {
      console.error(error);
      const errorMessage = (error instanceof Error) ? error.message : 'Credenciales inválidas';
      res.status(401).json({ error: errorMessage });
    }
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada' });
  }
}
