import type { Knex } from 'knex';
import type { User } from '../../../shared/types/user';
import { randomUUID } from 'crypto';

export class UserRepository {
  constructor(private knex: Knex) {}

  async findAll(): Promise<User[]> {
    return this.knex('users').select('*');
  }

  async findById(id: string): Promise<User | undefined> {
    return this.knex('users').where({ id }).first();
  }

  async create(data: Partial<User>): Promise<User> {
    const [user] = await this.knex('users')
      .insert({
        ...data,
        id: data.id ?? randomUUID(), // Genera un UUID si no viene uno
      })
      .returning('*');
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await this.knex('users').where({ id }).update(data).returning('*');
    return user;
  }

  async remove(id: string): Promise<number> {
    return this.knex('users').where({ id }).del();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.knex('users').where({ email }).first();
    return user ?? null;
  }
}
