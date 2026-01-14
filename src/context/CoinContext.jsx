/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback, useMemo } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = (props) => {

const [selectedFilters, setSelectedFilters] = useState(["all"]);
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    Symbol: "$",
  });
  const [isLoading, setIsLoading] = useState(false);

  /* 
    Adding error handling and loading states to API calls ensures a robust
    data layer. We use useCallback to memoize the fetch function and useMemo
    for the context value to prevent unnecessary re-renders.
  */

  const fetchAllCoin = useCallback(async () => {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_CG_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    // Add API key as query parameter if available
    const url = apiKey
      ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&x_cg_demo_api_key=${apiKey}`
      : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      const data = await res.json();

      if (Array.isArray(data)) {
        setAllCoin(data);
      } else {
        console.error("Invalid API response:", data);
        setAllCoin([]);
      }
    } catch (err) {
      console.error("Failed to fetch coins:", err);
      console.log("Note: If you see a CORS error, you need to either:");
      console.log("1. Add a CORS extension to your browser (like 'CORS Unblock')");
      console.log("2. Set up a backend proxy server");
      console.log("3. Get a CoinGecko API key and add it to .env file as VITE_CG_API_KEY");
      setAllCoin([]);
    } finally {
      setIsLoading(false);
    }
  }, [currency.name]);

  useEffect(() => {
    fetchAllCoin();
  }, [fetchAllCoin]);

      const filteredCoins = useMemo(() => {
    if (!Array.isArray(allCoin) || allCoin.length === 0) return [];

    // Only "all" selected
    if (
      selectedFilters.length === 1 &&
      selectedFilters[0] === "all"
    ) {
      return allCoin;
    }

    let result = [];

    // Trending
    if (selectedFilters.includes("trending")) {
      const trendingCoins = [...allCoin]
        .sort((a, b) => b.total_volume - a.total_volume)
        .slice(0, 20);
      result.push(...trendingCoins);
    }

    // Top Gainers
    if (selectedFilters.includes("top_gainers")) {
      const topGainers = [...allCoin]
        .filter(
          (coin) =>
            coin.price_change_percentage_24h !== null &&
            coin.price_change_percentage_24h > 0
        )
        .sort(
          (a, b) =>
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
        )
        .slice(0, 20);
      result.push(...topGainers);
    }

    // Remove duplicates
    return Array.from(
      new Map(result.map((coin) => [coin.id, coin])).values()
    );
  }, [allCoin, selectedFilters]);

  const contextValue = useMemo(() => ({
        filteredCoins,
      selectedFilters,
      setSelectedFilters,
        allCoin,
        currency,
        setCurrency,
        isLoading,
  }), [allCoin, currency, isLoading, filteredCoins, selectedFilters]);
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};