import { Link } from "react-router-dom"; // Ou "next/link" si tu passes sur Next.js plus tard
import { MdReportProblem } from "react-icons/md";




export default function Unauthorized() {
  const role = localStorage.getItem("role");
  const userConnected = localStorage.getItem("user");
  const user = userConnected ? JSON.parse(userConnected) : null;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="inline-flex p-4 bg-[rgb(32,202,202)]/10 rounded-full mb-4 text-[rgb(32,202,202)]">
          <MdReportProblem size={45} />
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-950 mb-2">
          403 - Page non autorisée
        </h1>

        <p className="text-gray-500 font-serif text-sm md:text-base mb-6">
          Oups! Vous n'avez pas accès à cette page!!!.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {role === "vendeur" ? (
            <Link
              to={`/${user.username}/dashboard`}
              className="px-5 py-2.5 bg-[rgb(32,202,202)] text-white text-sm font-semibold rounded-xl hover:bg-[rgb(28,180,180)] transition-all shadow-sm hover:cursor-pointer"
            >
              retourner à l'accueil 
            </Link>
          ) : (
            <Link
              to={`/${user.username}/home`}
              className="px-5 py-2.5 bg-[rgb(32,202,202)] text-white text-sm font-semibold rounded-xl hover:bg-[rgb(28,180,180)] transition-all shadow-sm hover:cursor-pointer"
            >
              retourner à l'accueil
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
