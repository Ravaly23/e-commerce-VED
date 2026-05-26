import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiChevronRight, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/context/CartContext";
import CartRow from "@/components/CartRow";
import formatPrice from "@/utils/formatPrice";

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Livraison standard",
    delay: "5–7 jours",
    price: 5000,
  },
  {
    id: "express",
    label: "Livraison express",
    delay: "1–2 jours",
    price: 12000,
  },
  { id: "pickup", label: "Point relais", delay: "3–5 jours", price: 2500 },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg z-50 whitespace-nowrap transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      {message}
    </div>
  );
}

// ─── CartItem Row ─────────────────────────────────────────────────────────────
// function CartRow({
//   item,
//   onQtyChange,
//   onRemove,
//   onMoveToFav,
//   isFav,
// }: {
//   item: CartItem;
//   onQtyChange: (id: string, qty: number) => void;
//   onRemove: (id: string) => void;
//   onMoveToFav: (id: string) => void;
//   isFav: boolean;
// }) {
//   return (
//     <div
//       className="group flex gap-4 py-5 border-b border-gray-100 last:border-0 animate-in fade-in slide-in-from-bottom-2 duration-200"
//     >
//       {/* Image */}
//       <div className="relative shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-gray-50">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         {item.discount && (
//           <span className="absolute top-1.5 left-1.5 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
//             -{item.discount}%
//           </span>
//         )}
//       </div>

//       {/* Détails */}
//       <div className="flex-1 min-w-0 flex flex-col justify-between">
//         <div>
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{item.brand}</p>
//               <p className="text-sm font-semibold text-gray-900 truncate leading-tight mt-0.5">{item.name}</p>
//             </div>
//             {/* Prix */}
//             <div className="text-right shrink-0">
//               <p className="text-sm font-bold text-gray-900">{fmt(item.price * item.quantity)}</p>
//               {item.originalPrice && (
//                 <p className="text-xs text-gray-400 line-through">{fmt(item.originalPrice * item.quantity)}</p>
//               )}
//             </div>
//           </div>

//           {/* Variantes sélectionnées */}
//           <div className="flex items-center gap-2 mt-2">
//             <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
//               <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ background: item.colorHex }} />
//               {item.selectedColor}
//             </span>
//             <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
//               Taille: {item.selectedSize}
//             </span>
//             {item.quantity >= item.maxStock && (
//               <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-200 bg-amber-50 py-0.5">
//                 Stock limité
//               </Badge>
//             )}
//           </div>
//         </div>

//         {/* Actions bas */}
//         <div className="flex items-center justify-between mt-3">
//           {/* Stepper quantité */}
//           <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => item.quantity > 1 && onQtyChange(item.id, item.quantity - 1)}
//               disabled={item.quantity <= 1}
//               className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//               aria-label="Diminuer la quantité"
//             >
//               <HiMinus className="text-xs" />
//             </button>
//             <span className="w-8 text-center text-sm font-semibold text-gray-900 select-none">
//               {item.quantity}
//             </span>
//             <button
//               onClick={() => item.quantity < item.maxStock && onQtyChange(item.id, item.quantity + 1)}
//               disabled={item.quantity >= item.maxStock}
//               className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//               aria-label="Augmenter la quantité"
//             >
//               <HiPlus className="text-xs" />
//             </button>
//           </div>

//           {/* Retirer / Favoris */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => onMoveToFav(item.id)}
//               className={`flex items-center gap-1 text-xs transition-colors ${isFav ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
//               aria-label={isFav ? "Déjà en favoris" : "Ajouter aux favoris"}
//             >
//               {isFav ? <MdFavorite className="text-sm" /> : <MdFavoriteBorder className="text-sm" />}
//               <span className="hidden sm:inline">{isFav ? "Favori" : "Sauvegarder"}</span>
//             </button>
//             <button
//               onClick={() => onRemove(item.id)}
//               className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
//               aria-label="Retirer du panier"
//             >
//               <FiTrash2 className="text-xs" />
//               <span className="hidden sm:inline">Retirer</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <MdOutlineShoppingCart className="text-4xl text-gray-300" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Votre panier est vide
      </h2>
      <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
        Parcourez notre collection et ajoutez des articles qui vous plaisent.
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

// ─── Page principale ──────────────────────────────────────────────────────────
export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeItem } = useCart();
  const [items, setItems] = useState<CartItem[]>(cart);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [shipping, setShipping] = useState("standard");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  // ── Handlers ────────────────────────────────────────────────────────────────

  // fonction a appeler à chaque fois que le quantiter dans le panier change
  const handleQtyChange = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    );
  };

  // fonction pour rétirer un article dans le panier
  const handleRemove = (id: string) => {
    const message: string = removeItem(id); // efface l'article dans le localstorage
    setItems((prev) => prev.filter((i) => i.id !== id)); //actualise l'interface après la suppression
    showToast(message);
  };

  // fonction pour déplacer les items dans le panier dans le favoris
  const handleMoveToFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Retiré des favoris");
      } else {
        next.add(id);
        showToast("Ajouté aux favoris !");
      }
      return next;
    });
  };

  // fonction pour le payement
  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      navigate("/checkout");
    }, 1200);
  };

  // ── Calculs ─────────────────────────────────────────────────────────────────
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost =
    SHIPPING_OPTIONS.find((o) => o.id === shipping)?.price ?? 0;
  const total = subtotal + shippingCost;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 border">
        <div className="px-4 md:px-6 py-8">
          {/* ── EN-TÊTE ──────────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-8">
            <MdOutlineShoppingCart className="text-2xl text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Mon Panier
            </h1>
            {items.length > 0 && (
              <Badge className="bg-gray-900 text-white hover:bg-gray-900 font-semibold text-xs">
                {totalItems} article{totalItems > 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyCart onBrowse={() => navigate("/profilxxxx/home")} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* ── COLONNE GAUCHE : articles + options ────────────────── */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Liste articles */}
                <div className="bg-white rounded-2xl border border-gray-100 px-5 py-2 shadow-sm">
                  {items.map((item) => (
                    <CartRow
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                      onMoveToFav={handleMoveToFav}
                      isFav={favorites.has(item.id)}
                    />
                  ))}
                </div>

                {/* Livraison */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                    <FiTruck className="text-gray-500" />
                    Mode de livraison
                  </h2>
                  <div className="flex flex-col gap-2">
                    {SHIPPING_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                          shipping === opt.id
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${shipping === opt.id ? "border-gray-900" : "border-gray-300"}`}
                          >
                            {shipping === opt.id && (
                              <div className="w-2 h-2 rounded-full bg-gray-900" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {opt.label}
                            </p>
                            <p className="text-xs text-gray-400">{opt.delay}</p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${shipping === opt.id ? "text-gray-900" : "text-gray-500"}`}
                        >
                          {opt.price === 0 ? "Gratuit" : formatPrice(opt.price)}
                        </span>
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={shipping === opt.id}
                          onChange={() => setShipping(opt.id)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Garanties */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <FiShield />, label: "Paiement sécurisé" },
                    { icon: <FiRefreshCw />, label: "Retour sous 30j" },
                    { icon: <FiTruck />, label: "Livraison suivie" },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center gap-1.5 text-center shadow-sm"
                    >
                      <span className="text-gray-400 text-lg">{icon}</span>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── COLONNE DROITE : récap commande ─────────────────────── */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4">
                    Récapitulatif
                  </h2>

                  {/* Lignes de calcul */}
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Sous-total ({totalItems} article
                        {totalItems > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Livraison</span>
                      <span className="font-medium text-gray-900">
                        {shippingCost === 0
                          ? "Gratuit"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {formatPrice(total)}
                        </p>
                        <p className="text-xs text-gray-400">TVA incluse</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA checkout */}
                  <Button
                    className={`w-full mt-5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      checkoutLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-900 hover:bg-gray-700"
                    } text-white`}
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Redirection...
                      </>
                    ) : (
                      <>
                        Passer la commande
                        <FiChevronRight />
                      </>
                    )}
                  </Button>

                  {/* Continuer shopping */}
                  <button
                    onClick={() => navigate(-1)}
                    className="w-full mt-2 text-xs text-gray-400 hover:text-gray-700 transition-colors py-1"
                  >
                    ← Continuer mes achats
                  </button>

                  {/* Paiements acceptés */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 text-center mb-2">
                      Paiements acceptés
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {["MVola", "Orange Money", "Airtel"].map((method) => (
                        <span
                          key={method}
                          className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
