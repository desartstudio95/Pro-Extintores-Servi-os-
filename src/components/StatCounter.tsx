import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";

interface StatCounterProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  prefix?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, icon, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const count = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8 
      }}
      className="relative group flex flex-col items-center p-6 bg-red-600 rounded-[1.5rem] shadow-xl border border-red-500 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
    >
      {/* Background Pulse/Glow */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500 rounded-full blur-3xl group-hover:bg-red-400 transition-colors duration-500 opacity-50" />
      <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-red-700 rounded-full blur-3xl group-hover:bg-red-600 transition-colors duration-500 opacity-50" />

      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative z-10 text-white mb-3 bg-white/20 p-3 rounded-2xl shadow-inner border border-white/10"
      >
        {icon}
      </motion.div>

      <div className="relative z-10 flex items-baseline gap-1">
        {prefix && <span className="text-lg md:text-xl font-bold text-red-100">{prefix}</span>}
        <motion.span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          {rounded}
        </motion.span>
        {suffix && <span className="text-lg md:text-xl font-bold text-red-100">{suffix}</span>}
      </div>

      <div className="relative z-10 mt-1 text-[10px] md:text-xs text-red-100 font-bold uppercase tracking-widest text-center">
        {label}
      </div>
    </motion.div>
  );
};
