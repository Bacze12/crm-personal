import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ error: 'No autenticado' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}
