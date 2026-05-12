import LinkButton from "./LinkButton";
export default function NavAccueil(){
   return (
    <>
     <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
          {/* 1. LOGO */}
          <div className="shrink-0">
            <h1 className="text-2xl font-bold tracking-tighter italic text-red-600">
              E-<span className="text-black">Lambako</span>
            </h1>
          </div>

          {/* 2. LIENS (Centrés) */}
          <ul className="hidden md:flex items-center gap-x-8 text-sm font-medium text-gray-600">
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                Blog
              </a>
            </li>
          </ul>

          {/* 3. ACTIONS (Log in & Icons) */}
          <div className="flex items-center gap-x-4">
            {/* <button className="bg-gray-100 px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200">
              Log In
            </button> */}
            <LinkButton ref="/auth" text="log in" font="font-bold font-serif" couleur="#ffffff" background="#D3D3D3"/>

            {/* Icône Loupe (Simplifiée) */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Icône Panier (Simplifiée) */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>
          </div>
        </nav>
    </>
   );
}