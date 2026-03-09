import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RiskGauge({
  score,
  label,
  showValue = true,
  size = 'md',
  className,
}: RiskGaugeProps) {
  const getRiskLevel = (s: number): { level: string; color: string } => {
    if (s >= 70) return { level: 'Critical', color: '#EF4444' };
    if (s >= 50) return { level: 'High', color: '#F59E0B' };
    if (s >= 30) return { level: 'Medium', color: '#F59E0B' };
    return { level: 'Low', color: '#22C55E' };
  };

  const { level, color } = getRiskLevel(score);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs">
          {label && (
            <span className="text-dispatch-text-secondary font-medium">
              {label}
            </span>
          )}
          {showValue && (
            <div className="flex items-center gap-2">
              <span 
                className="font-mono font-semibold"
                style={{ color }}
              >
                {score}
              </span>
              <span 
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color }}
              >
                {level}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Gradient bar background */}
      <div className={cn(
        'w-full rounded-full overflow-hidden bg-dispatch-border',
        sizeClasses[size]
      )}>
        {/* Filled portion with gradient */}
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, 
              ${score < 30 ? '#22C55E' : score < 50 ? '#F59E0B' : '#EF4444'} 0%, 
              ${score < 30 ? '#10B981' : score < 50 ? '#F97316' : '#DC2626'} 100%)`,
          }}
        />
      </div>
    </div>
  );
}
