import { createContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  size: string;
  image?: string;
  quantity: number;
  stock: number;
  price: number;
}

interface CartContextType {
  cartCount: number;
  addItem: (newItem: CartItem) => string;
  removeItem: (id: string) => string;
  cart: CartItem[];
}

interface CartContextProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: CartContextProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addItem(newItem: CartItem) {
    //Vérifier si l'article existe déjà dans le panier
    const isAlreadyInCart = cart.some((item) => item.id === newItem.id);

    if (isAlreadyInCart) {
      return newItem.name + " déjà ajouté dans le panier";
    }

    //Mettre à jour l'état
    setCart((prevCart) => [...prevCart, newItem]);

    return newItem.name + " ajouté au panier !";
  }

  function removeItem(itemId: string) {
    const itemToRemove = cart.find((item) => item.id === itemId);

    if (!itemToRemove) {
      return "Article introuvable dans le panier";
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    return itemToRemove.name + " retiré du panier";
  }

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cartCount, addItem, removeItem, cart }}>
      {children}
    </CartContext.Provider>
  );
}

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error(
//       "useCart doit être utilisé à l'intérieur d'un CartProvider",
//     );
//   }
//   return context;
// };

// import { createContext, useContext, useState } from "react";
// import type { FavoriteItem } from "@/components/ArticleCard";

// interface CartContextType {
//   cartCount: number;
//   addItem: (newItem: FavoriteItem) => string;
//   cart: FavoriteItem[];
// }
// interface CartContextProps {
//   children: React.ReactNode;
// }

// const CartContext = createContext<CartContextType | null>(null);

// export default function CartProvider({ children }: CartContextProps) {
//   const [cartCount, setCartCount] = useState<number>(0);
//   const [cart, setCart] = useState<FavoriteItem[]>([]);

//   function addItem(newItem: FavoriteItem) {
//     console.log("panier = "+cart.length)
//     let message = "";
//     if (cart.length === 0) {
//       cart.push(newItem);
//       setCartCount(cartCount + 1);
//       message = "Article déjà ajouter dans le panier";
//     } else {
//       let m = "";
//       cart.map((item) => {
//         if (item.id == newItem.id) {
//           m = "Article déjà ajouter dans le panier";
//         } else {
//           m = "Article ajouté au panier !";
//           cart.push(newItem);
//           setCartCount(cartCount + 1);
//         }
//       });
//       message = m;
//     }
//     return message;
//   }

//   return (
//     <CartContext.Provider value={{ cartCount, addItem, cart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// //Le hook à utiliser dans n'importe quel composant
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error(
//       "useCart doit être utilisé à l'intérieur d'un CartProvider",
//     );
//   }
//   return context;
// };
