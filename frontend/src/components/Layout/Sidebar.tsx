import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FolderOpen, 
  Clock, 
  FileText, 
  CreditCard, 
  BookOpen,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'CRM', href: '/crm', icon: Users },
  { name: 'Proyectos', href: '/projects', icon: FolderOpen },
  { name: 'Tiempos', href: '/time', icon: Clock },
  { name: 'Facturación', href: '/billing', icon: CreditCard },
  { name: 'Contratos', href: '/contracts', icon: FileText },
  { name: 'Conocimiento', href: '/knowledge', icon: BookOpen },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">NexusOps</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
              alt={user?.name}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;