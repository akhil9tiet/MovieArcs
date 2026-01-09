
import React, { useEffect, useRef } from "react";
import { useSpring, useMotionValue } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  type?: 'currency' | 'number' | 'rating';
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, type = 'number', className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        if (type === 'currency') {
             if (latest >= 1000000000) {
                ref.current.textContent = `${(latest / 1000000000).toFixed(2)}B`;
             } else if (latest >= 1000000) {
                ref.current.textContent = `${(latest / 1000000).toFixed(0)}M`;
             } else if (latest >= 1000) {
                ref.current.textContent = `${(latest / 1000).toFixed(0)}k`;
             } else {
                ref.current.textContent = `${latest.toFixed(0)}`;
             }
        } else if (type === 'rating') {
            ref.current.textContent = latest.toFixed(1);
        } else {
            ref.current.textContent = Math.round(latest).toString();
        }
      }
    });
  }, [springValue, type]);

  // Set initial value immediately to prevent flash of 0
  const getInitial = () => {
      if (type === 'currency') {
         if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`;
         if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
         if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
         return `${value.toFixed(0)}`;
      }
      if (type === 'rating') return value.toFixed(1);
      return Math.round(value).toString();
  }

  return <span ref={ref} className={className}>{getInitial()}</span>;
};

export default AnimatedCounter;
