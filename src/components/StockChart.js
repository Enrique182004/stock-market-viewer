import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const StockChart = ({ data, compareData = null, selectedStock, compareStock = null }) => {
  const { theme } = useTheme();
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 border-2 rounded-xl shadow-2xl ${
          theme === 'dark' 
            ? 'bg-slate-900 border-purple-500' 
            : 'bg-white border-purple-300'
        }`}>
          <p className={`text-sm font-bold mb-2 ${
            theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
          }`}>
            {payload[0].payload.date}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-lg font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`backdrop-blur-md border-2 p-6 md:p-8 rounded-2xl shadow-2xl ${
      theme === 'dark'
        ? 'bg-slate-900/50 border-purple-500/30'
        : 'bg-white/90 border-purple-300'
    }`}>
      <h2 className={`text-3xl font-black mb-6 ${
        theme === 'dark'
          ? 'text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text'
          : 'text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text'
      }`}>
        {compareData ? 'Stock Comparison' : '30-Day Price History'}
      </h2>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? '#475569' : '#cbd5e1'} 
            opacity={0.3} 
          />
          <XAxis 
            dataKey="date" 
            stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
            tick={{ fill: theme === 'dark' ? '#cbd5e1' : '#475569' }}
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
            tick={{ fill: theme === 'dark' ? '#cbd5e1' : '#475569' }}
            domain={['auto', 'auto']}
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
            data={data}
            type="monotone" 
            dataKey="price" 
            stroke="#a855f7" 
            strokeWidth={4}
            dot={{ fill: '#a855f7', r: 4 }}
            activeDot={{ r: 8, fill: '#ec4899' }}
            name={`${selectedStock} ($)`}
          />
          {compareData && (
            <Line 
              data={compareData}
              type="monotone" 
              dataKey="price" 
              stroke="#10b981" 
              strokeWidth={4}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 8, fill: '#059669' }}
              name={`${compareStock} ($)`}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;