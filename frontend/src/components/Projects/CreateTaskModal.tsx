import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Task, Project } from '../../types';
import Button from '../UI/Button';
import { mockUsers, mockProjects } from '../../data/mockData';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  projectId?: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onCreate, projectId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: projectId || '',
    assigneeId: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    estimatedHours: '',
    tags: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title,
      description: formData.description || undefined,
      projectId: formData.projectId,
      assigneeId: formData.assigneeId || undefined,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : undefined,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
    };

    onCreate(newTask);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      projectId: projectId || '',
      assigneeId: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      estimatedHours: '',
      tags: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Crear Nueva Tarea</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título de la tarea"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción de la tarea"
              />
            </div>

            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proyecto *
              </label>
              <select
                required
                value={formData.projectId}
                onChange={(e) => handleChange('projectId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar proyecto</option>
                {mockProjects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            {/* Assignee and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asignado a
                </label>
                <select
                  value={formData.assigneeId}
                  onChange={(e) => handleChange('assigneeId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sin asignar</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridad
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            {/* Due Date and Estimated Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha límite
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horas estimadas
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.estimatedHours}
                  onChange={(e) => handleChange('estimatedHours', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiquetas
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="desarrollo, frontend, urgente (separar con comas)"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                Crear Tarea
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;