import Dashboard from "./Pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import AddArticle from "./Pages/AddArticle";
import Accueil from "./Pages/Accueil";
import Auth from "./Pages/Authentification";
import Home from "./Pages/Home";
import ProfilSeller from "./Pages/ProfilSeller";
<<<<<<< HEAD
import Testes from "./Pages/Testes";
=======
import api from "./services/api";
>>>>>>> affe777dd1f382180bd926d6ca08869dd3a08601

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
          const {data} = await api.post('auth/connexion/',body)
          console.log("teste avec loaders : "+data)
        } catch (error) {       
        }
      },
    },
    {
      path: "/profilxxxx/home",
      Component: Home,
    },
    {
      path: "/profilxxxx",
      Component: ProfilSeller,
<<<<<<< HEAD
    },{
      path: "/testes",
      Component: Testes
=======
>>>>>>> affe777dd1f382180bd926d6ca08869dd3a08601
    }
  ]);
};

function App() {
  return router();
}

export default App;
