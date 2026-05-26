import React, { useState } from "react";
import { Search, Bell, ExternalLink, ShieldCheck } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {  Settings, LogOut, ChevronDown ,Home} from "lucide-react"; // Tes icônes habituelles
import { Link } from "react-router-dom";

interface LayoutsProps {
  status?: string;
  children?: React.ReactNode;
  notification?: number;
  onSearch?: (find: string) => void;
}

export default function LayoutsAdmin({
  status,
  children,
  onSearch,
}: LayoutsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsCount, setNotificationsCount] = useState(0);
  const footerSections = [
    {
      title: "Gestion & Rôles",
      links: [
        { label: "Modérateurs", href: "#" },
        { label: "Permissions", href: "#" },
        { label: "Logs d'activité", href: "#" },
      ],
    },
    {
      title: "Maintenance",
      links: [
        { label: "Configuration système", href: "#" },
        { label: "Sauvegardes BD", href: "#" },
        { label: "Statut des serveurs", href: "#", hasStatus: true },
      ],
    },
    {
      title: "Documentation",
      links: [
        { label: "Guide de modération", href: "#" },
        { label: "Documentation API", href: "#" },
        { label: "Support technique", href: "#" },
      ],
    },
  ];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value); // AJOUT : Envoie la valeur saisie au parent
    }
  };
  return (
    <>
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* GAUCHE : Logo & Badge */}
        <div className="flex items-center space-x-3 select-none">
          <span className="flex items-center gap-1 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
            <ShieldCheck size={12} />
            SUPER ADMIN
          </span>
        </div>

        {status === "connecte" ? (
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative flex items-center bg-gray-100 rounded-md focus-within:bg-gray-50 border border-transparent focus-within:border-gray-200 transition-all">
              <Search className="absolute left-3 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher un membre"
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-2 bg-transparent text-sm text-gray-950 placeholder-gray-500 rounded-md outline-none"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* CENTRE : Barre de recherche globale
         */}

        {/* DROITE : Actions & Profil */}
        <div className="flex items-center space-x-6">
          {/* Bouton Alertes / Signalements */}
          <button
            className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Signalements en attente"
            onClick={() => setNotificationsCount(0)} // Simule la lecture
          >
            <Bell className="w-6 h-6" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ea4335] text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Bouton Switch View */}
          {status === "connecte" ? (
            ""
          ) : (
            <>
              <Link
                to={"/"}
                className="flex items-center gap-1 text-sm font-medium text-[#09b1ba] hover:text-[#007784] border border-[#09b1ba] hover:bg-[#f4fcfc] px-4 py-2 rounded transition-all"
              >
                Retour au site
                <ExternalLink size={14} />
              </Link>
            </>
          )}

          {/* Séparateur */}
          <div className="h-8 w-px bg-gray-200" />

          {/* Profil Utilisateur Admin */}
          {status === "connecte" ? (
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
                      Admin
                    </span>
                    <span className="text-xs text-gray-500">Owner</span>
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
                      Admin
                    </span>
                  </div>

                  {/* LIEN 1 : Mon Profil */}
                  <MenuItem>
                    <Link
                      to="/admin/profil"
                      className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-700 data-focus:bg-gray-50 data-focus:text-[#09b1ba] transition-colors"
                    >
                      <Home className="w-4 h-4 text-gray-400 group-data-focus:text-[#09b1ba]" />
                      Accueil
                    </Link>
                  </MenuItem>

                  {/* LIEN 2 : Paramètres */}
                  <MenuItem>
                    <Link
                      to="/admin/settings"
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
                    <button
                      onClick={() => alert("Déconnexion...")}
                      className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-red-600 data-focus:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      Déconnexion
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-white border-top border-gray-200 mt-auto px-6 py-10 w-full">
        <div className="max-w-7xl mx-auto">
          {/* TOP: Menu Colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {footerSections.map((section, idx) => (
              <div key={idx} className="flex flex-col space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-[#007784] hover:underline inline-flex items-center gap-2 transition-colors"
                      >
                        {link.label}
                        {link.hasStatus && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* SEPARATEUR */}
          <div className="h-px bg-gray-200 w-full my-6" />

          {/* BOTTOM: Meta Infos */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div>
              <span className="font-mono bg-gray-50 px-2 py-1 rounded border border-gray-100">
                Vinted Admin
              </span>
            </div>
            <div>
              <p>
                &copy; {new Date().getFullYear()} Vinted Dashboard — Panel de
                Contrôle Sécurisé.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
