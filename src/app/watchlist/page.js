"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useWatchList } from "@/app/context/WatchListContext";
import CoinTable from "@/components/templates/CoinTable";
import LoadingSkeleton from "@/components/templates/LoadingSkeleton";
import { Card, CardContent, } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Star } from "lucide-react";
import TimeFilter from "@/components/organism/TimeFilter";
import Link from "next/link";

export default function WatchlistPage() {
  const { watchList, toggleWatchList } = useWatchList();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("24h");
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch watchlist coins data
  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      if (!isInitialized) return;
      
      if (watchList.length === 0) {
        setCoins([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids: watchList.join(","),
              per_page: 250,
              price_change_percentage: timeframe,
              sparkline: false,
            },
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
            },
          }
        );
        setCoins(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch watchlist data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Set initialized state
    if (watchList !== null) {
      setIsInitialized(true);
    }

    if (isInitialized) {
      fetchWatchlistCoins();
    }
  }, [watchList, timeframe, isInitialized]);

  // Handle timeframe change
  const handleTimeframeChange = (value) => {
    setTimeframe(value);
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-full items-center gap-y-6 py-8 md:py-12">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
            Your Watchlist
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your favorite cryptocurrencies
          </p>
        </div>

        <div className="w-full max-w-6xl px-4">
          <div className="mb-6 flex justify-end">
            <div className="w-full md:w-64">
              <TimeFilter 
                sortTimeOption={timeframe} 
                handleTimeFrame={handleTimeframeChange} 
              />
            </div>
          </div>

          {!isInitialized ? (
            <LoadingSkeleton />
          ) : error ? (
            <Card>
              <CardContent className="py-4">
                <div className="text-center text-red-500">
                  <strong>Error! </strong>
                  {error}
                </div>
              </CardContent>
            </Card>
          ) : loading ? (
            <LoadingSkeleton />
          ) : coins.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="flex justify-center mb-4">
                  <Star size={48} className="text-yellow-400 fill-yellow-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Your watchlist is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Add coins to your watchlist by clicking the star icon
                </p>
                <Button asChild>
                  <Link href="/">Browse Cryptocurrencies</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <CoinTable
              coins={coins}
              watchList={watchList}
              toggleWatchList={toggleWatchList}
              timeframe={timeframe}
            />
          )}
        </div>
      </div>
    </section>
  );
}