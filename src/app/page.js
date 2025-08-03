"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useWatchList } from "./context/WatchListContext";
import Filters from "@/components/organism/Filters";
import SearchBar from "@/components/organism/SearchBox";
import TimeFilter from "@/components/organism/TimeFilter";
import CoinTable from "@/components/templates/CoinTable";
import LoadingSkeleton from "@/components/templates/LoadingSkeleton";
import Pagination from "@/components/templates/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";

export default function Home() {
  const [coinsData, setCoinsData] = useState([]);
  const [sortOption, setSortOption] = useState("market_cap_desc");
  const [timeframe, setTimeframe] = useState("24h");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const { watchList, toggleWatchList } = useWatchList();

  // Fetch coins data
  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/coins/markets?`,
          {
            params: {
              vs_currency: "usd",
              per_page: 50,
              page: page,
              order: sortOption,
              price_change_percentage: timeframe,
            },
           
          }
        );
        setCoinsData(response.data);
        setError(null);
        
        setTotalPages(Math.ceil(1000 / 50)); 
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("API call failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinsData();
  }, [page, sortOption, timeframe]);

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOption(value);
    setPage(1);
  };

  // Handle timeframe change
  const handleTimeframeChange = (value) => {
    setTimeframe(value);
    setPage(1);
  };

  // Filter coins based on search
  const filteredCoins = coinsData.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section className="w-full">
      <div className="flex flex-col w-full items-center gap-y-6 py-8 md:py-12">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
            Unlock the Best Coin Prices
          </h1>
          <p className="text-muted-foreground mt-2">
            Your Ultimate Crypto Tracker
          </p>
        </div>

        {/* Search and Filters */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Search Cryptocurrencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>View Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Filters
                    sortOption={sortOption}
                    handleSortChange={handleSortChange}
                  />
                  <TimeFilter
                    sortTimeOption={timeframe}
                    handleTimeFrame={handleTimeframeChange}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Section */}
          {error ? (
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
          ) : filteredCoins.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold mb-2">
                  No cryptocurrencies found
                </h2>
                <p className="text-muted-foreground">
                  Try adjusting your search
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <CoinTable
                coins={filteredCoins}
                watchList={watchList}
                toggleWatchList={toggleWatchList}
                timeframe={timeframe}
              />
              <Pagination 
                page={page} 
                setPage={setPage} 
                totalPages={totalPages} 
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}