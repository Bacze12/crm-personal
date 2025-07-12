import React from 'react';
import Header from '../components/Layout/Header';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Settings as SettingsIcon, Users, Bell, Shield, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsCategories = [
    {
      title: 'Configuración General',
      icon: SettingsIcon,
      description: 'Configuración básica de la aplicación',
      settings: [
        'Nombre de la empresa',
        'Zona horaria',
        'Formato de fecha',
        'Moneda predeterminada',
      ],
    },
    {
      title: 'Usuarios y Permisos',
      icon: Users,
      description: 'Gestión de usuarios y roles',
      settings: [
        'Gestión de usuarios',
        'Roles y permisos',
        'Invitaciones',
        'Autenticación',
      ],
    },
    {
      title: 'Notificaciones',
      icon: Bell,
      description: 'Configuración de notificaciones',
      settings: [
        'Notificaciones por email',
        'Notificaciones push',
        'Recordatorios',
        'Alertas de vencimiento',
      ],
    },
    {
      title: 'Seguridad',
      icon: Shield,
      description: 'Configuración de seguridad',
      settings: [
        'Políticas de contraseña',
        'Autenticación de dos factores',
        'Sesiones activas',
        'Registro de auditoría',
      ],
    },
    {
      title: 'Personalización',
      icon: Palette,
      description: 'Personalización de la interfaz',
      settings: [
        'Tema de la aplicación',
        'Colores corporativos',
        'Logo de la empresa',
        'Plantillas personalizadas',
      ],
    },
  ];

  return (
    <div className="p-6">
      <Header title="Configuración" />
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {settingsCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <div className="flex items-center">
                <category.icon className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.settings.map((setting) => (
                  <div key={setting} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-900">{setting}</span>
                    <Button size="sm" variant="outline">
                      Configurar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;