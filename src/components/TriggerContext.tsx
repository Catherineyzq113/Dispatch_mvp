import type { TriggerContext as TriggerContextType } from '@/types';
import { Activity, Cloud, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface TriggerContextProps {
  context: TriggerContextType;
}

export function TriggerContext({ context }: TriggerContextProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-dispatch-status-red';
      case 'High':
        return 'text-dispatch-status-amber';
      case 'Medium':
        return 'text-dispatch-status-amber/80';
      default:
        return 'text-dispatch-status-green';
    }
  };

  return (
    <div className="bg-dispatch-bg rounded-lg p-4 border border-dispatch-border">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-dispatch-accent-green" />
        <h4 className="text-sm font-semibold text-dispatch-text">Why this was triggered</h4>
      </div>

      <div className="space-y-2.5">
        {/* Sensor Reading */}
        {context.sensorReading && (
          <div className="flex items-start gap-3">
            <Activity className="w-4 h-4 text-dispatch-text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-dispatch-text-secondary uppercase tracking-wider">Sensor</span>
              <p className="text-sm text-dispatch-text">{context.sensorReading}</p>
            </div>
          </div>
        )}

        {/* Weather Condition */}
        {context.weatherCondition && (
          <div className="flex items-start gap-3">
            <Cloud className="w-4 h-4 text-dispatch-text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-dispatch-text-secondary uppercase tracking-wider">Weather</span>
              <p className="text-sm text-dispatch-text">{context.weatherCondition}</p>
            </div>
          </div>
        )}

        {/* Seal Age */}
        {context.sealAge && (
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-dispatch-text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-dispatch-text-secondary uppercase tracking-wider">Seal Age</span>
              <p className="text-sm text-dispatch-text">{context.sealAge}</p>
            </div>
          </div>
        )}

        {/* Risk Score */}
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-dispatch-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs text-dispatch-text-secondary uppercase tracking-wider">Risk Score</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-dispatch-text">
                {context.riskScore}/100
              </span>
              <span className={`text-sm font-medium ${getRiskColor(context.riskLevel)}`}>
                — {context.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Decision */}
        <div className="flex items-start gap-3 pt-2 border-t border-dispatch-border">
          <CheckCircle className="w-4 h-4 text-dispatch-accent-green mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs text-dispatch-text-secondary uppercase tracking-wider">Decision</span>
            <p className="text-sm text-dispatch-text">{context.decision}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
