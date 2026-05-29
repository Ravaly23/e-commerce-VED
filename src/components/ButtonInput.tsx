import { useFormStatus } from "react-dom";
import type { IconType } from "react-icons";
interface btnProps {
  type?: "submit" | "reset" | "button";
  textBtn?: string;
  className?:string;
  onClick?: () =>{};
  Icon?: IconType;
  textCours?:string;
  onCLickStyle?: (event : React.MouseEvent<HTMLButtonElement>) => void ;
  styleIcon?: string;
}

export default function Bouton({ type, textBtn ,className,onClick,onCLickStyle,textCours,Icon,styleIcon}: btnProps) {
  const { pending } = useFormStatus();
  return (
    <button type={type} disabled={pending} className={pending ? `hover:cursor-progress ${className}` : className} onClick={onCLickStyle} onDoubleClick={onClick}>
      {Icon && <Icon className={styleIcon}/>}
      {pending ? textCours : textBtn}
    </button>
  );
}