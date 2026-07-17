import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import formatPrice from "@/utils/formatPrice";
import { toast } from "sonner"
import {
  TbUser,
  TbMail,
  TbPhone,
  TbMapPin,
  TbPackage,
  TbHeart,
  TbHistory,
  TbShield,
  TbLock,
  TbLogout,
  TbAlertTriangle,
  TbCheck,
  TbX,
  TbChevronRight,
  TbCalendar,
  TbCamera,
  TbAlertCircle,
  TbZoomIn,
  TbUpload,
} from "react-icons/tb";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { createPortal } from "react-dom";
import api from "@/services/api";
import { modificationInformation, suppressionCompte } from "@/utils/profilAcheteurUtils";
import { FormulaireChangePassword } from "@/components/FormulaireChangePassword";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Input from "@/components/Input";


// ─── Types ─────────────────────────────────────────────────────────────────────

type OrderStatus = "en_attente" | "expedie" | "livre" | "annule";

interface RecentOrder {
  id: string;
  nom: string;
  prix: number;
  date_relative: string;
  status: OrderStatus;
}

interface ProfileInfo {
  nom_prenom: string;
  email: string;
  numero_telephone: string;
  adresse: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const VALID_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_MB = 5;

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; color: string }
> = {
  en_attente: { label: "En attente", bg: "#FAEEDA", color: "#633806" },
  expedie: { label: "Expédié", bg: "#E6F1FB", color: "#0C447C" },
  livre: { label: "Livré", bg: "#EAF3DE", color: "#3B6D11" },
  annule: { label: "Annulé", bg: "#FCEBEB", color: "#A32D2D" },
};

// ─── Sous-composants ───────────────────────────────────────────────────────────

// Champ éditable inline
function EditableField({
  icon,
  label,
  value,
  onSave,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onSave: (val: string) => void;
  type?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    if (draft.trim()) onSave(draft.trim());
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 last:pb-0 gap-3">
      <div className="flex items-center gap-2 text-gray-400 shrink-0 w-32">
        <span className="text-base">{icon}</span>
        <span className="text-xs">{label}</span>
      </div>

      {editing ? (
        <div className="flex items-center gap-2 flex-1 justify-end">
          <input
            autoFocus
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="flex-1 min-w-0 text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            onClick={handleSave}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors shrink-0"
            aria-label="Valider"
          >
            <TbCheck className="text-sm" />
          </button>
          <button
            onClick={handleCancel}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
            aria-label="Annuler"
          >
            <TbX className="text-sm" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
          <span className="text-sm font-medium text-gray-900 truncate">
            {value || "—"}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors shrink-0"
          >
            Modifier
          </button>
        </div>
      )}
    </div>
  );
}

// Raccourci activité
function ActivityShortcut({
  icon,
  label,
  iconBg,
  iconColor,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-100 active:scale-95 transition-all"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <span className="text-xs text-gray-500 text-center leading-tight">
        {label}
      </span>
    </button>
  );
}

// ─── AvatarUploader ────────────────────────────────────────────────────────────

function AvatarUploader({
  nom,
  photoUrl,
  id_client,
  onUploadSuccess,
}: {
  nom: string;
  id_client: string;
  photoUrl: string | null;
  onUploadSuccess: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!VALID_TYPES.includes(selected.type)) {
      setError("Format invalide. Utilisez JPG, PNG ou WebP.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setError(`Fichier trop lourd. Maximum ${MAX_MB} Mo.`);
      return;
    }
    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setShowModal(true);
    e.target.value = "";
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowLightbox(false);
    setPreview(null);
    setFile(null);
    setError(null);
  };

  const handleConfirm = async () => {
    if (!file || !preview) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const { data, status } = await api.put(
        `article/update_client/${id_client}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (status !== 200) throw new Error(data.message);
      onUploadSuccess(data.photo_url ?? preview);
      handleCancel();
    } catch (error: any) {
      console.error(error.message);
      setError("Échec de l'envoi. Veuillez réessayer.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Avatar + bouton caméra */}
      <div className="relative shrink-0">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={nom}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium select-none"
            style={{ background: "#EEEDFE", color: "#534AB7" }}
          >
            {initials(nom)}
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept={VALID_TYPES.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => {
            setError(null);
            fileRef.current?.click();
          }}
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 active:scale-95 transition-all shadow-md"
          title="Changer la photo de profil"
          aria-label="Changer la photo de profil"
        >
          <TbCamera className="text-white text-xs" />
        </button>
      </div>

      {/* Erreur validation (hors modal) */}
      {error && !showModal && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <TbAlertCircle className="shrink-0" /> {error}
        </p>
      )}

      {/* Modal prévisualisation */}
      {showModal &&
        preview &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={handleCancel}
              aria-hidden="true"
            />

            {/* Fenêtre */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Prévisualisation photo"
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Nouvelle photo de profil
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {file?.name} · {((file?.size ?? 0) / 1024).toFixed(0)} Ko
                    </p>
                  </div>
                  <button
                    onClick={handleCancel}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
                    aria-label="Fermer"
                  >
                    <TbX className="text-sm" />
                  </button>
                </div>

                {/* Prévisualisation */}
                <div className="p-5 space-y-4">
                  {/* Image miniature + hover zoom */}
                  <div
                    className="relative group cursor-pointer rounded-xl overflow-hidden border border-gray-100 bg-gray-50"
                    onClick={() => setShowLightbox(true)}
                  >
                    <img
                      src={preview}
                      alt="Aperçu"
                      className="w-full max-h-56 object-cover"
                    />
                    {/* Overlay zoom */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-200">
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 bg-white/90 text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full shadow transition-opacity duration-200">
                        <TbZoomIn className="text-sm" /> Voir en plein écran
                      </div>
                    </div>
                  </div>

                  {/* Aperçu avatar */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={preview}
                      alt="Aperçu avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-700">
                        Aperçu sur votre profil
                      </p>
                      <p className="text-xs text-gray-400">{nom}</p>
                    </div>
                  </div>

                  {/* Erreur upload */}
                  {error && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <TbAlertCircle className="shrink-0 text-sm" /> {error}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 px-5 pb-5">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={uploading}
                    className="flex-1 h-10 text-sm rounded-xl border-gray-200 text-gray-600"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={uploading}
                    className="flex-1 h-10 text-sm rounded-xl bg-gray-900 hover:bg-gray-700 text-white flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                        Envoi...
                      </>
                    ) : (
                      <>
                        <TbUpload className="text-sm" /> Valider
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Lightbox plein écran */}
            {showLightbox &&
              createPortal(
                <div
                  className="fixed inset-0 z-60 bg-black/92 flex items-center justify-center p-6"
                  onClick={() => setShowLightbox(false)}
                >
                  <button
                    onClick={() => setShowLightbox(false)}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Fermer le plein écran"
                  >
                    <TbX className="text-lg" />
                  </button>
                  <img
                    src={preview}
                    alt="Photo en plein écran"
                    className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs select-none">
                    Cliquez en dehors pour fermer
                  </p>
                </div>,
                document.body,
              )}
          </>,
          document.body,
        )}
    </>
  );
}

function ConfirmationDeSuppression({
  title,
  open,
  id_user,
  setOpen,
  logout,
  //onConfirmed,
}: {
  title?: string;
  open: boolean;
  id_user: string,
  setOpen: (open: boolean) => void;
  logout: () => void;
  //onConfirmed?: (id_utilisateur: any) => Promise<any>;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // appeler la fonction suppressionCompte pour supprimer un compte utilisateur
  const handleDeleteAccount = async () => {
    const reponse = await suppressionCompte(id_user, { password: password });
    console.log(reponse)

    if (reponse.status !== 200) {
      setError(reponse.message);
      return;
    }

    toast("Suppression de compte", { description: "Votre compte et tous ses donnée a été supprimer avec succées", position: "top-center" });

  }

  return (
    <div className="flex flex-col gap-4">
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-gray-100 py-5">
          <CommandList>
            <CommandGroup heading="Supprimer mon compte">
              {title && <p className="text-center">{title}</p>}
              <div className="flex flex-col gap-1 mb-4 mt-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Entrez votre nouveau mot de passe"
                  error={error ? true : false}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => setShowPassword(!showPassword)}
                  onKeyUp={() => setError("")}
                  iconLeft={<FaLock />}
                  iconRight={showPassword ? <FaEye /> : <FaEyeSlash />}
                />
                {error && (
                  <p className="text-red-400 text-xs pl-1">
                    {error}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={() => {
                  handleDeleteAccount()
                  setOpen(false);
                  logout();
                }}>Valider</Button>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

function ConfirmationModification({
  title,
  open,
  email,
  id_user,
  setOpen,
  handleConfirmed,
}: {
  title?: string;
  email?: string;
  id_user?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirmed?: () => void;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const modificationEmail = async () => {
    const reponse = await modificationInformation(
      { email: email, mot_de_passe: password },
      id_user!,
    );

    if (reponse.status === 400) {
      setError(reponse.message);
      setPassword("")
      return;
    }

    handleConfirmed!();
    setPassword("");
    setError("");
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-gray-100 py-5">
          <CommandList>
            <CommandGroup heading="Modifier mon adresse email">
              {title && <p className="text-center">{title}</p>}
              <div className="flex flex-col gap-1 mb-4 mt-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Entrez votre nouveau mot de passe"
                  // error={errors.password ? true : false}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => setShowPassword(!showPassword)}
                  iconLeft={<FaLock />}
                  iconRight={showPassword ? <FaEye /> : <FaEyeSlash />}
                />
                {error && <p className="text-red-400 text-xs pl-1">{error}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={modificationEmail}>Valider</Button>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

function ConfirmationDeconnexion({
  title,
  open,
  setOpen,
  handleConfirmed,
}: {
  title?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirmed: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-gray-100 py-5">
          <CommandList>
            <CommandGroup heading="Déconnexion">
              {title && <p className="text-center mb-5 mt-2">{title}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Non
                </Button>
                <Button onClick={handleConfirmed}>Oui</Button>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────
export default function ProfilAcheteur() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const data = useLoaderData();

  // ── Infos personnelles (en attente API) ──
  const [profile, setProfile] = useState<ProfileInfo>({
    nom_prenom: data.nom_prenom ?? "",
    email: data.email ?? "",
    numero_telephone: data.numero_telephone,
    adresse: data.adresse,
  });

  // ── Commandes récentes (en attente API) ──
  const recentOrders: RecentOrder[] = [
    {
      id: "o1",
      nom: "Jean Slim Brut — Levi's",
      prix: 85000,
      date_relative: "il y a 2 jours",
      status: "en_attente",
    },
    {
      id: "o2",
      nom: "Robe mi-longue fleurie",
      prix: 45000,
      date_relative: "il y a 1 semaine",
      status: "livre",
    },
    {
      id: "o3",
      nom: "Sweat à capuche Nike",
      prix: 60000,
      date_relative: "il y a 3 semaines",
      status: "annule",
    },
  ];

  const [photoUrl, setPhotoUrl] = useState<string | null>(data.photo ?? null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [openValidationEmail, setOpenValidationEmail] = useState(false);
  const [openConfirmDeconnexion, setOpenConfirmDeconnexion] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const updateField = (key: keyof ProfileInfo) => (val: string) => {
    if (key === "email") {
      console.log(val);
      setNewEmail(val);
      setOpenValidationEmail(true);
    } else {
      setProfile((prev) => ({ ...prev, [key]: val }));
      modificationInformation({ [key]: val }, user?.id!);
    }
  };

  const updateEmail = (key: keyof ProfileInfo) => {
    setProfile((prev) => ({ ...prev, [key]: newEmail }));
    //modificationInformation({ [key]: newEmail }, user?.id!);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // Stats rapides
  const stats = [
    { num: data.nombre_commandes, label: "Commandes" },
    { num: data.nombre_favoris, label: "Favoris" }, // TODO : depuis l'API
    { num: data.nombre_commentaires, label: "Avis laissés" }, // TODO : depuis l'API
  ];

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className="mx-auto px-8 py-8 flex flex-col gap-4">
      {/* HERO */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <AvatarUploader
            nom={data.nom_prenom}
            id_client={data.id}
            photoUrl={photoUrl}
            onUploadSuccess={setPhotoUrl}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium text-gray-900 truncate">
              {profile.nom_prenom}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <TbCalendar className="text-xs" /> Membre depuis janvier 2025
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ num, label }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-medium text-gray-900">{num}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITÉS ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
          <TbPackage className="text-base text-gray-400" aria-hidden="true" />
          Mes activités
        </p>
        <div className="grid grid-cols-3 gap-3">
          <ActivityShortcut
            icon={<TbPackage />}
            label="Mes commandes"
            iconBg="#E6F1FB"
            iconColor="#185FA5"
            onClick={() => navigate("/home/historique")}
          />
          <ActivityShortcut
            icon={<TbHeart />}
            label="Mes favoris"
            iconBg="#FBEAF0"
            iconColor="#993556"
            onClick={() => navigate("/home/favoris")}
          />
          <ActivityShortcut
            icon={<TbHistory />}
            label="Historique"
            iconBg="#EAF3DE"
            iconColor="#3B6D11"
            onClick={() => navigate("/home/historique")}
          />
        </div>
      </div>

      {/* ── INFOS PERSONNELLES ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
          <TbUser className="text-base text-gray-400" aria-hidden="true" />
          Informations personnelles
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full ml-1">
            Privé
          </span>
        </p>
        <p className="text-xs text-gray-400 mb-4">
          Ces informations ne sont pas visibles par les autres utilisateurs.
        </p>

        <EditableField
          icon={<TbUser />}
          label="Nom complet"
          value={profile.nom_prenom}
          onSave={updateField("nom_prenom")}
        />
        <EditableField
          icon={<TbMail />}
          label="Email"
          value={profile.email}
          type="email"
          onSave={updateField("email")}
        />
        <EditableField
          icon={<TbPhone />}
          label="Téléphone"
          value={profile.numero_telephone || ""}
          onSave={updateField("numero_telephone")}
          type="tel"
        />
        <EditableField
          icon={<TbMapPin />}
          label="Adresse"
          value={profile.adresse || ""}
          onSave={updateField("adresse")}
        />
      </div>

      {/* ── COMMANDES RÉCENTES ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
          <TbPackage className="text-base text-gray-400" aria-hidden="true" />
          Commandes récentes
        </p>

        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            Aucune commande pour l'instant.
          </p>
        ) : (
          <div className="flex flex-col">
            {recentOrders.map((order) => {
              const { label, bg, color } = STATUS_CONFIG[order.status];
              return (
                <div
                  key={order.id}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <TbPackage className="text-gray-400 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.nom}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatPrice(order.prix)} · {order.date_relative}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full shrink-0 font-medium"
                    style={{ background: bg, color }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {recentOrders.length !== 0 && (
          <button
            onClick={() => navigate("/home/historique")}
            className="w-full mt-4 py-2.5 text-xs text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors"
          >
            Voir tout l'historique
            <TbChevronRight className="text-sm" />
          </button>
        )}
      </div>

      {/* ── SÉCURITÉ ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
          <TbShield className="text-base text-gray-400" aria-hidden="true" />
          Sécurité
        </p>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-400">
            <TbLock className="text-base" aria-hidden="true" />
            <span className="text-sm text-gray-700">Mot de passe</span>
          </div>
          <FormulaireChangePassword id_user={user?.id!} />
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-gray-400">
            <TbLogout className="text-base" aria-hidden="true" />
            <span className="text-sm text-gray-700">Session active</span>
          </div>
          <Button
            variant="outline"
            onClick={() => setOpenConfirmDeconnexion(true)}
            className="text-xs h-8 px-3 rounded-lg border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
          >
            Se déconnecter
          </Button>
        </div>
      </div>

      {/* ── ZONE DANGEREUSE ── */}
      <div className="border border-red-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-red-600 mb-1 flex items-center gap-2">
          <TbAlertTriangle className="text-base" aria-hidden="true" />
          Zone dangereuse
        </p>
        <p className="text-xs text-gray-400 mb-4">
          La suppression de votre compte est définitive et irréversible. Toutes
          vos données, commandes et favoris seront effacés.
        </p>

        {!showDeleteConfirm ? (
          <Button
            variant="outline"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-xs h-8 px-3 rounded-lg border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400"
          >
            Supprimer mon compte
          </Button>
        ) : (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="text-sm font-medium text-red-700 mb-3">
              Êtes-vous sûr de vouloir supprimer votre compte ?
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  // TODO : api.delete("auth/delete_account/")
                  // handleLogout();
                  setOpen(true);
                }}
                className="flex-1 h-9 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Oui, supprimer définitivement
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-9 text-xs border-gray-200 text-gray-600 rounded-lg"
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>
      <ConfirmationDeSuppression
        open={open}
        setOpen={setOpen}
        logout={handleLogout}
        id_user={user?.id!}
        title="Entrer votre mot de passe pour supprimer votre compte"
      />
      <ConfirmationModification
        open={openValidationEmail}
        email={newEmail}
        id_user={user?.id!}
        handleConfirmed={() => updateEmail("email")}
        setOpen={setOpenValidationEmail}
        title="Entrer votre mot de passe pour modifier votre email"
      />
      <ConfirmationDeconnexion
        open={openConfirmDeconnexion}
        title="Voulez-vous vraiment vous déconnecter?"
        handleConfirmed={handleLogout}
        setOpen={setOpenConfirmDeconnexion}
      />
    </div>
  );
}
