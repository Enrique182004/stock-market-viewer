# Stock Market Viewer

A real-time stock market dashboard built with React. Track stocks, compare prices, and manage your portfolio.

🔗 **[Live Demo](https://Enrique182004.github.io/stock-market-viewer)**

## Features

- View real-time stock prices and 30-day charts
- Compare multiple stocks side-by-side
- Track your portfolio with gain/loss calculations
- Export portfolio data to CSV
- Dark/Light theme toggle
- Mobile responsive design

## Tech Stack

- React 19
- Tailwind CSS
- Recharts (data visualization)
- Alpha Vantage API (stock data)

## Setup

1. Clone the repo
```bash
git clone https://github.com/Enrique182004/stock-market-viewer.git
cd stock-market-viewer
```

2. Install dependencies
```bash
npm install
```

3. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

4. Create `.env` file in the root directory
```
REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

5. Run the app
```bash
npm start
```

## Commands

```bash
npm start       # Start development server
npm run build   # Build for production
npm run deploy  # Deploy to GitHub Pages
```

## Project Structure

```
src/
├── contexts/      # Theme context
├── hooks/         # Custom hooks (stock data, portfolio)
├── components/    # Reusable components
└── App.js         # Main app
```

## API Limitations

Free tier: 25 API calls per day (enough for ~12 stock checks)

## Author

Built by [Enrique](https://github.com/Enrique182004) as a learning project

## License

MIT

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Styling:** Tailwind CSS 3.4.1
- **Charts:** Recharts 3.2.1
- **Icons:** Lucide React 0.545.0
- **API:** Alpha Vantage (Stock Market Data)
- **Build Tool:** Create React App 5.0.1
- **Deployment:** GitHub Pages

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Alpha Vantage API Key ([Get Free Key](https://www.alphavantage.co/support/#api-key))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Enrique182004/stock-market-viewer.git
   cd stock-market-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 🔑 API Configuration

This project uses the **Alpha Vantage API** for real-time stock data.

### Getting Your API Key
1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Enter your email to receive a free API key
3. Add the key to your `.env` file

### API Limitations (Free Tier)
- **25 API calls per day**
- **5 API calls per minute**
- Each stock selection uses 2 API calls (time series + quote)
- ~12 stock checks per day on free tier

## 📁 Project Structure

```
src/
├── contexts/
│   └── ThemeContext.js          # Theme state management
├── hooks/
│   ├── useStockData.js          # Stock data fetching logic
│   └── usePortfolio.js          # Portfolio management logic
├── components/
│   ├── LoadingSkeleton.js       # Loading state component
│   ├── ThemeToggle.js           # Theme switcher button
│   ├── StockSelector.js         # Stock dropdown selector
│   ├── StatCard.js              # Reusable metric card
│   ├── StockChart.js            # Chart visualization
│   ├── ComparisonModal.js       # Stock comparison interface
│   └── PortfolioModal.js        # Portfolio view & export
├── App.js                       # Main application component
├── App.css                      # Global styles
├── index.js                     # React entry point
└── index.css                    # Tailwind imports
```

## 🎨 Features in Detail

### Stock Data Visualization
- 30-day historical price charts
- Real-time price updates
- Daily high/low tracking
- Volume information
- Percentage change indicators

### Portfolio Management
- Add stocks with custom share counts
- Track purchase price vs current price
- Automatic gain/loss calculation
- Total portfolio value tracking
- One-click CSV export

### Stock Comparison
- Select up to 2 stocks to compare
- Side-by-side price visualization
- Same-scale chart for easy comparison
- Color-coded for clarity

### Theme System
- Persistent theme preference (localStorage)
- Smooth theme transitions
- Optimized color schemes for readability
- System-wide theme consistency

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Update `package.json` homepage**
   ```json
   "homepage": "https://yourusername.github.io/stock-market-viewer"
   ```

2. **Build and deploy**
   ```bash
   npm run build
   npm run deploy
   ```

The app will be live at your GitHub Pages URL.

### Environment Variables in Production

For production deployment with environment variables:
- Use your hosting platform's environment variable settings
- Never commit `.env` files to GitHub
- Consider using services like Netlify or Vercel for easier env var management

## 🧪 Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run deploy     # Deploy to GitHub Pages
```

## 📊 Supported Stocks

Currently includes 10 major stocks:
- AAPL (Apple Inc.)
- GOOGL (Alphabet Inc.)
- MSFT (Microsoft Corporation)
- AMZN (Amazon.com Inc.)
- TSLA (Tesla Inc.)
- META (Meta Platforms Inc.)
- NVDA (NVIDIA Corporation)
- JPM (JPMorgan Chase & Co.)
- IBM (IBM Corporation)
- NFLX (Netflix Inc.)

*Easy to extend - add more symbols in `useStockData.js`*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Enrique**
- GitHub: [@Enrique182004](https://github.com/Enrique182004)
- Project: [Stock Market Viewer](https://github.com/Enrique182004/stock-market-viewer)

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing free stock market data API
- [Recharts](https://recharts.org/) for beautiful chart components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for clean, consistent icons

## 📈 Future Enhancements

- [ ] Real-time price updates (WebSocket integration)
- [ ] News feed integration
- [ ] Advanced technical indicators (RSI, MACD)
- [ ] Watchlist functionality
- [ ] Price alert notifications
- [ ] Multi-currency support
- [ ] Historical performance reports
- [ ] Sector analysis
