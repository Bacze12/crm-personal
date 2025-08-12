import React, { useState } from 'react';
import type { Client } from '../../../../shared/types/client';
import Button from '../UI/Button';

interface ClientSlideOverProps {
  client?: Client;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Client>) => void;
}

const ClientSlideOver: React.FC<ClientSlideOverProps> = ({ client, isOpen, onClose, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<Client>>(client || {});

  React.useEffect(() => {
    if (client) {
      setForm(client);
    } else {
      setForm({});
  } setEditMode(false); // Reset edit mode when client changes
  },
  [client]);

  if (!isOpen || !client) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
    setEditMode(false);
  };

  return (
    <div className={`fixed inset-0 z-50 flex`}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
      {/* Slide-over */}
      <div className="relative ml-auto w-full max-w-md h-full bg-white shadow-xl flex flex-col transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Cliente</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          <div>
            <label className="block text-xs font-medium text-gray-500">Nombre</label>
            {editMode ? (
              <input name="name" value={form.name || ''} onChange={handleChange} className="w-full border rounded px-2 py-1 mt-1" />
            ) : (
              <div className="text-base text-gray-900 mt-1">{client.name}</div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Email</label>
            {editMode ? (
              <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border rounded px-2 py-1 mt-1" />
            ) : (
              <div className="text-base text-gray-900 mt-1">{client.email}</div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Teléfono</label>
            {editMode ? (
              <input name="phone" value={form.phone || ''} onChange={handleChange} className="w-full border rounded px-2 py-1 mt-1" />
            ) : (
              <div className="text-base text-gray-900 mt-1">{client.phone || <span className="text-gray-400">Sin teléfono</span>}</div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Dirección</label>
            {editMode ? (
              <input name="address" value={form.address || ''} onChange={handleChange} className="w-full border rounded px-2 py-1 mt-1" />
            ) : (
              <div className="text-base text-gray-900 mt-1">{client.address || <span className="text-gray-400">Sin dirección</span>}</div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Empresa</label>
            {editMode ? (
              <input name="company" value={form.company || ''} onChange={handleChange} className="w-full border rounded px-2 py-1 mt-1" />
            ) : (
              <div className="text-base text-gray-900 mt-1">{client.company || <span className="text-gray-400">Sin empresa</span>}</div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Notas</label>
            {editMode ? (
              <textarea name="notes" value={form.notes || ''} onChange={handleChange} className="w-full border rounded px-2 py-1 mt-1" />
            ) : (
              <div className="text-base text-gray-900 mt-1 whitespace-pre-line">{client.notes || <span className="text-gray-400">Sin notas</span>}</div>
            )}
          </div>
          {/* Proyectos relacionados */}
          {client.projects && client.projects.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Proyectos relacionados</label>
              <ul className="list-disc ml-4 text-xs text-gray-700">
                {client.projects.map(project =>
                  typeof project === 'object' && project !== null && 'id' in project && 'name' in project ? (
                    <li key={project.id}>Nombre: {project.name}</li>
                  ) : (
                    <li key={project as string}>Nombre: {project}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-between">
          {!editMode ? (
            <Button onClick={() => setEditMode(true)} variant="outline">Editar</Button>
          ) : (
            <>
              <Button onClick={handleSave} className="mr-2">Guardar</Button>
              <Button onClick={() => setEditMode(false)} variant="outline">Cancelar</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSlideOver;
