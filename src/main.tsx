import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import CartProvider from "./context/CartContext";
import { GenreProvider } from "./context/GenreContext";
import { SearchProvider } from "./context/SearchContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <GenreProvider>
          <SearchProvider>
            <Toaster />
            <RouterProvider router={App()} />
          </SearchProvider>
        </GenreProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
