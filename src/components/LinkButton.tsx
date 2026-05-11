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
  font?: string
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
  font
}: LienProps) {
  return (
    <>
      <Link
        to={`${ref}`}
        style={{ backgroundColor: background, color: couleur }}
        className={`${font} relative inline-flex border rounded-2xl text-[3.5vw] pt-[0.7vw] pb-[0.7vw]  pr-[1.5vw] 
       hover:cursor-pointer md:pt-[0.2vw] md:pb-[0.5vw] ${icone ? "md:pl-[2vw] pl-[4vw]" : "md:pl-[1vw] pl-[1.5vw]"}  md:pl-[1vw] md:pr-[1vw] md:text-xl 
       hover:text-[${couleurTextHover}] hover:bg-[${backgroundHover}] text-[${couleur}]`}
      >
        {Icon && <Icon className="relative top-2 right-2 md:right-3 md:top-[0.45vw]" size={20} />}
        <span>{text}</span>
      </Link>
    </>
  );
}
