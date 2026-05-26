import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";

type AccountType = "CLIENT" | "VENDEUR" | null;

const accountTypes: {
  value: "CLIENT" | "VENDEUR";
  label: string;
  badge: string;
  description: string;
  features: string[];
  activeBorder: string;
  activeBg: string;
  iconBg: string;
  iconColor: string;
  activeIconBg: string;
  activeIconColor: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "CLIENT",
    label: "Client",
    badge: "Gratuit",
    description: "Achetez parmi des milliers de produits de vendeurs locaux.",
    features: [
      "Parcourir et rechercher des produits",
      "Passer des commandes en ligne",
      "Suivre vos livraisons en temps réel",
      "Historique de vos achats",
      "Notifications de promotions",
    ],
    activeBorder: "#7F77DD",
    activeBg: "rgba(127,119,221,0.12)",
    iconBg: "rgba(127,119,221,0.15)",
    iconColor: "#AFA9EC",
    activeIconBg: "rgba(127,119,221,0.3)",
    activeIconColor: "#CECBF6",
    badgeBg: "rgba(127,119,221,0.2)",
    badgeText: "#AFA9EC",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    value: "VENDEUR",
    label: "Vendeur",
    badge: "Pro",
    description: "Créez votre boutique et vendez vos produits facilement.",
    features: [
      "Créer et gérer votre boutique",
      "Publier des produits avec photos",
      "Gérer vos commandes et stocks",
      "Tableau de bord & statistiques",
      "Support vendeur prioritaire",
    ],
    activeBorder: "#1D9E75",
    activeBg: "rgba(29,158,117,0.12)",
    iconBg: "rgba(29,158,117,0.15)",
    iconColor: "#5DCAA5",
    activeIconBg: "rgba(29,158,117,0.3)",
    activeIconColor: "#9FE1CB",
    badgeBg: "rgba(29,158,117,0.2)",
    badgeText: "#5DCAA5",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

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

export default function AccountTypeSelection() {
  const { email, password } = useLocation().state;
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!accountType) {
      setError("Veuillez choisir un type de compte pour continuer.");
      return;
    }
    navigate("/finalization", { state: { email, password, accountType } });
  };

  return (
    <div className="fixed inset-0 w-full h-screen flex justify-center items-center bg-linear-to-tl from-[#422031] via-[#2D1B4E] to-[#000B1C]">
      <div className="relative z-10 overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 p-5 mx-5 sm:mx-10 sm:p-10 w-full sm:w-[85%] xl:w-[60%] bg-white/8 backdrop-blur-xl border border-white/18 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
        {/* Indicateur d'étapes */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step < 2
                    ? "bg-[#3C4382] text-white"
                    : step === 2
                      ? "bg-white text-[#2D1B4E] ring-2 ring-white/40"
                      : "bg-white/10 text-white/30"
                }`}
              >
                {step < 2 ? <CheckIcon /> : step}
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

        <h1 className="uppercase mb-2 text-center text-white text-3xl sm:text-4xl font-serif">
          Choisissez votre compte
        </h1>
        <p className="text-center text-white/40 text-sm mb-8">
          Vous pourrez toujours modifier votre choix depuis vos paramètres.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {accountTypes.map((type) => {
            const isSelected = accountType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setAccountType(type.value);
                  setError("");
                }}
                style={{
                  borderColor: isSelected
                    ? type.activeBorder
                    : "rgba(255,255,255,0.12)",
                  background: isSelected
                    ? type.activeBg
                    : "rgba(255,255,255,0.04)",
                }}
                className="relative flex flex-col gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:border-white/25 focus:outline-none"
              >
                {/* Badge check */}
                {isSelected && (
                  <span
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: type.activeBorder }}
                  >
                    <CheckIcon />
                  </span>
                )}

                {/* Header : icône + badge */}
                <div className="flex items-start justify-between">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: isSelected ? type.activeIconBg : type.iconBg,
                      color: isSelected ? type.activeIconColor : type.iconColor,
                    }}
                  >
                    {type.icon}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full mt-1"
                    style={{
                      background: type.badgeBg,
                      color: type.badgeText,
                    }}
                  >
                    {type.badge}
                  </span>
                </div>

                {/* Titre + description */}
                <div>
                  <p
                    className="text-base font-semibold mb-1 transition-colors duration-200"
                    style={{
                      color: isSelected ? "#fff" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {type.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {type.description}
                  </p>
                </div>

                {/* Séparateur */}
                <div
                  className="w-full h-px"
                  style={{
                    background: isSelected
                      ? `${type.activeBorder}40`
                      : "rgba(255,255,255,0.08)",
                  }}
                />

                {/* Fonctionnalités */}
                <ul className="flex flex-col gap-2">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                        style={{
                          background: isSelected
                            ? type.activeIconBg
                            : type.iconBg,
                          color: isSelected
                            ? type.activeIconColor
                            : type.iconColor,
                        }}
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Erreur */}
        {error && (
          <p className="text-red-400 text-xs text-center mb-4">{error}</p>
        )}

        {/* Boutons */}
        <div className="flex flex-col gap-2">
          <Button
            text="Continuer"
            background="[#3C4382]"
            textColor="[#FFFFFF]"
            onclick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
}
