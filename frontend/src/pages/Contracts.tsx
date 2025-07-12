import React from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import { mockContracts } from '../data/mockData';
import { Plus, FileText, Download, Send } from 'lucide-react';
import Button from '../components/UI/Button';
import { format } from 'date-fns';

const Contracts: React.FC = () => {
  const headerActions = (
    <div className="flex space-x-2">
      <Button variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Nueva Plantilla
      </Button>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Nuevo Contrato
      </Button>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'signed':
        return 'Firmado';
      case 'sent':
        return 'Enviado';
      case 'expired':
        return 'Expirado';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <Header title="Gestión de Contratos" actions={headerActions} />
      
      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contratos</p>
                <p className="text-2xl font-bold text-gray-900">{mockContracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Firmados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockContracts.filter(c => c.status === 'signed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockContracts.filter(c => c.status === 'sent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Borradores</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockContracts.filter(c => c.status === 'draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Contratos</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Envío
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Firma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contract.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.client?.company || 'Cliente'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.project?.name || 'Proyecto'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.sentDate ? format(contract.sentDate, 'dd/MM/yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.signedDate ? format(contract.signedDate, 'dd/MM/yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.expiryDate ? format(contract.expiryDate, 'dd/MM/yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                        {getStatusText(contract.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Enviar
                        </Button>
                      </div>
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

export default Contracts;