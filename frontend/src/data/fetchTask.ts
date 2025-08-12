import type { Task } from "../../../shared/types/task";

export async function fetchTasks(): Promise<Task[]>{
    try{
        const response = await fetch('/api/tasks', { credentials:'include'});
        if (!response.ok) {
            throw new Error(`Error fetching tasks: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
    }
}

