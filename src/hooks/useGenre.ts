import { GenreContext } from "@/context/GenreContext";
import { useContext } from "react";

export function useGenre() {
  const ctx = useContext(GenreContext);
  if (!ctx) throw new Error("useGenre doit être utilisé dans un GenreProvider");
  return ctx;
}
