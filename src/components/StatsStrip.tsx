import { StatCard } from './StatCard';
import type { Stats } from '@/types';
import { Activity, AlertTriangle, Bot, CalendarCheck, DollarSign } from 'lucide-react';

interface StatsStripProps {
  stats: Stats;
}

export function StatsStrip({ stats }: StatsStripProps) {
  // Determine variant based on alert count
  const alertsVariant = stats.alertsActive > 20 ? 'error' : stats.alertsActive > 0 ? 'warning' : 'neutral';
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <StatCard
        label="Units Monitored"
        value={stats.unitsMonitored}
        variant="neutral"
        icon={<Activity className="w-4 h-4" />}
      />
      
      <StatCard
        label="Alerts Active"
        value={stats.alertsActive}
        variant={alertsVariant}
        icon={<AlertTriangle className="w-4 h-4" />}
      />
      
      <StatCard
        label="Agents Working"
        value={stats.agentsWorking}
        variant="info"
        icon={<Bot className="w-4 h-4" />}
      />
      
      <StatCard
        label="Appointments Today"
        value={stats.appointmentsBooked}
        variant="success"
        icon={<CalendarCheck className="w-4 h-4" />}
      />
      
      <StatCard
        label="Revenue Generated"
        value={stats.revenueGenerated}
        prefix="$"
        variant="success"
        icon={<DollarSign className="w-4 h-4" />}
      />
    </div>
  );
}
