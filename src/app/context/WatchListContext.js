// context/WatchListContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedWatchList = localStorage.getItem("cryptoWatchList");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cryptoWatchList", JSON.stringify(watchList));
    }
  }, [watchList, isInitialized]);

  const toggleWatchList = (coinId) => {
    setWatchList(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId) 
        : [...prev, coinId]
    );
  };

  return (
    <WatchListContext.Provider value={{ 
      watchList, 
      toggleWatchList,
      isInitialized
    }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
export default WatchListContext;