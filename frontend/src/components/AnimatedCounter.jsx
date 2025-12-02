import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2, className = "neon-text text-5xl font-bold text-neonAqua" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000
  });
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      const target = parseFloat(end);
      motionValue.set(isNaN(target) ? 0 : target);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest) + suffix;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span className="inline-block">
      <span ref={ref} className={className}>
        {prefix}0{suffix}
      </span>
    </span>
  );
};

export default AnimatedCounter;
