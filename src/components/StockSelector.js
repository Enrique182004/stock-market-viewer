import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const StockSelector = ({ value, onChange, options }) => {
  const { theme } = useTheme();
  
  return (
    <div className="mb-8">
      <label className={`block text-sm font-bold mb-3 uppercase tracking-wider ${
        theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
      }`}>
        Select Company
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-6 py-4 border-2 font-semibold text-lg rounded-2xl transition-all shadow-lg cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-purple-500/50 text-white hover:border-purple-400 focus:ring-purple-500/50'
            : 'bg-white border-purple-300 text-gray-900 hover:border-purple-500 focus:ring-purple-300'
        }`}
      >
        {options.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.symbol} - {stock.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;