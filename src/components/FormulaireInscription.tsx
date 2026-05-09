import { useState } from "react";
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

export default function FormulaireInscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisibleIconVerification, setIsVisibleIconVerification] =
    useState(false);
  const [iconVerification, setIconVerification] = useState(
    <FaExclamationTriangle />,
  );
  const [passwordVerify, setPasswordVerify] = useState(false);

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
  return (
    <div className="sm:px-10 xl:px-20">
      <p className="mb-9 text-center text-white text-4xl font-serif">
        Sign Up
      </p>
      <form action="">
        <p className="pl-2.5 font-bold mb-2.5 text-white"> E-mail </p>
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          iconLeft={<FaEnvelope />}
          marginBottom="36px"
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
          marginBottom="36px"
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
          marginBottom="36px"
        />
        <Button text="Sign Up" background="[#3C4382]" textColor="[#FFFFFF]" />
      </form>
    </div>
  );
}
