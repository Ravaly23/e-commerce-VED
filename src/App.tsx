import Dashboard from "./Pages/Dashboard";
import { createBrowserRouter, redirect } from "react-router-dom";
import AddArticle from "./Pages/AddArticle";
import Accueil from "./Pages/Accueil";
import Auth from "./Pages/Authentification";
import Home from "./Pages/Home";
import ProfilSeller from "./Pages/ProfilSeller";
import StatusVendeur from "./components/DetailsStatusVendeur";
import api from "@/services/api";
import RegistrationCompletion from "./Pages/RegistrationCompletion";
import MotDePasseOublier from "./Pages/MotDePasseOublier";
import AccountTypeSelection from "./Pages/AccoutTypeSelection";
import DemandeReinitialisationMdp from "./Pages/DemandeReinitialisationMdp";
import FavoritesPage from "./Pages/FavoritesPage";
import CartPage from "./Pages/CartPage";
import OrderHistoryPage from "./Pages/OrderHistoryPage";
import { protectedLoader } from "./utils/auth";
import Unauthorized from "./Pages/PageUnAuthorized";
import { OnlySeller } from "./utils/OnlySeller";
import { Admin } from "./Pages/Admin";
import ParametreAdmin from "./Pages/ParametreAdmin";
const router = () => {
  return createBrowserRouter([
    {
      path: "/",
      Component: Accueil,
    },
    {
      path: "/home",
      loader: async () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
          throw redirect("/auth");
        }

        if (role && role === "vendeur") {
          throw redirect("/auth");
        }
        
        const { data } = await api.get("article/get_articles/");

        return data;
      },
      Component: Home,
    },
    {
      loader: protectedLoader,
      path: "/home/favoris",
      Component: FavoritesPage,
    },
    {
      loader: protectedLoader,
      path: "/home/panier",
      Component: CartPage,
    },
    {
      loader: protectedLoader,
      path: "/home/historique",
      Component: OrderHistoryPage,
    },
    {
      path: "/profilxxxx/Add",
      Component: AddArticle,
    },
    {
      path: "/forget-password/:token/",
      Component: MotDePasseOublier,
    },
    {
      path: "/profilxxxx/dashboard",
      Component: Dashboard,
    },
    {
      path: "/auth",
      Component: Auth,
    },
    {
      path: "/profilxxxx",
      Component: ProfilSeller,
    },
    {
      path:"/admin/home",
      Component: Admin ,
    },
    {
      path: "/admin/settings",
      Component: ParametreAdmin
    },
    {
      path: "/detail",
      Component: StatusVendeur,
    },{
      path: "/account-type",
      Component: AccountTypeSelection,
    },
    {
      path: "/finalization",
      Component: RegistrationCompletion,
    },
    {
      path: "/password-reset",
      Component: DemandeReinitialisationMdp,
    },   
          //route vendeur
    {
      path: "/:profil/dashboard",
      loader: OnlySeller,
      Component: Dashboard,
    },
    {
      path: "/:profil/Add",
      loader: OnlySeller,
      Component: AddArticle,
    },
{
      path: "/:profil/profil",
      loader: OnlySeller,
      Component: ProfilSeller,
    },
    {
      //page pour erreur 403
      path:"/unAuthorize",
      Component:Unauthorized
    },
  ]);
};

function App() {
  return router();
}

export default App;
