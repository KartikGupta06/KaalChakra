import React from 'react';
import { motion } from 'framer-motion';
import { cardLift } from '../animations/variants';
import { cn } from '../../lib/utils';

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const ParchmentCard: React.FC<ParchmentCardProps> = ({
  children,
  className,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      initial="rest"
      whileHover={hoverEffect ? 'hover' : undefined}
      variants={hoverEffect ? cardLift : undefined}
      className={cn('kc-card-manuscript p-6 sm:p-8', className)}
    >
      {children}
    </motion.div>
  );
};
