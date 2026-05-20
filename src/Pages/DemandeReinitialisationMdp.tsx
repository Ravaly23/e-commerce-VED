import Input from "@/components/Input";
import Button from "@/components/Button";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/api";

//Validation email
const validateEmail = (value: string): string | undefined => {
  const t = value.trim();
  if (!t) return "Email est requis.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))
    return "S\'il vous plaît, mettez une adresse email valide";
};

type FormErrors = {
  email?: string;
};

export default function DemandeReinitialisationMdp() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateAll = (): FormErrors => ({
    email: validateEmail(email),
  });

  const revalitedField = (field: keyof FormErrors) => {
    if (!submitted) return;
    setErrors((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors = validateAll();

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const dataUsers = { email: email };

    setLoading(true);

    toast.promise(api.post("auth/demande-reinitialisation/", dataUsers), {
      position: "top-center",
      loading: "Email en cours d'envoie...",
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
    <div className="absolute flex items-center justify-center inset-0 w-full h-screen bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C]">
      <div className="relative z-10  p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[80%] xl:w-[40%] bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <div className="text-center text-white mb-9">
          <h1 className="mb-9 uppercase text-2xl font-serif">
            Réinitialiser votre mot de passe
          </h1>
          <p>
            Saisissez votre adresse email et nous vous enverrons un lien de
            réinitialisation de mot de passe
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="pl-2.5 font-bold mb-2.5 text-white"> E-mail </p>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Entrez votre email"
              type="email"
              onKeyUp={() => revalitedField("email")}
              error={errors.email ? true : false}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              iconLeft={<FaEnvelope />}
            />
            {errors.email && (
              <p className="text-red-400 text-xs pl-1">{errors.email}</p>
            )}
          </div>
          <Button
            text="Envoyer un email de vérification"
            background="[#3C4382]"
            textColor="[#FFFFFF]"
            disable={loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
}
