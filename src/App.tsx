import Dashboard from "./Pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import AddArticle from "./Pages/AddArticle";
import Accueil from "./Pages/Accueil";
import Auth from "./Pages/Authentification";
import Home from "./Pages/Home";
import ProfilSeller from "./Pages/ProfilSeller";
import StatusVendeur from "./components/DetailsStatusVendeur";
import api from "@/services/api";
import Settings from "./components/Setting";
import HomePageAdmin from "./Pages/HomePageAdmin";
import LayoutsLambako from "./layouts/LayoutsLambako";
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
      path: "/forget-password/:token/",
      Component: MotDePasseOublier,
    },
    {
      path: "/auth",
      Component: Auth,
    },
    {
      path: "/:profil/home",
      loader: protectedLoader,
      Component: Home,
    },
    {
      path: "/admin",
      Component: HomePageAdmin
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
    {
      path: "/favoris",
      Component: FavoritesPage,
    },
    {
      path: "/panier",
      Component: CartPage,
    },
    {
      path: "/historique",
      Component: OrderHistoryPage,
    },
  ]);
};

function App() {
  return router();
}

export default App;
