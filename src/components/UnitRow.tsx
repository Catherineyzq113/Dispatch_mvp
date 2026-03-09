import type { DoorUnit } from '@/types';
import { cn } from '@/lib/utils';

interface UnitRowProps {
  unit: DoorUnit;
  isSelected: boolean;
  onClick: () => void;
}

export function UnitRow({ unit, isSelected, onClick }: UnitRowProps) {
  const getStatusDot = () => {
    switch (unit.status) {
      case 'error':
        return <span className="w-2.5 h-2.5 rounded-full bg-dispatch-status-red animate-pulse" />;
      case 'warning':
        return <span className="w-2.5 h-2.5 rounded-full bg-dispatch-status-amber" />;
      case 'pending':
        return <span className="w-2.5 h-2.5 rounded-full bg-dispatch-status-blue" />;
      case 'success':
      default:
        return <span className="w-2.5 h-2.5 rounded-full bg-dispatch-status-green" />;
    }
  };

  const getRiskBadge = () => {
    const colors = {
      Critical: 'bg-dispatch-status-red/20 text-dispatch-status-red border-dispatch-status-red/30',
      High: 'bg-dispatch-status-amber/20 text-dispatch-status-amber border-dispatch-status-amber/30',
      Medium: 'bg-dispatch-status-amber/10 text-dispatch-status-amber/80 border-dispatch-status-amber/20',
      Low: 'bg-dispatch-status-green/10 text-dispatch-status-green border-dispatch-status-green/20',
    };

    return (
      <span className={cn(
        'px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded border',
        colors[unit.riskLevel]
      )}>
        {unit.riskLevel}
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
        'transition-all duration-200 border',
        isSelected 
          ? 'bg-dispatch-card-hover border-dispatch-accent-green/50' 
          : 'bg-transparent border-transparent hover:bg-dispatch-card-hover hover:border-dispatch-border-accent'
      )}
    >
      {/* Status Dot */}
      <div className="flex-shrink-0">
        {getStatusDot()}
      </div>

      {/* Unit Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-dispatch-text font-mono">
            {unit.id}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-dispatch-text-secondary truncate">
            {unit.model}
          </span>
          <span className="text-xs text-dispatch-text-tertiary">
            {unit.installYear}
          </span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className="flex-shrink-0">
        {getRiskBadge()}
      </div>
    </button>
  );
}
