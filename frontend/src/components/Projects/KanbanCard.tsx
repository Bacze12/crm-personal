import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock, User, MoreHorizontal } from 'lucide-react';
import { Task } from '../../types';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';

interface KanbanCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onOpenDetails: (task: Task) => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const KanbanCard: React.FC<KanbanCardProps> = ({ task, onUpdate, onDelete, onOpenDetails, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 cursor-grabbing transform rotate-2">
        <CardContent task={task} onOpenDetails={onOpenDetails} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-grab hover:shadow-md transition-shadow',
        isSortableDragging && 'opacity-50'
      )}
    >
      <CardContent task={task} onOpenDetails={onOpenDetails} />
    </div>
  );
};

const CardContent: React.FC<{ task: Task; onOpenDetails: (task: Task) => void }> = ({ task, onOpenDetails }) => {
  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm leading-5 cursor-pointer hover:text-blue-600" onClick={() => onOpenDetails(task)}>{task.title}</h4>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={cn('px-2 py-1 text-xs font-medium rounded-full', priorityColors[task.priority])}>
            {task.priority}
          </span>
          
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          {task.dueDate && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {format(task.dueDate, 'MMM d')}
            </div>
          )}
          
          {task.estimatedHours && (
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {task.estimatedHours}h
            </div>
          )}
        </div>
        
        {task.assignee && (
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {task.assignee.name}
          </div>
        )}
      </div>
    </>
  );
};

export default KanbanCard;