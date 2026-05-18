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
import api from "./services/api";
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
      path: "/motDePasseOublier/:emailId",
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
      action: async ({ request }) => {
        const formData = await request.formData();

        const body = {
          email: formData.get("email"),
          password: formData.get("password"),
        };

        try {
          const { data } = await api.post("auth/connexion/", body);
          console.log("teste avec loaders : " + data);
        } catch (error) {}
      },
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
  ]);
};

function App() {
  return router();
}

export default App;
