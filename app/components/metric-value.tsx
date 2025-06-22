import { useEffect, useRef, useState } from 'react';

interface MetricValueProps {
  value: string;
  className?: string;
}

export function MetricValue({ value, className = '' }: MetricValueProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={ref}
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {value}
      </div>
    </div>
  );
}