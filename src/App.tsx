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
import ArticleDetail from "./Pages/ArticleDetail";
import type { Item } from "./components/ArticleCard";
import { getFavoris } from "./utils/getFavoris";
import ProfilAcheteur from "./Pages/ProfilAcheteur";
import {
  recuperationInfoAcheteur,
  recuperationNombreArticleFavoris,
  recuperationNombresCommandes,
  recuperationNomresComs,
} from "./utils/profilAcheteurUtils";

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

        try {
          const { data, status } = await api.get("article/get_articles/");

          if (status !== 200) throw new Error(data.message);

          const favoris: Item[] = await getFavoris(); // récuperer les articles favoris de l'utilisateur qui vient de se connecter
          const allArticle: Item[] = data.articles; //tous les articles récuperer

          if (favoris.length != 0) {
            const idArticleFavoris = favoris.map((item) => item.id_article);

            const finalListArticle = allArticle.map((allItem) => {
              if (idArticleFavoris.includes(allItem.id_article)) {
                return { ...allItem, ...{ isFavoris: true } };
              } else {
                return { ...allItem, ...{ isFavoris: false } };
              }
            });

            return finalListArticle;
          } else {
            return data.articles;
          }
        } catch (error: any) {
          console.log(error.response?.data);
          const itemVide: Item[] = [];
          return itemVide;
        }
      },
      Component: Home,
    },
    {
      loader: async () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
          throw redirect("/auth");
        }

        if (role && role === "vendeur") {
          throw redirect("/auth");
        }

        const dataUser = localStorage.getItem("user") ?? null;

        const user = JSON.parse(dataUser!);

        try {
          const { data, status } = await api.get(
            `article/get_articles_likes/?id_client=${user?.id}`,
          );

          if (status !== 200) throw new Error(data.message);

          const itemFavoris: Item = data.articles.map((favItem: Item) => {
            return { ...favItem, ...{ isFavorite: true } };
          });

          return itemFavoris;
        } catch (error: any) {
          console.error(error.message);
          const itemVide: Item[] = [];
          return itemVide;
        }
      },
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
      path: "/article/:id_article",
      loader: async ({ params }) => {
        const { data } = await api.get(
          `article/search_articles_id/?id_article=${params.id_article}`,
        );

        return data;
      },
      Component: ArticleDetail,
    },
    {
      path: "/profil/:id_acheteur",
      loader: async ({ params }) => {
        // récuperer l'inforamation utilisateur
        const info = await recuperationInfoAcheteur(params.id_acheteur!);

        // récuperer nombre total commentaire pour un utilisaeur
        const nombre_commentaires = await recuperationNomresComs(params.id_acheteur!);

        // récuperer nombre total commande pour un utilisateur
        const nombre_commandes =
          await recuperationNombresCommandes(params.id_acheteur!);

        // récuperer nombre total article favoris pour un utilisateur
        const nombre_favoris =
          await recuperationNombreArticleFavoris(params.id_acheteur!);

        const data = {
          ...info,
          ...{ nombre_commentaires: nombre_commentaires },
          ...{ nombre_commandes: nombre_commandes },
          ...{ nombre_favoris: nombre_favoris },
        };

        return data;
      },
      Component: ProfilAcheteur,
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
      path: "/admin/home",
      Component: Admin,
    },
    {
      path: "/admin/settings",
      Component: ParametreAdmin,
    },
    {
      path: "/detail",
      Component: StatusVendeur,
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
      path: "/unAuthorize",
      Component: Unauthorized,
    },
  ]);
};

function App() {
  return router();
}

export default App;
