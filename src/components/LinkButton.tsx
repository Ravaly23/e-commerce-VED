import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
interface LienProps {
  ref?: string;
  text?: string;
  background?: string;
  couleur?: string;
  couleurTextHover?: string;
  backgroundHover?: string;
  icone?: boolean;
  Icon?:IconType;
  font?: string;
  activeBtnStyle?: boolean;
  onClick?: ()=> void
}


export default function LinkButton({
  ref,
  text,
  background,
  couleur,
  couleurTextHover,
  backgroundHover,
  icone,
  Icon,
  font,
  activeBtnStyle,
  onClick
}: LienProps) {
  return (
    <>
      <Link
        to={`${ref}`}
        style={{ backgroundColor: background, color: couleur }}
        className={`${font}  inline-flex ${activeBtnStyle ? "border" : ""} rounded-2xl text-[3.5vw] pt-[0.7vw] pb-[0.7vw]  pr-[1.5vw] 
       hover:cursor-pointer md:pt-[0.2vw] md:pb-[0.2vw] ${icone ? "md:pl-1 pl-[4vw]" : "md:pl-[1vw] pl-[1.5vw]"}  md:pl-[1vw] md:pr-[1vw] md:text-xl 
       ${couleurTextHover} hover:${backgroundHover} ${couleur} items-center `}
        onClick={onClick}
      >
        {/* className="relative top-2 right-2 md:right-3 md:top-[0.45vw]" */}
        {Icon && <Icon className="mr-3" size={20} />}
        <span>{text}</span>
      </Link>
    </>
  );
}
