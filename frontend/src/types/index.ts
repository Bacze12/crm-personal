export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'client';
  avatar?: string;
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  client?: Client;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  endDate?: Date;
  budget?: number;
  team: string[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  project?: Project;
  assigneeId?: string;
  assignee?: User;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  userId: string;
  user?: User;
  taskId: string;
  task?: Task;
  projectId: string;
  project?: Project;
  description: string;
  hours: number;
  date: Date;
  billable: boolean;
  hourlyRate?: number;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  clientId: string;
  client?: Client;
  projectId?: string;
  project?: Project;
  invoiceNumber: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: Date;
  dueDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Contract {
  id: string;
  clientId: string;
  client?: Client;
  projectId?: string;
  project?: Project;
  title: string;
  content: string;
  templateId?: string;
  status: 'draft' | 'sent' | 'signed' | 'expired' | 'cancelled';
  sentDate?: Date;
  signedDate?: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeBase {
  id: string;
  title: string;
  content: Block[];
  parentId?: string;
  type: 'page' | 'database';
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: string;
  type: 'paragraph' | 'heading' | 'list' | 'code' | 'image' | 'database';
  content: string;
  properties?: Record<string, any>;
  children?: Block[];
}

export interface DatabaseField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox' | 'relation';
  options?: string[];
}

export interface DatabaseRecord {
  id: string;
  databaseId: string;
  properties: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}