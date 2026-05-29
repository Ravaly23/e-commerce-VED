
import type { IconType } from "react-icons"; // ou "react-icons" selon ton setup

interface BoiteProps {
  Sary?: IconType;
  typeB?: string;
  valeurB?: string;
  size?: string; // Gardé pour la rétrocompatibilité, mais optionnel grâce aux nouvelles classes natives
  fondSary?: string;
  textSary?: string;
}

export default function BoiteListing({ Sary, typeB, valeurB, size ,fondSary,textSary}: BoiteProps) {
  return (
    <div className="bg-white rounded-2xl p-5 w-[95%] mx-auto md:w-[23vw] md:mx-0 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      
      {/* EN-TÊTE : Titre et Icône alignés */}
      <div className="flex items-start justify-between gap-x-4">
        <div className="flex flex-col gap-y-1">
          <span className={`text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider ${size}`}>
            {typeB}
          </span>
          {/* Valeur textuelle principale */}
          <h3 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
            {valeurB}
          </h3>
        </div>

        {/* Boîtier de l'icône style SaaS épuré */}
        {Sary && (
          <div 
          className={`${fondSary} ${textSary} 
          rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0 border border-emerald-100/50`}
          >
            <Sary className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        )}
        {/* bg-emerald-50 text-emerald-600 */}
      </div>

      {/* OPTIONNEL : Petite bordure ou indicateur de tendance si tu veux faire évoluer ton design plus tard */}
      {/* <div className="mt-4 flex items-center text-xs text-gray-400">
        <span>Mise à jour en temps réel</span>
      </div> */}

    </div>
  );
}