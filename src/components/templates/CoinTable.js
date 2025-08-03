// components/templates/CoinTable.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/atoms/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Badge } from "@/components/atoms/badge";

export default function CoinTable({ coins, watchList, toggleWatchList, timeframe }) {
  const getPriceChange = (coin) => {
    const fieldMap = {
      "1h": "price_change_percentage_1h_in_currency",
      "24h": "price_change_percentage_24h_in_currency",
      "7d": "price_change_percentage_7d_in_currency",
      "14d": "price_change_percentage_14d_in_currency",
      "30d": "price_change_percentage_30d_in_currency",
      "200d": "price_change_percentage_200d_in_currency",
      "1y": "price_change_percentage_1y_in_currency",
    };

    const field = fieldMap[timeframe] || "price_change_percentage_24h_in_currency";
    return coin[field] || 0;
  };

  // Get the label for the price change column
  const getTimeframeLabel = () => {
    const labelMap = {
      "1h": "1h",
      "24h": "24h",
      "7d": "7d",
      "14d": "14d",
      "30d": "30d",
      "200d": "200d",
      "1y": "1y",
    };

    return `${labelMap[timeframe] || "24h"} Change`;
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 8 : 2,
    }).format(value);
  };

  const formatNumber = (value) => {
    if (!value) return "-";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[80px] hidden sm:table-cell">#</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">{getTimeframeLabel()}</TableHead>
            <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Volume (24h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => {
            const priceChange = getPriceChange(coin);
            
            return (
              <TableRow key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell>
                  <button
                    onClick={() => toggleWatchList(coin.id)}
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                    aria-label={
                      watchList.includes(coin.id)
                        ? "Remove from watchlist"
                        : "Add to watchlist"
                    }
                  >
                    <Star
                      size={18}
                      fill={watchList.includes(coin.id) ? "#fbbf24" : "none"}
                      className={watchList.includes(coin.id) ? "text-yellow-500" : ""}
                    />
                  </button>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">{coin.market_cap_rank || "-"}</div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex items-center space-x-3 hover:underline"
                  >
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="mt-1">
                          {coin.symbol.toUpperCase()}
                        </Badge>
                        <span className="sm:hidden text-sm text-muted-foreground">
                          #{coin.market_cap_rank || "-"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(coin.current_price)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={priceChange >= 0 ? "positive" : "destructive"}
                    className="min-w-[70px]"
                  >
                    {priceChange?.toFixed(2) || "0.00"}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  {formatNumber(coin.market_cap)}
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  {formatNumber(coin.total_volume)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}