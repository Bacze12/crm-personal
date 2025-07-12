import React, { useState } from 'react';
import { Plus, List, LayoutGrid, Calendar } from 'lucide-react';
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';
import KanbanBoard from '../components/Projects/KanbanBoard';
import TaskModal from '../components/Projects/TaskModal';
import CreateTaskModal from '../components/Projects/CreateTaskModal';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';

type ViewMode = 'kanban' | 'list' | 'calendar';

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleCreateTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleOpenTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };
  const headerActions = (
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
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Header title="Gestión de Proyectos" actions={headerActions} />
      </div>
      
      <div className="flex-1 p-6">
        {viewMode === 'kanban' && (
          <KanbanBoard
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onOpenTaskDetails={handleOpenTaskDetails}
          />
        )}
        
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Vista de Lista</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">Vista de lista en desarrollo...</p>
            </div>
          </div>
        )}
        
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Vista de Calendario</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">Vista de calendario en desarrollo...</p>
            </div>
          </div>
        )}
      </div>

      {/* Task Details Modal */}
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

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default Projects;