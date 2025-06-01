import { motion, Variants } from 'framer-motion';

interface AnimatedMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
  color?: string;
  strokeWidth?: number | string;
  width?: number | string;
  height?: number | string;
  transition?: any; // Allow custom transition
}

const AnimatedMenuIcon: React.FC<AnimatedMenuIconProps> = ({
  isOpen,
  onClick,
  color = 'currentColor', // Default to text color
  strokeWidth = 2.5,
  width = 24,
  height = 24,
  transition = { ease: 'easeInOut', duration: 0.3 }, 
}) => {
  const lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: isOpen ? 'open' : 'closed',
    transition,
  };

  const topLineVariants: Variants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    open: {
      rotate: 45,
      translateY: height === 24 && strokeWidth === 2.5 ? 7.5 : Number(height) / 3.2, // Adjust based on size
    },
  };

  const middleLineVariants: Variants = {
    closed: {
      opacity: 1,
      transition: { ...transition, delay: isOpen ? 0 : 0.15 },
    },
    open: {
      opacity: 0,
      transition: { ...transition, duration: 0.1, delay: isOpen ? 0.15 : 0 },
    },
  };

  const bottomLineVariants: Variants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    open: {
      rotate: -45,
      translateY: height === 24 && strokeWidth === 2.5 ? -7.5 : -(Number(height) / 3.2), // Adjust based on size
    },
  };

  const unitHeight = Number(height) / 4;

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      overflow="visible" // Important for rotation not to get clipped
    >
      <motion.line
        x1="0"
        y1={unitHeight}
        x2={width}
        y2={unitHeight}
        variants={topLineVariants}
        {...lineProps}
      />
      <motion.line
        x1="0"
        y1={2 * unitHeight}
        x2={width}
        y2={2 * unitHeight}
        variants={middleLineVariants}
        {...lineProps}
      />
      <motion.line
        x1="0"
        y1={3 * unitHeight}
        x2={width}
        y2={3 * unitHeight}
        variants={bottomLineVariants}
        {...lineProps}
      />
    </motion.svg>
  );
};

export default AnimatedMenuIcon;
