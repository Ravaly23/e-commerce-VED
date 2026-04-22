import type React from "react";
import NavAccueil from "../components/NavAccueil";
import NavAdmin from "../components/NavAdmin";
interface LayoutsProp{
    children : React.ReactNode;
    page?: String;
}

export default function LayoutsLambako({children , page}: LayoutsProp) {
  return (
    <>
      <header>
        {
            (page === "accueil") ?  <NavAccueil /> :  <NavAdmin />
        }
      </header>
      <main>
         {children}
      </main>
      <footer className="bg-white pt-16 pb-8 px-8 md:pl-8 md:pr-25 border-t border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-12">
          {/* 1. LOGO ET DESCRIPTION */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter italic text-red-600">
              E-<span className="text-black">Lambako</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Get the Best Electronics At The Best Prices. With Full Warranty
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

          {/* 2. Lien*/}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-red-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* 3. CONTACT US */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>+261 xx xx xxx xx</li>
              <li>+261 xx xx xxx xx</li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Subscribe to our Email
            </h3>
            <p className="text-xl font-bold text-gray-900 mb-6">
              For Latest News & Updates
            </p>
            <div className="flex flex-col md:flex-row gap-y-2">
              <input
                type="email"
                placeholder="Enter your Email"
                className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm flex-1 outline-none focus:border-red-400"
              />
              <button className="bg-red-500 text-white px-2 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
