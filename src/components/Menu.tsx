import type { ReactNode } from "react";


interface MenuProps{
    children?: ReactNode;
    etat?:string;
}

const Menu = ({etat,children}:MenuProps) => {
  return (
    <>
      {" "}
      <div className={`${etat} fixed z-100`}>
        <div className="fixed right-13 top-13 bg-gray-100 w-7 h-7 rotate-45 shadow-2xs z-20"></div>
        <div className={`fixed right-5 top-15 bg-gray-100 w-35 border h-auto  shadow-2xs z-30 pb-2 pt-2`}>
           {children}
        </div>
      </div>
      
    </>
  );
};

export default Menu;
