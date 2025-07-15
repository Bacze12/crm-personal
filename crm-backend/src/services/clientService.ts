import type { Client } from '../../../shared/types/client';
import { ClientRepository } from '../repositories/clientRepository';

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async getAllClients(): Promise<Client[]> {
    return this.clientRepository.getAll();
  }

  async getClientById(id: string): Promise<Client | null> {
    return this.clientRepository.getById(id);
  }

  async createClient(data: Partial<Client>): Promise<Client> {
    return this.clientRepository.create(data);
  }

  async updateClient(id: string, data: Partial<Client>): Promise<Client | null> {
    return this.clientRepository.update(id, data);
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clientRepository.delete(id);
  }

  async deleteManyClients(ids: string[]): Promise<{ deleted: string[]; notFound: string[] }> {
    return this.clientRepository.deleteMany(ids);
  }
}
