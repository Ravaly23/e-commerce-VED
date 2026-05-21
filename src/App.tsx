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
import { Admin } from "./Pages/Admin";
import Parametre from "./Pages/Parametre";
import LayoutsLambako from "./layouts/LayoutsLambako";

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
      path: "/profilxxxx/dashboard",
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
      Component: Home,
    },
    {
      path: "/:profil/settings",//route modification mdp pour tous les user : admin,vendeur,client
      Component: Parametre,
    },
    {
      path: "/profilxxxx",
      Component: ProfilSeller,
    },
    {
      path: "/admin",
      Component: Admin
    },
    {
      path: "/admin/settings",
      element: <LayoutsLambako page="s"><Settings /></LayoutsLambako>
    },
    {
      path: "/detail",
      Component: StatusVendeur,
    },
  ]);
};

function App() {
  return router();
}

export default App;
