"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../atoms/select";

const SORT_OPTIONS = [
  { value: "market_cap_desc", label: "Market Cap (High to Low)" },
  { value: "market_cap_asc", label: "Market Cap (Low to High)" },
  { value: "volume_desc", label: "Volume (High to Low)" },
  { value: "volume_asc", label: "Volume (Low to High)" },
  { value: "id_desc", label: "Name (Z to A)" },
  { value: "id_asc", label: "Name (A to Z)" },
];

const Filters = ({ sortOption, handleSortChange }) => {
  return (
    <Select value={sortOption} onValueChange={handleSortChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filters;
