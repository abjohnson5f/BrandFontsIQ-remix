import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "~/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    label?: string;
  };
  subLabel?: string;
  format?: 'currency' | 'percentage' | 'number';
  size?: 'default' | 'large';
}

export function ThoughtSpotMetricCard({ 
  label, 
  value, 
  change, 
  subLabel,
  format = 'number',
  size = 'default' 
}: MetricCardProps) {
  const formatValue = () => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };
  
  const isPositive = change ? change.value >= 0 : true;
  
  return (
    <div className="ts-card ts-metric">
      <div className="ts-metric-label">{label}</div>
      {subLabel && (
        <div className="text-xs text-[hsl(var(--ts-text-secondary))] mb-2">{subLabel}</div>
      )}
      
      <div className={cn(
        "ts-metric-value",
        size === 'large' && "text-4xl"
      )}>
        {formatValue()}
      </div>
      
      {change && (
        <div className={cn(
          "ts-metric-change",
          isPositive ? "positive" : "negative"
        )}>
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span>{isPositive ? '+' : ''}{change.value}%</span>
          {change.label && (
            <span className="text-[hsl(var(--ts-text-secondary))] ml-1">
              {change.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}