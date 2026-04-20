import LayoutsLambako from "../layouts/LayoutsLambako";
import LinkButton from "../components/LinkButton";
import { IoMdAdd } from "react-icons/io";
import BoiteListing from "../components/BoiteListing";
import Carte from "../components/Carte";
import Tableau from "../components/Tableau";

function Admin() {
  return (
    <LayoutsLambako page={"admin"}>
      <div className="bg-gray-100 pb-10">
        <div className="flex p-[5vw] justify-between md:flex-row  md:pl-[4vw] md:pr-[4vw] md:pb-[2vw]">
          <div className="">
            <h1 className="font-serif text-[3.5vw] md:text-3xl mb-[1vw]">
              Seller Dashboard
            </h1>
            <p className="font-serif text-[2.7vw] md:text-xl">
              Manage your listings and track your sales
            </p>
          </div>
          <div>
            <LinkButton icone={true} Icon={IoMdAdd} text="New listing" />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 w-11/12 pb-10 mx-auto md:ml-[3.7vw] md:mr-[3.7vw] md:flex-row md:justify-between md:gap-y-0">
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
          <BoiteListing typeB="Total Listing" valeurB="2" Sary={IoMdAdd} />
        </div>
        <div className="flex flex-col gap-y-10 pl-0 w-full md:w-11/12 md:ml-8 md:mr-8 md:flex-row md:justify-between md:mb-15">
             <Carte type="courbe"/>
             <Carte type="barre"/>
        </div>
        <div className="mx-8 my-10 border-white rounded-3xl shadow-bg-gray-100 shadow bg-white md:w-10/12 md:h-auto md:my-16 md:mx-25">
          <div className="justify-between flex md:h-auto p-5 md:justify-between">
                <h1 className=" font-serif text-xl md:text-2xl">My Listing</h1>
                <p className="text-gray-400 font-serif text-xl md:text-xl">active listings</p>
          </div>
          <div className="m-5 overflow-x-auto md:m-10">
             <Tableau />
          </div>
        </div>
      </div>
    </LayoutsLambako>
  );
}

export default Admin;
