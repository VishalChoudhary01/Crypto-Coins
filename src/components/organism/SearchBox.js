"use client";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setSearchQuery]);

  return (
    <div className="relative">
      <input
        className="w-full group relative focus:shadow-md shadow transition-all rounded-md caret-slate-500 h-10 px-3 pl-10 py-2 text-slate-500 outline-none ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Search by name or symbol..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <IoSearch className="absolute text-neutral-400 left-3 top-3 text-xl" />
    </div>
  );
};

export default SearchBar;