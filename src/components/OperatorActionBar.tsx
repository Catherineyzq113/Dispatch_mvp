import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Hand, Pause, CheckCircle, User, Bot } from 'lucide-react';

interface OperatorActionBarProps {
  isManualMode: boolean;
  isPaused: boolean;
  onTakeOver: () => void;
  onPauseAgent: () => void;
  onMarkResolved: () => void;
}

export function OperatorActionBar({
  isManualMode,
  isPaused,
  onTakeOver,
  onPauseAgent,
  onMarkResolved,
}: OperatorActionBarProps) {
  const [showResolvedConfirm, setShowResolvedConfirm] = useState(false);

  const handleMarkResolved = () => {
    if (!showResolvedConfirm) {
      setShowResolvedConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowResolvedConfirm(false), 3000);
    } else {
      onMarkResolved();
      setShowResolvedConfirm(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-dispatch-border">
      {/* Mode Indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isManualMode ? (
            <>
              <div className="w-6 h-6 rounded-full bg-dispatch-status-amber/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-dispatch-status-amber" />
              </div>
              <span className="text-xs font-medium text-dispatch-status-amber">
                Manual Mode — You are responding
              </span>
            </>
          ) : isPaused ? (
            <>
              <div className="w-6 h-6 rounded-full bg-dispatch-status-amber/20 flex items-center justify-center">
                <Pause className="w-3.5 h-3.5 text-dispatch-status-amber" />
              </div>
              <span className="text-xs font-medium text-dispatch-status-amber">
                Agent Paused — Awaiting operator action
              </span>
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full bg-dispatch-accent-green/20 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-dispatch-accent-green" />
              </div>
              <span className="text-xs font-medium text-dispatch-accent-green">
                Auto Mode — Agent handling conversation
              </span>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Take Over Button */}
        <button
          onClick={onTakeOver}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
            isManualMode
              ? 'bg-dispatch-status-amber/20 text-dispatch-status-amber border border-dispatch-status-amber/30'
              : 'bg-dispatch-bg text-dispatch-text-secondary border border-dispatch-border hover:border-dispatch-status-amber/50 hover:text-dispatch-text'
          )}
        >
          <Hand className="w-4 h-4" />
          {isManualMode ? 'In Control' : 'Take Over'}
        </button>

        {/* Pause Agent Button */}
        <button
          onClick={onPauseAgent}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
            isPaused
              ? 'bg-dispatch-status-amber/20 text-dispatch-status-amber border border-dispatch-status-amber/30'
              : 'bg-dispatch-bg text-dispatch-text-secondary border border-dispatch-border hover:border-dispatch-status-amber/50 hover:text-dispatch-text'
          )}
        >
          <Pause className="w-4 h-4" />
          {isPaused ? 'Agent Paused' : 'Pause Agent'}
        </button>

        {/* Mark Resolved Button */}
        <button
          onClick={handleMarkResolved}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ml-auto',
            showResolvedConfirm
              ? 'bg-dispatch-status-green text-white border border-dispatch-status-green'
              : 'bg-dispatch-bg text-dispatch-text-secondary border border-dispatch-border hover:border-dispatch-status-green/50 hover:text-dispatch-status-green'
          )}
        >
          <CheckCircle className="w-4 h-4" />
          {showResolvedConfirm ? 'Click to Confirm' : 'Mark Resolved'}
        </button>
      </div>

      {/* Confirmation hint */}
      {showResolvedConfirm && (
        <p className="mt-2 text-xs text-dispatch-status-green text-right">
          Click again to confirm and close this conversation
        </p>
      )}
    </div>
  );
}
