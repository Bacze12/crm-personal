import React, { useState } from 'react';
import { X, Save, Trash2, Building, Mail, Phone, MapPin } from 'lucide-react';
import { Client } from '../../types';
import Button from '../UI/Button';
import { format } from 'date-fns';

interface ClientModalProps {
  client?: Client;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDelete?: (clientId: string) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ client, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    company: client?.company || '',
    address: client?.address || '',
    notes: client?.notes || '',
  });

  if (!isOpen) return null;

  const isEditing = !!client;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (client && onDelete && window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      onDelete(client.id);
      onClose();
    }
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
            <h3 className="text-lg font-medium text-gray-900">
              {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h3>
            <div className="flex items-center space-x-2">
              {isEditing && onDelete && (
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del contacto"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@empresa.com"
              />
            </div>

            {/* Phone and Company */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+34 600 123 456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 inline mr-1" />
                  Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de la empresa"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 inline mr-1" />
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dirección completa"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notas adicionales sobre el cliente"
              />
            </div>

            {/* Timestamps for editing */}
            {isEditing && client && (
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-4 border-t">
                <div>
                  <span className="font-medium">Creado:</span> {format(client.createdAt, 'dd/MM/yyyy HH:mm')}
                </div>
                <div>
                  <span className="font-medium">Actualizado:</span> {format(client.updatedAt, 'dd/MM/yyyy HH:mm')}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Actualizar' : 'Crear'} Cliente
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;