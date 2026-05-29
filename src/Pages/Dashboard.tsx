import LayoutsLambako from "../layouts/LayoutsLambako";
import LinkButton from "../components/LinkButton";
import { IoMdAdd } from "react-icons/io";
import BoiteListing from "../components/BoiteListing";
import Carte from "../components/Carte";
import Tableau from "../components/Tableau";
import { GrView } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { Mga } from "@/components/icon/Mga";
import { LuHeart } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

function Dashboard() {
  const donneeTab = [
    {
      id: 1,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 2,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 3,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 4,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 5,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 6,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 7,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 8,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 9,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 10,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 11,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 12,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 13,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 14,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 15,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 16,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 17,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 18,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 19,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 20,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 21,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 22,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 23,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 24,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 25,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 26,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 27,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 28,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 29,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 30,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 31,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 32,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
        {
      id: 33,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 34,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },

    {
      id: 35,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 36,
      products: "x",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
  ];
  const [motsRecherche, setMots] = useState("");
  const data = donneeTab.filter((x) => {
    if (!motsRecherche || motsRecherche.trim() === "") return x;
    const nomProduit = x?.products.toLowerCase() ?? "";
    const recherche = motsRecherche.toLowerCase();

    return nomProduit.includes(recherche);
  });
  const { user } = useAuth();

  //Pagination
  const articleParPage = 10;
  const [pageActuel, setPageActuel] = useState(1);

  //reinitialiser la page apres recherche à 1
  useEffect(() => {
    setPageActuel(1);
  }, [motsRecherche]);

  const indexItemDernier = pageActuel * articleParPage;
  const indexItemPremier = indexItemDernier - articleParPage;

  const itemsAffiche = data.slice(indexItemPremier, indexItemDernier);
  const totalPages = Math.ceil(data.length / articleParPage);
  return (
    <LayoutsLambako page={"adminSeller"} onSearch={setMots}>
      <div className="bg-gray-100 pb-10">
        <div className="flex pt-10 pb-10 pr-5 pl-5 justify-between md:flex-row  md:pl-[4vw] md:pr-[4vw] md:pb-[2vw]">
          <div className="">
            <h1 className="font-serif text-[3.5vw] md:text-3xl mb-[1vw]">
              Tableau de Bord des ventes
            </h1>
            <p className="font-serif text-[2.7vw] md:text-xl">
              Gérez vos annonces et suivez vos ventes
            </p>
          </div>
          <div>
            <LinkButton
              icone={true}
              Icon={IoMdAdd}
              text="Nouvelle annonce"
              ref={`/${user?.username}/Add`}
              activeBtnStyle={true}
              background="bg-emerald-500"
              couleur="text-white"
              backgroundHover="bg-emerald-300"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 w-11/12 pb-10 gap-x-0 mx-auto  md:flex-row md:justify-between md:gap-y-0 md:gap-x-3">
          <BoiteListing
            typeB="Total des pubs"
            valeurB="2"
            Sary={BsBoxSeam}
            size="md:text-xl"
            fondSary="bg-blue-100"
            textSary="text-blue-950"
          />
          <BoiteListing
            typeB="Total revenue"
            valeurB="2"
            Sary={Mga}
            size="md:text-xl"
            fondSary="bg-emerald-50"
            textSary="text-emerald-600"
          />
          <BoiteListing
            typeB="Total vues"
            valeurB="2"
            Sary={GrView}
            size="md:text-xl"
            fondSary="bg-blue-50"
            textSary="text-blue-600"
          />
          <BoiteListing
            typeB="Total j'aime"
            valeurB="2"
            Sary={LuHeart}
            size="md:text-xl"
            fondSary="bg-red-50"
            textSary="text-red-600"
          />
        </div>

        <div className=" flex flex-col gap-y-10 gap-x-2 w-full md:w-11/12 mx-auto md:flex-row md:justify-between md:mb-15 mb-5">
          <Carte type="courbe" />
          <Carte type="barre" />
        </div>
        <div
          className={`flex flex-col mx-auto border-white rounded-3xl  shadow-bg-gray-100 shadow bg-white w-10/12 md:h-auto `}
        >
          <div className="justify-between flex md:h-auto p-5 md:justify-between ">
            <h1 className=" font-serif text-xl md:text-2xl">Mes annonces</h1>
            <p className="text-gray-400 font-serif text-xl md:text-xl">
              annonces active
            </p>
          </div>
          <div className="flex flex-col items-center justify-center overflow-x-auto">
            {
              itemsAffiche.length > 0 ? 
                          <Tableau>
              <>
                {itemsAffiche.map((item) => (
                  <tr
                    key={item.id}
                    className=" border-b h-15 border-gray-400 md:h-20 hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap  p-2 md:p-6 md:m-0">
                      {item.products}
                    </td>
                    <td className="whitespace-nowrap p-2 md:p-6">
                      {item.categorie}
                    </td>
                    <td className="whitespace-nowrap p-2 md:p-6">
                      {item.prices}
                    </td>
                    <td className="whitespace-nowrap p-2 md:p-6">
                      {item.views}
                    </td>
                    <td className="whitespace-nowrap p-2 md:p-6">
                      {item.likes}
                    </td>
                    <td className="whitespace-nowrap p-2 md:p-6">
                      {item.condition}
                    </td>
                    <td className="whitespace-nowrap p-2 md:p-6">edit/sup</td>
                  </tr>
                ))}
              </>
            </Tableau> :
              <p className="text-red-400 md:text-2xl text-xl animate-pulse">Aucun article n'est trouvé</p> 
            }

          </div>

          {/* AJOUT : Barre de contrôle de la pagination (Style Vinted) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-x-2 my-8 w-11/12 mx-auto">
              <button
                onClick={() => setPageActuel((prev) => Math.max(prev - 1, 1))}
                disabled={pageActuel === 1}
                className="px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Précédent
              </button>

              <div className="flex gap-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setPageActuel(page)}
                      className={`w-8 h-8 rounded-md text-sm font-semibold transition-all ${
                        pageActuel === page
                          ? "bg-[#09b1ba] text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  setPageActuel((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={pageActuel === totalPages}
                className="px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutsLambako>
  );
}

export default Dashboard;
