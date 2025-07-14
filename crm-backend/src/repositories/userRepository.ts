
import type { User } from '../../../shared/types/user';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export class UserRepository {
  // constructor innecesario para Prisma

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => ({ ...user, avatar: user.avatar === null ? undefined : user.avatar }));
  }


  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return undefined;
    return { ...user, avatar: user.avatar === null ? undefined : user.avatar };
  }


  async create(data: Partial<User>): Promise<User> {
    // Prisma generará el id automáticamente si no se provee
    const user = await prisma.user.create({ data: data as any });
    return { ...user, avatar: user.avatar === null ? undefined : user.avatar };
  }


  async update(id: string, data: Partial<User>): Promise<User | undefined> {
    const user = await prisma.user.update({ where: { id }, data: data as any });
    return { ...user, avatar: user.avatar === null ? undefined : user.avatar };
  }


  async remove(id: string): Promise<number> {
    await prisma.user.delete({ where: { id } });
    return 1;
  }


  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return { ...user, avatar: user.avatar === null ? undefined : user.avatar };
  }
}
