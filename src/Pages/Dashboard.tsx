import LayoutsLambako from "../layouts/LayoutsLambako";
import LinkButton from "../components/LinkButton";
import { IoMdAdd } from "react-icons/io";
import BoiteListing from "../components/BoiteListing";
import Carte from "../components/Carte";
import Tableau from "../components/Tableau";
import MenuLateraux from "../components/MenuLateraux";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
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
      products: "Conversekhgkgkgkkkkkkkkkkkkkkkkkkkkkyjyjyjyj",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
    {
      id: 4,
      products: "Converse",
      categorie: "Shoes",
      prices: 40,
      views: 500,
      likes: 40,
      condition: "very good",
    },
  ];
  // const [afficheT, setAfficheT] = useState("hidden");
  // const [activeListing, setActiveL] = useState("");
  // const [activeSetting, setActiveS] = useState("");
  // const [open,setOpen] = useState(false);
  return (
    <LayoutsLambako page={"adminSeller"}>
      <div className="bg-gray-100 pb-10"> 
        <div className="flex pt-5 pb-[5vw]  pr-[5vw] pl-[5vw] justify-between md:flex-row  md:pl-[4vw] md:pr-[4vw] md:pb-[2vw]">
          <div className="">
            <h1 className="font-serif text-[3.5vw] md:text-3xl mb-[1vw]">
              Tableau de Bord des ventes
            </h1>
            <p className="font-serif text-[2.7vw] md:text-xl">
              Gérez vos annonces  et suivez vos ventes
            </p>
          </div>
          <div>
            <LinkButton icone={true} Icon={IoMdAdd} text="Nouvelle annonce" ref="/profilxxxx/Add" activeBtnStyle={true}/>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 w-11/12 pb-10 mx-auto  md:flex-row md:justify-between md:gap-y-0">
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} size="md:text-xl"/>
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} size="md:text-xl"/>
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} size="md:text-xl"/>
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} size="md:text-xl"/>
        </div>
        <div className="border flex flex-col gap-y-10 pl-0 w-full md:w-11/12 mx-auto md:flex-row md:justify-between md:mb-15">
          <Carte type="courbe" />
          <Carte type="barre" />
        </div>
        <div
          className={`flex flex-col mx-8 my-10 border-white rounded-3xl shadow-bg-gray-100 shadow bg-white md:w-10/12 md:h-auto md:my-16 md:mx-25`}
        >
          <div className="justify-between flex md:h-auto p-5 md:justify-between">
            <h1 className=" font-serif text-xl md:text-2xl">Mes annonces</h1>
            <p className="text-gray-400 font-serif text-xl md:text-xl">
              annonces active
            </p>
          </div>
          <div className="flex m-5 items-center justify-center overflow-x-auto md:m-10">
            <Tableau>
              <>
                {donneeTab.map((item) => (
                  <tr
                    key={item.id}
                    className=" border-b h-15 border-gray-400 md:h-20 hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap p-2 md:p-6">
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
            </Tableau>
          </div>
        </div>
      </div>
    </LayoutsLambako>
  );
}

export default Dashboard;
