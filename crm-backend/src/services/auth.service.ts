import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/userRepository';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';

export class AuthService {
    constructor(private userRepo: UserRepository) {}

    async register(data: RegisterDTO) {
        const exists = await this.userRepo.findByEmail(data.email);
        if (exists) throw new Error('Email already in use');
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.userRepo.create({
        ...data,
        password: hashed,
        createdAt: new Date()
        });
        const { password, ...userSafe } = user;
        return userSafe;
    }

    async login(data: LoginDTO) { 
        const user = await this.userRepo.findByEmail(data.email);
        console.log('Login intento:', data, 'Usuario encontrado:', user);
        if (!user) throw new Error('User not found');

        const valid = await bcrypt.compare(data.password, user.password!);
        console.log('Password válida:', valid);
        if (!valid) throw new Error('Invalid password');

        const token = jwt.sign(
            {id: user.id, role:user.role},
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        return { token, user };

    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET!) as any;
        } catch (error) {
            throw new Error('Invalid token');   
        }
    }
}