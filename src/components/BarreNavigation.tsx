import NavAccueil from "./NavAccueil";
import NavAdmin from "./NavAdminSeller";
import NavConnected from "./NavConnected";
import NavSuper from "./navSuperAdmin";
interface BarreProps {
  type?: string;
}
export default function BarreNavigation({ type }: BarreProps) {
  if (type === "accueil") {
    return <NavAccueil />;
  } else if (type === "adminSeller") {
    return <NavAdmin />;
  } else if (type === "user") {
    return <NavConnected />;
  } else {
    return <NavSuper />;
  }
}
