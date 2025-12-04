import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, colorClass, bgClass }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgClass}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{value}</h3>
      </div>
    </motion.div>
  );
};

export default StatsCard;