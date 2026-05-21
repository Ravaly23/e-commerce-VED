import Drawer from "@mui/material/Drawer";
import { useState } from "react";

import { IoIosArrowForward, IoMdClose } from "react-icons/io";
interface MenuLaterauxProps {
  children?: React.ReactNode,
  backgpround?: string,
  isOpen?: boolean,
}

export default function MenuLateraux({ children , backgpround  }: MenuLaterauxProps) {
  const [open,setOpen] = useState(false);
  return (
    < >
      <button onClick={()=>setOpen(!open)} className="absolute mt-7 ml-5 transition-transform hover:cursor-pointer hover:scale-150 hover:text-[rgb(32, 202, 202)]"><IoIosArrowForward size={35} className="hover:text-[rgb(32,202,202)] transition-colors duration-300"/></button>
      <Drawer anchor="left" open={open} onClose={() => {setOpen(!open)}}>
        <div style={{ width: 250, padding: 20 }} className={`h-screen ${backgpround}`}>
          <div onClick={() =>{ setOpen(!open)}} className="flex justify-end  hover:cursor-pointer">
            <IoMdClose size={30}/>
          </div>
          <div className="flex flex-col justify-between border h-11/12">
            {children}
          </div>
        </div>
      </Drawer>
    </>
  );
}
