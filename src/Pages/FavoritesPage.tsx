import { useState } from "react";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FiTrash2, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { Item } from "@/components/ArticleCard";
import { FaRegHeart } from "react-icons/fa";
import formatPrice from "@/utils/formatPrice";
import type { CartItem } from "@/context/CartContext";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { TbListDetails } from "react-icons/tb";

const CATEGORIES = ["Tous", "Femme", "Homme"];

// ─── Product Card ─────────────────────────────────────────────────────────────
function FavoriteCard({
  item,
  view,
  onRemove,
  onAddToCart,
}: {
  item: Item;
  view: "grid" | "list";
  onRemove: (id: string) => void;
  onAddToCart: (item: Item) => void;
}) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigation = useNavigate();

  const handleAddToCart = () => {
    if (item.quantite === 0) return;
    setAddedToCart(true);
    onAddToCart(item);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSeeDetail = (item: Item) => {
    navigation(`/article/${item.id_article}`);
  };

  if (view === "list") {
    return (
      <div
        className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200"
        style={{ animation: "fadeSlideIn 0.3s ease-out both" }}
      >
        {/* Image */}
        <div className="relative shrink-0 w-24 h-28 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={item.fichiers[0].fichier}
            alt={item.fichiers[0].type}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {item.marque}
          </p>
          <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
            {item.nom}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center gap-2 mt-1">
              <FaRegHeart className="text-red-600 text-xs" />
              <span className="text-xs text-gray-400 ml-1">
                {item.total_likes > 0 ? item.total_likes : "Aucune note"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(item.prix)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {item.quantite === 0 && (
            <Badge
              variant="outline"
              className="text-xs text-gray-400 border-gray-200"
            >
              Rupture de stock
            </Badge>
          )}
          <Button
            size="sm"
            className={`text-xs transition-all ${
              addedToCart
                ? "bg-green-600 hover:bg-green-600 text-white"
                : item.quantite !== 0
                  ? "bg-gray-900 hover:bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            disabled={item.quantite === 0}
          >
            <MdOutlineShoppingCart className="mr-1" />
            {addedToCart ? "Ajouté !" : "Ajouter au panier"}
          </Button>
          <button
            onClick={() => onRemove(item.id_article)}
            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <FiTrash2 className="text-xs" />
            Retirer
          </button>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
      style={{ animation: "fadeSlideIn 0.3s ease-out both" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-50">
        <img
          src={item.fichiers[0].fichier}
          alt={item.fichiers[0].type}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-108" : "scale-100"
          }`}
        />

        {/* Remove button enleve favoris*/}
        <button
          onClick={() => onRemove(item.id_article)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
          aria-label="Retirer des favoris"
        >
          <MdFavorite className="text-sm text-red-600" />
        </button>

        {/* CTA hover overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/70 to-transparent transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <Button
            className={`w-full text-xs font-semibold transition-all ${
              addedToCart
                ? "bg-green-500 hover:bg-green-500 text-white"
                : item.quantite !== 0
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            size="sm"
            onClick={handleAddToCart}
            disabled={item.quantite === 0}
          >
            <MdOutlineShoppingCart className="mr-1.5 text-sm" />
            {addedToCart
              ? "✓ Ajouté au panier !"
              : item.quantite !== 0
                ? "Ajouter au panier"
                : "Indisponible"}
          </Button>
          <Button
            className="w-full text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 mt-2"
            size="sm"
            disabled={item.quantite === 0}
            onClick={() => handleSeeDetail(item)}
          >
            <TbListDetails className="mr-1.5 text-sm" />
            Voir les détailles
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
          {item.marque}
        </p>
        <p className="text-sm font-semibold text-gray-900 truncate mt-0.5 leading-tight">
          {item.marque}
        </p>

        {/* nombre like */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center gap-2 mt-1">
            <FaRegHeart className="text-red-600 text-xs" />
            <span className="text-xs text-gray-400 ml-1">
              {item.total_likes > 0 ? item.total_likes : "Aucune note"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(item.prix)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <MdFavoriteBorder className="text-4xl text-red-300" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Aucun article en favori
      </h2>
      <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
        Ajoutez des articles à vos favoris en cliquant sur l'icône ♥ sur les
        produits qui vous plaisent.
      </p>
      <Button
        className="bg-gray-900 hover:bg-gray-700 text-white text-sm px-6"
        onClick={onBrowse}
      >
        Découvrir la collection
      </Button>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg z-50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function FavoritesPage() {
  const allItems = useLoaderData();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Item[]>(allItems);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "default" | "price_asc" | "price_desc" | "note"
  >("default");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const { user } = useAuth();

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const handleRemove = async (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id_article !== id));

    const body = {
      id_article: id,
      id_client: user?.id,
    };

    try {
      const { data, status } = await api.post(
        "article/toggle_note_article/",
        body,
      );

      if (status !== 200 && status !== 201) throw new Error(data.message);
      showToast("Article retiré des favoris");
    } catch (error) {}
  };

  const handleRemoveSelected = () => {
    const tabSelected = Array.from(selected); // transformer en tableau id_article séletionner

    setFavorites((prev) => prev.filter((f) => !selected.has(f.id_article)));

    tabSelected.map(async (item) => {
      const body = {
        id_article: item,
        id_client: user?.id,
      };

      try {
        const { data, status } = await api.post(
          "article/toggle_note_article/",
          body,
        );

        if (status !== 200 && status !== 201) throw new Error(data.message);

        showToast("Article retiré des favoris");
      } catch (error: any) {
        console.error(error.response?.message);
      }
    });

    showToast(`${selected.size} article(s) retiré(s)`);
    setSelected(new Set());
    setSelectMode(false);
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

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Filter + sort
  const filtered = favorites
    .filter((f) => activeCategory === "Tous" || f.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.prix - b.prix;
      if (sortBy === "price_desc") return b.prix - a.prix;
      if (sortBy === "note") return b.total_likes - a.total_likes;
      return 0;
    });

  return (
    <>
      {/* Keyframe style */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scale-108 { transform: scale(1.08); }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto px-8 md:px-6 py-8">
          {/* ── EN-TÊTE ───────────────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MdFavorite className="text-red-500 text-xl" />
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Mes Favoris
                </h1>
                {favorites.length > 0 && (
                  <Badge className="bg-red-100 text-red-600 hover:bg-red-100 font-semibold text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {favorites.length === 0
                  ? "Votre liste de favoris est vide"
                  : `${filtered.length} article${filtered.length > 1 ? "s" : ""} sauvegardé${filtered.length > 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Actions globales */}
            {favorites.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs hidden sm:flex items-center gap-1.5"
                  onClick={() => {
                    setSelectMode((v) => !v);
                    setSelected(new Set());
                  }}
                >
                  <FiFilter className="text-xs" />
                  {selectMode ? "Annuler" : "Sélectionner"}
                </Button>
                {selectMode && selected.size > 0 && (
                  <Button
                    size="sm"
                    className="text-xs bg-red-500 hover:bg-red-600 text-white flex items-center gap-1.5"
                    onClick={handleRemoveSelected}
                  >
                    <FiTrash2 className="text-xs" />
                    Retirer ({selected.size})
                  </Button>
                )}
              </div>
            )}
          </div>

          {favorites.length === 0 ? (
            <EmptyState onBrowse={() => navigate("/home")} />
          ) : (
            <>
              {/* ── FILTRES + VUES ────────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                {/* Catégories */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                  {CATEGORIES.map((cat) => {
                    const count =
                      cat === "Tous"
                        ? favorites.length
                        : favorites.filter((f) => f.category === cat).length;

                    if (cat !== "Tous" && count === 0) return null;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                          activeCategory === cat
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {cat}
                        {count > 0 && (
                          <span
                            className={`ml-1 ${activeCategory === cat ? "text-gray-300" : "text-gray-400"}`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Tri + Vue */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
                  >
                    <option value="default">Trier par</option>
                    <option value="price_asc">Prix croissant</option>
                    <option value="price_desc">Prix décroissant</option>
                    <option value="rating">Mieux notés</option>
                  </select>

                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-1.5 transition-colors ${view === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
                      aria-label="Vue grille"
                    >
                      <FiGrid className="text-sm" />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-1.5 transition-colors ${view === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
                      aria-label="Vue liste"
                    >
                      <FiList className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── GRILLE / LISTE ────────────────────────────────────── */}
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-sm text-gray-400">
                    Aucun article dans cette catégorie.
                  </p>
                  <button
                    className="mt-2 text-sm text-gray-600 underline"
                    onClick={() => setActiveCategory("Tous")}
                  >
                    Voir tous les favoris
                  </button>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map((item, i) => (
                    <div
                      key={item.id_article}
                      style={{ animationDelay: `${i * 60}ms` }}
                      className="relative"
                    >
                      {/* Checkbox sélection */}
                      {selectMode && (
                        <button
                          onClick={() => toggleSelect(item.id_article)}
                          className={`absolute top-2 left-2 z-10 w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${
                            selected.has(item.id_article)
                              ? "bg-gray-900 border-gray-900 text-white"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {selected.has(item.id_article) && (
                            <span className="text-xs">✓</span>
                          )}
                        </button>
                      )}
                      <FavoriteCard
                        item={item}
                        view="grid"
                        onRemove={handleRemove}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filtered.map((item, i) => (
                    <div
                      key={item.id_article}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <FavoriteCard
                        item={item}
                        view="list"
                        onRemove={handleRemove}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── FOOTER ACTION ─────────────────────────────────────── */}
              {filtered.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-500">
                    {filtered.filter((f) => f.quantite).length} article(s)
                    disponible(s) à l'achat
                  </p>
                  <Button
                    className="bg-gray-900 hover:bg-gray-700 text-white text-sm px-6 flex items-center gap-2"
                    onClick={() => {
                      filtered
                        .filter((f) => f.quantite)
                        .forEach((f) => handleAddToCart(f));
                      showToast(
                        "Tous les articles disponibles ajoutés au panier !",
                      );
                    }}
                  >
                    <MdOutlineShoppingCart />
                    Tout ajouter au panier
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Toast notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
