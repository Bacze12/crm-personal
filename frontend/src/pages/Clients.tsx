import React, { useEffect, useState } from 'react';
import { fetchClients } from '../data/fetchClients';
import type { Client } from '../../../shared/types/client';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .catch(() => setError('Error al obtener clientes'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <ul className="divide-y divide-gray-200">
        {clients.map((client) => (
          <li key={client.id} className="py-2">
            <span className="font-medium">{client.name}</span> - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
