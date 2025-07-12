import type { Client } from '../../../shared/types/client';

export async function fetchClients(): Promise<Client[]> {
  const response = await fetch('/api/clients', { credentials: 'include' });
  if (!response.ok) throw new Error('Error al obtener clientes');
  return response.json();
}

export async function createClient(data: Partial<Client>) {
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al crear cliente');
  return response.json();
}
