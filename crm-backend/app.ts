import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRoutes } from './src/routes/authRoutes';
import { userRoutes } from './src/routes/userRoutes';
import { AuthService } from './src/services/auth.service';
import { UserRepository } from './src/repositories/userRepository';
import Knex from 'knex';
import 'dotenv/config'; // Asegúrate de que dotenv esté instalado y configurado
// Importa tu knexfile y configura la conexión
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('./knexfile');
const environment = process.env.NODE_ENV || 'staging';
const knex = Knex(knexConfig[environment]);
const userRepository = new UserRepository(knex);


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Aquí deberías tener la instancia de tu userRepository
const authService = new AuthService(userRepository);
app.get('/', (_req, res) => {
  res.send('CRM Backend is running!');
});

app.use('/auth', authRoutes(authService));
app.use('/api/users', userRoutes(authService));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
export default app;
