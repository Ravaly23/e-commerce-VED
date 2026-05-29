import { useState } from "react";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FiTrash2, FiFilter, FiGrid, FiList, FiShare2 } from "react-icons/fi";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FavoriteItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: "1",
    name: "Robe Midi Florale",
    brand: "Élara Paris",
    price: 89000,
    originalPrice: 120000,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    category: "Femme",
    colors: ["#E8C5A0", "#2C3E50", "#C0392B"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    discount: 26,
  },
  {
    id: "2",
    name: "Veste en Lin Beige",
    brand: "Maison Soa",
    price: 145000,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4e58?w=400&q=80",
    category: "Femme",
    colors: ["#D4C5A9", "#8B7355"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Chemise Oxford Slim",
    brand: "Gentleman MG",
    price: 72000,
    originalPrice: 95000,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    category: "Homme",
    colors: ["#FFFFFF", "#4A90D9", "#2C3E50"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.3,
    reviewCount: 209,
    inStock: false,
    discount: 24,
  },
  {
    id: "4",
    name: "Sneakers Canvas Blanc",
    brand: "Urban Step",
    price: 58000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    category: "Accessoires",
    colors: ["#FFFFFF", "#1A1A1A"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    isNew: true,
  },
  {
    id: "5",
    name: "Sac Tote Cuir Naturel",
    brand: "Maison Soa",
    price: 198000,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    category: "Accessoires",
    colors: ["#C8A882", "#1A1A1A"],
    sizes: ["Unique"],
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
  },
  {
    id: "6",
    name: "Pantalon Cargo Kaki",
    brand: "Street Mada",
    price: 67000,
    originalPrice: 89000,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
    category: "Homme",
    colors: ["#6B7C5C", "#1A1A1A", "#8B7355"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.2,
    reviewCount: 156,
    inStock: true,
    discount: 25,
  },
];

const CATEGORIES = ["Tous", "Femme", "Homme", "Accessoires", "Enfant"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: number): string {
  return (
    new Intl.NumberFormat("fr-MG", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " Ar"
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.floor(rating) ? (
          <HiStar key={star} className="text-amber-400 text-xs" />
        ) : (
          <HiOutlineStar key={star} className="text-gray-300 text-xs" />
        ),
      )}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function FavoriteCard({
  item,
  view,
  onRemove,
  onAddToCart,
}: {
  item: FavoriteItem;
  view: "grid" | "list";
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!item.inStock) return;
    setAddedToCart(true);
    onAddToCart(item.id);
    setTimeout(() => setAddedToCart(false), 2000);
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
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {item.discount && (
            <span className="absolute top-1 left-1 text-[10px] font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded">
              -{item.discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {item.brand}
          </p>
          <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
            {item.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={item.rating} />
            <span className="text-xs text-gray-400">({item.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            {item.colors.map((c) => (
              <span
                key={c}
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {!item.inStock && (
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
                : item.inStock
                  ? "bg-gray-900 hover:bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            disabled={!item.inStock}
          >
            <MdOutlineShoppingCart className="mr-1" />
            {addedToCart ? "Ajouté !" : "Ajouter au panier"}
          </Button>
          <button
            onClick={() => onRemove(item.id)}
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
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-108" : "scale-100"
          }`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {item.isNew && (
            <span className="text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              Nouveau
            </span>
          )}
          {item.discount && (
            <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
              -{item.discount}%
            </span>
          )}
          {!item.inStock && (
            <span className="text-[10px] font-semibold bg-gray-400 text-white px-2 py-0.5 rounded-full">
              Épuisé
            </span>
          )}
        </div>

        {/* Remove button enleve favoris*/} 
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
          aria-label="Retirer des favoris"
        >
          <MdFavorite className="text-sm" />
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
                : item.inStock
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            size="sm"
            onClick={handleAddToCart}
            disabled={!item.inStock}
          >
            <MdOutlineShoppingCart className="mr-1.5 text-sm" />
            {addedToCart
              ? "✓ Ajouté au panier !"
              : item.inStock
                ? "Ajouter au panier"
                : "Indisponible"}
          </Button>
          <Button
            className="w-full text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 mt-2"
            size="sm"
            disabled={!item.inStock}
          >
            <TbListDetails className="mr-1.5 text-sm" />
            Voir les détailles
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
          {item.brand}
        </p>
        <p className="text-sm font-semibold text-gray-900 truncate mt-0.5 leading-tight">
          {item.name}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <StarRating rating={item.rating} />
          <span className="text-[10px] text-gray-400">
            ({item.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
          {/* Color swatches */}
          <div className="flex items-center gap-1">
            {item.colors.slice(0, 3).map((c) => (
              <span
                key={c}
                className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                style={{ background: c }}
              />
            ))}
            {item.colors.length > 3 && (
              <span className="text-[10px] text-gray-400">
                +{item.colors.length - 3}
              </span>
            )}
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
export function Toast({ message, visible }: { message: string; visible: boolean }) {
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
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(MOCK_FAVORITES);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "default" | "price_asc" | "price_desc" | "rating"
  >("default");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    showToast("Article retiré des favoris");
  };

  const handleRemoveSelected = () => {
    setFavorites((prev) => prev.filter((f) => !selected.has(f.id)));
    showToast(`${selected.size} article(s) retiré(s)`);
    setSelected(new Set());
    setSelectMode(false);
  };

  const handleAddToCart = (id: string) => {
    showToast("Article ajouté au panier !");
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
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
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
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
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
                      key={item.id}
                      style={{ animationDelay: `${i * 60}ms` }}
                      className="relative"
                    >
                      {/* Checkbox sélection */}
                      {selectMode && (
                        <button
                          onClick={() => toggleSelect(item.id)}
                          className={`absolute top-2 left-2 z-10 w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${
                            selected.has(item.id)
                              ? "bg-gray-900 border-gray-900 text-white"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {selected.has(item.id) && (
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
                      key={item.id}
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
                    {filtered.filter((f) => f.inStock).length} article(s)
                    disponible(s) à l'achat
                  </p>
                  <Button
                    className="bg-gray-900 hover:bg-gray-700 text-white text-sm px-6 flex items-center gap-2"
                    onClick={() => {
                      filtered
                        .filter((f) => f.inStock)
                        .forEach((f) => handleAddToCart(f.id));
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
