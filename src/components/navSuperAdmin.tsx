import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import LinkButton from "./LinkButton";
import { FiLogOut } from "react-icons/fi";
import Bouton from "./ButtonInput";
import Menu from "./Menu";
export default function NavSuper() {
  const [etat, setEtat] = useState("hidden");



  return (
    <>
      <nav className="flex items-center justify-between px-3 py-4 bg-white shadow-sm ">
        {/* 1. LOGO */}
        <div className="shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter italic text-red-600 hover:cursor-pointer">
            E-<span className="text-black">Lambako</span>
          </h1>
        </div>
        <div className="hidden md:flex md:justify-between md:w-3/12 mr-3">
          <LinkButton 
          Icon={FaUser} 
          text="Ravaly23" 
          ref="/admin/" 
          couleurTextHover={`hover:text-green-500`}

          />
          <LinkButton
            Icon={FiSettings}
            text="Paramètre"
            ref="/admin/settings"
            couleurTextHover={`hover:text-green-500`}
          />
          <Bouton
            Icon={FiLogOut}
            textBtn="Deconnexion"
            type="button"
            className="flex items-center md:text-xl justify-center py-1 px-3 hover:cursor-pointer hover:text-green-500"
            styleIcon="mr-2"
          />
          {/* <div className="flex justify-center items-center  w-35 gap-x-2">
            <FaUser />
            <p className="font-serif text-xl md:text-xl hover:cursor-pointer">
              Ravaly23
            </p> */}
          {/* onClick={()=>{etat === "hidden" ? setEtat("inline-flex") : setEtat("hidden")}} */}
          {/* <Menu etat={etat} >
             <li className="list-none text-xl md:text-"><Link to={"/admin/"}>Accueil</Link></li>
             <li className="list-none text-xl md:text-xl"><Link to={"/admin/settings"}>Paramètre</Link></li>
             <li className="list-none text-xl md:text-xl"><p onClick={() => alert("Vous vous êtes déconnectés")}>Déconnexion</p></li>
          </Menu> */}
          {/* </div> */}
        </div>
        <div
          className="inline-flex justify-center items-center md:hidden"
          onClick={() => {
            etat === "hidden" ? setEtat("inline-flex") : setEtat("hidden");
          }}
        >
          <FaUser className="mr-11" title="Voir les menus"/>
          <Menu etat={etat}>
          <LinkButton 
          Icon={FaUser} 
          text="Ravaly23" 
          ref="/admin/" 
          
          />
          <LinkButton
            Icon={FiSettings}
            text="Paramètre"
            ref="/admin/settings"
            couleurTextHover="green-500"
          />
          <Bouton
            Icon={FiLogOut}
            textBtn="Deconnexion"
            type="button"
            className="flex items-center text-sm md:text-xl justify-center py-1 px-3 mr-8 hover:cursor-pointer"
            styleIcon="mr-2"
          />
          </Menu>
        </div>
      </nav>
    </>
  );
}
