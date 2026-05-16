import { useFormStatus } from "react-dom";
import type { IconType } from "react-icons";
interface btnProps {
  nom?: string;
  prenom?: string;
  type?: "submit" | "reset" | "button";
  textBtn?: string;
  className?:string;
  onClick?: () =>{};
  Icon?: IconType;
  textCours?:string
}

export default function Bouton({ type, textBtn ,className,onClick,textCours}: btnProps) {
  const { pending } = useFormStatus();
  return (
    <button type={type} disabled={pending} className={pending ? `animate-pulse ${className}` : className} onClick={onClick}>
      {pending ? textCours : textBtn}
    </button>
  );
}