import React from 'react';
import { motion } from 'framer-motion';
import { HiLightningBolt, HiOutlineShoppingCart } from 'react-icons/hi';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-1 cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center">
        {/* The Cart */}
        <HiOutlineShoppingCart className="text-3xl text-white group-hover:text-amber-400 transition-colors" />
        
        {/* The Lightning Bolt (Swift) */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="absolute -right-1 -top-1 bg-amber-500 rounded-full p-0.5 border-2 border-slate-900"
        >
          <HiLightningBolt className="text-slate-900 text-xs" />
        </motion.div>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col leading-none ml-1">
        <span className="text-xl font-black tracking-tighter text-white">
          SWIFT<span className="text-amber-500">CART</span>
        </span>
        <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
          Express
        </span>
      </div>
    </motion.div>
  );
};

export default Logo;