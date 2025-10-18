import { useState, useEffect } from 'react';

export const useStockData = (apiKey) => {
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
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'IBM', name: 'IBM Corporation' },
    { symbol: 'NFLX', name: 'Netflix Inc.' }
  ];

  const fetchStockData = async (stockSymbol = selectedStock) => {
    setLoading(true);
    setError(null);

    try {
      if (!apiKey || apiKey === 'demo') {
        throw new Error('Please add your Alpha Vantage API key to .env file as REACT_APP_ALPHA_VANTAGE_API_KEY');
      }

      // Fetch daily time series data (last 100 days)
      const timeSeriesUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`;
      
      const timeSeriesResponse = await fetch(timeSeriesUrl);
      const timeSeriesData = await timeSeriesResponse.json();

      // Check for API errors
      if (timeSeriesData['Error Message']) {
        throw new Error('Invalid stock symbol or API error');
      }

      if (timeSeriesData['Note']) {
        throw new Error('API call limit reached. Please try again later (Alpha Vantage free tier: 25 calls/day)');
      }

      if (!timeSeriesData['Time Series (Daily)']) {
        throw new Error('No data available. Please check your API key.');
      }

      // Fetch quote data for current price
      const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;
      const quoteResponse = await fetch(quoteUrl);
      const quoteData = await quoteResponse.json();

      // Transform time series data
      const timeSeries = timeSeriesData['Time Series (Daily)'];
      const dates = Object.keys(timeSeries).slice(0, 30).reverse(); // Last 30 days

      const transformedData = dates.map(date => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: parseFloat(timeSeries[date]['4. close']),
        volume: parseInt(timeSeries[date]['5. volume']),
        high: parseFloat(timeSeries[date]['2. high']),
        low: parseFloat(timeSeries[date]['3. low']),
        open: parseFloat(timeSeries[date]['1. open'])
      }));

      setStockData(transformedData);

      // Set current stock info from quote
      const quote = quoteData['Global Quote'];
      if (quote && Object.keys(quote).length > 0) {
        const currentPrice = parseFloat(quote['05. price']);
        const change = parseFloat(quote['09. change']);
        const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));

        // Calculate 30-day high and low
        const prices = transformedData.map(d => d.price);
        const highs = transformedData.map(d => d.high);
        const lows = transformedData.map(d => d.low);

        setStockInfo({
          currentPrice: currentPrice.toFixed(2),
          change: change.toFixed(2),
          changePercent: changePercent.toFixed(2),
          high: Math.max(...highs).toFixed(2),
          low: Math.min(...lows).toFixed(2),
          volume: quote['06. volume'],
          previousClose: parseFloat(quote['08. previous close']).toFixed(2)
        });
      } else {
        // Fallback to time series data if quote is unavailable
        const latestPrice = transformedData[transformedData.length - 1].price;
        const previousPrice = transformedData[transformedData.length - 2].price;
        const change = latestPrice - previousPrice;
        const changePercent = ((change / previousPrice) * 100);

        setStockInfo({
          currentPrice: latestPrice.toFixed(2),
          change: change.toFixed(2),
          changePercent: changePercent.toFixed(2),
          high: Math.max(...transformedData.map(d => d.high)).toFixed(2),
          low: Math.min(...transformedData.map(d => d.low)).toFixed(2),
        });
      }

      return transformedData;

    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError(err.message || 'Failed to fetch stock data. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey && apiKey !== 'demo') {
      fetchStockData();
    } else {
      setError('Please add your Alpha Vantage API key to continue');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock]);

  return {
    selectedStock,
    setSelectedStock,
    stockData,
    loading,
    error,
    stockInfo,
    stockOptions,
    refetch: fetchStockData
  };
};