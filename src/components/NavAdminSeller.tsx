import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  User,
  Settings,
  ChevronDown,
  LucideLayoutDashboard,
  Search,
} from "lucide-react"; // Tes icônes habituelles
import { AlertDialogBasic } from "../components/AlertDialog";

interface NavProps{
  onSearch?: (find : string)=> void;
}
export default function NavAdmin({onSearch}:NavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery,setSearchQuery] = useState("");
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeur = e.target.value;
    setSearchQuery(valeur);
    if (onSearch) {
      onSearch(valeur); // AJOUT : Envoie la valeur saisie au parent
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* 1. LOGO */}
        <div className="shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter italic text-red-600 hover:cursor-pointer">
            E-<span className="text-black">Lambako</span>
          </h1>
        </div>

        <div className="flex-1 max-w-lg mx-8">
          <div className="relative flex items-center bg-gray-100 rounded-md focus-within:bg-gray-50 border border-transparent focus-within:border-gray-200 transition-all">
            <Search className="absolute left-3 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un article"
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-2 bg-transparent text-sm text-gray-950 placeholder-gray-500 rounded-md outline-none"
            />
          </div>
        </div>

        <div className="relative inline-block text-left">
          {/* 1. LE BOUTON D'OUVERTURE */}
          <Menu>
            <MenuButton className="flex items-center space-x-3 cursor-pointer group outline-none">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Avatar Admin"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#09b1ba] transition-all"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-[#09b1ba] transition-colors">
                  {user?.username}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.nom_prenom}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </MenuButton>

            {/* 2. LE CONTENEUR DES OPTIONS */}
            {/* Les classes "transition", "data-[closed]:opacity-0", etc. gèrent l'animation d'ouverture en Tailwind nativement */}
            <MenuItems
              transition
              className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 shadow-lg text-gray-700 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 focus:outline-none z-50"
            >
              {/* Petite info de rappel en haut du menu (non cliquable) */}
              <div className="px-3 py-2 text-xs border-b border-gray-50 mb-1 text-gray-400">
                Connecté en tant que{" "}
                <span className="font-medium text-gray-700">
                  {user?.username}
                </span>
              </div>

              {/* LIEN 1 : Mon Profil */}
              <MenuItem>
                <Link
                  to={`/${user?.username}/profil`}
                  className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-700 data-focus:bg-gray-50 data-focus:text-[#09b1ba] transition-colors"
                >
                  <User className="w-4 h-4 text-gray-400 group-data-focus:text-[#09b1ba]" />
                  Profil
                </Link>
              </MenuItem>

              {/* dashboard */}
              <MenuItem>
                <Link
                  to={`/${user?.username}/dashboard`}
                  className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-700 data-focus:bg-gray-50 data-focus:text-[#09b1ba] transition-colors"
                >
                  <LucideLayoutDashboard className="w-4 h-4 text-gray-400 group-data-focus:text-[#09b1ba]" />
                  Tableau de bords
                </Link>
              </MenuItem>

              {/* LIEN 2 : Paramètres */}
              <MenuItem>
                <Link
                  to={`/${user?.username}/settings`}
                  className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-700 data-focus:bg-gray-50 data-focus:text-[#09b1ba] transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Paramètres
                </Link>
              </MenuItem>

              {/* Séparateur visuel */}
              <div className="my-1 h-px bg-gray-100" />

              {/* LIEN 3 : Déconnexion */}
              <MenuItem>
                <AlertDialogBasic
                  title="Deconnexion?"
                  description="Voulez-vous vous deconnecter?"
                  buttonAction="OUI"
                  buttonCancel="NON"
                  buttonContent="Deconnexion"
                  action={handleLogout}
                  styleLink={true}
                  className="bg-white flex gap-x-3 rounded-lg m text-sm text-red-600 data-focus:bg-red-50 transition-colors hover:cursor-pointer"                
                />
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </nav>
    </>
  );
}
