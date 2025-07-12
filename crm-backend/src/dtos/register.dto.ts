export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'client';
  avatar?: string;
}