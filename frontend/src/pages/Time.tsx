import React from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { mockTimeEntries } from '../data/mockData';
import { Plus, Clock, Calendar, DollarSign } from 'lucide-react';
import Button from '../components/UI/Button';
import { format } from 'date-fns';

const Time: React.FC = () => {
  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const billableHours = mockTimeEntries.filter(entry => entry.billable).reduce((sum, entry) => sum + entry.hours, 0);
  const totalRevenue = mockTimeEntries.reduce((sum, entry) => sum + (entry.hours * (entry.hourlyRate || 0)), 0);

  const headerActions = (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Registrar Tiempo
    </Button>
  );

  return (
    <div className="p-6">
      <Header title="Registro de Tiempos" actions={headerActions} />
      
      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Horas</p>
                <p className="text-2xl font-bold text-gray-900">{totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas Facturables</p>
                <p className="text-2xl font-bold text-gray-900">{billableHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">€{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries Table */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Registros de Tiempo</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facturable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarifa
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTimeEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(entry.date, 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.user?.name || 'Usuario'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.project?.name || 'Proyecto'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.hours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        entry.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {entry.billable ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      €{entry.hourlyRate || 0}/h
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Time;