import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRoutes } from './src/routes/authRoutes';
import { userRoutes } from './src/routes/userRoutes';
import { clientRoutes } from './src/routes/clientRoutes';
import { AuthService } from './src/services/auth.service';

import { projectRoutes } from './src/routes/projectsRoutes';
import { taskRoutes } from './src/routes/taskRoutes';
import { UserRepository } from './src/repositories/userRepository';
import 'dotenv/config'; // Asegúrate de que dotenv esté instalado y configurado

const userRepository = new UserRepository();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173', 'http://localhost:3001'],
  credentials: true
}));

// Aquí deberías tener la instancia de tu userRepository
const authService = new AuthService(userRepository);
app.get('/', (_req, res) => {
  res.send('CRM Backend is running!');
});

app.use('/auth', authRoutes(authService));
app.use('/api/users', userRoutes(authService));
app.use('/api/clients', clientRoutes());
app.use('/api/projects', projectRoutes());
app.use('/api/tasks', taskRoutes());

const PORT = process.env.PORT || 3000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

export default app;