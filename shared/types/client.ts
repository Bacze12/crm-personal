export interface ProjectSummary {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  projects?: ProjectSummary[]; // Array of project summaries
  createdAt: string;
  updatedAt?: string;
}
