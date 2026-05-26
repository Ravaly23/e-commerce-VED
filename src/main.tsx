import { createContext, StrictMode, useState } from 'react'
import './index.css'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster/>
      <RouterProvider router={App()} />,
    </AuthProvider>
  </StrictMode>,
);
