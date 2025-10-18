import React from 'react';
import { X, Download, Briefcase, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import StatCard from './StatCard';

const PortfolioModal = ({ portfolio, onClose, onRemove, stats, onExport }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
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
            My Portfolio
          </h2>
          <div className="flex gap-2">
            {portfolio.length > 0 && (
              <button
                onClick={onExport}
                className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-3 rounded-xl transition-all ${
                theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
              }`}
            >
              <X className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>
        </div>

        {portfolio.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Value" value={`$${stats.totalValue}`} small />
            <StatCard label="Total Cost" value={`$${stats.totalCost}`} small />
            <StatCard 
              label="Gain/Loss" 
              value={`${parseFloat(stats.totalGainLoss) >= 0 ? '+' : ''}$${stats.totalGainLoss}`}
              trend={parseFloat(stats.totalGainLoss) >= 0 ? 'positive' : 'negative'}
              small
            />
            <StatCard 
              label="Gain/Loss %" 
              value={`${parseFloat(stats.totalGainLossPercent) >= 0 ? '+' : ''}${stats.totalGainLossPercent}%`}
              trend={parseFloat(stats.totalGainLossPercent) >= 0 ? 'positive' : 'negative'}
              small
            />
          </div>
        )}

        {portfolio.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className={`w-20 h-20 mx-auto mb-4 ${
              theme === 'dark' ? 'text-slate-600' : 'text-gray-400'
            }`} />
            <p className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Your portfolio is empty
            </p>
            <p className={`mt-2 ${
              theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
            }`}>
              Add stocks to track your investments
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {portfolio.map(item => {
              const currentValue = item.shares * item.currentPrice;
              const costBasis = item.shares * item.purchasePrice;
              const gainLoss = currentValue - costBasis;
              const gainLossPercent = ((gainLoss / costBasis) * 100).toFixed(2);

              return (
                <div key={item.id} className={`border-2 p-6 rounded-2xl transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40'
                    : 'bg-white border-purple-200 hover:border-purple-400'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.symbol}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        {item.name}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className={`p-2 rounded-lg transition-all ${
                        theme === 'dark' ? 'hover:bg-red-500/20' : 'hover:bg-red-100'
                      }`}
                    >
                      <Trash2 className={`w-5 h-5 ${
                        theme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className={`text-xs mb-1 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>Shares</p>
                      <p className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{item.shares}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>Avg Cost</p>
                      <p className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>${item.purchasePrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>Current Price</p>
                      <p className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>${item.currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>Total Value</p>
                      <p className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>${currentValue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>Gain/Loss</p>
                      <p className={`text-lg font-bold ${
                        gainLoss >= 0 
                          ? theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                          : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLoss >= 0 ? '+' : ''}{gainLossPercent}%)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;