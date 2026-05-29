import { useState } from "react";

import Bouton from "./ButtonInput";
import Inpute from "./Inpute";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

interface SettingProps {
  username?: string;
  mdp?: string;
}

export default function FormulaireAdmin() {
  const [formData, setFormData] = useState<SettingProps>({
    username: "",
    mdp: "",
  });

  const [showPasswordAncien, setShowPasswordAncien] = useState(false);
  const [messageEmail, setMesEmail] = useState("");

  // Handle Text Inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const InvalidEmail = (email: string): string => {
    if (!email.trim()) {
      return "Champ requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Veuillez entrer un email valide";
    }
    return "";
  };

  const invalidMdp = (mdp: string): string => {
    // La Regex magique pour la sécurité :
    // (?=.*[A-Z])   -> Au moins une majuscule
    // (?=.*[a-z])   -> Au moins une minuscule
    // (?=.*\d)      -> Au moins un chiffre
    // (?=.*[\W_])   -> Au moins un caractère spécial (non-alphanumérique ou underscore)
    // .{8,}         -> Au moins 8 caractères au total
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if(!passwordRegex.test(mdp)){
      return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
    }
    return "";
  };

  const nomInvalid = formData.username !== "" ? false : true;
  const mdpInvalid = formData.mdp !== "" ? false : true;

  const handleSubmit = async () => {
    console.log(formData.mdp);
  };
  return (
    <>
      <form
        action={handleSubmit}
        className="space-y-6 w-11/12 mx-auto rounded-2xl p-5 mt-10 mb-10  shadow-2xs bg-white md:w-1/2"
      >
        <div>
          <label className="flex text-sm font-semibold text-gray-700 mb-1">
            Email {nomInvalid && <p className="text-red-600 ml-2">*</p>}
            {!nomInvalid && (
              <p className="text-red-600 ml-2">
                {InvalidEmail(formData.username ?? "")}
              </p>
            )}
          </label>
          <Inpute
            type="text"
            name="username"
            placeholder=""
            className="w-full pt-3 pb-3 pl-10 pr-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
            onChange={handleInputChange}
            defaultValue={formData.username}
            iconLeft={<FaUser />}
          />
        </div>
        {/* identifiant */}
        <div>
          <label className="flex text-sm font-semibold text-gray-700 mb-1">
            Mots de Passe {mdpInvalid && <p className="text-red-600 ml-2">*</p>}
            {!mdpInvalid && <p className="text-red-600 ml-2">{invalidMdp(formData.mdp ?? "")}</p>}
          </label>
          <Inpute
            type={showPasswordAncien ? "text" : "password"}
            name="mdp"
            placeholder=""
            className="w-full pt-3 pb-3 pl-10 pr-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
            onChange={handleInputChange}
            defaultValue={formData.mdp}
            iconLeft={<FaLock />}
            iconRight={showPasswordAncien ? <FaEyeSlash /> : <FaEye />}
            onClick={() => setShowPasswordAncien(!showPasswordAncien)}
          />
        </div>

        <Bouton
          type="submit"
          className="w-full py-4 bg-[rgb(32,202,202)] text-white rounded-xl font-bold hover:bg-[rgb(28,180,180)] transition-all shadow-md active:scale-[0.98] hover:cursor-pointer"
          textBtn="Se connecter"
          textCours="En cours ..."
        />
      </form>
    </>
  );
}
