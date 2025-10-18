import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const StatCard = ({ label, value, icon: Icon, trend, small }) => {
  const { theme } = useTheme();
  const isPositive = trend === 'positive';
  const isNegative = trend === 'negative';
  
  const getCardClasses = () => {
    if (theme === 'dark') {
      if (isPositive) return 'from-emerald-600/30 to-emerald-900/30 border-emerald-500/50';
      if (isNegative) return 'from-red-600/30 to-red-900/30 border-red-500/50';
      return 'from-purple-600/30 to-purple-900/30 border-purple-500/50';
    } else {
      if (isPositive) return 'from-emerald-100 to-emerald-200 border-emerald-400';
      if (isNegative) return 'from-red-100 to-red-200 border-red-400';
      return 'from-purple-100 to-purple-200 border-purple-400';
    }
  };

  const getTextColor = () => {
    if (theme === 'dark') {
      if (isPositive) return 'text-emerald-400';
      if (isNegative) return 'text-red-400';
      return 'text-white';
    } else {
      if (isPositive) return 'text-emerald-700';
      if (isNegative) return 'text-red-700';
      return 'text-gray-900';
    }
  };

  const getLabelColor = () => {
    if (theme === 'dark') {
      if (isPositive) return 'text-emerald-300';
      if (isNegative) return 'text-red-300';
      return 'text-purple-300';
    } else {
      if (isPositive) return 'text-emerald-600';
      if (isNegative) return 'text-red-600';
      return 'text-purple-600';
    }
  };

  return (
    <div className={`bg-gradient-to-br backdrop-blur-md border-2 p-5 rounded-2xl hover:scale-105 transition-transform shadow-xl ${getCardClasses()}`}>
      <p className={`text-xs mb-2 uppercase tracking-wider font-bold ${getLabelColor()}`}>
        {label}
      </p>
      <div className="flex items-center gap-2">
        {Icon && <Icon className={`w-6 h-6 ${getTextColor()}`} />}
        <p className={`${small ? 'text-2xl' : 'text-3xl'} font-black ${getTextColor()}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;