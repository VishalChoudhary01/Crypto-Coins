"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../atoms/select"; // Ensure this is correctly aliasing ShadCN components

const TIMEFRAME_OPTIONS = [
  { value: "1h", label: "1 Hour" },
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "14d", label: "14 Days" },
  { value: "30d", label: "30 Days" },
  { value: "200d", label: "200 Days" },
  { value: "1y", label: "1 Year" },
];

const TimeFilter = ({ sortTimeOption, handleTimeFrame }) => {
  return (
    <Select value={sortTimeOption} onValueChange={handleTimeFrame}>
      <SelectTrigger>
        <SelectValue placeholder="Select timeframe" />
      </SelectTrigger>
      <SelectContent>
        {TIMEFRAME_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeFilter;
