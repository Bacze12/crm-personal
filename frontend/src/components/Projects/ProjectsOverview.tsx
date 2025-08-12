import React, { useState } from 'react';
import { Project } from '../../../../shared/types/project';
import ProjectCard from '../../components/Projects/ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import Button from '../UI/Button';
import { useProjects } from '../../hooks/useProjects';

const ProjectsOverview: React.FC<{ onSelect: (project: Project) => void }> = ({ onSelect }) => {
  const { projects, clients, loading, error, createProject } = useProjects();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreateProject = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => {
      try {
        await createProject(data);
      } catch (error) {
        console.error('Error creating project:', error);
      }
    };

  if (loading) {
    return <div>Cargando proyectos...</div>;
  }
  if (error) {
    return <div>Error al cargar proyectos: {error.message}</div>;
  }

  

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowCreateModal(true)}>
          Nuevo Proyecto
        </Button>
      </div>
      {loading ? (
        <div>Cargando proyectos y clientes...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map(project => {
              const client = clients.find((c) => c.id === project.clientId);
              return (
                <ProjectCard key={project.id} project={project} onClick={onSelect} clientName={client?.name} />
              );
            })}
          </div>
          <CreateProjectModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateProject}
            clients={clients}
          />
        </>
      )}
    </div>
  );
};

export default ProjectsOverview;
