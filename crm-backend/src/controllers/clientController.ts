import {Request, Response} from 'express';
import {ClientRepository} from '../repositories/clientRepository';

export class ClientController {
  constructor(private clientRepository: ClientRepository) {}

  async getClients(req: Request, res: Response) {
    try {
      const clients = await this.clientRepository.getAll();
      res.json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Error fetching clients'});
    }
  }

  async getClientById(req: Request, res: Response) {
    const {id} = req.params;
    try {
      const client = await this.clientRepository.getById(id);
      if (!client) return res.status(404).json({error: 'Client not found'});
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Error fetching client'});
    }
  }

  async createClient(req: Request, res: Response) {
    try {
      const newClient = await this.clientRepository.create(req.body);
      res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Error creating client'});
    }
  }

  async updateClient(req: Request, res: Response) {
    const {id} = req.params;
    try {
      const updatedClient = await this.clientRepository.update(id, req.body);
      if (!updatedClient) return res.status(404).json({error: 'Client not found'});
      res.json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Error updating client'});
    }
  }

  async deleteClient(req: Request, res: Response) {
    const {id} = req.params;
    try {
      const deleted = await this.clientRepository.delete(id);
      if (!deleted) return res.status(404).json({error: 'Client not found'});
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Error deleting client'});
    }
  }
}