import {Router} from 'express';
import {body, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
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
    router.post('/',[
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('phone').optional().isString(),
      body('address').optional().isString(),
      body('company').optional().isString(),
      body('notes').optional().isString()
    ], (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }, controller.createClient.bind(controller));

    // Endpoint para actualizar un cliente
    router.patch('/:id',[
      body('name').optional().notEmpty().withMessage('Name is required'),
      body('email').optional().isEmail().withMessage('Valid email is required'),
      body('phone').optional().isString(),
      body('address').optional().isString(),
      body('company').optional().isString(),
      body('notes').optional().isString()
    ], (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }, controller.updateClient.bind(controller));


    // Endpoint para eliminar un cliente
    router.delete('/:id', controller.deleteClient.bind(controller));

    // Endpoint para eliminar múltiples clientes
    router.post('/delete-many', controller.deleteManyClients.bind(controller));

    return router;
}