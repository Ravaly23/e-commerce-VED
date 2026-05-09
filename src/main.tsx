import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './Pages/Dashboard'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import AddArticle from './Pages/AddArticle';
import Accueil from './Pages/Accueil';
import Auth from './Pages/Authentification';
import Home from './Pages/Home';
import ProfilSeller from './Pages/ProfilSeller';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Accueil,
  },
  {
    path: "/profilxxxx/Add",
    Component:AddArticle,
  },
  {
    path:"/profilxxxx/dashboard",
    Component: Dashboard
  },{
    path:"/auth",
    Component:Auth,
  },{
    path:"/profilxxxx/home",
    Component:Home
  },{
    path:"/profilxxxx",
    Component: ProfilSeller
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
