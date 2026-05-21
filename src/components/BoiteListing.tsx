import type { IconType } from "react-icons";

interface BoiteProps {
  Sary?: IconType;
  typeB?: string;
  valeurB?: string;
  size?:string
}
export default function BoiteListing({ Sary, typeB, valeurB ,size}: BoiteProps) {
  return (
    <div className="bg-white shadow-sm rounded-3xl p-3 w-[95%] mx-auto md:w-[22vw] md:mx-0 border border-gray-100">
      <h2 className={`text-gray-500 text-sm ${size}  font-serif`}>
        {typeB}
      </h2>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm md:text-2xl font-bold ">{valeurB}</p>

        <div className="bg-green-100 rounded-4xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
          {Sary && <Sary className="text-green-600 w-6 h-6 md:w-8 md:h-8" />}
        </div>
      </div>
    </div>
  );
}
