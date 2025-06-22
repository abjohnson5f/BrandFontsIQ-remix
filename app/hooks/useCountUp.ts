import { useEffect, useState, useRef } from 'react';

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
  const [count, setCount] = useState(end);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run animation on client after mount
    if (!isMounted || typeof window === 'undefined') return;
    
    // Reset to start value
    setCount(start);
    
    let startTimestamp: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for more natural feel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = easeOutQuart * (end - start) + start;
      setCount(decimals > 0 ? currentValue : Math.floor(currentValue));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Start animation after a small delay
    const timer = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 50);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, start, end, duration, decimals]);

  // Format the number with separators
  const formattedValue = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formattedValue}${suffix}`;
}