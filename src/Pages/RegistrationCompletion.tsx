import { useState } from "react";
import Input from "../components/Input";
import { IoPersonSharp, IoPhonePortrait } from "react-icons/io5";

export default function RegistrationCompletion() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C]">
      <div className="relative z-10  p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[80%] xl:w-1/2 bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <h1 className="uppercase mb-9 text-center text-white text-4xl font-serif">
          finalize your registration
        </h1>
        <form>
          <Input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            iconLeft={<IoPersonSharp />}
            marginBottom="36px"
          />
          <Input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            iconLeft={<IoPersonSharp />}
            marginBottom="36px"
          />
          <Input
            type="text"
            placeholder="Enter your phone number"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            iconLeft={<IoPhonePortrait />}
          />
        </form>
      </div>
    </div>
  );
}
