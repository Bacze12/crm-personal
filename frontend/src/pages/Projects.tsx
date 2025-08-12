import React, { useState } from 'react';
import { Plus, List, LayoutGrid, Calendar } from 'lucide-react';

// Componentes y hooks
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';
import KanbanBoard from '../components/Projects/KanbanBoard';
import TaskModal from '../components/Projects/TaskModal';
import CreateTaskModal from '../components/Projects/CreateTaskModal';
import ProjectsOverview from '../components/Projects/ProjectsOverview';
import { useTasks } from '../hooks/useTasks'; // Importa el custom hook

// Tipos de datos
import { Task } from '../types';
import { Project } from '../../../shared/types/project';

// ---

type ViewMode = 'kanban' | 'list' | 'calendar';
type PageMode = 'overview' | 'project';

const Projects: React.FC = () => {
  // 1. Declarar todos los estados primero
  const [pageMode, setPageMode] = useState<PageMode>('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // 2. Llamar a los hooks
  const { tasks, loading, error } = useTasks();

  // 3. Realizar lógica de filtrado derivada de los estados
  const projectTasks = selectedProject
    ? tasks.filter(task => task.projectId === selectedProject.id)
    : [];
  
  // ---

  // Handlers para las operaciones de tareas. 
  // En un entorno real, estos deberían llamar a tu servicio/API.
  const handleUpdateTask = (updatedTask: Task) => {
    // Lógica para llamar a tu API y actualizar la tarea en la base de datos
    console.log('Actualizando tarea:', updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    // Lógica para llamar a tu API y eliminar la tarea
    console.log('Eliminando tarea con ID:', taskId);
  };

  const handleCreateTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Lógica para llamar a tu API, crear la tarea y obtener el nuevo objeto con el ID
    console.log('Creando nueva tarea:', newTaskData);
  };

  const handleOpenTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  // ---

  const headerActions = pageMode === 'project' && selectedProject ? (
    <div className="flex items-center space-x-2">
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('kanban')}
          className={`p-2 rounded-md ${viewMode === 'kanban' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => setViewMode('calendar')}
          className={`p-2 rounded-md ${viewMode === 'calendar' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
        >
          <Calendar className="h-4 w-4" />
        </button>
      </div>
      <Button onClick={() => setShowCreateModal(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Nueva Tarea
      </Button>
      <Button variant="outline" onClick={() => { setPageMode('overview'); setSelectedProject(null); }}>Volver a proyectos</Button>
    </div>
  ) : null;

  // ---

  // Manejo de estados de carga y error antes de renderizar el contenido
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Cargando tareas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        <p>Error al cargar las tareas: {error.message}</p>
      </div>
    );
  }

  // ---
  
  // Renderizado del componente principal
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Header 
          title={pageMode === 'overview' ? 'Proyectos' : selectedProject?.name || 'Proyecto'} 
          actions={headerActions} 
        />
      </div>
      <div className="flex-1 p-6">
        {pageMode === 'overview' && (
          <ProjectsOverview 
            onSelect={project => { setSelectedProject(project); setPageMode('project'); }} 
          />
        )}
        {pageMode === 'project' && selectedProject && (
          <>
            {viewMode === 'kanban' && (
              <KanbanBoard
                tasks={projectTasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onOpenTaskDetails={handleOpenTaskDetails}
              />
            )}
            {viewMode === 'list' && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900">Vista de Lista</h3>
                <p className="text-gray-600">Vista de lista en desarrollo...</p>
              </div>
            )}
            {viewMode === 'calendar' && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900">Vista de Calendario</h3>
                <p className="text-gray-600">Vista de calendario en desarrollo...</p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default Projects;