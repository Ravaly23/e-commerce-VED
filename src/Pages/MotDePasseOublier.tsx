import Input from "@/components/Input";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEyeSlash,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MotDePasseOublier() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { emailId } = useParams();

  const [isVisibleIconVerification, setIsVisibleIconVerification] =
    useState(false);
  const [iconVerification, setIconVerification] = useState(
    <FaExclamationTriangle />,
  );
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleModification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email" + emailId);
    if (password === confirmPassword) {
      const data = {
        email: email,
        password: password,
      };
      navigate("/finalization", { state: data });
      setError("");
    } else {
      setError("Les deux mot de passe ne correspodant pas");
    }
  };
  return (
    <div className="p-10">
      <form onSubmit={handleModification}>
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          iconLeft={<FaEnvelope />}
          marginBottom="9"
        />
        <p className="pl-2.5 font-bold mb-2.5 text-white">Password</p>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShowPassword(!showPassword)}
          iconLeft={<FaLock />}
          iconRight={showPassword ? <FaEyeSlash /> : <FaEye />}
          marginBottom="9"
        />
        <p className="pl-2.5 font-bold mb-2.5 text-white">
          Confirm your password
        </p>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          onKeyUp={handleConfirmPassword}
          iconLeft={<FaLock />}
          iconRight={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          iconValid={isVisibleIconVerification ? iconVerification : null}
          passwordVerify={passwordVerify}
          marginBottom="9"
        />
        <Button text="Sign Up" background="[#3C4382]" textColor="[#FFFFFF]" />
      </form>
    </div>
  );
}
