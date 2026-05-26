import { FiTrash2 } from "react-icons/fi";
import { HiMinus, HiPlus } from "react-icons/hi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import type { CartItem } from "@/context/CartContext";
import formatPrice from "@/utils/formatPrice";
import { Badge } from "./ui/badge";

export default function CartRow({
  item,
  onQtyChange,
  onRemove,
  onMoveToFav,
  isFav,
}: {
  item: CartItem;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onMoveToFav: (id: string) => void;
  isFav: boolean;
}) {
  // const [quantityChoose, setQuantityChoose] = useState<number>(1);
  return (
    <div className="group flex gap-4 py-5 border-b border-gray-100 last:border-0 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Image */}
      <div className="relative shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* {item.discount && (
          <span className="absolute top-1.5 left-1.5 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
            -{item.discount}%
          </span>
        )} */}
      </div>

      {/* Détails */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {item.brand}
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate leading-tight mt-0.5">
                {item.name}
              </p>
            </div>
            {/* Prix */}
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>

          {/* Variantes sélectionnées */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
              Taille: {item.size}
            </span>
            {item.quantity >= item.stock && (
              <Badge
                variant="outline"
                className="text-[10px] text-amber-600 border-amber-200 bg-amber-50 py-0.5"
              >
                Stock limité
              </Badge>
            )}
          </div>
        </div>

        {/* Actions bas */}
        <div className="flex items-center justify-between mt-3">
          {/* Stepper quantité */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                item.quantity > 1 && onQtyChange(item.id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Diminuer la quantité"
            >
              <HiMinus className="text-xs" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-900 select-none">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                item.quantity < item.stock &&
                onQtyChange(item.id, item.quantity + 1)
              }
              disabled={item.quantity >= item.stock}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Augmenter la quantité"
            >
              <HiPlus className="text-xs" />
            </button>
          </div>
          
          {/* Retirer / Favoris */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onMoveToFav(item.id)}
              className={`flex items-center gap-1 text-xs transition-colors ${isFav ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
              aria-label={isFav ? "Déjà en favoris" : "Ajouter aux favoris"}
            >
              {isFav ? (
                <MdFavorite className="text-sm" />
              ) : (
                <MdFavoriteBorder className="text-sm" />
              )}
              <span className="hidden sm:inline">
                {isFav ? "Favori" : "Sauvegarder"}
              </span>
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Retirer du panier"
            >
              <FiTrash2 className="text-xs" />
              <span className="hidden sm:inline">Retirer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
