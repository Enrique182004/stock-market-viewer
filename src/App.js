import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';

const StockMarketViewer = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);

  const stockOptions = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' }
  ];

  const generateMockData = (symbol) => {
    const basePrice = {
      'AAPL': 175,
      'GOOGL': 140,
      'MSFT': 380,
      'AMZN': 145,
      'TSLA': 242,
      'META': 325,
      'NVDA': 495,
      'JPM': 155
    }[symbol] || 100;

    const data = [];
    const days = 30;
    let price = basePrice;

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const change = (Math.random() - 0.5) * basePrice * 0.03;
      price = Math.max(price + change, basePrice * 0.8);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 50000000) + 10000000
      });
    }

    return data;
  };

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = generateMockData(selectedStock);
      setStockData(data);
      
      const latestPrice = data[data.length - 1].price;
      const previousPrice = data[data.length - 2].price;
      const change = latestPrice - previousPrice;
      const changePercent = ((change / previousPrice) * 100).toFixed(2);
      
      setStockInfo({
        currentPrice: latestPrice,
        change: change.toFixed(2),
        changePercent: changePercent,
        high: Math.max(...data.map(d => d.price)).toFixed(2),
        low: Math.min(...data.map(d => d.price)).toFixed(2)
      });
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchStockData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedStock]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 p-4 border-2 border-purple-500 rounded-xl shadow-2xl">
          <p className="text-sm font-bold text-purple-300 mb-2">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-green-400">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Volume: {(payload[0].payload.volume / 1000000).toFixed(1)}M
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-500/30 p-6 md:p-10 mb-8 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/50 transform hover:scale-110 transition-transform">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Stock Market Viewer
                  </h1>
                  <p className="text-slate-400 text-sm md:text-base mt-2 font-medium">Real-time market analytics & insights</p>
                </div>
              </div>
              <button
                onClick={fetchStockData}
                disabled={loading}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-800 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-105 disabled:scale-100"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden md:inline">Refresh Data</span>
              </button>
            </div>

            {/* Stock Selector */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-purple-300 mb-3 uppercase tracking-wider">
                Select Company
              </label>
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="w-full px-6 py-4 bg-slate-900/80 border-2 border-purple-500/50 text-white font-semibold text-lg rounded-2xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all shadow-lg backdrop-blur-sm hover:border-purple-400 cursor-pointer"
              >
                {stockOptions.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol} className="bg-slate-900">
                    {stock.symbol} - {stock.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats Grid */}
            {stockInfo && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-600/30 to-purple-900/30 backdrop-blur-md border-2 border-purple-500/50 p-5 rounded-2xl hover:scale-105 transition-transform shadow-xl hover:shadow-purple-500/50">
                  <p className="text-xs text-purple-300 mb-2 uppercase tracking-wider font-bold">Current Price</p>
                  <p className="text-3xl font-black text-white">${stockInfo.currentPrice}</p>
                </div>
                
                <div className={`bg-gradient-to-br ${stockInfo.change >= 0 ? 'from-emerald-600/30 to-emerald-900/30 border-emerald-500/50' : 'from-red-600/30 to-red-900/30 border-red-500/50'} backdrop-blur-md border-2 p-5 rounded-2xl hover:scale-105 transition-transform shadow-xl`}>
                  <p className={`text-xs mb-2 uppercase tracking-wider font-bold ${stockInfo.change >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>Change</p>
                  <div className="flex items-center gap-2">
                    {stockInfo.change >= 0 ? <ArrowUp className="w-6 h-6 text-emerald-400" /> : <ArrowDown className="w-6 h-6 text-red-400" />}
                    <p className={`text-3xl font-black ${stockInfo.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stockInfo.change >= 0 ? '+' : ''}{stockInfo.change}
                    </p>
                  </div>
                </div>
                
                <div className={`bg-gradient-to-br ${stockInfo.changePercent >= 0 ? 'from-blue-600/30 to-blue-900/30 border-blue-500/50' : 'from-orange-600/30 to-orange-900/30 border-orange-500/50'} backdrop-blur-md border-2 p-5 rounded-2xl hover:scale-105 transition-transform shadow-xl`}>
                  <p className={`text-xs mb-2 uppercase tracking-wider font-bold ${stockInfo.changePercent >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>Change %</p>
                  <p className={`text-3xl font-black ${stockInfo.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stockInfo.changePercent >= 0 ? '+' : ''}{stockInfo.changePercent}%
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-pink-600/30 to-pink-900/30 backdrop-blur-md border-2 border-pink-500/50 p-5 rounded-2xl hover:scale-105 transition-transform shadow-xl hover:shadow-pink-500/50">
                  <p className="text-xs text-pink-300 mb-2 uppercase tracking-wider font-bold">30-Day High</p>
                  <p className="text-3xl font-black text-white">${stockInfo.high}</p>
                </div>
                
                <div className="bg-gradient-to-br from-amber-600/30 to-amber-900/30 backdrop-blur-md border-2 border-amber-500/50 p-5 rounded-2xl hover:scale-105 transition-transform shadow-xl hover:shadow-amber-500/50">
                  <p className="text-xs text-amber-300 mb-2 uppercase tracking-wider font-bold">30-Day Low</p>
                  <p className="text-3xl font-black text-white">${stockInfo.low}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500/60 text-red-300 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Chart Section */}
            {loading ? (
              <div className="flex items-center justify-center h-96 bg-slate-900/50 rounded-2xl backdrop-blur-sm border-2 border-purple-500/30">
                <div className="text-center">
                  <RefreshCw className="w-20 h-20 text-purple-400 animate-spin mx-auto mb-6" />
                  <p className="text-slate-300 text-xl font-semibold">Loading stock data...</p>
                </div>
              </div>
            ) : stockData.length > 0 ? (
              <div className="bg-slate-900/50 backdrop-blur-md border-2 border-purple-500/30 p-6 md:p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-6">
                  30-Day Price History
                </h2>
                <ResponsiveContainer width="100%" height={450}>
                  <LineChart data={stockData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94a3b8"
                      style={{ fontSize: '13px', fontWeight: 'bold' }}
                      tick={{ fill: '#cbd5e1' }}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      style={{ fontSize: '13px', fontWeight: 'bold' }}
                      domain={['auto', 'auto']}
                      tick={{ fill: '#cbd5e1' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ 
                        paddingTop: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#a855f7" 
                      strokeWidth={4}
                      dot={{ fill: '#a855f7', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                      activeDot={{ r: 8, fill: '#ec4899', stroke: '#fff', strokeWidth: 2 }}
                      name="Stock Price ($)"
                      fill="url(#colorPrice)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : null}
          </div>
        </div>

        {/* Info Banner */}
      </div>
    </div>
  );
};

export default StockMarketViewer;