# 📈 Trader.pro Frontend

> **Risk-free trading simulation platform for beginners**

A modern, responsive web application built with Next.js that provides new traders with a comprehensive paper trading environment to practice and refine their strategies using historical Indian market data.

## ✨ Features

### 🎯 Core Trading Simulation
- **Virtual Portfolio Management** - Start with ₹500,000 virtual balance
- **Realistic Order Types** - Market orders, limit orders, and stop-loss orders
- **Position Tracking** - Monitor your holdings with real-time P&L calculations
- **Historical Data Replay** - Test strategies using actual market movements

### 📊 Advanced Analytics
- **Interactive Charts** - Powered by TradingView API for professional-grade visualization
- **Performance Dashboard** - Track your trading performance with detailed metrics
- **Trade History** - Complete record of all executed trades
- **Risk Metrics** - Analyze your risk exposure and portfolio allocation

### 🔐 User Experience
- **Firebase Authentication** - Secure OAuth login with Google/email
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Updates** - Live position updates and market data
- **Intuitive Interface** - Clean, beginner-friendly UI design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn/ui
- **Authentication**: Firebase Auth
- **Charts**: TradingView Charting Library
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Firebase project with Authentication enabled
- Backend API running (see [trader.pro-be](https://github.com/Abh1noob/trader.pro-be))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abh1noob/trader.pro-fe.git
   cd trader.pro-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   NEXT_PUBLIC_TRADINGVIEW_API_KEY=your_tradingview_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
trader.pro-fe/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main trading dashboard
│   ├── portfolio/         # Portfolio management
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # Shadcn/ui components
│   ├── charts/           # Chart components
│   ├── trading/          # Trading-specific components
│   └── common/           # Shared components
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   ├── api.ts           # API client setup
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── public/             # Static assets
```

## 🎨 Key Components

### Trading Dashboard
- **OrderBook**: Real-time order placement interface
- **PositionTracker**: Current holdings with P&L calculations
- **ChartContainer**: TradingView integration for market analysis
- **TradeHistory**: Complete transaction history

### Portfolio Management
- **PortfolioOverview**: Account balance and performance metrics
- **AssetAllocation**: Visual breakdown of portfolio composition
- **PerformanceChart**: Historical performance tracking

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication and configure sign-in methods
3. Add your domain to authorized domains
4. Copy configuration to environment variables

### TradingView Integration
1. Obtain TradingView Charting Library license
2. Add the library to your project
3. Configure chart settings in `lib/tradingview.ts`

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically with every push

### Manual Deployment
```bash
npm run build
npm run start
```
---
