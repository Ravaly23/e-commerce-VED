import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaLock,
  FaEyeSlash,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/api";

//Validation password
const validatePassword = (value: string): string | undefined => {
  if (!value) return "Un mot de passe est requis.";
  if (value.length < 8)
    return "Le mot de passe doit comporter au moins 8 caractères.";
  if (!/[A-Z]/.test(value))
    return "Le mot de passe doit contenir au moins une lettre majuscule.";
  if (!/[a-z]/.test(value))
    return "Le mot de passe doit contenir au moins une lettre minuscule.";
  if (!/[0-9]/.test(value))
    return "Le mot de passe doit contenir au moins un chiffre";
  if (!/[^A-Za-z0-9]/.test(value))
    return "Le mot de passe doit contenir au moins un caractère spécial.";
};

//Validation confirmation password
const validateConfirmPassword = (
  value: string,
  password: string,
): string | undefined => {
  if (!value) return "Veuillez confirmer votre mot de passe.";
  if (value !== password) return "Les mots de passe ne correspondant pas";
};

type FormErrors = {
  password?: string;
  confirmPassword?: string;
};

export default function MotDePasseOublier() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [isVisibleIconVerification, setIsVisibleIconVerification] =
    useState(false);
  const [iconVerification, setIconVerification] = useState(
    <FaExclamationTriangle />,
  );
  const [passwordVerify, setPasswordVerify] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleConfirmPassword = () => {
    if (password !== confirmPassword) {
      setIsVisibleIconVerification(true);
      setIconVerification(<FaExclamationTriangle />);
      setPasswordVerify(false);
    } else if (password === confirmPassword) {
      setIsVisibleIconVerification(true);
      setIconVerification(<FaCheckCircle />);
      setPasswordVerify(true);
    }
  };

  const validateAll = (): FormErrors => ({
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
  });

  const revalitedField = (field: keyof FormErrors) => {
    if (!submitted) return;
    setErrors((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const handleModification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validateAll();
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const dataUsers = {
      token: token,
      new_password: password,
    };

    setLoading(true);

    toast.promise(api.post("auth/reinitialisation/", dataUsers), {
      position: "top-center",
      loading: "Veuillez patienter...",
      success: (response) => {
        const { data, status } = response;

        if (status !== 200) {
          throw new Error(data.message);
        }

        if (status === 200) setLoading(false);
        navigate("/auth");
        return data.message;
      },
      error: (error: any) => {
        setLoading(false);
        return error.response.data?.message || "Une erreur est survenue";
      },
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-screen bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C]">
      <div className="relative z-10  p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[80%] xl:w-[40%] bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <form onSubmit={handleModification}>
          <p className="pl-2.5 font-bold mb-2.5 text-white">
            Nouveau mot de passe
          </p>
          <div className="flex flex-col gap-1 mb-9">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Entrez votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setShowPassword(!showPassword)}
              onKeyUp={() => revalitedField("password")}
              iconLeft={<FaLock />}
              iconRight={showPassword ? <FaEyeSlash /> : <FaEye />}
            />
            {errors.password && (
              <p className="text-red-400 text-xs pl-1">{errors.password}</p>
            )}
          </div>
          <p className="pl-2.5 font-bold mb-2.5 text-white">
            Confirmer le nouveau mot de passe
          </p>
          <div className="flex flex-col gap-1 mb-9">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirmez votre mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onKeyUp={() => {
                handleConfirmPassword();
                revalitedField("confirmPassword");
              }}
              iconLeft={<FaLock />}
              iconRight={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              iconValid={isVisibleIconVerification ? iconVerification : null}
              passwordVerify={passwordVerify}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs pl-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <Button
            text="Modifier le mot de passe"
            background="[#3C4382]"
            textColor="[#FFFFFF]"
            disable={loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
}
