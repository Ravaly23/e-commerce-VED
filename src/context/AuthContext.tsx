import api from "@/services/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

//la structure de l'utilisateur
interface User {
  id: string;
  nom_prenom: string;
  username: string;
}

interface DataUser {
  email: string;
  password: string;
}

//la structure du contexte
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    userData: DataUser,
    route: string,
  ) => Promise<{ success: boolean; message: string; data?: any }>;
  logout: () => void;
}

// initialisation du context avec le type ou null
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // les états a partager sur tous l'App
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Restaurer la session au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token) {
      if (savedUser) {
        const parserUser = JSON.parse(savedUser);
        setUser(parserUser);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  
  // La fonction login
  async function login(dataUser: DataUser,route : string) {
    setLoading(true);

    try {
      // response contiendra la réponse HTTP AxiosResponse en cas de succès
      const response = await (
        await toast
          .promise(api.post(route, dataUser), {
            position: "top-center",
            loading: "Connexion...",
            success: (response) => {
              const { data } = response;

              // Stockage des données d'authentification
              localStorage.setItem("token", data.tokens.access);
              localStorage.setItem("user", JSON.stringify(data.utilisateur));
              localStorage.setItem("role",data.role);
              setUser(data.utilisateur);

              // Le texte retourné ici sera affiché par le toast de succès
              return data.message || "Connexion réussie !";
            },
            error: (error: any) => {
              // Le texte retourné ici sera affiché par le toast d'erreur
              if (error.response?.status === 400) {
                return "Email ou mot de passe incorrect";
              }
              return (
                error.response?.data?.message || "Erreur lors de la connexion"
              );
            },
          })
          .unwrap()
      ).data;

      return { success: true, message: "Connexion réussie", data: response };
    } catch (error) {
      // toast.promise propage l'erreur si l'API échoue,
      // console.error("Échec de la connexion dans le composant :", error);
      return { success: false, message: "Erreur" };
    } finally {
      setLoading(false);
    }
  }

  //logique logout
  function logout() {
    localStorage.removeItem("token"); // supprimer le token stocker dans localStorage après la déconnexion d'un utilisateur
    localStorage.removeItem("user"); // supprimer l'information de l'utilisateur connecter
    localStorage.removeItem("role"); // supprimer aussi son rôle
    setUser(null); //supprimer aussi ses données
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

//Le hook à utiliser dans n'importe quel composant
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider",
    );
  }
  return context;
};
