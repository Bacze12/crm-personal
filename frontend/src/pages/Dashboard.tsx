import React from 'react';
import { Users, FolderOpen, Clock, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import Header from '../components/Layout/Header';
import StatsCard from '../components/Dashboard/StatsCard';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { mockProjects, mockTasks, mockClients, mockTimeEntries, mockInvoices } from '../data/mockData';

const Dashboard: React.FC = () => {
  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const totalClients = mockClients.length;
  const pendingTasks = mockTasks.filter(t => t.status !== 'done').length;
  const monthlyRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  const recentTasks = mockTasks.slice(0, 5);
  const recentProjects = mockProjects.slice(0, 3);

  return (
    <div className="p-6">
      <Header title="Dashboard" />
      
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Proyectos Activos"
          value={activeProjects}
          icon={FolderOpen}
          color="bg-blue-600"
          trend={{ value: 12, label: 'vs mes anterior' }}
        />
        <StatsCard
          title="Total Clientes"
          value={totalClients}
          icon={Users}
          color="bg-green-600"
          trend={{ value: 8, label: 'vs mes anterior' }}
        />
        <StatsCard
          title="Tareas Pendientes"
          value={pendingTasks}
          icon={Calendar}
          color="bg-yellow-600"
          trend={{ value: -5, label: 'vs semana anterior' }}
        />
        <StatsCard
          title="Ingresos del Mes"
          value={`€${monthlyRevenue.toLocaleString()}`}
          icon={CreditCard}
          color="bg-purple-600"
          trend={{ value: 15, label: 'vs mes anterior' }}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Tareas Recientes</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.project?.name}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'done' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      task.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Proyectos Activos</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map(project => (
                <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.client?.company}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;