import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Hand, Wrench, XCircle, AlertTriangle } from 'lucide-react';

interface AlertTriageActionBarProps {
  onTakeOver: () => void;
  onSendToFieldTech: () => void;
  onDismiss: () => void;
}

export function AlertTriageActionBar({
  onTakeOver,
  onSendToFieldTech,
  onDismiss,
}: AlertTriageActionBarProps) {
  const [confirmAction, setConfirmAction] = useState<'dismiss' | 'field' | null>(null);

  const handleDismiss = () => {
    if (confirmAction !== 'dismiss') {
      setConfirmAction('dismiss');
      setTimeout(() => setConfirmAction(null), 3000);
    } else {
      onDismiss();
      setConfirmAction(null);
    }
  };

  const handleSendToFieldTech = () => {
    if (confirmAction !== 'field') {
      setConfirmAction('field');
      setTimeout(() => setConfirmAction(null), 3000);
    } else {
      onSendToFieldTech();
      setConfirmAction(null);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-dispatch-border">
      {/* Status Indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-dispatch-status-amber/20 flex items-center justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-dispatch-status-amber" />
        </div>
        <span className="text-xs font-medium text-dispatch-status-amber">
          Human Review Required — AI confidence below threshold
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Take Over Button */}
        <button
          onClick={onTakeOver}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all bg-dispatch-bg text-dispatch-text-secondary border border-dispatch-border hover:border-dispatch-status-blue/50 hover:text-dispatch-status-blue"
        >
          <Hand className="w-4 h-4" />
          Take Over
        </button>

        {/* Send to Field Tech Button */}
        <button
          onClick={handleSendToFieldTech}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
            confirmAction === 'field'
              ? 'bg-dispatch-status-amber text-dispatch-bg border border-dispatch-status-amber'
              : 'bg-dispatch-bg text-dispatch-text-secondary border border-dispatch-border hover:border-dispatch-status-amber/50 hover:text-dispatch-status-amber'
          )}
        >
          <Wrench className="w-4 h-4" />
          {confirmAction === 'field' ? 'Click to Confirm' : 'Send to Field Tech'}
        </button>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ml-auto',
            confirmAction === 'dismiss'
              ? 'bg-dispatch-status-red text-white border border-dispatch-status-red'
              : 'bg-dispatch-bg text-dispatch-text-secondary border border-dispatch-border hover:border-dispatch-status-red/50 hover:text-dispatch-status-red'
          )}
        >
          <XCircle className="w-4 h-4" />
          {confirmAction === 'dismiss' ? 'Click to Confirm' : 'Dismiss'}
        </button>
      </div>

      {/* Confirmation hints */}
      {confirmAction === 'dismiss' && (
        <p className="mt-2 text-xs text-dispatch-status-red text-right">
          Mark as sensor fault — no customer contact needed
        </p>
      )}
      {confirmAction === 'field' && (
        <p className="mt-2 text-xs text-dispatch-status-amber text-right">
          Dispatch technician for physical inspection
        </p>
      )}
    </div>
  );
}
