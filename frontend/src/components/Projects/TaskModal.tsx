import React, { useState } from 'react';
import { X, Calendar, Clock, User, Tag, Trash2, Save } from 'lucide-react';
import { Task, User as UserType } from '../../types';
import { cn } from '../../utils/cn';
import Button from '../UI/Button';
import { format } from 'date-fns';
import { mockUsers } from '../../data/mockData';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  review: 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate({
      ...editedTask,
      updatedAt: new Date(),
    });
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleFieldChange = (field: keyof Task, value: any) => {
    setEditedTask(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-medium text-gray-900">
                {editMode ? 'Editar Tarea' : 'Detalles de Tarea'}
              </h3>
              <span className={cn('px-2 py-1 text-xs font-medium rounded-full', statusColors[task.status])}>
                {task.status}
              </span>
              <span className={cn('px-2 py-1 text-xs font-medium rounded-full', priorityColors[task.priority])}>
                {task.priority}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {editMode ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Guardar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
              {editMode ? (
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900">{task.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              {editMode ? (
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{task.description || 'Sin descripción'}</p>
              )}
            </div>

            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto</label>
              <p className="text-gray-900">{task.project?.name}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Assignee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Asignado a
                </label>
                {editMode ? (
                  <select
                    value={editedTask.assigneeId || ''}
                    onChange={(e) => handleFieldChange('assigneeId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sin asignar</option>
                    {mockUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{task.assignee?.name || 'Sin asignar'}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                {editMode ? (
                  <select
                    value={editedTask.status}
                    onChange={(e) => handleFieldChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="todo">Por Hacer</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="review">Revisión</option>
                    <option value="done">Completado</option>
                  </select>
                ) : (
                  <p className="text-gray-900 capitalize">{task.status}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                {editMode ? (
                  <select
                    value={editedTask.priority}
                    onChange={(e) => handleFieldChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                ) : (
                  <p className="text-gray-900 capitalize">{task.priority}</p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Fecha límite
                </label>
                {editMode ? (
                  <input
                    type="date"
                    value={editedTask.dueDate ? format(editedTask.dueDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => handleFieldChange('dueDate', e.target.value ? new Date(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {task.dueDate ? format(task.dueDate, 'dd/MM/yyyy') : 'Sin fecha límite'}
                  </p>
                )}
              </div>

              {/* Estimated Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Horas estimadas
                </label>
                {editMode ? (
                  <input
                    type="number"
                    value={editedTask.estimatedHours || ''}
                    onChange={(e) => handleFieldChange('estimatedHours', e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{task.estimatedHours || 0}h</p>
                )}
              </div>

              {/* Actual Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horas reales</label>
                <p className="text-gray-900">{task.actualHours || 0}h</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="h-4 w-4 inline mr-1" />
                Etiquetas
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={editedTask.tags.join(', ')}
                  onChange={(e) => handleFieldChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                  placeholder="Separar con comas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {task.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Creado:</span> {format(task.createdAt, 'dd/MM/yyyy HH:mm')}
              </div>
              <div>
                <span className="font-medium">Actualizado:</span> {format(task.updatedAt, 'dd/MM/yyyy HH:mm')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;