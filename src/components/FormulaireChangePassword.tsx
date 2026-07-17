//"use client"

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import Input from "./Input";
import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import { modificationInformation } from "@/utils/profilAcheteurUtils";

//Validation password
const validatePassword = (value: string): string | undefined => {
  if (!value) return "Un mot de passe est requis.";
  if (!/[A-Z]/.test(value))
    return "Le mot de passe doit contenir au moins une lettre majuscule.";
  if (!/[a-z]/.test(value))
    return "Le mot de passe doit contenir au moins une lettre minuscule.";
  if (value.length < 8)
    return "Le mot de passe doit comporter au moins 8 caractères.";
  if (!/[0-9]/.test(value))
    return "Le mot de passe doit contenir au moins un chiffre";
  if (!/[^A-Za-z0-9]/.test(value))
    return "Le mot de passe doit contenir au moins un caractère spécial.";
};

// validation old password
const validationOldPassword = (value: string): string | undefined => {
  if (!value) return "Entrer votre ancien mot de passe";
};

//Validation confirmation password
const validateConfirmPassword = (
  value: string,
  password: string,
): string | undefined => {
  if (!value) return "Veuillez confirmer votre mot de passe.";
  if (value !== password) return "Les mots de passe ne correspondant pas";
};

type FormErrors = {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
};

export function FormulaireChangePassword({ id_user }: { id_user: string }) {
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const validateAll = (): FormErrors => ({
    oldPassword: validationOldPassword(oldPassword),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
  });

  const revalitedField = (field: keyof FormErrors) => {
    if (!submitted) return;
    setErrors((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const handleConfirmPassword = () => {
    revalitedField("confirmPassword");
    if (confirmPassword) {
      if (password !== confirmPassword) {
        setIsVisibleIconVerification(true);
        setIconVerification(<FaExclamationTriangle />);
        setPasswordVerify(false);
      } else if (password === confirmPassword) {
        setIsVisibleIconVerification(true);
        setIconVerification(<FaCheckCircle />);
        setPasswordVerify(true);
      }
    }
  };

  const handleChangePassword = async () => {
    setSubmitted(true);
    const newErrors = validateAll(); //vérification de tous les inputs

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const reponse = await modificationInformation(
      { ancien_mot_de_passe: oldPassword, nouveau_mot_de_passe: password },
      id_user,
    );
    console.log(reponse);
    if (reponse.status === 400) {
      setErrors((prev) => ({ ...prev, ...{ oldPassword: reponse.message } }));
      return;
    }
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        variant="link"
        className="w-fit text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
      >
        Modifier le mot de passe
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-gray-100 py-5">
          <CommandList>
            <CommandGroup heading="Changer de mot de passe">
              <div className="flex flex-col gap-1 mb-4 mt-4">
                <Input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  placeholder="Entrez votre ancien mot de passe"
                  error={errors.oldPassword ? true : false}
                  onKeyUp={() => {
                    revalitedField("oldPassword");
                  }}
                  onChange={(e) => setOldPassword(e.target.value)}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  iconLeft={<FaLock />}
                  iconRight={showOldPassword ? <FaEye /> : <FaEyeSlash />}
                />
                {errors.oldPassword && (
                  <p className="text-red-400 text-xs pl-1">
                    {errors.oldPassword}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 mb-4 mt-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Entrez votre nouveau mot de passe"
                  error={errors.password ? true : false}
                  onKeyUp={() => {
                    revalitedField("password");
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => setShowPassword(!showPassword)}
                  iconLeft={<FaLock />}
                  iconRight={showPassword ? <FaEye /> : <FaEyeSlash />}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs pl-1">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirmez votre nouveau mot de passe"
                  error={errors.confirmPassword ? true : false}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onKeyUp={handleConfirmPassword}
                  iconLeft={<FaLock />}
                  iconRight={showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  iconValid={
                    isVisibleIconVerification ? iconVerification : null
                  }
                  passwordVerify={passwordVerify}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs pl-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={handleChangePassword}>Valider</Button>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
