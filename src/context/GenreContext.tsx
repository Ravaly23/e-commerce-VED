import { createContext, useState } from "react";
import type { ReactNode } from "react";
export type Genre = "Toutes catégories" | "Nouveautés" | "Femme" | "Homme";

interface GenreContextType {
  activeGenre: Genre;
  setActiveGenre: (genre: Genre) => void;
}

export const GenreContext = createContext<GenreContextType | null>(null);

export function GenreProvider({ children }: { children: ReactNode }) {
  const [activeGenre, setActiveGenre] = useState<Genre>("Toutes catégories");
  return (
    <GenreContext.Provider value={{ activeGenre, setActiveGenre }}>
      {children}
    </GenreContext.Provider>
  );
}
