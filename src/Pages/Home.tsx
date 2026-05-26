import { useState } from "react";
//import Article from "../components/Article";
import Fieldset from "../components/Fieldset";
import formatPrice from "@/utils/formatPrice";
import LayoutsLambako from "@/layouts/LayoutsLambako";
import type { Item } from "@/components/ArticleCard";
import ArticleCart from "@/components/ArticleCard";
import { useCart } from "@/hooks/useCart";
import { Toast } from "./FavoritesPage";
import type { CartItem } from "@/context/CartContext";

export default function Home() {
  const articleTab = [
    {
      id: 1,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 2000,
      nombreLike: 42,
    },
    {
      id: 2,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 4000,
      nombreLike: 42,
    },
    {
      id: 3,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 4,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 5,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 6,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 7,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 8,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
  ];
  const maxPrice = Math.max(...articleTab.map((a) => a.prix));
  const minPrice = Math.min(...articleTab.map((a) => a.prix));
  const [price, setPrice] = useState([minPrice, maxPrice]);

  const Items: Item[] = [
    {
      id: "prod-001",
      name: "iPhone 15 Pro",
      brand: "Apple",
      size: "M",
      price: 1199.99,
      quantity: 0,
      note: 4.8,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Électronique",
      condition: "Neuf",
    },
    {
      id: "prod-002",
      name: "Air Jordan 1 Retro High",
      brand: "Nike",
      size: "M",
      price: 180.0,
      quantity: 2,
      note: 4.5,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Chaussures",
      condition: "Neuf",
    },
    {
      id: "prod-003",
      name: "Casque WH-1000XM4",
      brand: "Sony",
      size: "M",
      price: 249.5,
      quantity: 10,
      note: 4.9,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Audio",
      condition: "Occasion - Comme neuf",
    },
    {
      id: "prod-004",
      name: "Montre Speedmaster",
      brand: "Omega",
      size: "M",
      price: 6500.0,
      quantity: 15,
      note: 4.7,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Horlogerie",
      condition: "Collection",
    },
    {
      id: "prod-005",
      name: "MacBook Air M3",
      brand: "Apple",
      size: "M",
      price: 1299.0,
      quantity: 1,
      note: 4.9,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Électronique",
      condition: "Neuf",
    },
    {
      id: "prod-006",
      name: "Kindle Paperwhite",
      brand: "Amazon",
      size: "M",
      price: 169.99,
      quantity: 1,
      note: 4.6,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Électronique",
      condition: "Neuf",
    },
    {
      id: "prod-007",
      name: "Enceinte Roam",
      brand: "Sonos",
      size: "M",
      price: 199.0,
      quantity: 1,
      note: 4.3,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Audio",
      condition: "Neuf",
    },
    {
      id: "prod-008",
      name: "Veste Nuptse 1996",
      brand: "The North Face",
      size: "M",
      price: 350.0,
      quantity: 1,
      note: 4.7,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Vêtements",
      condition: "Neuf",
    },
    {
      id: "prod-009",
      name: "Cafetière Pixie",
      brand: "Nespresso",
      size: "M",
      price: 149.0,
      quantity: 1,
      note: 4.4,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Électroménager",
      condition: "Occasion - Très bon état",
    },
    {
      id: "prod-010",
      name: "Souris MX Master 3S",
      brand: "Logitech",
      size: "M",
      price: 129.0,
      quantity: 3,
      note: 4.8,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Électronique",
      condition: "Neuf",
    },
    {
      id: "prod-011",
      name: "Sac à dos Borealis",
      brand: "The North Face",
      size: "M",
      price: 115.0,
      quantity: 1,
      note: 4.5,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Accessoires",
      condition: "Neuf",
    },
    {
      id: "prod-012",
      name: "Clavier G915 TKL",
      brand: "Logitech",
      size: "M",
      price: 249.0,
      quantity: 1,
      note: 4.6,
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      category: "Électronique",
      condition: "Reconditionné",
    },
  ];

  const category: string[] = [
    "All Items",
    "Dresses",
    "Jackets & Coats",
    "Jeans",
    "Shoes",
    "T-Shirts",
    "Knitwear",
  ];
  const size: string[] = ["All Size", "XS", "S", "M", "L", "XL"];
  const condition: string[] = [
    "All conditions",
    "New with tags",
    "Like New",
    "Very Good",
    "Good",
  ];
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [favorites, setFavorites] = useState<Item[]>(Items);
  const { addItem } = useCart();

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  // fonction pour ajouter un article dans le favoris 
  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    showToast("Article retiré des favoris");
  };

  // fonction pour ajouter un article dans le panier 
  const handleAddToCart = (item: Item) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      image: item.image,
      quantity: 1, // quantité par défaut d'un article ajouter dans le panier 
      price: item.price,
      size: item.size!,
      stock: item.quantity,
    };

    const message: string = addItem(cartItem); // fonction pour ajouter un article dans le panier 

    showToast(message);
  };

  return (
    <LayoutsLambako page="user">
      <div className="px-4 py-8 bg-[#F9FAFB]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block border border-gray-200 rounded-xl p-4 w-64 h-fit">
            <form className="space-y-6">
              <Fieldset titre="Category" type="radio" element={category} />

              <Fieldset
                titre={`Price Range : ${formatPrice(price[0])} - ${formatPrice(price[1])}`}
                type="range"
                price={price}
                maxPrice={maxPrice}
                onValueChange={(value: number[]) => setPrice(value)}
              />
              <Fieldset titre="Size" type="radio" element={size} />
              <Fieldset titre="Condition" type="radio" element={condition} />
            </form>
          </aside>
          <main className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center-safe">
              {favorites.map((item) => (
                <ArticleCart
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRemove}
                />
              ))}
              {/* {articleTab.map((item) => (
                <Article
                  key={item.id}
                  imagePrincipale={item.imagePrincipale}
                  imageSeller={item.imageSeller}
                  nameSeller={item.nameSeller}
                  nameArticle={item.nameArticle}
                  taille={item.taille}
                  marque={item.marque}
                  prix={item.prix}
                  nombreLike={item.nombreLike}
                />
              ))} */}
            </div>
          </main>
        </div>
      </div>
      <Toast message={toast.message} visible={toast.visible} />
    </LayoutsLambako>
  );
}
