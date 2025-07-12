import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../UI/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    label: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className="text-sm text-gray-500 mt-1">
                <span className={trend.value > 0 ? 'text-green-600' : 'text-red-600'}>
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </span>
                {' '}{trend.label}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;