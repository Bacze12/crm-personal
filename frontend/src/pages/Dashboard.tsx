import React, { useState, useEffect } from 'react'; // 1. Import useState and useEffect
import { Users, FolderOpen, Clock, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import Header from '../components/Layout/Header';
import StatsCard from '../components/Dashboard/StatsCard';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { mockTasks, mockInvoices } from '../data/mockData';
import { fetchProjects } from '../data/fetchProjects';
import { fetchClients } from '../data/fetchClients';

const Dashboard: React.FC = () => { // 2. Component is no longer 'async'

  // 3. Use state to store the fetched projects
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData); // 5. Update state with the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 6. Hide loading state once finished
      }
    };
    getProjects();
  }, []); // The empty array [] means this effect runs only once

  useEffect(() => {
    const getClients = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData); // 5. Update state with the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 6. Hide loading state once finished
      }
    };
    getClients();
  }, []); // The empty array [] means this effect runs only once

  // 7. Calculate your dashboard stats based on the state variable 'projects'
  const activeProjects = projects.filter(p => p.status === 'active');
  const activeProjectsCount = activeProjects.length;

  const activeClientsCount = clients.length;

  const pendingTasks = mockTasks.filter(t => t.status !== 'done').length;
  const monthlyRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);

  const recentTasks = mockTasks.slice(0, 5);
  // We'll use the 'activeProjects' state instead of mock data
  const recentProjects = activeProjects.slice(0, 3);

  // 8. Handle loading and error states for a better user experience
  if (loading) {
    return <div className="p-6">Cargando proyectos...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <Header title="Dashboard" />
      
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* StatsCard now uses the fetched count */}
        <StatsCard
          title="Proyectos Activos"
          value={activeProjectsCount}
          icon={FolderOpen}
          color="bg-blue-600"
          trend={{ value: 12, label: 'vs mes anterior' }}
        />
        <StatsCard
          title="Total Clientes"
          value={activeClientsCount}
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

        {/* Recent Projects now uses fetched data */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Proyectos Activos</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.length > 0 ? (
                recentProjects.map(project => (
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
                ))
              ) : (
                <p>No hay proyectos activos.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;