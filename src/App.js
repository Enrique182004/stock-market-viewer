import React, { useState } from 'react';
import { TrendingUp, RefreshCw, ArrowUp, ArrowDown, Briefcase, BarChart3 } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useStockData } from './hooks/useStockData';
import { usePortfolio } from './hooks/usePortfolio';
import LoadingSkeleton from './components/LoadingSkeleton';
import ThemeToggle from './components/ThemeToggle';
import StockSelector from './components/StockSelector';
import StatCard from './components/StatCard';
import StockChart from './components/StockChart';
import ComparisonModal from './components/ComparisonModal';
import PortfolioModal from './components/PortfolioModal';
import './App.css';

const StockMarketViewer = () => {
  const { theme } = useTheme();
  const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
  
  const stock = useStockData(API_KEY);
  const portfolio = usePortfolio();
  
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [compareStocks, setCompareStocks] = useState([]);
  const [compareData, setCompareData] = useState(null);

  const handleCompare = async (selectedStocks) => {
    if (selectedStocks.length > 0) {
      setCompareStocks(selectedStocks);
      // Fetch data for the first comparison stock
      const data = await stock.refetch(selectedStocks[0]);
      setCompareData(data);
    } else {
      setCompareStocks([]);
      setCompareData(null);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className={`backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6 md:p-10 mb-8 relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-purple-500/30'
            : 'bg-gradient-to-br from-white/95 to-gray-100/95 border-purple-300'
        }`}>
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}>
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className={`text-4xl md:text-5xl font-black ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent'
                  }`}>
                    Stock Market Viewer
                  </h1>
                  <p className={`text-sm md:text-base mt-2 font-medium ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Real-time market analytics & insights
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <ThemeToggle />
                <button
                  onClick={() => setShowComparison(true)}
                  className={`flex items-center gap-2 px-6 py-4 font-bold rounded-2xl transition-all shadow-lg transform hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="hidden md:inline">Compare</span>
                </button>
                <button
                  onClick={() => setShowPortfolio(!showPortfolio)}
                  className={`flex items-center gap-2 px-6 py-4 font-bold rounded-2xl transition-all shadow-lg transform hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="hidden md:inline">Portfolio</span>
                </button>
                <button
                  onClick={() => stock.refetch()}
                  disabled={stock.loading}
                  className={`flex items-center gap-3 px-6 py-4 font-bold rounded-2xl transition-all shadow-lg transform hover:scale-105 disabled:scale-100 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-800'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500'
                  }`}
                >
                  <RefreshCw className={`w-5 h-5 ${stock.loading ? 'animate-spin' : ''}`} />
                  <span className="hidden md:inline">Refresh</span>
                </button>
              </div>
            </div>

            <StockSelector 
              value={stock.selectedStock}
              onChange={stock.setSelectedStock}
              options={stock.stockOptions}
            />

            {stock.loading ? (
              <LoadingSkeleton />
            ) : stock.error ? (
              <div className={`border-2 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm font-semibold ${
                theme === 'dark'
                  ? 'bg-red-500/20 border-red-500/60 text-red-300'
                  : 'bg-red-100 border-red-400 text-red-700'
              }`}>
                ⚠️ {stock.error}
              </div>
            ) : (
              <>
                {stock.stockInfo && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <StatCard label="Current Price" value={`$${stock.stockInfo.currentPrice}`} />
                    <StatCard 
                      label="Change" 
                      value={`${stock.stockInfo.change >= 0 ? '+' : ''}${stock.stockInfo.change}`}
                      icon={stock.stockInfo.change >= 0 ? ArrowUp : ArrowDown}
                      trend={stock.stockInfo.change >= 0 ? 'positive' : 'negative'}
                    />
                    <StatCard 
                      label="Change %" 
                      value={`${stock.stockInfo.changePercent >= 0 ? '+' : ''}${stock.stockInfo.changePercent}%`}
                      trend={stock.stockInfo.changePercent >= 0 ? 'positive' : 'negative'}
                    />
                    <StatCard label="30-Day High" value={`$${stock.stockInfo.high}`} />
                    <StatCard label="30-Day Low" value={`$${stock.stockInfo.low}`} />
                  </div>
                )}

                {stock.stockData.length > 0 && (
                  <StockChart 
                    data={stock.stockData}
                    compareData={compareData}
                    selectedStock={stock.selectedStock}
                    compareStock={compareStocks[0]}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Portfolio Modal */}
        {showPortfolio && (
          <PortfolioModal 
            portfolio={portfolio.portfolio}
            onClose={() => setShowPortfolio(false)}
            onRemove={portfolio.removeFromPortfolio}
            stats={portfolio.calculateStats()}
            onExport={portfolio.exportToCSV}
          />
        )}

        {/* Comparison Modal */}
        <ComparisonModal 
          show={showComparison}
          onClose={() => setShowComparison(false)}
          currentStock={stock.selectedStock}
          stockOptions={stock.stockOptions}
          onCompare={handleCompare}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <StockMarketViewer />
    </ThemeProvider>
  );
};

export default App;