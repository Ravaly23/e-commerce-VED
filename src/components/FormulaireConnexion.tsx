import { useState } from "react"
import { FaEnvelope, FaEye, FaEyeSlash, FaLock} from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";

export default function FormulaireConnexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="sm:px-10 xl:px-20">
            <p className="mb-9 text-center text-white text-4xl font-serif">Login</p>
            <form>
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
                    <div className="text-[#FFFFFF]"><input type="checkbox" name="" id="" /> Remember me</div>
                    <p className="text-[#1C89B6] font-medium"><a href="http://">Forgot password?</a></p>
                </div>
                <Button
                    text="Login"
                    background="[#3C4382]"
                    textColor="[#FFFFFF]"
                />
            </form>
        </div>
    )
}