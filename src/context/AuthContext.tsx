import api from "@/services/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

  async function login(
    dataUser: DataUser,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      setLoading(true);
      const { data, status } = await api.post("auth/connexion/", dataUser);

      if (status !== 200) throw new Error(data.message);

      localStorage.setItem("token", data.tokens.access);
      localStorage.setItem("user", JSON.stringify(data.utilisateur));
      setUser(data.utilisateur);
      setLoading(false);

      return { success: true, message: "Connexion réussie", data: data };
    } catch (error: any) {
      console.log("status d'erreur : " + error.response?.status);
      let message;
      if (error.response?.status === 400) {
        message = "Email ou mot de passe incorrect";
      } else {
        message =
          error.response?.data?.message || "Erreur lors de la connexion";
      }

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }

  //logique logout
  function logout() {
    localStorage.removeItem("token"); // supprimer le token stocker dans localStorage après la déconnexion d'un utilisateur
    localStorage.removeItem("user"); // supprimer l'information de l'utilisateur connecter 
    setUser(null); //supprimer aussi ses données
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
