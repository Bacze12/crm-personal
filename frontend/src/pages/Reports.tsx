import React from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="p-6">
      <Header title="Reportes y Análisis" />
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Ingresos Mensuales</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Gráfico de ingresos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Progreso de Proyectos</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Gráfico de progreso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Rendimiento del Equipo</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Métricas del equipo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Tracking */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Tiempo por Proyecto</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Análisis de tiempo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;