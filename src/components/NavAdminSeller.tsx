import { IoMdLogOut } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import LinkButton from "./LinkButton";
import Input from "./Input";
import { useState } from "react";
export default function NavAdmin() {
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

        {/* 3. ACTIONS  */}
        <div className="inline-flex">
          <LinkButton text="Log out" icone={true} Icon={IoMdLogOut}/>
        </div>
        {/* responsive */}
      </nav>
    </>
  );
}
