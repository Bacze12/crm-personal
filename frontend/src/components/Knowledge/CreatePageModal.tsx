import React, { useState } from 'react';
import { X, FileText, Database } from 'lucide-react';
import Button from '../UI/Button';

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { title: string; type: 'page' | 'database' }) => void;
}

const CreatePageModal: React.FC<CreatePageModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'page' | 'database'>('page');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate({ title: title.trim(), type });
      setTitle('');
      setType('page');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Crear Nueva Página</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título de la página"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('page')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    type === 'page'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Página</div>
                  <div className="text-xs text-gray-600">Documento con bloques</div>
                </button>

                <button
                  type="button"
                  onClick={() => setType('database')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    type === 'database'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Database className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Base de Datos</div>
                  <div className="text-xs text-gray-600">Tabla estructurada</div>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Crear {type === 'page' ? 'Página' : 'Base de Datos'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePageModal;