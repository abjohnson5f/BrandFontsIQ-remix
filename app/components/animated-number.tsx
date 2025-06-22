import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: string;
  className?: string;
}

export function AnimatedNumber({ value, className = '' }: AnimatedNumberProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Split the value into individual characters
  const characters = value.split('');

  return (
    <span className={`inline-flex ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block transform transition-all ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{
            transitionDuration: '500ms',
            transitionDelay: `${index * 50}ms`
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}