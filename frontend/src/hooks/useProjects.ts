import { useState, useEffect } from 'react';
import { fetchProjects, createProject as createProjectApi } from '../data/fetchProjects';
import { fetchClients } from '../data/fetchClients';
import { Project } from '../../../shared/types/project';
import { Client } from '../../../shared/types/client';

interface UseProjectsResult {
  projects: Project[];
  clients: Client[];
  loading: boolean;
  error: Error | null;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => Promise<void>;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // useEffect para cargar los datos iniciales
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProjects(), fetchClients()])
      .then(([fetchedProjects, fetchedClients]) => {
        setProjects(fetchedProjects);
        setClients(fetchedClients);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // El array de dependencias vacío asegura que solo se ejecute una vez al montar el componente

  // Función para crear un nuevo proyecto y actualizar el estado
  const createProject = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => {
    try {
      const newProject = await createProjectApi(data);
      // Aquí actualizamos el estado con el nuevo proyecto sin necesidad de recargar todo
      setProjects((prevProjects) => [newProject, ...prevProjects]);
    } catch (err) {
      console.error('Error creating project:', err);
      // Puedes manejar el error como prefieras, por ejemplo, con un estado de error en el hook.
      throw err;
    }
  };

  return { projects, clients, loading, error, createProject };
}