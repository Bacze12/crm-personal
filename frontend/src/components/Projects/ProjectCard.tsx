import React from 'react';
import { Project } from '../../../../shared/types/project';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  clientName?: string;
}

const statusColors: Record<Project['status'], string> = {
  active: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  'on-hold': 'bg-yellow-100 text-yellow-800',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, clientName }) => (
  <div
    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col justify-between"
    onClick={() => onClick(project)}
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[project.status]}`}>{project.status}</span>
    </div>
    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
    {clientName && (
      <div className="text-xs text-gray-500 mb-1">Cliente: {clientName}</div>
    )}
    <div className="flex items-center justify-between mt-2">
      <span className="text-xs text-gray-500">Inicio: {typeof project.startDate === 'string' ? project.startDate.slice(0,10) : project.startDate.toLocaleDateString()}</span>
      <span className="text-xs text-gray-500">Avance: {project.progress}%</span>
    </div>
  </div>
);

export default ProjectCard;
