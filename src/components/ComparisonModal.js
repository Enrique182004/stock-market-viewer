import React, { useState } from 'react';
import { X, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ComparisonModal = ({ show, onClose, currentStock, stockOptions, onCompare }) => {
  const { theme } = useTheme();
  const [selectedStocks, setSelectedStocks] = useState([]);

  const toggleStock = (symbol) => {
    if (selectedStocks.includes(symbol)) {
      setSelectedStocks(selectedStocks.filter(s => s !== symbol));
    } else if (selectedStocks.length < 2) {
      setSelectedStocks([...selectedStocks, symbol]);
    }
  };

  const handleCompare = () => {
    onCompare(selectedStocks);
    setSelectedStocks([]);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-3xl p-8 max-w-2xl w-full ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/30'
          : 'bg-gradient-to-br from-white to-gray-50 border-2 border-purple-300'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-4xl font-black ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
          }`}>
            Compare Stocks
          </h2>
          <button 
            onClick={onClose} 
            className={`p-3 rounded-xl transition-all ${
              theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
            }`}
          >
            <X className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </div>

        <p className={`mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
          Select up to 2 stocks to compare with <span className="font-bold">{currentStock}</span>
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stockOptions.filter(s => s.symbol !== currentStock).map(stock => (
            <button
              key={stock.symbol}
              onClick={() => toggleStock(stock.symbol)}
              disabled={!selectedStocks.includes(stock.symbol) && selectedStocks.length >= 2}
              className={`p-4 rounded-xl font-bold transition-all ${
                selectedStocks.includes(stock.symbol)
                  ? theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : theme === 'dark'
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {stock.symbol}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCompare}
            disabled={selectedStocks.length === 0}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BarChart3 className="w-5 h-5" />
            Compare
          </button>
          <button
            onClick={onClose}
            className={`px-6 py-3 font-bold rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 text-white hover:bg-slate-600'
                : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;