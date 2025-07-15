export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate?: string;
  budget?: number;
  team: string[]; // Array of user IDs
  progress: number; // Percentage of completion
  createdAt: string;
  updatedAt: string;
}
