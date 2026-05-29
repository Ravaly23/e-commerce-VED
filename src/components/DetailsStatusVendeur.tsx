import { GrFormNextLink } from "react-icons/gr";
import { CiClock2 } from "react-icons/ci";
import { GrStatusGood } from "react-icons/gr";
import Bouton from "./ButtonInput";
import { TiDeleteOutline } from "react-icons/ti";
interface DemandeProps {
  pdp?: string; //photo de la personne
  nom_prenom?: string;
  statusActuel?: string; //status entre En attente,Actifs,ou Bloqués
  statusDemande?: string;
  date?: string;
  adress?: string;
  message?: string; //message adressé à l'admin ex : venait de faire une inscripion
}

interface StatusProps {
  status?: string;
}

const Status = ({ status }: StatusProps) => {
  if (status === "En attente") {
    return (
      <div className="flex border rounded-xl items-center  px-1 py-1 gap-x-2 bg-orange-200 border-orange-700 my-3 w-35">
        <CiClock2 className="w-4 h-4 text-amber-950 font-bold ml-2" />
        <p className="text-sm text-amber-950 font-bold">En attente</p>
      </div>
    );
  } else if (status === "Actif") {
    return (
      <div className="flex  rounded-2xl items-center px-1 py-1 gap-x-2 bg-green-300 my-3 border-green-950 w-25">
        <GrStatusGood className="w-4 h-4 text-green-950 font-bold  ml-2" />
        <p className="text-sm text-green-950 font-bold">Actifs</p>
      </div>
    );
  } else {
    return (
      <div className="flex  rounded-2xl items-center px-1 py-1 gap-x-2 bg-white my-3 border border-red-500 w-25">
        <TiDeleteOutline className="w-4 h-4 text-red-500 font-bold ml-2" />
        <p className="text-sm text-red-500 font-bold">Bloqués</p>
      </div>
    );
  }
};

const StatusVendeur = ({
  pdp,
  nom_prenom,
  statusActuel,
  statusDemande,
  adress,
  message,
  date,
}: DemandeProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between mx-auto w-11/12 py-4 px-3 rounded-xl bg-white mb-4">
        <div className="flex w-5/12  gap-x-4">
          <img
            src={pdp}
            alt=""
            className="rounded-[5vw] md:rounded-4xl w-12 h-12"
          />
          <ul className="list-none ">
            <li className="font-serif text-sm md:text-[1.2vw]">
              {nom_prenom}
              <span className="text-gray-500 ml-4 ">{adress}</span>
            </li>
            <li className="flex flex-col md:flex-row">
              {statusActuel === "Actif" ? (
                <>
                  <Status status={statusActuel} />
                  <p className="text-gray-400 font-bold text-sm my-2 md:m-5">
                    {date}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex gap-x-2  ">
                    {/* status actuel */}
                    <Status status={statusActuel} />
                    <GrFormNextLink className="text-gray-500 mt-4 md:mt-5 w-5 h-5" />
                    {/* status attendu */}
                    <Status status={statusDemande} />
                  </div>
                  <p className="text-gray-400 font-bold text-sm my-2 md:m-5">
                    {date}
                  </p>
                </>
              )}
            </li>
            {statusActuel === "Actifs" ? (
              ""
            ) : (
              <li className="text-xm text-gray-500">{message}</li>
            )}
          </ul>
        </div>
        <div className="w-full md:w-55 flex justify-between">
          {statusActuel === "Actif" ? (
            <form action="">
              <Bouton
                type="submit"
                textBtn="Bloquer"
                textCours="En cours..."
                className="flex items-center justify-center border border-red-500 rounded-2xl  text-red-500 font-bold pl-1 pr-2 hover:cursor-pointer"
                Icon={TiDeleteOutline}
                styleIcon="mr-1"
              />
            </form>
          ) : (
            <>
              <form action="">
                <Bouton
                  type="submit"
                  textBtn="Accepter"
                  textCours="En cours..."
                  className="flex items-center justify-center border border-green-900 rounded-2xl bg-green-500 text-white font-bold pl-1 pr-2 hover:cursor-pointer"
                  Icon={GrStatusGood}
                  styleIcon="mr-1"
                />
              </form>
              <form action="">
                <Bouton
                  type="submit"
                  textBtn="Refuser"
                  textCours="En cours..."
                  className="flex items-center justify-center border border-red-500 rounded-2xl  text-red-500 font-bold pl-1 pr-2 hover:cursor-pointer"
                  Icon={TiDeleteOutline}
                  styleIcon="mr-1"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StatusVendeur;
