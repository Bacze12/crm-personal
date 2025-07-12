import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import ClientModal from '../components/CRM/ClientModal';
import { mockClients as initialClients } from '../data/mockData';
import { Plus, Phone, Mail, Building } from 'lucide-react';
import Button from '../components/UI/Button';
import { Client } from '../types';

const CRM: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClient = () => {
    setSelectedClient(null);
    setIsCreating(true);
    setShowClientModal(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsCreating(false);
    setShowClientModal(true);
  };

  const handleSaveClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isCreating) {
      const newClient: Client = {
        ...clientData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setClients([...clients, newClient]);
    } else if (selectedClient) {
      const updatedClient: Client = {
        ...selectedClient,
        ...clientData,
        updatedAt: new Date(),
      };
      setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    }
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(c => c.id !== clientId));
  };
  const headerActions = (
    <Button onClick={handleCreateClient}>
      <Plus className="h-4 w-4 mr-2" />
      Nuevo Cliente
    </Button>
  );

  return (
    <div className="p-6">
      <Header title="CRM - Gestión de Clientes" actions={headerActions} />
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map(client => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Activo
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  {client.company}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {client.email}
                </div>
                {client.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {client.phone}
                  </div>
                )}
                {client.notes && (
                  <p className="text-sm text-gray-600 mt-2">{client.notes}</p>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                  Editar
                </Button>
                <Button size="sm" variant="outline">
                  Ver Proyectos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Client Modal */}
      <ClientModal
        client={selectedClient}
        isOpen={showClientModal}
        onClose={() => {
          setShowClientModal(false);
          setSelectedClient(null);
          setIsCreating(false);
        }}
        onSave={handleSaveClient}
        onDelete={handleDeleteClient}
      />
    </div>
  );
};

export default CRM;