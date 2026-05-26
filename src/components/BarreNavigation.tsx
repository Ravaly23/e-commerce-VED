
import NavAccueil from "./NavAccueil";
import NavAdmin from "./NavAdminSeller";
import NavConnected from "./NavConnected";

interface BarreProps {
  type?: string;
  onSearch?: (find:string) => void;
}
export default function BarreNavigation({ type ,onSearch }: BarreProps) {
  if (type === "accueil") {
    return <NavAccueil />;
  } else if (type === "adminSeller") {
    return <NavAdmin onSearch={onSearch}/>;
  } else if (type === "user") {
    return <NavConnected />;
  } 
}
