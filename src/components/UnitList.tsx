import type { DoorUnit } from '@/types';
import { UnitRow } from './UnitRow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';

interface UnitListProps {
  units: DoorUnit[];
  selectedUnitId: string | null;
  onSelectUnit: (unitId: string | null) => void;
  className?: string;
}

export function UnitList({
  units,
  selectedUnitId,
  onSelectUnit,
  className,
}: UnitListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');

  const filteredUnits = useMemo(() => {
    let result = units;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        unit =>
          unit.id.toLowerCase().includes(query) ||
          unit.customerName.toLowerCase().includes(query) ||
          unit.model.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filter === 'critical') {
      result = result.filter(unit => unit.riskLevel === 'Critical' || unit.riskLevel === 'High');
    } else if (filter === 'warning') {
      result = result.filter(unit => unit.riskLevel === 'Medium');
    }

    // Sort by risk level (critical first)
    const riskOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    return result.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel]);
  }, [units, searchQuery, filter]);

  const criticalCount = units.filter(u => u.riskLevel === 'Critical' || u.riskLevel === 'High').length;
  const warningCount = units.filter(u => u.riskLevel === 'Medium').length;

  return (
    <div className={cn('flex flex-col h-full bg-dispatch-card rounded-xl border border-dispatch-border', className)}>
      {/* Header */}
      <div className="p-3 border-b border-dispatch-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-dispatch-text">Door Units</h3>
          <span className="text-xs text-dispatch-text-secondary font-mono">
            {units.length} total
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dispatch-text-tertiary" />
          <Input
            placeholder="Search units..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 bg-dispatch-bg border-dispatch-border text-dispatch-text placeholder:text-dispatch-text-tertiary text-sm focus:border-dispatch-accent-green"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-md transition-colors',
              filter === 'all'
                ? 'bg-dispatch-accent-green/20 text-dispatch-accent-green'
                : 'bg-dispatch-bg text-dispatch-text-secondary hover:text-dispatch-text'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-md transition-colors',
              filter === 'critical'
                ? 'bg-dispatch-status-red/20 text-dispatch-status-red'
                : 'bg-dispatch-bg text-dispatch-text-secondary hover:text-dispatch-text'
            )}
          >
            Critical ({criticalCount})
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-md transition-colors',
              filter === 'warning'
                ? 'bg-dispatch-status-amber/20 text-dispatch-status-amber'
                : 'bg-dispatch-bg text-dispatch-text-secondary hover:text-dispatch-text'
            )}
          >
            Warning ({warningCount})
          </button>
        </div>
      </div>

      {/* Unit List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {/* All Units Option */}
          <button
            onClick={() => onSelectUnit(null)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              'transition-all duration-200 border',
              selectedUnitId === null
                ? 'bg-dispatch-card-hover border-dispatch-accent-green/50'
                : 'bg-transparent border-transparent hover:bg-dispatch-card-hover hover:border-dispatch-border-accent'
            )}
          >
            <Filter className="w-4 h-4 text-dispatch-text-secondary" />
            <span className="text-sm font-medium text-dispatch-text">All Units</span>
          </button>

          <div className="h-px bg-dispatch-border my-2" />

          {/* Unit Rows */}
          {filteredUnits.map((unit) => (
            <UnitRow
              key={unit.id}
              unit={unit}
              isSelected={selectedUnitId === unit.id}
              onClick={() => onSelectUnit(unit.id)}
            />
          ))}

          {filteredUnits.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-dispatch-text-secondary">No units found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
