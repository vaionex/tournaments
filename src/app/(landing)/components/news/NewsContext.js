"use client";

import { createContext, useContext, useState } from "react";

const NewsContext = createContext({
  searchQuery: "",
  setSearchQuery: () => {},
  selectedTopic: "",
  setSelectedTopic: () => {},
});

export function NewsProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  return (
    <NewsContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedTopic,
        setSelectedTopic,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export const useNews = () => useContext(NewsContext);