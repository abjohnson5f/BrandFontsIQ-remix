import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ','
}: UseCountUpOptions) {
  // Start with the end value for SSR
  const [count, setCount] = useState(end);

  useEffect(() => {
    // Only run animation on client
    if (typeof window === 'undefined') return;
    
    // Reset to start value when component mounts on client
    setCount(start);
    
    let startTimestamp: number | null = null;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for more natural feel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = easeOutQuart * (end - start) + start;
      setCount(decimals > 0 ? currentValue : Math.floor(currentValue));
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    
    // Cleanup
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [start, end, duration, decimals]);

  // Format the number with separators
  const formattedValue = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formattedValue}${suffix}`;
}