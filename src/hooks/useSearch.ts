import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error("useGenre doit être utilisé dans un SearchProvider");
  return ctx;
}
