import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import api from "@/services/api";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function FormulaireConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    try {
      const { data, status } = await api.post("auth/connexion/", body);

      setError("");
      if (status === 200) {
        if (data.role === "client") {
          navigate("/profilxxxx/home");
        } else if (data.role === "vendeur") {
          navigate("/profilxxxx/dashboard");
        }
      }
    } catch (error: any) {
      //   console.log("STATUS :", error.response?.status);
      //   console.log("DATA :", error.response?.data);
      //   console.log("MESSAGE :", error.message);
      if (error.response?.status === 400) {
        setError("Email ou mot de passe incorrect");
      } else if (error.response?.status === 403) {
        //vendeur en attente
        setError("Votre compte est en attente de validation");
      }
    }
  };

  return (
    <div className="sm:px-10 xl:px-20 overflow-hidden">
      <p className="mb-9 text-center text-white text-4xl font-serif">Login</p>
      {error && <p className="text-center text-red-500 mb-5">{error}</p>}
      <form onSubmit={handleLogin}>
        <p className="pl-2.5 font-bold mb-2.5 text-white"> E-mail </p>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          iconLeft={<FaEnvelope />}
          marginBottom="36px"
        />
        <p className="pl-2.5 font-bold mb-2.5 text-white">Password</p>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShowPassword(!showPassword)}
          iconLeft={<FaLock />}
          // iconValid={<FaExclamationTriangle/>}
          iconRight={showPassword ? <FaEyeSlash /> : <FaEye />}
          marginBottom="36px"
        />
        <div className="flex justify-between text-sm md:text-lg lg:text-10">
          <div className="text-[#FFFFFF]">
            <input type="checkbox" name="" id="" /> Remember me
          </div>
          <p className="text-[#1C89B6] font-medium">
            <a href="http://">Forgot password?</a>
          </p>
        </div>
        <Button text="Login" background="[#3C4382]" textColor="[#FFFFFF]" />
      </form>
    </div>
  );
}
