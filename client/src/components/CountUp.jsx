import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

const CountUp = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/,/g, ''));
      if (isNaN(end)) return;

      const totalSteps = 60 * duration;
      const increment = end / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{value.toString().includes('+') ? '+' : ''}{value.toString().includes('%') ? '%' : ''}
    </span>
  );
};

export default CountUp;
