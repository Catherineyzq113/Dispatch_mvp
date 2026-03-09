import { useState } from 'react';
import type { FeedEntry } from '@/types';
import { TriggerContext } from './TriggerContext';
import { ConversationThread } from './ConversationThread';
import { OperatorActionBar } from './OperatorActionBar';
import { AlertTriageActionBar } from './AlertTriageActionBar';
import { cn } from '@/lib/utils';
import { Bot, ChevronDown, ChevronUp, Clock, Zap, Sparkles } from 'lucide-react';

interface FeedCardProps {
  entry: FeedEntry;
  onUpdateEntry?: (updatedEntry: FeedEntry) => void;
}

export function FeedCard({ entry, onUpdateEntry }: FeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localEntry, setLocalEntry] = useState(entry);
  const [isManualMode, setIsManualMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Use local entry if we have chat updates, otherwise use props
  const currentEntry = localEntry.conversation.length > entry.conversation.length ? localEntry : entry;

  const getStatusColor = () => {
    switch (currentEntry.outcome) {
      case 'success':
        return 'bg-dispatch-status-green';
      case 'warning':
        return 'bg-dispatch-status-amber';
      case 'error':
        return 'bg-dispatch-status-red';
      case 'pending':
        return 'bg-dispatch-status-blue';
      default:
        return 'bg-dispatch-text-tertiary';
    }
  };

  const getOutcomeBadgeStyle = () => {
    // Make pending/outcome badges more distinct
    switch (currentEntry.outcome) {
      case 'success':
        return 'bg-dispatch-status-green/20 text-dispatch-status-green border-dispatch-status-green/30';
      case 'warning':
        return 'bg-dispatch-status-amber/20 text-dispatch-status-amber border-dispatch-status-amber/30';
      case 'error':
        return 'bg-dispatch-status-red/20 text-dispatch-status-red border-dispatch-status-red/30';
      case 'pending':
        // More distinct blue for pending/awaiting
        return 'bg-dispatch-status-blue/30 text-dispatch-status-blue border-dispatch-status-blue/50 font-semibold';
      default:
        return 'bg-dispatch-text-tertiary/20 text-dispatch-text-tertiary border-dispatch-text-tertiary/30';
    }
  };

  const getActionTypeStyle = () => {
    switch (currentEntry.actionType) {
      case 'Proactive Outreach':
        return 'bg-dispatch-status-blue/20 text-dispatch-status-blue border-dispatch-status-blue/30';
      case 'Sensor Alert':
      case 'Alert Triage':
        return 'bg-dispatch-status-amber/20 text-dispatch-status-amber border-dispatch-status-amber/30';
      case 'Risk Assessment':
        return 'bg-dispatch-text-tertiary/20 text-dispatch-text-tertiary border-dispatch-text-tertiary/30';
      case 'Appointment Booked':
      case 'Booking Confirmation':
        return 'bg-dispatch-status-green/20 text-dispatch-status-green border-dispatch-status-green/30';
      case 'Follow-up':
      case 'Post-Repair Check':
      case 'Reminder Sent':
        return 'bg-dispatch-accent-green/20 text-dispatch-accent-green border-dispatch-accent-green/30';
      default:
        return 'bg-dispatch-bg text-dispatch-text-secondary border-dispatch-border';
    }
  };

  const getConfidenceColor = () => {
    if (currentEntry.confidence >= 85) return 'bg-dispatch-status-green';
    if (currentEntry.confidence >= 70) return 'bg-dispatch-status-amber';
    return 'bg-dispatch-status-red';
  };

  const getCardOpacity = () => {
    // Risk Assessment with no action should recede visually
    if (currentEntry.actionType === 'Risk Assessment' && currentEntry.outcome === 'success') {
      return 'opacity-75';
    }
    return '';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return date.toLocaleDateString();
  };

  // Operator action handlers for Proactive Outreach
  const handleTakeOver = () => {
    setIsManualMode(!isManualMode);
    if (!isManualMode) {
      setIsPaused(true); // Taking over also pauses the agent
    }
  };

  const handlePauseAgent = () => {
    setIsPaused(!isPaused);
  };

  const handleMarkResolved = () => {
    const updatedEntry = {
      ...currentEntry,
      outcome: 'success' as const,
      outcomeLabel: 'Resolved',
    };
    setLocalEntry(updatedEntry);
    if (onUpdateEntry) {
      onUpdateEntry(updatedEntry);
    }
  };

  // Alert Triage action handlers
  const handleAlertTakeOver = () => {
    const updatedEntry = {
      ...currentEntry,
      outcome: 'pending' as const,
      outcomeLabel: 'Operator Handling',
    };
    setLocalEntry(updatedEntry);
    if (onUpdateEntry) {
      onUpdateEntry(updatedEntry);
    }
  };

  const handleSendToFieldTech = () => {
    const updatedEntry = {
      ...currentEntry,
      outcome: 'success' as const,
      outcomeLabel: 'Tech Dispatched',
    };
    setLocalEntry(updatedEntry);
    if (onUpdateEntry) {
      onUpdateEntry(updatedEntry);
    }
  };

  const handleDismiss = () => {
    const updatedEntry = {
      ...currentEntry,
      outcome: 'neutral' as const,
      outcomeLabel: 'Dismissed',
    };
    setLocalEntry(updatedEntry);
    if (onUpdateEntry) {
      onUpdateEntry(updatedEntry);
    }
  };

  const isProactiveOutreach = currentEntry.actionType === 'Proactive Outreach';
  const isAlertTriage = currentEntry.actionType === 'Alert Triage';
  const isPending = currentEntry.outcome === 'pending';
  const isWarning = currentEntry.outcome === 'warning';
  // Get customer initial for avatar
  const customerInitial = currentEntry.customerName.charAt(0);

  return (
    <div
      className={cn(
        'relative bg-dispatch-card rounded-xl border overflow-hidden',
        'transition-all duration-250',
        currentEntry.isNew && 'animate-card-glow',
        isExpanded ? 'border-dispatch-border-accent' : 'border-dispatch-border hover:border-dispatch-border-accent',
        getCardOpacity(),
        isProactiveOutreach && isPending && 'ring-1 ring-dispatch-status-blue/30',
        isAlertTriage && isWarning && 'ring-1 ring-dispatch-status-amber/30'
      )}
    >
      {/* Left Color Bar - 4px wide */}
      <div 
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[4px]',
          getStatusColor(),
          isProactiveOutreach && isPending && 'animate-pulse',
          isAlertTriage && isWarning && 'animate-pulse'
        )} 
      />

      <div className="pl-4">
        {/* Collapsed State */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left"
        >
          {/* Row 1: Agent + Action + Time */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-dispatch-accent-green" />
                <span className="text-sm font-medium text-dispatch-text">{currentEntry.agentName}</span>
              </div>
              <span className={cn(
                'px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border',
                getActionTypeStyle()
              )}>
                {isProactiveOutreach && isPending && (
                  <Zap className="w-3 h-3 inline mr-1" />
                )}
                {currentEntry.actionType}
              </span>
              {isProactiveOutreach && isPending && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-dispatch-status-blue text-white animate-pulse">
                  LIVE
                </span>
              )}
              {isAlertTriage && isWarning && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-dispatch-status-amber text-dispatch-bg animate-pulse">
                  NEEDS REVIEW
                </span>
              )}
              {/* Auto indicator for autonomous actions */}
              <span className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider rounded bg-dispatch-bg border border-dispatch-border text-dispatch-text-secondary">
                <Sparkles className="w-3 h-3" />
                Auto
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-dispatch-text-tertiary" />
              <span className="text-xs text-dispatch-text-tertiary">
                {formatTimeAgo(currentEntry.timestamp)}
              </span>
            </div>
          </div>

          {/* Row 2: Customer + Unit */}
          <div className="mb-2">
            <span className="text-sm font-semibold text-dispatch-text">{currentEntry.customerName}</span>
            <span className="text-dispatch-text-secondary mx-2">·</span>
            <span className="text-sm font-mono text-dispatch-text-secondary">{currentEntry.unitId}</span>
            <span className="text-dispatch-text-tertiary mx-2">·</span>
            <span className="text-sm text-dispatch-text-tertiary">{currentEntry.doorModel}</span>
          </div>

          {/* Row 3: Summary */}
          <p className="text-sm text-dispatch-text-secondary leading-relaxed mb-3">
            {currentEntry.summary}
          </p>

          {/* Row 4: Outcome + Confidence + Revenue */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Outcome Badge */}
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-md border',
                getOutcomeBadgeStyle()
              )}>
                {currentEntry.outcomeLabel}
              </span>

              {/* Confidence Bar with visual cue for lower confidence */}
              <div className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-md",
                currentEntry.confidence < 70 && "bg-dispatch-status-red/10",
                currentEntry.confidence >= 70 && currentEntry.confidence < 85 && "bg-dispatch-status-amber/10"
              )}>
                <span className="text-xs text-dispatch-text-secondary">Confidence</span>
                <div className="w-16 h-1.5 bg-dispatch-border rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-600', getConfidenceColor())}
                    style={{ width: `${currentEntry.confidence}%` }}
                  />
                </div>
                <span className={cn(
                  "text-xs font-mono",
                  currentEntry.confidence >= 85 ? "text-dispatch-status-green" :
                  currentEntry.confidence >= 70 ? "text-dispatch-status-amber" : "text-dispatch-status-red"
                )}>
                  {currentEntry.confidence}%
                </span>
              </div>

              {/* Revenue - only show for booked/completed */}
              {currentEntry.revenue !== undefined && currentEntry.revenue > 0 && 
               (currentEntry.actionType === 'Appointment Booked' || currentEntry.actionType === 'Booking Confirmation') && (
                <span className="text-sm font-mono text-dispatch-status-green">
                  ${currentEntry.revenue.toLocaleString()}
                </span>
              )}
            </div>

            {/* Expand Chevron */}
            <div className="text-dispatch-text-tertiary">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {/* Expanded State */}
        {isExpanded && (
          <div className="px-4 pb-4 animate-slide-down">
            <div className="h-px bg-dispatch-border mb-4" />
            <div className="space-y-4">
              <TriggerContext context={currentEntry.triggerContext} />
              <ConversationThread messages={currentEntry.conversation} customerInitial={customerInitial} />
              
              {/* Operator Action Bar for Proactive Outreach - pending cards */}
              {(isProactiveOutreach && isPending) && (
                <OperatorActionBar
                  isManualMode={isManualMode}
                  isPaused={isPaused}
                  onTakeOver={handleTakeOver}
                  onPauseAgent={handlePauseAgent}
                  onMarkResolved={handleMarkResolved}
                />
              )}

              {/* Alert Triage Action Bar - for cards needing human review */}
              {(isAlertTriage && isWarning) && (
                <AlertTriageActionBar
                  onTakeOver={handleAlertTakeOver}
                  onSendToFieldTech={handleSendToFieldTech}
                  onDismiss={handleDismiss}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
