import type { Project } from '../../../shared/types/project';

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects', { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
}
export async function createProject(data: Partial<Project>): Promise<Project> {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error creating project: ${response.statusText}`);
    }
    const project: Project = await response.json();
    return {
      ...project,
      startDate: new Date(project.startDate).toISOString(),
      endDate: project.endDate ? new Date(project.endDate).toISOString() : undefined,
    };
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
}
