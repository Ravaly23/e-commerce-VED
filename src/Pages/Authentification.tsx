import { useState } from "react";
import FormulaireConnexion from "../components/FormulaireConnexion";
import FormulaireInscription from "../components/FormulaireInscription";
import fondImage from "../assets/happy-girlfriends-holding-shopping-bags.jpg";


export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    function handleLogin() {
        setIsLogin(true);
    }

    function handleSignUp() {
        setIsLogin(false);
    }

    const fond = {
        backgroundImage: `url(${fondImage})`,
    }
    return (
        <div className="relative w-screen h-screen grid grid-cols-1 xl:grid-cols-2 overflow-hidden" >
            <div className="absolute inset-0 bg-cover bg-center blur-xl scale-105" style={fond}></div>
            <div className="relative z-10">
                <div className="relative my-10 mx-10 lg:mx-25 border border-black-500 border-white/30 rounded-xl h-10">
                    <div
                        className={`absolute top-0 left-0 h-full w-1/2 bg-[#3C4382] rounded-xl transition-all duration-300 ${isLogin ? "translate-x-0" : "translate-x-full"
                            }`}
                    ></div>
                    <button className="w-1/2 rounded-xl h-10 relative z-10 text-white cursor-pointer" onClick={handleLogin}>Login in</button>
                    <button className="w-1/2 rounded-xl h-10 relative z-10 text-white cursor-pointer" onClick={handleSignUp}>Sign Up</button>
                </div>
                <div className="relative overflow-hidden h-full">

                    <div
                        className={`transition-all duration-500 ${isLogin
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10 absolute inset-0 pointer-events-none"
                            }`}
                    >
                        <FormulaireConnexion />
                    </div>

                    <div
                        className={`transition-all duration-500 ${!isLogin
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10 absolute inset-0 pointer-events-none"
                            }`}
                    >
                        <FormulaireInscription />
                    </div>

                </div>
            </div>
            <div className="relative bg-green-500 m-5 rounded-3xl bg-cover z-10 hidden xl:block" style={fond}>
                {/* <div className="z-20 absolute bg-white/30 backdrup-blur-md border border-white/30 shadow-xl 
                h-50 bottom-0 w-full rounded-t-4xl rounded-b-3xl text-center">
                    <h1 className="text-xl text-medium mt-10 mb-5">Welcome to VED</h1>
                    <p>Sign in to continue your personnalized digital experience and unclock all exclusive features</p>
                </div> */}
            </div>
        </div>
    );
}