import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { BsShieldCheck } from 'react-icons/bs';

export const ConfidenceIndicator = ({ confidence }: { confidence: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(confidence);
    }, 800);
    return () => clearTimeout(timer);
  }, [confidence]);

  const getConfidenceColor = (value: number) => {
    if (value >= 80) return 'text-emerald-700 border-emerald-200 bg-emerald-50';
    if (value >= 60) return 'text-amber-700 border-amber-200 bg-amber-50';
    return 'text-red-700 border-red-200 bg-red-50';
  };

  const getConfidenceLabel = (value: number) => {
    if (value >= 80) return 'High Confidence';
    if (value >= 60) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2.5 rounded-full border-2 px-4 py-2.5 ${getConfidenceColor(displayValue)}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <BsShieldCheck className='text-base' />
      <span className='text-sm font-semibold'>
        {getConfidenceLabel(displayValue)} ({displayValue}%)
      </span>
    </motion.div>
  );
};
