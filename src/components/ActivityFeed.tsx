import type { FeedEntry } from '@/types';
import { FeedCard } from './FeedCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Filter, RefreshCw, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ActivityFeedProps {
  entries: FeedEntry[];
  onRefresh?: () => void;
  onUpdateEntry?: (updatedEntry: FeedEntry) => void;
  className?: string;
}

type FilterType = 'all' | 'alerts' | 'outreach' | 'bookings' | 'followups';
type StatusFilter = 'all' | 'pending' | 'completed' | 'failed';


export function ActivityFeed({
  entries,
  onRefresh,
  onUpdateEntry,
  className,
}: ActivityFeedProps) {
  const [actionFilter, setActionFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Items requiring human action — always shown at top regardless of filters
  const actionRequired = entries.filter(
    (e) =>
      (e.actionType === 'Alert Triage' && e.outcome === 'warning') ||
      (e.actionType === 'Proactive Outreach' && e.outcome === 'pending')
  );

  const isFiltering = actionFilter !== 'all' || statusFilter !== 'all';

  const filteredEntries = entries.filter((entry) => {
    const isActionRequired =
      (entry.actionType === 'Alert Triage' && entry.outcome === 'warning') ||
      (entry.actionType === 'Proactive Outreach' && entry.outcome === 'pending');

    // In default view, hide action-required from main feed (they're pinned above)
    // When a filter is active, include them so filters actually work
    if (isActionRequired && !isFiltering) return false;

    if (actionFilter !== 'all') {
      const actionMap: Record<FilterType, string[]> = {
        all: [],
        alerts: ['Sensor Alert', 'Alert Triage', 'Risk Assessment'],
        outreach: ['Proactive Outreach'],
        bookings: ['Booking Confirmation', 'Appointment Booked'],
        followups: ['Follow-up', 'Post-Repair Check', 'Reminder Sent'],
      };
      if (!actionMap[actionFilter].includes(entry.actionType)) return false;
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'pending' && entry.outcome !== 'pending') return false;
      if (statusFilter === 'completed' && entry.outcome !== 'success') return false;
      if (statusFilter === 'failed' && entry.outcome !== 'error') return false;
    }

    return true;
  });

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'alerts', label: 'Alerts' },
    { key: 'outreach', label: 'Outreach' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'followups', label: 'Follow-ups' },
  ];

  const statusButtons: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All Status' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'failed', label: 'Failed' },
  ];

  return (
    <div className={cn('flex flex-col h-full bg-dispatch-card rounded-xl border border-dispatch-border', className)}>
      {/* Header */}
      <div className="p-4 border-b border-dispatch-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-dispatch-accent-green" />
            <h3 className="text-sm font-semibold text-dispatch-text">Agent Activity Feed</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-dispatch-text-secondary font-mono">
              {filteredEntries.length} entries
            </span>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1.5 rounded-md hover:bg-dispatch-card-hover text-dispatch-text-secondary hover:text-dispatch-text transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {filterButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActionFilter(key)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  actionFilter === key
                    ? 'bg-dispatch-accent-green/20 text-dispatch-accent-green'
                    : 'bg-dispatch-bg text-dispatch-text-secondary hover:text-dispatch-text'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {statusButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  statusFilter === key
                    ? 'bg-dispatch-status-blue/20 text-dispatch-status-blue'
                    : 'bg-dispatch-bg text-dispatch-text-secondary hover:text-dispatch-text'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">

          {/* Pinned: Requires Action queue */}
          {actionRequired.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 px-1">
                <AlertTriangle className="w-3.5 h-3.5 text-dispatch-status-amber" />
                <span className="text-xs font-semibold text-dispatch-status-amber uppercase tracking-wider">
                  Requires Your Action
                </span>
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded bg-dispatch-status-amber text-dispatch-bg">
                  {actionRequired.length}
                </span>
              </div>
              <div className="space-y-2 rounded-lg border border-dispatch-status-amber/30 bg-dispatch-status-amber/5 p-2">
                {actionRequired.map((entry) => (
                  <FeedCard key={entry.id} entry={entry} onUpdateEntry={onUpdateEntry} />
                ))}
              </div>
            </div>
          )}

          {/* Agent Activity log */}
          {filteredEntries.length > 0 && (
            <div>
              {actionRequired.length > 0 && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-xs font-semibold text-dispatch-text-secondary uppercase tracking-wider">
                    Agent Activity
                  </span>
                </div>
              )}
              <div className="space-y-3">
                {filteredEntries.map((entry) => (
                  <FeedCard key={entry.id} entry={entry} onUpdateEntry={onUpdateEntry} />
                ))}
              </div>
            </div>
          )}

          {filteredEntries.length === 0 && actionRequired.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-dispatch-text-secondary mb-1">No activity entries found</p>
              <p className="text-xs text-dispatch-text-tertiary">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
