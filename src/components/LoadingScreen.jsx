import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete, canExit = false, variant = 'initial' }) => {
  const isInitialVariant = variant === 'initial';
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const progressRef = useRef(0);
  const requestRef = useRef();
  const completionTimeoutRef = useRef();
  const exitScheduledRef = useRef(false);

  useEffect(() => {
    if (isInitialVariant) {
      document.body.style.overflow = 'hidden';
    }
    
    const animateProgress = () => {
      if (isExiting) return;

      const progressCap = canExit ? 100 : isInitialVariant ? 94 : 92;
      if (progressRef.current < progressCap) {
        const increment = isInitialVariant
          ? canExit
            ? Math.random() * 2 + 1
            : Math.random() * 0.7 + 0.15
          : canExit
            ? Math.random() * 5 + 3
            : Math.random() * 1.5 + 0.7;
        progressRef.current = Math.min(progressRef.current + increment, progressCap);
        setProgress(Math.floor(progressRef.current));
      }

      if (canExit && progressRef.current >= 100 && !exitScheduledRef.current) {
        exitScheduledRef.current = true;
        completionTimeoutRef.current = window.setTimeout(() => {
          setIsExiting(true);
        }, isInitialVariant ? 200 : 60);
        return;
      }

      requestRef.current = requestAnimationFrame(animateProgress);
    };

    requestRef.current = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.clearTimeout(completionTimeoutRef.current);
      if (isInitialVariant) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [canExit, isExiting, variant, isInitialVariant]);

  const handleAnimationComplete = () => {
    if (isExiting) {
      if (isInitialVariant) {
        document.body.style.overflow = 'unset';
      }
      onLoadingComplete();
    }
  };

  const containerMotion =
    variant === 'transition'
      ? {
          initial: { opacity: 0 },
          animate: { opacity: isExiting ? 0 : 1 },
          transition: {
            duration: isExiting ? 0.24 : 0.12,
            ease: [0.4, 0, 0.2, 1],
          },
        }
      : {
          initial: { y: 0 },
          animate: { y: isExiting ? '-100%' : 0 },
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          },
        };

  return (
    <motion.div
      initial={containerMotion.initial}
      animate={containerMotion.animate}
      transition={containerMotion.transition}
      onAnimationComplete={handleAnimationComplete}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transform-gpu"
      style={{ willChange: 'transform' }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={variant === 'initial' ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <img src="/images/logo_white.png" alt="Logo" className="h-16 w-auto opacity-80" />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-baseline gap-1">
            <span className={`${isInitialVariant ? 'text-6xl' : 'text-4xl'} font-black tabular-nums tracking-tighter text-white/90`}>
              {progress}
            </span>
            <span className={`${isInitialVariant ? 'text-xl' : 'text-base'} text-primary font-bold`}>%</span>
          </div>
          <div className={`${isInitialVariant ? 'w-48' : 'w-40'} h-[1px] bg-white/5 relative overflow-hidden`}>
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 text-[8px] tracking-[0.5em] text-gray-600 uppercase font-medium">
        {variant === 'initial' ? 'Synchronizing Systems' : 'Updating Language'}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
