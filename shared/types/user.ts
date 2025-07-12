export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'staff' | 'client';
  avatar?: string;
  createdAt: Date;
}
