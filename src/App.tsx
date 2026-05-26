import Dashboard from "./Pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import AddArticle from "./Pages/AddArticle";
import Accueil from "./Pages/Accueil";
import Auth from "./Pages/Authentification";
import Home from "./Pages/Home";
import ProfilSeller from "./Pages/ProfilSeller";
import RegistrationCompletion from "./Pages/RegistrationCompletion";
import MotDePasseOublier from "./Pages/MotDePasseOublier";
import AccountTypeSelection from "./Pages/AccoutTypeSelection";
import DemandeReinitialisationMdp from "./Pages/DemandeReinitialisationMdp";
import FavoritesPage from "./Pages/FavoritesPage";
import CartPage from "./Pages/CartPage";
import OrderHistoryPage from "./Pages/OrderHistoryPage";
import { protectedLoader } from "./utils/auth";

const router = () => {
  return createBrowserRouter([
    {
      path: "/",
      Component: Accueil,
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
      loader: protectedLoader,
      Component: Dashboard,
    },
    {
      path: "/auth",
      Component: Auth,
    },
    {
      path: "/profilxxxx/home",
      loader: protectedLoader,
      Component: Home,
    },
    {
      path: "/profilxxxx",
      Component: ProfilSeller,
    },
    {
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
