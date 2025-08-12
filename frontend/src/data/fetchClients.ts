
import type { Client } from '../../../shared/types/client';
export async function deleteManyClients(ids: string[]): Promise<{ deleted: string[]; notFound: string[] }> {
  const response = await fetch('/api/clients/delete-many', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ids })
  });
  if (!response.ok) throw new Error('Error al eliminar clientes');
  return response.json();
}

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

export async function updateClient(id: string, data: Partial<Client>) {
  const response = await fetch(`/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar cliente');
  return response.json();
}
