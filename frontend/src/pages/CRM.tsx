import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import ClientModal from '../components/CRM/ClientModal';
import ClientSlideOver from '../components/CRM/ClientSlideOver';
import { Client } from '../../../shared/types/client';
import { Plus, Phone, Mail, Building } from 'lucide-react';
import Button from '../components/UI/Button';
import { fetchClients, createClient } from '../data/fetchClients';

const CRM: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSlideOver, setShowSlideOver] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchClients()
      .then(setClients)
      .catch(() => setError('Error al obtener clientes'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateClient = () => {
    setSelectedClient(undefined);
    setIsCreating(true);
    setShowClientModal(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsCreating(false);
    setShowSlideOver(true);
  };

  const handleSaveClient = async (clientData: Partial<Client>) => {
    if (isCreating) {
      try {
        const newClient = await createClient(clientData);
        setClients([...clients, newClient]);
      } catch (e) {
        setError('Error al crear cliente');
      }
    } else if (selectedClient) {
      // Aquí podrías agregar lógica para actualizar el cliente usando la API si tienes endpoint
      const updatedClient: Client = {
        ...selectedClient,
        ...clientData,
        updatedAt: new Date().toISOString(),
      };
      setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    }
  };

  const handleDeleteClient = (clientId: string) => {
    // Aquí podrías agregar lógica para eliminar el cliente usando la API si tienes endpoint
    setClients(clients.filter(c => c.id !== clientId));
  };

  const headerActions = (
    <Button onClick={handleCreateClient}>
      <Plus className="h-4 w-4 mr-2" />
      Nuevo Cliente
    </Button>
  );

  if (loading) return <div className="p-6">Cargando clientes...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

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

      {/* Client Modal para crear */}
      <ClientModal
        client={selectedClient}
        isOpen={showClientModal}
        onClose={() => {
          setShowClientModal(false);
          setSelectedClient(undefined);
          setIsCreating(false);
        }}
        onSave={handleSaveClient}
        onDelete={handleDeleteClient}
      />

      {/* Slide-over para editar */}
      <ClientSlideOver
        client={selectedClient}
        isOpen={showSlideOver}
        onClose={() => {
          setShowSlideOver(false);
          setSelectedClient(undefined);
        }}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default CRM;