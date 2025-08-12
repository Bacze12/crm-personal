import { useState, useEffect } from 'react';
import { fetchTasks } from '../data/fetchTask';
import { Task } from '../../../shared/types/task';

interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then((fetchedTasks) => {
        setTasks(fetchedTasks);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { tasks, loading, error };
}