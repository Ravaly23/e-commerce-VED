import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
};

type FormErrors = {
  email?: string;
  password?: string;
};

export default function FormulaireConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { login, loading } = useAuth(); // utilisation AuthContext
  const navigate = useNavigate();

  const validateAll = (): FormErrors => ({
    email: validateEmail(email),
    password: validatePassword(password),
  });

  const revalitedField = (field: keyof FormErrors) => {
    if (!submitted) return;
    setErrors((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);
    const newErrors = validateAll();
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }
    const body = {
      email: email,
      password: password,
    };

    const result = await login(body);

    if (result.success) {
      const role = result?.data.role;
      if (role === "client") {
        navigate("/profilxxxx/home");
      } else if (role === "vendeur") {
        navigate("/profilxxxx/dashboard");
      }
    } else {
    }
  };

  return (
    <div className="sm:px-10 xl:px-20 overflow-hidden">
      <p className="mb-1.5 text-center text-white text-4xl font-serif">
        Se connecter
      </p>
      <form onSubmit={handleLogin}>
        <p className="pl-2.5 font-bold mb-2.5 text-white"> E-mail </p>
        <div className="flex flex-col gap-1 mb-9">
          <Input
            type="email"
            value={email}
            placeholder="Entrez votre email"
            error={errors.email ? true : false}
            onKeyUp={() => {
              revalitedField("email");
            }}
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
            onKeyUp={() => {
              revalitedField("password");
            }}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setShowPassword(!showPassword)}
            iconLeft={<FaLock />}
            iconRight={showPassword ? <FaEyeSlash /> : <FaEye />}
          />
          {errors.password && (
            <p className="text-red-400 text-xs pl-1">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-between text-sm md:text-lg lg:text-10">
          <div className="text-[#FFFFFF]">
            <input type="checkbox" name="" id="" /> Souviens-toi de moi
          </div>
          <p className="text-[#1C89B6] font-medium">
            <Link to="/password-reset">Mot de passe oublié?</Link>
          </p>
        </div>
        <Button
          text="Se connecter"
          background="[#3C4382]"
          textColor="[#FFFFFF]"
          disable={loading ? true : false}
        />
      </form>
    </div>
  );
}
