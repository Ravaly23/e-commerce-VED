import type React from "react";
import BarreNavigation from "../components/BarreNavigation";
import { Outlet } from "react-router-dom";

interface LayoutsProp{
    children? : React.ReactNode;
    page?: string;
    onSearch?: (find:string) => void;
}

export default function LayoutsLambako({children , page,onSearch}: LayoutsProp) {
 
  return (
    <>
      <header>
         <BarreNavigation type={page} onSearch={onSearch}/>
      </header>
      <main className="">
         {children !== null ? children: <Outlet />}
      </main>
      <footer className="bg-white pt-16 pb-8 px-8 md:pl-8 md:pr-25 border-t border-gray-100 shadow-sm ">
        <div className="max-w-7xl mx-auto flex flex-col gap-y-10 md:flex-row md:justify-between md:gap-y-0">
          {/* 1. LOGO ET DESCRIPTION */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter italic text-red-600">
              E-<span className="text-black">Lambako</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Obtenez les meilleurs produits aux meilleurs prix. Avec une garantie complète.
            </p>
            <div className="flex gap-4">
              {/* Icônes réseaux sociaux  */}
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 cursor-pointer">
                f
              </div>
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 cursor-pointer">
                t
              </div>
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 cursor-pointer">
                in
              </div>
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 cursor-pointer">
                ig
              </div>
            </div>
          </div>

       

          {/* 3. CONTACT US */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contactez-nous</h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>+261 xx xx xxx xx</li>
              <li>+261 xx xx xxx xx</li>
            </ul>
          </div>      
        </div>
      </footer>
    </>
  );
}
