import type { User } from '../../../shared/types/user';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return response.json();
}

// Ejemplo de uso en un componente React
// import { useEffect, useState } from 'react';
// const [users, setUsers] = useState<User[]>([]);
// useEffect(() => {
//   fetchUsers().then(setUsers);
// }, []);
