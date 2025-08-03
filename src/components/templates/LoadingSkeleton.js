// components/templates/LoadingSkeleton.js
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Card } from "../atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";

export default function LoadingSkeleton() {
  return (
    <Card className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[80px] hidden sm:table-cell">#</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Volume (24h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-5 rounded-full" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-8" />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-3 w-6 sm:hidden" />
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-24 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                <Skeleton className="h-4 w-32 ml-auto" />
              </TableCell>
              <TableCell className="text-right hidden lg:table-cell">
                <Skeleton className="h-4 w-28 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}