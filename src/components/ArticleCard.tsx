import { useState } from "react";
import { MdFavorite, MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import { TbListDetails } from "react-icons/tb";
import formatPrice from "@/utils/formatPrice";

interface Fichier {
  id_fichier: string;
  fichier: string;
  type: string;
  taille: string;
  id_article: string;
}

export interface Item {
  id_article: string;
  nom: string;
  description: string;
  prix: number;
  note: number;
  fichiers: Fichier[];
  date_ajout: string;
  date_ajout_relative: string;
  taille: string;
  marque: string;
  quantite: number;
  category: string;
  etat_article: string;
  condition: string;
  id_vendeur: string;
  genre: string;
}

export default function ArticleCart({
  item,
  onRemove,
  onAddToCart,
}: {
  item: Item;
  onRemove: (id: string) => void; // enlever un article dans le favoris
  onAddToCart: (item: Item) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const API_URL = "http://localhost:8000";

  const handleAddToCart = () => {
    if (item.quantite === 0) return;
    setAddedToCart(true);
    onAddToCart(item);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  // Grid view
  return (
    <div
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
      // style={{ animation: "fadeSlideIn 0.3s ease-out both" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-50 rounded-t-2xl">
        <img
          src={`${API_URL}${item.fichiers[0].fichier}`}
          alt={item.nom}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-108" : "scale-100"
          }`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {item.condition && (
            <span className="text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              {item.condition}
            </span>
          )}
          {item.quantite == 0 && (
            <span className="text-[10px] font-semibold bg-gray-400 text-white px-2 py-0.5 rounded-full">
              Épuisé
            </span>
          )}
        </div>

        {/* Remove button  boutton j'adore*/}
        <button
          // onClick={() => onRemove(item.id)}
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
                : item.quantite !== 0
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            size="sm"
            onClick={handleAddToCart}
            disabled={item.quantite == 0 ? true : false}
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
            disabled={item.quantite == 0 ? true : false}
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
          {item.nom}
        </p>

        <div className="flex items-center gap-1 mt-1">
          {/* <StarRating rating={item.note} /> */}
          <FaRegHeart className="text-[10px]" />
          <span className="text-[10px] text-gray-400 ml-1">({item.note})</span>
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
