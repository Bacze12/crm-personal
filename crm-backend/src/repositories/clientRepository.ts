import type { Client } from '../../../shared/types/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClientRepository {
  async deleteMany(ids: string[]): Promise<{ deleted: string[]; notFound: string[] }> {
    const deleted: string[] = [];
    const notFound: string[] = [];
    for (const id of ids) {
      try {
        await prisma.client.delete({ where: { id } });
        deleted.push(id);
      } catch (error) {
        notFound.push(id);
      }
    }
    return { deleted, notFound };
  }
  async getAll(): Promise<Client[]> {
    const clients = await prisma.client.findMany({ include: { projects: true } });
    return clients.map(client => ({
      ...client,
      phone: client.phone === null ? undefined : client.phone,
      address: client.address === null ? undefined : client.address,
      company: client.company === null ? undefined : client.company,
      notes: client.notes === null ? undefined : client.notes,
      projects: client.projects?.map((p: any) =>  ({
        id: p.id,
        name: p.name,
        startDate: p.startDate instanceof Date ? p.startDate.toISOString() : p.startDate,
        endDate: p.endDate instanceof Date ? p.endDate.toISOString() : p.endDate,
      })) ?? [],
      createdAt: client.createdAt instanceof Date ? client.createdAt.toISOString() : client.createdAt,
      updatedAt: client.updatedAt instanceof Date
        ? client.updatedAt.toISOString()
        : client.updatedAt === null
        ? undefined
        : client.updatedAt,
    }));
  }

  async getById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({ where: { id }, include: { projects: true } });
    if (!client) return null;
    return {
      ...client,
      phone: client.phone === null ? undefined : client.phone,
      address: client.address === null ? undefined : client.address,
      company: client.company === null ? undefined : client.company,
      notes: client.notes === null ? undefined : client.notes,
      projects: client.projects?.map((p: any) =>  ({
        id: p.id,
        name: p.name,
        startDate: p.startDate instanceof Date ? p.startDate.toISOString() : p.startDate,
        endDate: p.endDate instanceof Date ? p.endDate.toISOString() : p.endDate,
      })) ?? [],
      createdAt: client.createdAt instanceof Date ? client.createdAt.toISOString() : client.createdAt,
      updatedAt: client.updatedAt instanceof Date
        ? client.updatedAt.toISOString()
        : client.updatedAt === null
        ? undefined
        : client.updatedAt,
    };
  }

  async create(data: Partial<Client>): Promise<Client> {
    const client = await prisma.client.create({ data: data as any });
    return {
      ...client,
      phone: client.phone === null ? undefined : client.phone,
      address: client.address === null ? undefined : client.address,
      company: client.company === null ? undefined : client.company,
      notes: client.notes === null ? undefined : client.notes,
      createdAt: client.createdAt instanceof Date ? client.createdAt.toISOString() : client.createdAt,
      updatedAt: client.updatedAt instanceof Date
        ? client.updatedAt.toISOString()
        : client.updatedAt === null
        ? undefined
        : client.updatedAt,
    };
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const client = await prisma.client.update({ where: { id }, data: data as any });
    return {
      ...client,
      phone: client.phone === null ? undefined : client.phone,
      address: client.address === null ? undefined : client.address,
      company: client.company === null ? undefined : client.company,
      notes: client.notes === null ? undefined : client.notes,
      createdAt: client.createdAt instanceof Date ? client.createdAt.toISOString() : client.createdAt,
      updatedAt: client.updatedAt instanceof Date
        ? client.updatedAt.toISOString()
        : client.updatedAt === null
        ? undefined
        : client.updatedAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.client.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}