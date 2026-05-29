import { createContext, useState, type ReactNode } from "react";

interface SearchContextType {
  valueSearch: string;
  setValueSearch: (valueSearch: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {

  const [valueSearch, setValueSearch] = useState("");

  return (
    <SearchContext.Provider value={{ valueSearch, setValueSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
