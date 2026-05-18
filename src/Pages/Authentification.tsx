import { useState } from "react";
import FormulaireConnexion from "../components/FormulaireConnexion";
import FormulaireInscription from "../components/FormulaireInscription";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  function handleLogin() {
    setIsLogin(true);
  }

  function handleSignUp() {
    setIsLogin(false);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C] absolute">
      <div className="relative z-10  p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[80%] xl:w-1/2 bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <div className="relative border border-black-500 border-white/30 rounded-xl h-10 sm:mx-10 xl:mx-20">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-[#3C4382] rounded-xl transition-all duration-300 ${
              isLogin ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>
          <button
            className="w-1/2 rounded-xl h-10 relative z-10 text-white cursor-pointer"
            onClick={handleLogin}
          >
            Se connecter 
          </button>
          <button
            className="w-1/2 rounded-xl h-10 relative z-10 text-white cursor-pointer"
            onClick={handleSignUp}
          >
            S'inscrire
          </button>
        </div>

        <div className="relative overflow-hidden h-full mt-10">
          <div
            className={`transition-all duration-500 ${
              isLogin
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10 absolute inset-0 pointer-events-none"
            }`}
          >
            <FormulaireConnexion />
          </div>

          <div
            className={`transition-all duration-500 ${
              !isLogin
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10 absolute inset-0 pointer-events-none"
            }`}
          >
            <FormulaireInscription />
          </div>
        </div>
      </div>
    </div>
  );
}
