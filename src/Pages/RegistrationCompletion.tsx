import { useState } from "react";
import Input from "../components/Input";
import { IoPersonSharp, IoPhonePortrait, IoFemale } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMale } from "react-icons/io";
import Button from "@/components/Button";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function RegistrationCompletion() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  type Sexe = {
    label: string;
    value: string;
    icone: any;
  };

  const sexe: Sexe[] = [
    { label: "Male", value: "M", icone: <IoMdMale /> },
    { label: "Female", value: "F", icone: <IoFemale /> },
  ];

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C]">
      <div className="relative z-10  p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[80%] xl:w-1/2 bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <h1 className="uppercase mb-9 text-center text-white text-4xl font-serif">
          finalize your registration
        </h1>
        <form>
          <div className="grid grid-cols-2 gap-2  mb-9">
            <Input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              iconLeft={<IoPersonSharp />}
            />
            <Input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              iconLeft={<IoPersonSharp />}
            />
          </div>
          <div className="grid grid-cols-2 gap-2  mb-9">
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              iconLeft={<IoPhonePortrait />}
            />
            <Combobox
              items={sexe}
              itemToStringValue={(sexe: Sexe) => sexe.label}
            >
              <ComboboxInput
                placeholder="Select your sex category"
                showClear
                className="
      h-10
      rounded-xl
      border-zinc-700
      bg-white
      text-black
      placeholder:text-zinc-400
      focus:border-purple-500
      focus:ring-purple-500
    "
              />

              <ComboboxContent
                className="
      mt-2
      rounded-xl
      border
      border-zinc-700
      bg-white
      shadow-2xl
    "
              >
                <ComboboxEmpty className="py-6 text-center text-zinc-400">
                  No items found.
                </ComboboxEmpty>

                <ComboboxList className="max-h-62.5 overflow-y-auto">
                  {(item) => (
                    <ComboboxItem
                      key={item.value}
                      value={item}
                      className="
            cursor-pointer
            rounded-lg
            text-black
            hover:bg-purple-500
            hover:text-white
            data-[selected=true]:bg-purple-600
            data-[selected=true]:text-white
          "
                    >
                      {item.icone}
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <Input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            iconLeft={<FaLocationDot />}
          />

          <Button
            text="Confirm"
            background="[#3C4382]"
            textColor="[#FFFFFF]"
          />
        </form>
      </div>
    </div>
  );
}
