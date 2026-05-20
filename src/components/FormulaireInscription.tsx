import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";

//Validation email
const validateEmail = (value: string): string | undefined => {
  const t = value.trim();
  if (!t) return "Email est requis.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))
    return "S\'il vous plaît, mettez une adresse email valide";
};

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
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function FormulaireInscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isVisibleIconVerification, setIsVisibleIconVerification] =
    useState(false);
  const [iconVerification, setIconVerification] = useState(
    <FaExclamationTriangle />,
  );
  const [passwordVerify, setPasswordVerify] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPassword = () => {
    revalitedField("confirmPassword");
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
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
  });

  const revalitedField = (field: keyof FormErrors) => {
    if (!submitted) return;
    setErrors((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validateAll(); //vérification de tous les inputs 

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    navigate("/account-type", { state: data });
  };

  return (
    <div className="sm:px-10 xl:px-20 -mb-5">
      <p className="mb-1.5 text-center text-white text-4xl font-serif">
        S'inscrire
      </p>
      <form onSubmit={handleSignUp}>
        <p className="pl-2.5 font-bold mb-2.5 text-white"> E-mail </p>
        <div className="flex flex-col gap-1 mb-9">
          <Input
            type="email"
            value={email}
            placeholder="Entrez votre email"
            error={errors.email ? true : false}
            onKeyUp={() => revalitedField("email")}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<FaEnvelope />}
          />
          {errors.email && (
            <p className="text-red-400 text-xs pl-1">{errors.email}</p>
          )}
        </div>
        <p className="pl-2.5 font-bold mb-2.5 text-white">Mot de passe</p>
        <div className="flex flex-col gap-1 mb-9">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Entrez votre mot de passe"
            error={errors.password ? true : false}
            onKeyUp={() => revalitedField("password")}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setShowPassword(!showPassword)}
            iconLeft={<FaLock />}
            iconRight={showPassword ? <FaEyeSlash /> : <FaEye />}
          />
          {errors.password && (
            <p className="text-red-400 text-xs pl-1">{errors.password}</p>
          )}
        </div>
        <p className="pl-2.5 font-bold mb-2.5 text-white">
          Confirmez votre mot de passe
        </p>
        <div className="flex flex-col gap-1 mb-9">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirmez votre mot de passe"
            error={errors.confirmPassword ? true : false}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            onKeyUp={handleConfirmPassword}
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
          text="S'inscrire"
          background="[#3C4382]"
          textColor="[#FFFFFF]"
        />
      </form>
    </div>
  );
}
