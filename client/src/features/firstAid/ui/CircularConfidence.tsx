import { motion } from 'motion/react';

export const CircularConfidence = ({ confidence }: { confidence: number }) => {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeValue = Math.max(0, Math.min(100, Math.round(confidence || 0)));
  const offset = circumference - (safeValue / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 80) return '#10B981'; // emerald-500
    if (value >= 60) return '#F59E0B'; // amber-500
    return '#EF4444'; // red-500
  };

  const strokeColor = getColor(safeValue);

  return (
    <motion.div
      className='flex flex-col items-center justify-center'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='relative' style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke='#E5E7EB'
            strokeWidth={strokeWidth}
            fill='none'
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill='none'
            strokeLinecap='round'
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          />
        </svg>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-gray-900'>{safeValue}%</div>
            <div className='text-xs text-gray-500'>Confidence</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
