import React, { useState, useEffect } from 'react';
import { Project } from '../../../../shared/types/project';
import Button from '../UI/Button';
import { Client } from '../../../../shared/types/client';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => void;
  clients: Client[]; // La lista de clientes ahora es una prop obligatoria
}

const initialForm = {
  name: '',
  description: '',
  clientId: '',
  status: 'active' as Project['status'],
  priority: 'medium' as Project['priority'],
  startDate: '',
  endDate: '',
  budget: 0,
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  clients // Ya no necesitamos `propClients`, usamos `clients` directamente
}) => {
  const [form, setForm] = useState(initialForm);

  // Este useEffect se mantiene para resetear el formulario cada vez que el modal se abre
  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'budget' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      ...form,
      team: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <form className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Nuevo Proyecto</h2>
        
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input 
            id="name"
            name="name" 
            type="text" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Nombre" 
            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea 
            id="description"
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            placeholder="Descripción" 
            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows={3}
            required 
          />
        </div>

        {/* Cliente */}
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
          <select 
            id="clientId"
            name="clientId" 
            value={form.clientId} 
            onChange={handleChange} 
            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          >
            <option value="" disabled>Selecciona un cliente</option>
            
              <option value="" disabled>No hay clientes disponibles</option>
            
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Estado y Prioridad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
            <select 
              id="status"
              name="status" 
              value={form.status} 
              onChange={handleChange} 
              className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
              <option value="on-hold">En pausa</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Prioridad *</label>
            <select 
              id="priority"
              name="priority" 
              value={form.priority} 
              onChange={handleChange} 
              className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>
        
        {/* Fechas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio *</label>
            <input 
              id="startDate"
              name="startDate" 
              type="date" 
              value={form.startDate} 
              onChange={handleChange} 
              className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de finalización</label>
            <input 
              id="endDate"
              name="endDate" 
              type="date" 
              value={form.endDate} 
              onChange={handleChange} 
              className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Presupuesto */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Presupuesto</label>
          <input 
            id="budget"
            name="budget" 
            type="number" 
            value={form.budget} 
            onChange={handleChange} 
            placeholder="0" 
            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        {/* Botones */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectModal;