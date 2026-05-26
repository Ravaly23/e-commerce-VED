import { FaSearch, FaRegUser, FaChevronDown } from "react-icons/fa";
import { LiaHistorySolid } from "react-icons/lia";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Input from "./Input";
import { useCart } from "@/hooks/useCart"; 

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavConnectedProps {
  // cartCount?: number;
  favoritesCount?: number;
}

// ─── Catégories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "Nouveautés", href: "/nouveautes" },
  { label: "Femme", href: "/femme" },
  { label: "Homme", href: "/homme" },
  { label: "Enfant", href: "/enfant" },
  { label: "Accessoires", href: "/accessoires" },
  { label: "Soldes", href: "/soldes", highlight: true },
];

// ─── Dropdown Profil ──────────────────────────────────────────────────────────
function ProfileDropdown({
  user,
  onLogout,
}: {
  user: { username?: string } | null;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [confirmLogout, setConfirmLogout] = useState(false); // ← nouveau
  const navigate = useNavigate();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        //si ref current existe et s'il n'a pas reçue un clic
        setOpen(false);
        setConfirmLogout(false); // ← reset aussi
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FaRegUser className="text-sm" />
        <span className="hidden lg:inline max-w-22.5 truncate">
          {user?.username ?? "Mon compte"}
        </span>
        <FaChevronDown
          className={`text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {/* Info utilisateur */}
          {user?.username && (
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-400">Connecté en tant que</p>
              <p className="text-sm font-semibold truncate">{user.username}</p>
            </div>
          )}

          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            onClick={() => {
              navigate("/historique");
              setOpen(false);
            }}
          >
            <LiaHistorySolid />
            Historique des commandes
          </button>

          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            onClick={() => {
              navigate("/adresses");
              setOpen(false);
            }}
          >
            <IoSettingsOutline />
            Changer mon mot de passe
          </button>

          <div className="border-t border-gray-100 mt-1 pt-1">
            {!confirmLogout ? (
              // Bouton normal
              <button
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                onClick={() => setConfirmLogout(true)}
              >
                <CiLogout /> Se déconnecter
              </button>
            ) : (
              // Mini confirmation inline
              <div className="px-3 py-2 space-y-2">
                <p className="text-xs text-gray-500 font-medium">
                  Confirmer la déconnexion ?
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 text-xs py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={() => {
                      onLogout(); // ← logout d'abord
                      setOpen(false); // ← fermer dropdown
                      setConfirmLogout(false);
                    }}
                  >
                    Oui, déconnecter
                  </button>
                  <button
                    className="flex-1 text-xs py-1.5 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    onClick={() => setConfirmLogout(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <div className="border-t border-gray-100 mt-1 pt-1">
            <AlertDialogBasic
              title="Se déconnecter ?"
              description="Voulez-vous vraiment vous déconnecter ?"
              buttonAction="Oui, déconnecter"
              buttonCancel="Annuler"
              buttonContent="Se déconnecter"
              action={() => {
                onLogout();
                setOpen(false);
                navigate("/");
              }}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function NavConnected({
  // cartCount = 0,
  favoritesCount = 0,
}: NavConnectedProps) {
  const [valueSearch, setValueSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valueSearch.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(valueSearch.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* ── BARRE PRINCIPALE ──────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-100">
        {/* Logo */}
        <div className="shrink-0">
          <h1
            className="text-2xl font-bold tracking-tighter italic cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <span className="text-red-600">E-</span>
            <span className="text-black">Lambako</span>
          </h1>
        </div>

        {/* Barre de recherche (desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-sm mx-6"
        >
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={valueSearch}
            iconRight={
              <button
                type="submit"
                className="text-blue-600 hover:text-blue-700"
                aria-label="Lancer la recherche"
              >
                <FaSearch />
              </button>
            }
            onChange={(e) => setValueSearch(e.target.value)}
            // className="w-full"
          />
        </form>

        {/* Actions droite */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Favoris avec badge */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hidden sm:flex items-center gap-1.5"
            onClick={() => navigate("/favoris")}
            aria-label={`Favoris${favoritesCount > 0 ? `, ${favoritesCount} article(s)` : ""}`}
          >
            <span className="relative">
              <MdFavoriteBorder className="text-lg" />
              {favoritesCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500 border-0">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </Badge>
              )}
            </span>
            <span className="hidden lg:inline text-sm">Favoris</span>
          </Button>

          {/* Panier avec badge — toujours visible */}
          <Button
            variant="ghost"
            size="sm"
            className="relative flex items-center gap-1.5"
            onClick={() => navigate("/panier")}
            aria-label={`Panier, ${cartCount} article(s)`}
          >
            <span className="relative">
              <MdOutlineShoppingCart className="text-lg" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500 border-0">
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              )}
            </span>
            <span className="hidden lg:inline text-sm">Panier</span>
          </Button>

          {/* Dropdown profil (contient historique + déconnexion) */}
          <ProfileDropdown user={user} onLogout={handleLogout} />

          {/* <AlertDialogBasic
            title="Se déconnecter ?"
            description="Voulez-vous vraiment vous déconnecter ?"
            buttonAction="Oui, déconnecter"
            buttonCancel="Annuler"
            buttonContent="Se déconnecter"
            action={()=> handleLogout()}
          /> */}
          {/* Hamburger mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden ml-1"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="flex flex-col gap-1 w-5">
              <span
                className={`block h-0.5 bg-gray-700 transition-all duration-200 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 transition-all duration-200 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </span>
          </Button>
        </div>
      </nav>

      {/* ── BARRE CATÉGORIES (desktop) ────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-6 px-6 py-2 bg-white border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <NavLink
            key={cat.href}
            to={cat.href}
            className={({ isActive }) =>
              [
                "text-sm font-medium pb-1 border-b-2 transition-colors duration-150",
                cat.highlight
                  ? "text-red-600 border-transparent hover:border-red-400"
                  : isActive
                    ? "text-black border-black"
                    : "text-gray-600 border-transparent hover:text-black hover:border-gray-300",
              ].join(" ")
            }
          >
            {cat.label}
          </NavLink>
        ))}
      </div>

      {/* ── MENU MOBILE ──────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white">
          {/* Recherche mobile */}
          <div className="px-4 py-3 border-b border-gray-100">
            <form onSubmit={handleSearchSubmit}>
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={valueSearch}
                iconRight={
                  <button type="submit" className="text-blue-600">
                    <FaSearch />
                  </button>
                }
                onChange={(e) => setValueSearch(e.target.value)}
                // className="w-full"
              />
            </form>
          </div>
          {/* Catégories mobile */}
          <div className="px-4 py-1 flex flex-col">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.href}
                to={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "py-3 text-sm font-medium border-b border-gray-50 last:border-0 transition-colors",
                    cat.highlight
                      ? "text-red-600"
                      : isActive
                        ? "text-black"
                        : "text-gray-600",
                  ].join(" ")
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </div>
          {/* Favoris (visible uniquement mobile) */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              className="flex items-center gap-2 text-sm text-gray-600"
              onClick={() => {
                navigate("/favoris");
                setMobileMenuOpen(false);
              }}
            >
              <MdFavoriteBorder />
              Favoris
              {favoritesCount > 0 && (
                <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs h-4 px-1">
                  {favoritesCount}
                </Badge>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// import { FaSearch, FaRegUser } from "react-icons/fa";
// import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
// import { LiaHistorySolid } from "react-icons/lia";
// import { BiLogOut } from "react-icons/bi";
// import Input from "./Input";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { AlertDialogBasic } from "../components/AlertDialog";
// import { Button } from "@/components/ui/button";
// import type { DropDownMenuContent } from "../components/DropdownMenuIcon";
// import { DropdownMenuIcons } from "../components/DropdownMenuIcon";

// export default function NavConnected() {
//   const [valueSearch, setValueSearch] = useState("");
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/", { replace: true });
//   };

//   const element: DropDownMenuContent[] = [
//     { icon: <FaRegUser />, label: "Mon profil" },
//     { icon: <LiaHistorySolid />, label: "Historique" },
//     { icon: <BiLogOut />, label: "Déconnexion" },
//   ];
//   return (
//     <>
//       <nav className="flex items-center justify-between px-5 py-4 bg-white shadow-sm">
//         {/* 1. LOGO */}
//         <div className="shrink-0">
//           <h1 className="text-2xl font-bold tracking-tighter italic text-red-600 hover:cursor-pointer">
//             E-<span className="text-black">Lambako</span>
//           </h1>
//         </div>

//         {/* 2. LIENS (Centrés) */}
//         <div className="hidden md:inline-flex">
//           <Input
//             type="text"
//             placeholder="Search Items"
//             value={valueSearch}
//             iconRight={<FaSearch />}
//             onChange={(e) => setValueSearch(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-center items-center gap-x-2 pr-5">
//           {/* <FaUser /> */}
//           {/* <p className="font-serif text-xl md:text-xl">{user?.username}</p> */}
//           {/* <Button variant="outline">
//             <LiaHistorySolid /> Historique
//           </Button>
//           <Button variant="outline">
//             <FaRegUser /> Mon profil
//           </Button> */}
//           <Button variant="outline">
//             <MdFavoriteBorder /> Favoris
//           </Button>
//           <Button variant="outline">
//             <MdOutlineShoppingCart /> Panier
//           </Button>
//           <DropdownMenuIcons trigger="Moi" content={element} />
//           <AlertDialogBasic
//             title="Log out?"
//             description="Are you sure want to log out?"
//             buttonAction="Yes"
//             buttonCancel="No"
//             buttonContent="Log out"
//             action={handleLogout}
//           />
//         </div>
//       </nav>
//     </>
//   );
// }
