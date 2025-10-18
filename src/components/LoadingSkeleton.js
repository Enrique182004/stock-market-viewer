import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSkeleton = () => {
  const { theme } = useTheme();
  const bgClass = theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200';
  
  return (
    <div className="space-y-4 animate-pulse">
      <div className={`h-8 ${bgClass} rounded-lg w-3/4`}></div>
      <div className={`h-64 ${bgClass} rounded-2xl`}></div>
      <div className="grid grid-cols-3 gap-4">
        <div className={`h-24 ${bgClass} rounded-xl`}></div>
        <div className={`h-24 ${bgClass} rounded-xl`}></div>
        <div className={`h-24 ${bgClass} rounded-xl`}></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;