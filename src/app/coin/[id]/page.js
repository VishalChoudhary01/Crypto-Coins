"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/atoms/tabs";
import { Badge } from "@/components/atoms/badge";
import { Skeleton } from "@/components/atoms/skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import Image from "next/image";
import CustomTooltip from "@/components/organism/CustomTooltip";

export default function CoinPage() {
  const params = useParams();
  const id = params.id;
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("7");
  const [currency, setCurrency] = useState("usd");

  // Fetch coin data from CoinGecko API
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        
        // Fetch coin details
        const coinResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/coins/${id}`,
          {
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: false,
              developer_data: false,
              sparkline: false,
            },
           
          }
        );
        
        // Fetch market chart data
        const chartResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: currency,
              days: timeRange,
            },
            
          }
        );

        setCoinData(coinResponse.data);
        
        // Transform chart data
        const prices = chartResponse.data.prices;
        const transformedData = prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: price,
        }));
        
        setChartData(transformedData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch coin data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, timeRange, currency]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value >= 0 ? "+" : ""}${value?.toFixed(2)}%`;
  };

  // Format large numbers
  const formatNumber = (value) => {
    if (!value) return "-";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  // Get price change color
  const getPriceChangeColor = (value) => {
    return value >= 0 ? "text-green-500" : "text-red-500";
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-2 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-40 rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <Card className="text-center py-12 border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent>
            <div className="text-red-500 text-xl mb-4">Error</div>
            <p className="mb-6 text-gray-700 dark:text-gray-300">{error}</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <Card className="text-center py-12 border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent>
            <div className="text-xl mb-4 text-gray-900 dark:text-white">Coin not found</div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market
          </Link>
        </Button>
      </div>

      {/* Coin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-white rounded-full p-1 border border-gray-200">
            <Image 
              src={coinData.image.large} 
              alt={coinData.name} 
              width={64}
              height={64}
              className="rounded-full"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {coinData.name} <span className="text-gray-500 dark:text-gray-400 font-normal">({coinData.symbol.toUpperCase()})</span>
            </h1>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(coinData.market_data.current_price[currency])}
          </div>
          <div className={`flex items-center mt-1 ${getPriceChangeColor(coinData.market_data.price_change_percentage_24h)}`}>
            {coinData.market_data.price_change_percentage_24h >= 0 ? 
              <TrendingUp className="h-4 w-4 text-green-500" /> : 
              <TrendingDown className="h-4 w-4 text-red-500" />}
            <span className="ml-1 font-medium">
              {formatPercentage(coinData.market_data.price_change_percentage_24h)}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <Card className="mb-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <CardTitle className="text-gray-900 dark:text-white">Price Chart</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <Tabs 
                value={timeRange} 
                onValueChange={setTimeRange}
                className="flex"
              >
                <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <TabsTrigger value="1" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">24h</TabsTrigger>
                  <TabsTrigger value="7" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">7d</TabsTrigger>
                  <TabsTrigger value="30" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">30d</TabsTrigger>
                  <TabsTrigger value="90" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">90d</TabsTrigger>
                  <TabsTrigger value="365" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">1y</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs 
                value={currency} 
                onValueChange={setCurrency}
                className="flex"
              >
                <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <TabsTrigger value="usd" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">USD</TabsTrigger>
                  <TabsTrigger value="eur" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">EUR</TabsTrigger>
                  <TabsTrigger value="btc" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">BTC</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickCount={6}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value).slice(1)}
                  width={80}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  content={<CustomTooltip currency={currency} />}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#priceGradient)" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Data */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Market Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
                <span className="text-gray-900 dark:text-white">{formatNumber(coinData.market_data.market_cap[currency])}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Trading Volume</span>
                <span className="text-gray-900 dark:text-white">{formatNumber(coinData.market_data.total_volume[currency])}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Circulating Supply</span>
                <span className="text-gray-900 dark:text-white">{coinData.market_data.circulating_supply.toLocaleString()} {coinData.symbol.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Market Rank</span>
                <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">#{coinData.market_cap_rank}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Price Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">24h High</span>
                <span className="text-gray-900 dark:text-white">{formatCurrency(coinData.market_data.high_24h[currency])}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">24h Low</span>
                <span className="text-gray-900 dark:text-white">{formatCurrency(coinData.market_data.low_24h[currency])}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">All-Time High</span>
                <div className="text-right">
                  <div className="text-gray-900 dark:text-white">{formatCurrency(coinData.market_data.ath[currency])}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(coinData.market_data.ath_date[currency]).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">All-Time Low</span>
                <div className="text-right">
                  <div className="text-gray-900 dark:text-white">{formatCurrency(coinData.market_data.atl[currency])}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(coinData.market_data.atl_date[currency]).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}