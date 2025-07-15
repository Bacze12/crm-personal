import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import ClientModal from '../components/CRM/ClientModal';
import ClientSlideOver from '../components/CRM/ClientSlideOver';
import { Client } from '../../../shared/types/client';
import { Plus, Phone, Mail, Building, X, Trash2 } from 'lucide-react';
import Button from '../components/UI/Button';
import { fetchClients, createClient, deleteManyClients } from '../data/fetchClients';

const CRM: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSlideOver, setShowSlideOver] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Multi-delete handlers
  const handleToggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelectedToDelete([]);
  };

  const handleSelectToDelete = (id: string) => {
    setSelectedToDelete(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(cid => cid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteManyClients(selectedToDelete);
      setClients(clients.filter(c => !selectedToDelete.includes(c.id)));
    } catch (e) {
      setError('Error al eliminar clientes');
    }
    setSelectedToDelete([]);
    setShowConfirmModal(false);
    setDeleteMode(false);
  };

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
    console.log('Editar click', client);
    setSelectedClient(client);
    setIsCreating(false);
    setShowSlideOver(true);
    setTimeout(() => {
      console.log('showSlideOver:', showSlideOver, 'selectedClient:', selectedClient);
    }, 100);
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
    <div className="flex gap-2">
      <Button onClick={handleCreateClient}>
        <Plus className="h-4 w-4 mr-2" />
        Nuevo Cliente
      </Button>
      <Button
        variant={deleteMode ? 'destructive' : 'outline'}
        onClick={handleToggleDeleteMode}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        {deleteMode ? 'Cancelar' : 'Eliminar'}
      </Button>
      {deleteMode && selectedToDelete.length > 0 && (
        <Button
          variant="destructive"
          onClick={() => setShowConfirmModal(true)}
        >
          <X className="h-4 w-4 mr-2" />
          Eliminar ({selectedToDelete.length})
        </Button>
      )}
    </div>
  );

  if (loading) return <div className="p-6">Cargando clientes...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <Header title="CRM - Gestión de Clientes" actions={headerActions} />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map(client => {
          const isSelected = selectedToDelete.includes(client.id);
          return (
            <Card
              key={client.id}
              className={`hover:shadow-lg transition-shadow relative
                ${deleteMode ? (isSelected ? 'opacity-100 shadow-lg shadow-red-200 cursor-pointer' : 'opacity-50 cursor-pointer') : ''}
              `}
            >
              {deleteMode && (
                <div
                  className="absolute inset-0 z-0"
                  style={{ borderRadius: 12 }}
                  onClick={(e: React.MouseEvent) => {
                    if ((e.target as HTMLElement).closest('.select-x-btn')) return;
                    handleSelectToDelete(client.id);
                  }}
                />
              )}
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
                  {!deleteMode && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Proyectos
                      </Button>
                    </>
                  )}
                </div>
                {deleteMode && isSelected && (
                  <button
                    type="button"
                    className={`select-x-btn absolute top-2 right-2 z-10 focus:outline-none bg-transparent p-1 rounded-full hover:bg-red-100`}
                    tabIndex={-1}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectToDelete(client.id);
                    }}
                  >
                    <X className={`w-5 h-5 text-red-500`} />
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      {/* Modal de confirmación de eliminación */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">¿Eliminar clientes seleccionados?</h2>
            <p className="mb-6">Esta acción no se puede deshacer. ¿Estás seguro de eliminar {selectedToDelete.length} cliente(s)?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}

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