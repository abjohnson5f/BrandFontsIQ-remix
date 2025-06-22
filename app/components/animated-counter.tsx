import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  format?: 'currency' | 'percentage' | 'multiple' | 'number';
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  format = 'number',
  decimals = 0,
  duration = 2000,
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Format the final value
  let formattedValue = '';
  if (format === 'currency' && !prefix && !suffix) {
    formattedValue = `$${(value / 1000000000).toFixed(decimals)}B`;
  } else if (format === 'percentage' && !suffix) {
    formattedValue = `${value}%`;
  } else if (format === 'multiple' && !suffix) {
    formattedValue = `${value.toLocaleString()}x`;
  } else {
    formattedValue = `${prefix}${value.toLocaleString()}${suffix}`;
  }

  return (
    <span className={`inline-block ${isVisible ? 'animate-count-up' : 'opacity-0'}`}>
      {formattedValue}
    </span>
  );
}