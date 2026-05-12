import LayoutsLambako from "../layouts/LayoutsLambako";
import LinkButton from "../components/LinkButton";
import { IoMdAdd } from "react-icons/io";
import BoiteListing from "../components/BoiteListing";
import Carte from "../components/Carte";
import Tableau from "../components/Tableau";
// import MenuLateraux from "../components/MenuLateraux";
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
  const [afficheT, setAfficheT] = useState("hidden");
  const [activeListing, setActiveL] = useState("");
  const [activeSetting, setActiveS] = useState("");
  return (
    <LayoutsLambako page={"adminSeller"}>
      <div className="bg-gray-100 pb-10">
        {/* <MenuLateraux>
          <ul className="flex flex-col gap-y-3 ju">
            <li
              className={`${activeListing} font-serif text-xl md:text-2xl hover:cursor-pointer`}
            >
              My Listing
            </li>
            <li
              className={`${activeSetting} font-serif text-xl md:text-2xl hover:cursor-pointer`}
            >
              Settings
            </li>
          </ul>
          <div className="">
            <LinkButton text="Log out" icone={true} Icon={IoMdLogOut} />
          </div>
        </MenuLateraux> */}
        <div className="flex pt-5 pb-[5vw]  pr-[5vw] pl-[5vw] justify-between md:flex-row  md:pl-[4vw] md:pr-[4vw] md:pb-[2vw]">
          <div className="">
            <h1 className="font-serif text-[3.5vw] md:text-3xl mb-[1vw]">
              Seller Dashboard
            </h1>
            <p className="font-serif text-[2.7vw] md:text-xl">
              Manage your listings and track your sales
            </p>
          </div>
          <div>
            <LinkButton icone={true} Icon={IoMdAdd} text="New listing" ref="/profilxxxx/Add"/>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 w-11/12 pb-10 mx-auto md:ml-[3.7vw] md:mr-[3.7vw] md:flex-row md:justify-between md:gap-y-0">
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
        </div>
        <div className="flex flex-col gap-y-10 pl-0 w-full md:w-11/12 md:ml-8 md:mr-8 md:flex-row md:justify-between md:mb-15">
          <Carte type="courbe" />
          <Carte type="barre" />
        </div>
        <div
          className={`flex flex-col mx-8 my-10 border-white rounded-3xl shadow-bg-gray-100 shadow bg-white md:w-10/12 md:h-auto md:my-16 md:mx-25`}
        >
          <div className="justify-between flex md:h-auto p-5 md:justify-between">
            <h1 className=" font-serif text-xl md:text-2xl">My Listing</h1>
            <p className="text-gray-400 font-serif text-xl md:text-xl">
              active listings
            </p>
          </div>
          <div className="flex m-5 items-center justify-center overflow-x-auto md:m-10">
            <Tableau>
              <>
                {donneeTab.map((item) => (
                  <tr
                    key={item.id}
                    className=" border-b h-15 border-gray-400 md:h-20"
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
