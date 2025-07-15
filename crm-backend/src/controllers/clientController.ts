import { Request, Response } from 'express';
import { ClientRepository } from '../repositories/clientRepository';
import { ClientService } from '../services/clientService';

export class ClientController {
  private clientService: ClientService;
  constructor(clientRepository: ClientRepository) {
    this.clientService = new ClientService(clientRepository);
  }

  async getClients(req: Request, res: Response) {
    try {
      const clients = await this.clientService.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching clients' });
    }
  }

  async getClientById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const client = await this.clientService.getClientById(id);
      if (!client) return res.status(404).json({ error: 'Client not found' });
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching client' });
    }
  }

  async createClient(req: Request, res: Response) {
    try {
      const newClient = await this.clientService.createClient(req.body);
      res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error creating client' });
    }
  }

  async updateClient(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedClient = await this.clientService.updateClient(id, req.body);
      if (!updatedClient) return res.status(404).json({ error: 'Client not found' });
      res.json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error updating client' });
    }
  }

  async deleteClient(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleted = await this.clientService.deleteClient(id);
      if (!deleted) return res.status(404).json({ error: 'Client not found' });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting client' });
    }
  }

  async deleteManyClients(req: Request, res: Response) {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'ids must be an array' });
    }
    try {
      const result = await this.clientService.deleteManyClients(ids);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting clients' });
    }
  }
}