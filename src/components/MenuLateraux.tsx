import Drawer from "@mui/material/Drawer";
import { useState } from "react";

import { IoMdClose } from "react-icons/io";
// import { MdLegendToggle } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
interface MenuLaterauxProps {
  children?: React.ReactNode,
  backgpround?: string,
  stateMenu?: boolean
}

export default function MenuLateraux({ children , backgpround ,stateMenu}: MenuLaterauxProps) {
  const [open,setOpen] = useState(stateMenu);
  return (
    < >
      <button onClick={() => setOpen(true)} className="absolute mt-7 ml-5 transition-transform hover:cursor-pointer hover:scale-150 hover:text-[rgb(32, 202, 202)]"><IoIosArrowForward size={35} className="hover:text-[rgb(32,202,202)] transition-colors duration-300"/></button>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 250, padding: 20 }} className={backgpround}>
          <div onClick={() => setOpen(false)} className="flex justify-end  hover:cursor-pointer">
            <IoMdClose size={30}/>
          </div>
          <div>
            {children}
          </div>
        </div>
      </Drawer>
    </>
  );
}
