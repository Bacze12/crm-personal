import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../utils/cn';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  count: number;
  children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, color, count, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col h-full">
      <div className={cn('p-3 rounded-t-lg', color)}>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span className="text-sm text-gray-600">{count} tareas</span>
      </div>
      
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-3 bg-gray-50 rounded-b-lg min-h-96 transition-colors',
          isOver && 'bg-blue-50 border-2 border-blue-300 border-dashed'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default KanbanColumn;