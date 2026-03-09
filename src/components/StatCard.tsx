import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  variant = 'neutral',
  icon,
  className,
}: StatCardProps) {
  const animatedValue = useCountUp(value, { duration: 800, decimals });

  const variantStyles = {
    neutral: 'border-dispatch-border bg-dispatch-card',
    success: 'border-dispatch-status-green/30 bg-dispatch-card',
    warning: 'border-dispatch-status-amber/30 bg-dispatch-card',
    error: 'border-dispatch-status-red/30 bg-dispatch-card',
    info: 'border-dispatch-status-blue/30 bg-dispatch-card',
  };

  const valueColors = {
    neutral: 'text-dispatch-text',
    success: 'text-dispatch-status-green',
    warning: 'text-dispatch-status-amber',
    error: 'text-dispatch-status-red',
    info: 'text-dispatch-status-blue',
  };

  return (
    <div
      className={cn(
        'relative flex flex-col p-4 rounded-xl border transition-all duration-200',
        'hover:border-dispatch-border-accent hover:translate-y-[-1px]',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-dispatch-text-secondary uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <span className="text-dispatch-text-tertiary">
            {icon}
          </span>
        )}
      </div>
      
      <div className={cn(
        'font-mono text-2xl font-semibold tracking-tight',
        valueColors[variant]
      )}>
        <span className="animate-count-up">
          {prefix}{animatedValue.toLocaleString()}{suffix}
        </span>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    </div>
  );
}
