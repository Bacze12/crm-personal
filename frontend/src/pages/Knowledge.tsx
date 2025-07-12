import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { Plus, BookOpen, Database, FileText, Edit } from 'lucide-react';
import Button from '../components/UI/Button';
import CreatePageModal from '../components/Knowledge/CreatePageModal';
import PageEditor from '../components/Knowledge/PageEditor';
import { KnowledgeBase, Block } from '../types';

const Knowledge: React.FC = () => {
  const [pages, setPages] = useState<KnowledgeBase[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<KnowledgeBase | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleCreatePage = (data: { title: string; type: 'page' | 'database' }) => {
    const newPage: KnowledgeBase = {
      id: Date.now().toString(),
      title: data.title,
      content: [],
      type: data.type,
      tags: [],
      createdBy: '1', // Current user
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPages([...pages, newPage]);
    
    // Open editor for new page
    setSelectedPage(newPage);
    setShowEditor(true);
  };

  const handleEditPage = (page: KnowledgeBase) => {
    setSelectedPage(page);
    setShowEditor(true);
  };

  const handleSavePage = (title: string, content: Block[]) => {
    if (selectedPage) {
      const updatedPage = {
        ...selectedPage,
        title,
        content,
        updatedAt: new Date(),
      };
      setPages(pages.map(p => p.id === selectedPage.id ? updatedPage : p));
      setSelectedPage(updatedPage);
    }
  };
  const headerActions = (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setShowCreateModal(true)}>
        <Database className="h-4 w-4 mr-2" />
        Nueva Base de Datos
      </Button>
      <Button onClick={() => setShowCreateModal(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Nueva Página
      </Button>
    </div>
  );

  // Show editor if a page is selected
  if (showEditor && selectedPage) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowEditor(false)}>
                ← Volver
              </Button>
              <div className="flex items-center space-x-2">
                {selectedPage.type === 'page' ? (
                  <FileText className="h-5 w-5 text-blue-600" />
                ) : (
                  <Database className="h-5 w-5 text-green-600" />
                )}
                <span className="text-sm text-gray-600 capitalize">{selectedPage.type}</span>
              </div>
            </div>
            <Button variant="outline">
              Compartir
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageEditor
            title={selectedPage.title}
            content={selectedPage.content}
            onTitleChange={(title) => handleSavePage(title, selectedPage.content)}
            onContentChange={(content) => handleSavePage(selectedPage.title, content)}
          />
        </div>
      </div>
    );
  }
  const mockPages = [
    {
      id: '1',
      title: 'Documentación de API',
      type: 'page',
      lastModified: new Date(),
      author: 'Juan Pérez',
    },
    {
      id: '2',
      title: 'Guía de Desarrollo',
      type: 'page',
      lastModified: new Date(),
      author: 'María García',
    },
    {
      id: '3',
      title: 'Base de Datos de Recursos',
      type: 'database',
      lastModified: new Date(),
      author: 'Carlos López',
    },
  ];

  return (
    <div className="p-6">
      <Header title="Gestión del Conocimiento" actions={headerActions} />
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowCreateModal(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Crear Página
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowCreateModal(true)}>
                <Database className="h-4 w-4 mr-2" />
                Crear Base de Datos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Buscar Documentación
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Pages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Mis Páginas</h3>
          </CardHeader>
          <CardContent>
            {pages.length > 0 ? (
              <div className="space-y-4">
                {pages.map(page => (
                  <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center" onClick={() => handleEditPage(page)}>
                      {page.type === 'page' ? (
                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      ) : (
                        <Database className="h-5 w-5 text-green-600 mr-3" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{page.title}</h4>
                        <p className="text-sm text-gray-600">
                          Actualizado • {page.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleEditPage(page)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No tienes páginas creadas aún</p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primera Página
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Page Modal */}
      <CreatePageModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePage}
      />
    </div>
  );
};

export default Knowledge;