import { useState, useEffect } from 'react';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('stockPortfolio');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('stockPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (item) => {
    setPortfolio(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const removeFromPortfolio = (id) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
  };

  const calculateStats = () => {
    let totalValue = 0;
    let totalCost = 0;

    portfolio.forEach(item => {
      totalValue += item.shares * item.currentPrice;
      totalCost += item.shares * item.purchasePrice;
    });

    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent = totalCost > 0 
      ? ((totalGainLoss / totalCost) * 100).toFixed(2) 
      : 0;

    return {
      totalValue: totalValue.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalGainLoss: totalGainLoss.toFixed(2),
      totalGainLossPercent
    };
  };

  const exportToCSV = () => {
    const headers = [
      'Symbol', 'Name', 'Shares', 'Purchase Price', 'Current Price',
      'Total Cost', 'Current Value', 'Gain/Loss', 'Gain/Loss %'
    ];
    
    const rows = portfolio.map(item => {
      const currentValue = item.shares * item.currentPrice;
      const costBasis = item.shares * item.purchasePrice;
      const gainLoss = currentValue - costBasis;
      const gainLossPercent = ((gainLoss / costBasis) * 100).toFixed(2);
      
      return [
        item.symbol, item.name, item.shares,
        item.purchasePrice.toFixed(2), item.currentPrice.toFixed(2),
        costBasis.toFixed(2), currentValue.toFixed(2),
        gainLoss.toFixed(2), gainLossPercent
      ];
    });

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    calculateStats,
    exportToCSV
  };
};