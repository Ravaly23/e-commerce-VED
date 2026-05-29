import { useEffect, useState } from "react";

import Bouton from "./ButtonInput";
import Inpute from "./Inpute";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

interface SettingProps {
  identifiant?: string;
  username?: string;
  ancienMdp?: string;
  nouveauMdp?: string;
  confNouveauMdp?: string;
}

interface ParamProps{
  role?: "admin"|"client"|"vendeur";

}

export default function Settings() {
  const [formData, setFormData] = useState<SettingProps>({
    identifiant: "",
    username: "",
    ancienMdp: "",
    nouveauMdp: "",
    confNouveauMdp: "",
  });
  const {user} = useAuth();

  const [showPasswordAncien, setShowPasswordAncien] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const [iconVerif, setIconVerif] = useState(<FaExclamationTriangle />);
  const [mustVerifMdp, setMust] = useState(false);
  const [isVisibleIcon, setVisible] = useState(false);

  // Handle Text Inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nomInvalid = formData.username !== "" ? false : true;
  const mdpAncienInvalid = formData.ancienMdp !== "" ? false : true;
  const mdpNouveauInvalid = formData.nouveauMdp !== "" ? false : true;
  const mdpConfInvalid = formData.confNouveauMdp !== "" ? false : true;


  useEffect(() => {  
    if (formData.confNouveauMdp === formData.nouveauMdp && (formData.nouveauMdp !== "" || formData.confNouveauMdp !=="")) {
      setVisible(true);
      setMust(true);
      setIconVerif(<FaCheckCircle />);
    } else if (formData.confNouveauMdp !== formData.nouveauMdp && (formData.nouveauMdp !== "" || formData.confNouveauMdp !=="")) {
      setVisible(true);
      setMust(false);
      setIconVerif(<FaExclamationTriangle />);
    }else{
        setVisible(false);
    }
  },[formData.confNouveauMdp,formData.nouveauMdp]);


  const handleSubmit = async () => {
    console.log(formData.confNouveauMdp);
  };
  return (
    <>
      
        <form
          action={handleSubmit}
          className="space-y-6 w-11/12 mx-auto rounded-2xl p-5 mt-10 mb-10  shadow-2xs bg-white md:w-1/2"
        >
          {/* identifiant */}
          <div>
            <input
              type="hidden"
              name="idP"
              required
              placeholder="ex, Vintage Denim Jacket"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              defaultValue={user?.id}
            />
          </div>
          {/* identifiant */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Email{" "}
              {nomInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <Inpute
              type="email"
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
              Ancien Mots de Passe{" "}
              {mdpAncienInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <Inpute
              type={showPasswordAncien ? "text" : "password"}
              name="ancienMdp"
              placeholder=""
              className="w-full pt-3 pb-3 pl-10 pr-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
              defaultValue={formData.ancienMdp}
              iconLeft={<FaLock />}
              iconRight={showPasswordAncien ? <FaEyeSlash /> : <FaEye />}
              onClick={() => setShowPasswordAncien(!showPasswordAncien)}
            />
          </div>
          {/* identifiant */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Nouveau mots de pass{" "}
              {mdpNouveauInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <Inpute
              type={showPasswordNew ? "text" : "password"}
              name="nouveauMdp"
              placeholder=""
              className="w-full pt-3 pb-3 pl-10 pr-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
              defaultValue={formData.nouveauMdp}
              iconLeft={<FaLock />}
              iconRight={showPasswordNew ? <FaEyeSlash /> : <FaEye />}
              onClick={() => setShowPasswordNew(!showPasswordNew)}
            />
          </div>
          {/* identifiant */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Confirmer nouveau mots de pass{" "}
              {mdpConfInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <Inpute
              type={showPasswordConf ? "text" : "password"}
              name="confNouveauMdp"
              placeholder=""
              className="w-full pt-3 pb-3 pl-10 pr-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
              defaultValue={formData.confNouveauMdp || ""}
              iconLeft={<FaLock />}
              iconRight={showPasswordConf ? <FaEyeSlash /> : <FaEye />}
              onClick={() => {
                setShowPasswordConf(!showPasswordConf);
              }}
              iconValid={isVisibleIcon ? iconVerif : null}
              passwordVerify={mustVerifMdp}
            />
          </div>
          <Bouton
            type="submit"
            className="w-full py-4 bg-[rgb(32,202,202)] text-white rounded-xl font-bold hover:bg-[rgb(28,180,180)] transition-all shadow-md active:scale-[0.98] hover:cursor-pointer"
            textBtn="Enregistrer la modification"
            textCours="En cours ..."
          />
        </form>
      
    </>
  );
}
