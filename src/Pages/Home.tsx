import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { Item } from "@/components/ArticleCard";
import ArticleCart from "@/components/ArticleCard";
import SidebarFilters, {
  DEFAULT_FILTERS,
  MAX_PRICE,
  type FilterState,
} from "@/components/Fieldset";
import { useCart } from "@/hooks/useCart";
import { Toast } from "./FavoritesPage";
import type { CartItem } from "@/context/CartContext";
import { useGenre } from "@/hooks/useGenre";
import { useSearch } from "@/hooks/useSearch";
import { MdYoutubeSearchedFor } from "react-icons/md";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import LayoutClient from "@/layouts/LayoutClient";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  // ─── Données loader ───────────────────────────────────────────────────────
  const allItems = useLoaderData().articles as Item[];

  // ─── Hooks pérsonnaliser  ───────────────────────────────────────────────────────
  const { activeGenre } = useGenre();
  const { valueSearch } = useSearch();

  // ─── Filtres (draft = en cours d'édition, applied = actifs) ─────────────
  const [draftFilters, setDraftFilters] =
    useState<FilterState>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(DEFAULT_FILTERS);

  // ─── Pagination ───────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Bottom sheet mobile ──────────────────────────────────────────────────
  const [sheetOpen, setSheetOpen] = useState(false);

  // ─── Toast ────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ visible: false, message: "" });
  const { addItem } = useCart();

  // ─── Filtrage côté client ─────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const { categories, conditions, sizes, price } = appliedFilters;

      if (
        valueSearch &&
        !item.nom.toLocaleLowerCase().includes(valueSearch.toLocaleLowerCase())
      )
        return false;

      // Filtre genre (navbar)
      if (activeGenre === "Femme" && item.genre?.toLowerCase() !== "femme")
        return false;
      if (activeGenre === "Homme" && item.genre?.toLowerCase() !== "homme")
        return false;
      if (activeGenre === "Nouveautés") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        if (!item.date_ajout || new Date(item.date_ajout) < oneWeekAgo)
          return false;
      }

      if (categories.length > 0 && !categories.includes(item.category))
        return false;
      if (conditions.length > 0 && !conditions.includes(item.condition))
        return false;
      if (sizes.length > 0 && item.taille && !sizes.includes(item.taille))
        return false;
      if (item.prix < price[0] || item.prix > price[1]) return false;

      return true;
    });
  }, [allItems, appliedFilters, activeGenre, valueSearch]);

  // ─── Pagination sur les résultats filtrés ─────────────────────────────────
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // ─── Compteur de filtres actifs ───────────────────────────────────────────
  const activeFilterCount =
    draftFilters.categories.length +
    draftFilters.conditions.length +
    draftFilters.sizes.length +
    (draftFilters.price[0] > 0 || draftFilters.price[1] < MAX_PRICE ? 1 : 0);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleApply = () => {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const handleAddToCart = (item: Item) => {
    const cartItem: CartItem = {
      id: item.id_article,
      name: item.nom,
      brand: item.marque,
      image: item.fichiers[0].fichier,
      quantity: 1,
      price: item.prix,
      size: item.taille,
      stock: item.quantite,
    };
    showToast(addItem(cartItem));
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  // ─── Rendu ────────────────────────────────────────────────────────────────
  return (
    <LayoutClient>
      <div className="px-4 py-8 bg-[#F9FAFB]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* ── Sidebar ── */}
          <aside className="hidden lg:block border border-gray-200 rounded-xl p-5 h-fit sticky top-4">
            <SidebarFilters
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={handleApply}
              activeCount={activeFilterCount}
            />
          </aside>

          {/* ── Contenu ── */}
          <main>
            {/* En-tête résultats */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">
                  {filteredItems.length}
                </span>{" "}
                article{filteredItems.length > 1 ? "s" : ""} trouvé
                {filteredItems.length > 1 ? "s" : ""}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-gray-400">
                  Page {currentPage} / {totalPages}
                </p>
              )}
            </div>

            {/* État : vide */}
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">
                    <MdYoutubeSearchedFor />
                  </span>
                </div>
                <p className="text-gray-700 font-semibold">
                  Aucun article ne correspond aux filtres
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Essayez de modifier ou réinitialiser vos filtres.
                </p>
              </div>
            )}

            {/* Grille + Pagination */}
            {currentItems.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {currentItems.map((item) => (
                    <ArticleCart
                      key={item.id_article}
                      item={item}
                      onAddToCart={handleAddToCart}
                      onRemove={() => {}}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Précédent
                    </button>

                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`dots-${index}`}
                          className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as number)}
                          className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-gray-900 text-white shadow-sm"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
      {/* ── FAB Filtres (mobile uniquement) ── */}
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed bottom-6 right-5 z-30 lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-700 active:scale-95 transition-all"
        aria-label="Ouvrir les filtres"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="11" y1="18" x2="13" y2="18" />
        </svg>
        <span className="text-sm font-medium">Filtres</span>
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-gray-900 text-xs font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>
      {/* ── Bottom sheet mobile ── */}
      <FilterBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApply}
        activeCount={activeFilterCount}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </LayoutClient>
  );
}
