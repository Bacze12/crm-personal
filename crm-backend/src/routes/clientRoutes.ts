import {Router} from 'express';
import {ClientController} from '../controllers/clientController';
import {ClientRepository} from '../repositories/clientRepository';

export function clientRoutes(){
    const router = Router();
    // Instancia del repositorio de clientes
    const clientRepository = new ClientRepository();
    const controller = new ClientController(clientRepository);

    // Endpoint para obtener todos los clientes
    router.get('/', controller.getClients.bind(controller));
    
    // Endpoint para obtener un cliente por ID
    router.get('/:id', controller.getClientById.bind(controller));

    // Endpoint para crear un nuevo cliente
    router.post('/', controller.createClient.bind(controller));

    // Endpoint para actualizar un cliente
    router.put('/:id', controller.updateClient.bind(controller));


    // Endpoint para eliminar un cliente
    router.delete('/:id', controller.deleteClient.bind(controller));

    // Endpoint para eliminar múltiples clientes
    router.post('/delete-many', controller.deleteManyClients.bind(controller));

    return router;
}