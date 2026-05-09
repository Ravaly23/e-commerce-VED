
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Input from "./Input";
import { useState } from "react";
export default function NavConnected() {
  const [valueSearch,setValueSearch] = useState("");

  return (
    <>
      <nav className="flex items-center justify-between px-5 py-4 bg-white shadow-sm">
        {/* 1. LOGO */}
        <div className="shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter italic text-red-600 hover:cursor-pointer">
            E-<span className="text-black">Lambako</span>
          </h1>
        </div>

        {/* 2. LIENS (Centrés) */}
        <div className="hidden md:inline-flex">
           <Input 
           type="text" 
           placeholder="Search Items"
           value={valueSearch}
           iconRight={<FaSearch />}
           onChange={(e) => setValueSearch(e.target.value)}
           
          />
        </div>
        <div className="flex justify-center items-center  w-35 gap-x-2">
            <FaUser />
            <p className="font-serif text-xl md:text-xl">Ravaly23</p>
        </div>

      </nav>
    </>
  );
}
