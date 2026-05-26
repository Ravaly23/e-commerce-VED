import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { IoPersonSharp, IoPhonePortrait, IoFemale } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMale } from "react-icons/io";
import Button from "@/components/Button";
import { toast } from "sonner";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import api from "@/services/api";

type Sexe = {
  label: string;
  value: string;
  icone: React.ReactNode;
};

type FormErrors = {
  lastName?: string;
  firstName?: string;
  phoneNumber?: string;
  sex?: string;
  address?: string;
};

const sexe: Sexe[] = [
  { label: "Masculin", value: "M", icone: <IoMdMale /> },
  { label: "Feminin", value: "F", icone: <IoFemale /> },
];

// validation des champs
const validateName = (value: string, label: string): string | undefined => {
  const valueTrim = value.trim();
  if (!valueTrim) return `${label} est requis`; // champ vide
  if (valueTrim.length < 2)
    return `${label} doit comporter au moins 2 caractères`; // nom moins de 2 caractère
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(valueTrim))
    // caractère non valide
    return `${label} ne doit contenir que des letttres, des espaces, des traits d'uninon ou des apostrophes`;
};

const validatePhone = (value: string): string | undefined => {
  const valueTrim = value.trim();
  if (!valueTrim) return `Un numéro de téléphone est requis.`;
  const nettoyer = valueTrim.replace(/[\s\-().]/g, "");
  if (!/^\+?\d{7,15}$/.test(nettoyer))
    return "Veuillez saisir un numéro de téléphone valide (7 à 15 chiffres).";
};

const validateAddress = (value: string): string | undefined => {
  const valueTrim = value.trim();
  if (!valueTrim) return "L\'adresse est requise.";
  if (valueTrim.length < 5) return "Veuillez saisir une adresse complète";
};

const validateSexe = (value: Sexe | null): string | undefined => {
  if (!value) return "Veuillez sélectionner une catégorie de sexe";
};

// Icône check
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function RegistrationCompletion() {
  const { email, password, accountType } = useLocation().state;
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [sexCategory, setSexCategory] = useState<Sexe | null>(null);
  const [error, setError] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateAll = (): FormErrors => ({
    lastName: validateName(lastName, "Nom de famille"),
    firstName: validateName(firstName, "Prénom"),
    phoneNumber: validatePhone(phoneNumber),
    sex: validateSexe(sexCategory),
    address: validateAddress(address),
  });

  const revalitedField = (field: keyof FormErrors) => {
    if (!submitted) return;
    setError((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const handleFinalizaton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = validateAll();

    if (Object.values(errors).some(Boolean)) {
      setError(errors);
      return;
    }

    const dataUsers = {
      nom_prenom: lastName.toLocaleUpperCase() + " " + firstName,
      username: lastName + "" + firstName.replace(/\s/g, ""),
      numero_telephone: phoneNumber,
      adresse: address,
      genre: sexCategory!.value,
      email: email,
      password: password,
    };

    let route: string;
    if (accountType === "VENDEUR") {
      route = "auth/inscription_vendeur/";
    } else if (accountType == "CLIENT") {
      route = "auth/inscription/";
    } else {
      return;
    }

    setLoading(true);

    toast.promise(api.post(route!, dataUsers), {
      position: "top-center",
      loading: "Inscription en cours...",
      success: (response) => {
        const { data, status } = response;

        if (status !== 201) {
          throw new Error(data.message);
        }

        if (status === 201) setLoading(false);

        navigate("/");
        return data.message;
      },
      error: (error: any) => {
        setLoading(false);
        if (error.response?.status === 400) {
          if (error.response?.data.errors.username) {
            return error.response?.data.errors.username[0];
          } else if (error.response?.data.errors.email) {
            return error.response?.data.errors.email[0];
          }
        }

        return error.response?.data?.message || "Une erreur est survenue";
      },
    });
  };

  return (
    <div className="absolute inset-0 w-full h-screen flex justify-center items-center bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C]">
      <div className="relative z-10  p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[80%] xl:w-1/2 bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        {/* Indicateur d'étapes */}
        <div className="flex items-center justify-center gap-2 mb-8 ">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step < 3
                    ? "bg-[#3C4382] text-white"
                    : step === 3
                      ? "bg-white text-[#2D1B4E] ring-2 ring-white/40"
                      : "bg-white/10 text-white/30"
                }`}
              >
                {step < 3 ? <CheckIcon /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-10 h-0.5 rounded-full ${
                    step < 2 ? "bg-[#3C4382]" : "bg-white/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <h1 className="uppercase mb-9 text-center text-white text-4xl font-serif">
          finalisez votre inscription
        </h1>
        <form onSubmit={handleFinalizaton}>
          <div className="grid md:grid-cols-2 md:gap-2 gap-5  md:mb-9 mb-5">
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Entrez votre nom de famille"
                value={lastName}
                onKeyUp={() => revalitedField("lastName")}
                onChange={(e) => setLastName(e.target.value)}
                iconLeft={<IoPersonSharp />}
                error={error.lastName ? true : false}
              />
              {error.lastName && (
                <p className="text-red-400 text-xs pl-1">{error.lastName}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Entrez votre prénom"
                value={firstName}
                onKeyUp={() => revalitedField("firstName")}
                onChange={(e) => setFirstName(e.target.value)}
                iconLeft={<IoPersonSharp />}
                error={error.firstName ? true : false}
              />
              {error.firstName && (
                <p className="text-red-400 text-xs pl-1">{error.firstName}</p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-2  gap-5 md:mb-9 mb-5">
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Entrez votre numéro de téléphone"
                value={phoneNumber}
                onKeyUp={() => revalitedField("phoneNumber")}
                onChange={(e) => setPhoneNumber(e.target.value)}
                iconLeft={<IoPhonePortrait />}
                error={error.phoneNumber ? true : false}
              />
              {error.phoneNumber && (
                <p className="text-red-400 text-xs pl-1">{error.phoneNumber}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Combobox
                value={sexCategory?.label ?? ""}
                onValueChange={(newValue) => {
                  const found = sexe.find((s) => s.label === newValue) ?? null;
                  setSexCategory(found);
                  if (submitted)
                    setError((prev) => ({
                      ...prev,
                      sex: validateSexe(found),
                    }));
                }}
              >
                <ComboboxInput
                  placeholder="Sélectionnez votre catégorie de sexe"
                  showClear={sexCategory ? true : false}
                  className={`h-10 rounded-xl border bg-white text-black placeholder:text-zinc-400 focus:ring-purple-500
                    ${error.sex ? "ring-2 ring-red-500" : "border-zinc-700 focus:border-purple-500"}`}
                />
                <ComboboxContent className="mt-2 rounded-xl border border-zinc-700 bg-white shadow-2xl">
                  <ComboboxList className="max-h-62.5 overflow-y-auto">
                    {sexe.map((item) => (
                      <ComboboxItem
                        key={item.value}
                        value={item.label}
                        className="cursor-pointer rounded-lg text-black hover:bg-purple-500 hover:text-white data-[selected=true]:bg-purple-600 data-[selected=true]:text-white"
                      >
                        {item.icone}
                        {item.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {error.sex && (
                <p className="text-red-400 text-xs pl-1">{error.sex}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Input
              type="text"
              placeholder={
                accountType === "VENDEUR"
                  ? "Entrez votre adresse de point de vente"
                  : "Entrez votre adresse"
              }
              value={address}
              onKeyUp={() => revalitedField("address")}
              onChange={(e) => setAddress(e.target.value)}
              iconLeft={<FaLocationDot />}
              error={error.address ? true : false}
            />
            {error.address && (
              <p className="text-red-400 text-xs pl-1">{error.address}</p>
            )}
          </div>
          <Button
            text="Confirmer"
            background="[#3C4382]"
            textColor="[#FFFFFF]"
            disable={loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
}
