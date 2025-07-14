export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
