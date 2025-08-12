export class ProjectDTO {
  id?: string; // Optional for create operations
  name: string;
  description: string;
  clientId: string;
  status: 'active' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, optional
  budget?: number; // Optional budget
  team?: string[]; // Array of user IDs
  progress?: number; // Percentage of completion

  constructor(data: {
    id?: string;
    name: string;
    description: string;
    clientId: string;
    status: 'active' | 'completed' | 'on_hold';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    startDate: string;
    endDate?: string;
    budget?: number;
    team?: string[];
    progress?: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.clientId = data.clientId;
    this.status = data.status;
    this.priority = data.priority;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.budget = data.budget;
    this.team = data.team;
    this.progress = data.progress;
  }
}

export class ProjectUpdateDTO {
  name?: string;
  description?: string;
  clientId?: string;
  status?: 'active' | 'completed' | 'on_hold';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: string; // ISO date string, optional
  endDate?: string; // ISO date string, optional
  budget?: number; // Optional budget
  team?: string[]; // Array of user IDs, optional
  progress?: number; // Percentage of completion, optional

  constructor(data: {
    name?: string;
    description?: string;
    clientId?: string;
    status?: 'active' | 'completed' | 'on_hold';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    startDate?: string;
    endDate?: string;
    budget?: number;
    team?: string[];
    progress?: number;
  }) {
    this.name = data.name;
    this.description = data.description;
    this.clientId = data.clientId;
    this.status = data.status;
    this.priority = data.priority;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.budget = data.budget;
    this.team = data.team;
    this.progress = data.progress;
  }
}