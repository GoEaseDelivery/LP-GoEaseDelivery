import { cn } from '../../../app/utils/cn';
import { formatCurrency } from '../../../app/utils/formatCurrency';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  percentageChange?: number;
  isCurrency?: boolean;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  percentageChange, 
  isCurrency 
}: StatsCardProps) {
  const formattedValue = isCurrency ? formatCurrency(Number(value)) : value;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{formattedValue}</p>
          {percentageChange !== undefined && (
            <p className={cn(
              'text-sm mt-1',
              percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}