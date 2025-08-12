// Imports
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../../../../shared/types/task';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenTaskDetails: (task: Task) => void;
}

const columns = [
  { id: 'todo', title: 'Por Hacer', color: 'bg-gray-100' },
  { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-100' },
  { id: 'review', title: 'Revisión', color: 'bg-yellow-100' },
  { id: 'done', title: 'Completado', color: 'bg-green-100' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTask, onDeleteTask, onOpenTaskDetails }) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;
    
    // Check if dropping on a column
    const targetColumn = columns.find(col => col.id === overId);
    if (targetColumn) {
      const updatedTask = {
        ...activeTask,
        // 🐛 CORREGIDO: Usamos `statusId` en lugar de `status` para el estado
        statusId: targetColumn.id,
        updatedAt: new Date(),
      };
      onUpdateTask(updatedTask);
      setActiveTask(null);
      return;
    }

    // Check if reordering within the same column
    const overTask = tasks.find(t => t.id === overId);
    if (overTask && activeTask.statusId === overTask.statusId) {
      const columnTasks = tasks.filter(t => t.statusId === activeTask.statusId); // 🐛 CORREGIDO: Usamos `statusId`
      const oldIndex = columnTasks.findIndex(t => t.id === activeTask.id);
      const newIndex = columnTasks.findIndex(t => t.id === overId);
      
      if (oldIndex !== newIndex) {
        const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);
        console.log('Reordered tasks:', reorderedTasks);
      }
    }

    setActiveTask(null);
  };

  const getTasksByStatus = (statusId: string) => {
    return tasks.filter(task => task.statusId === statusId);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <KanbanColumn
              id={column.id}
              title={column.title}
              color={column.color}
              count={getTasksByStatus(column.id).length}
            >
              <SortableContext
                items={getTasksByStatus(column.id).map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {getTasksByStatus(column.id).map(task => (
                    <KanbanCard
                      key={task.id}
                      task={task}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                      onOpenDetails={onOpenTaskDetails}
                    />
                  ))}
                </div>
              </SortableContext>
            </KanbanColumn>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <KanbanCard
            task={activeTask}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onOpenDetails={onOpenTaskDetails}
            isDragging
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;