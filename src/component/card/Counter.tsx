import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({ end = 12 }: { end: number }) => {
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (value) => Math.round(value));
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const unsubscribe = roundedCount.onChange((latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [roundedCount]);

  useEffect(() => {
    if (inView) {
      animate(count, end, { duration: 2 });
    }
  }, [inView, count, end]);

  return (
    <motion.h3
      ref={ref}
      className="text-center text-xl sm:text-2xl font-semibold"
    >
      {displayValue} +
    </motion.h3>
  );
};

export default Counter;
