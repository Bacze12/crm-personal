import React from 'react';
import { Bell, Search, Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, actions }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-64 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </button>

            {/* Actions */}
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;