import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import formatPrice from "@/utils/formatPrice";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/context/CartContext";
import {
  MdOutlineShoppingCart,
  MdFavoriteBorder,
  MdFavorite,
  MdOutlinePermMedia,
} from "react-icons/md";
import {
  TbTruck,
  TbShieldCheck,
  TbChevronLeft,
  TbChevronRight,
  TbPlayerPlay,
  TbSend,
} from "react-icons/tb";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { FaRegHeart } from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Fichier {
  id_fichier: string;
  fichier: string;
  type: string;
  taille: string;
  id_article: string;
}

interface ArticleDetail {
  id_article: string;
  nom: string;
  description: string;
  prix: number;
  total_likes: number;
  fichiers: Fichier[];
  date_ajout: string;
  date_ajout_relative: string;
  taille: string;
  marque: string;
  quantite: number;
  category: string;
  etat_article: string;
  condition: string;
  id_vendeur: string;
  genre: string;
}

interface Comment {
  id_commentaire?: string;
  description: string;
  id_client: string;
  id_article?: string;
  date_commentaire_relative?: string;
  date_commentaire?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#E1F5EE", color: "#0F6E56" },
  { bg: "#FAECE7", color: "#993C1D" },
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FBEAF0", color: "#993556" },
];

function avatarColor(name: string) {
  const i = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function MediaGallery({ fichiers }: { fichiers: Fichier[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = fichiers[activeIndex];
  const photos = fichiers.filter((f) => f.type === "image").length;
  const videos = fichiers.filter((f) => f.type === "video").length;

  const prev = () =>
    setActiveIndex((i) => (i - 1 + fichiers.length) % fichiers.length);
  const next = () => setActiveIndex((i) => (i + 1) % fichiers.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Media principal */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-4/3 border border-gray-100">
        {active?.type === "video" ? (
          <video
            src={`${active.fichier}`}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={`${active?.fichier}`}
            alt="Article"
            className="w-full h-full object-cover"
          />
        )}

        {/* Badge compteur */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
          {active?.type === "video" ? (
            <TbPlayerPlay className="text-xs" />
          ) : (
            <span>
              <MdOutlinePermMedia />
            </span>
          )}
          {activeIndex + 1} / {fichiers.length}
        </div>

        {/* Flèches navigation */}
        {fichiers.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
              aria-label="Précédent"
            >
              <TbChevronLeft className="text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
              aria-label="Suivant"
            >
              <TbChevronRight className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {fichiers.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {fichiers.map((f, i) => (
            <button
              key={f.id_fichier}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-gray-900"
                  : "border-transparent hover:border-gray-300"
              }`}
              aria-label={`Média ${i + 1}`}
            >
              {f.type === "video" ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="w-5 h-5 bg-black/40 rounded-full flex items-center justify-center">
                    <TbPlayerPlay className="text-white text-xs" />
                  </div>
                </div>
              ) : (
                <img
                  src={f.fichier}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Résumé médias */}
      <p className="text-xs text-center text-gray-400">
        {photos > 0 && `${photos} photo${photos > 1 ? "s" : ""}`}
        {photos > 0 && videos > 0 && " · "}
        {videos > 0 && `${videos} vidéo${videos > 1 ? "s" : ""}`}
      </p>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
function CommentSection({
  articleId,
  userId,
}: {
  articleId: string;
  userId: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modified, setModified] = useState(false);
  const [commentModified, setCommentModified] = useState<Comment>({
    id_client: "",
    id_article: "",
    description: "",
    date_commentaire: "",
    date_commentaire_relative: "",
    id_commentaire: "",
  });

  // ── Chargement des commentaires ──────────────────────────────────────────
  const fetchComs = async (signal?: AbortSignal) => {
    try {
      const { data, status } = await api.get(
        `article/get_commentaires/?id_article=${articleId}`,
        { signal },
      );
      if (status !== 200) throw new Error(data.message);
      // Remplace la liste entière au lieu d'accumuler
      setComments(data.commentaires ?? []);
    } catch (error: any) {
      if (error.name !== "CanceledError") console.error(error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchComs(controller.signal);
    return () => controller.abort();
  }, [articleId]);

  // ── Publier un commentaire ────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      await api.post("article/ajout_commentaire/", {
        id_client: userId,
        id_article: articleId,
        description: content,
      });
      setContent("");
      // Recharge la liste après publication
      await fetchComs();
    } catch (error: any) {
      console.error(error.message);
    }
    setSubmitting(false);
  };

  // ── Préparer la modification ──────────────────────────────────────────────
  const handleUpdate = (comment: Comment) => {
    setModified(true);
    setContent(comment.description);
    setCommentModified(comment);
  };

  // ── Valider la modification ───────────────────────────────────────────────
  const handleValidationUpdate = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const { data, status } = await api.put(
        `article/update_commentaire/${commentModified.id_commentaire}/`,
        { description: content },
      );
      if (status !== 200) throw new Error(data.message);
      // Met à jour localement sans recharger
      setComments((prev) =>
        prev.map((c) =>
          c.id_commentaire === commentModified.id_commentaire
            ? { ...c, description: content }
            : c,
        ),
      );
      setContent("");
      setModified(false);
      // Recharge la liste après publication
      await fetchComs();
    } catch (error: any) {
      console.error(error.message);
    }
    setSubmitting(false);
  };

  // ── Supprimer un commentaire ──────────────────────────────────────────────
  const handleDelete = async (comment: Comment) => {
    try {
      await api.delete(`article/delete_commentaire/${comment.id_commentaire}/`);
      // Retire localement sans recharger
      setComments((prev) =>
        prev.filter((c) => c.id_commentaire !== comment.id_commentaire),
      );
      // Recharge la liste après publication
      await fetchComs();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // ── Rendu ─────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Commentaires</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </div>

      {/* Formulaire */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-5">
        <p className="text-xs font-medium text-gray-600 mb-2">
          {modified ? "Modifier le commentaire" : "Laisser un commentaire"}
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={() => {
            //if (!content) setModified(false);
          }}
          placeholder="Posez une question ou laissez un avis..."
          rows={3}
          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
        />
        <div className="flex items-center justify-between mt-2">
          {modified && (
            <button
              onClick={() => {
                setModified(false);
                setContent("");
              }}
              className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2"
            >
              Annuler
            </button>
          )}
          <div className="ml-auto">
            <Button
              onClick={modified ? handleValidationUpdate : handleSubmit}
              disabled={!content.trim() || submitting}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-xs px-4 py-2 h-auto rounded-full"
            >
              <TbSend className="text-sm" />
              {submitting
                ? "Envoi..."
                : modified
                  ? "Valider la modification"
                  : "Publier"}
            </Button>
          </div>
        </div>
      </div>

      {/* Liste */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          Aucun commentaire pour l'instant. Soyez le premier !
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((c) => {
            const { bg, color } = avatarColor(c.id_client);
            return (
              <div
                key={c.id_commentaire}
                className="flex gap-3 p-3.5 bg-white border border-gray-100 rounded-2xl"
              >
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ background: bg, color }}
                >
                  {initials(c.id_client)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-900">
                      {c.id_client}
                    </span>
                    {c.date_commentaire_relative && (
                      <span className="text-xs text-gray-400">
                        · {c.date_commentaire_relative}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {c.description}
                  </p>
                </div>
                {/* affiche seulement les bouttons modifier pour le client propriétaire du commentaire*/}
                {c.id_client === userId && (
                  <div className="flex flex-col gap-1 shrink-0">
                    <Button
                      variant="link"
                      className="text-xs text-gray-400 hover:text-gray-700 h-auto p-0"
                      onClick={() => handleUpdate(c)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="link"
                      className="text-xs text-red-400 hover:text-red-600 h-auto p-0"
                      onClick={() => handleDelete(c)}
                    >
                      Supprimer
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default function ArticleDetailPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [favorite, setFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const data = useLoaderData().articles[0]; // récuperer les données d'un articles
  const { user } = useAuth();

  const article: ArticleDetail = data;

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  const isAvailable = article.quantite > 0;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    const cartItem: CartItem = {
      id: article.id_article,
      name: article.nom,
      brand: article.marque,
      image: article.fichiers[0]?.fichier,
      quantity: 1,
      price: article.prix,
      size: article.taille,
      stock: article.quantite,
    };
    addItem(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const conditionStyle =
    article.condition === "Neuf"
      ? "bg-[#EAF3DE] text-[#3B6D11] border-[#C0DD97]"
      : "bg-[#FAEEDA] text-[#633806] border-[#FAC775]";

  const genreStyle =
    article.genre === "Femme"
      ? "bg-[#FBEAF0] text-[#993556] border-[#F4C0D1]"
      : "bg-[#E6F1FB] text-[#185FA5] border-[#B5D4F4]";

  return (
    <div className="mx-auto px-8 py-8 border">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link to="/home" className="hover:text-gray-700 transition-colors">
          Accueil
        </Link>
        <TbChevronRight className="text-xs" />
        <span className="text-gray-500">{article.genre}</span>
        <TbChevronRight className="text-xs" />
        <span className="text-gray-500 capitalize">{article.category}</span>
        <TbChevronRight className="text-xs" />
        <span className="text-gray-700 truncate max-w-40">{article.nom}</span>
      </nav>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Galerie */}
        <MediaGallery fichiers={article.fichiers} />

        {/* Infos */}
        <div className="flex flex-col gap-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full border font-medium ${conditionStyle}`}
            >
              {article.condition}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full border font-medium ${genreStyle}`}
            >
              {article.genre}
            </span>
            <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500 capitalize">
              {article.category}
            </span>
            {!isAvailable && (
              <span className="text-xs px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-500">
                Épuisé
              </span>
            )}
          </div>

          {/* Titre + marque */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900 leading-tight">
              {article.nom}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {article.marque} · Réf. {article.id_article}
            </p>
          </div>

          {/* Note */}
          <div className="flex items-center gap-2 mt-1">
            <FaRegHeart className="text-red-600" />
            <span className="text-xs text-gray-400 ml-1">
              {article.total_likes > 0 ? article.total_likes : "Aucune note"}
            </span>
          </div>

          {/* Prix */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-gray-900">
              {formatPrice(article.prix)}
            </span>
          </div>

          <Separator />

          {/* Taille */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Taille
            </p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 text-white text-sm font-medium border-2 border-gray-900">
                {article.taille}
              </div>
            </div>
          </div>

          {/* Stock */}
          {isAvailable && article.quantite <= 3 && (
            <p className="text-xs text-amber-600 font-medium">
              ⚡ Plus que {article.quantite} en stock !
            </p>
          )}

          {/* Boutons */}
          <div className="flex flex-col gap-2.5">
            <Button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`w-full h-11 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : isAvailable
                    ? "bg-gray-900 hover:bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <MdOutlineShoppingCart className="text-base" />
              {addedToCart
                ? "✓ Ajouté au panier !"
                : isAvailable
                  ? "Ajouter au panier"
                  : "Indisponible"}
            </Button>
            <Button
              onClick={() => setFavorite((f) => !f)}
              variant="outline"
              className="w-full h-11 text-sm font-medium rounded-xl flex items-center justify-center gap-2 border-gray-200 hover:border-gray-400 transition-all"
            >
              {favorite ? (
                <MdFavorite className="text-base text-red-500" />
              ) : (
                <MdFavoriteBorder className="text-base" />
              )}
              {favorite ? "Retiré des favoris" : "Ajouter aux favoris"}
            </Button>
          </div>

          <Separator />

          {/* Vendeur */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-medium"
              style={{ background: "#EEEDFE", color: "#534AB7" }}
            >
              {initials(article.id_vendeur)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {article.id_vendeur}
              </p>
              <p className="text-xs text-gray-400">
                {article.date_ajout_relative}
              </p>
            </div>
            <button
              onClick={() =>
                navigate(`/profilxxxx?seller=${article.id_vendeur}`)
              }
              className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors shrink-0"
            >
              Voir profil
            </button>
          </div>

          {/* Badges livraison / sécurité */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
              <TbTruck className="text-xl text-gray-500" />
              <span className="text-xs text-gray-500 text-center">
                Livraison disponible
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
              <TbShieldCheck className="text-xl text-gray-500" />
              <span className="text-xs text-gray-500 text-center">
                Achat sécurisé
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Caractéristiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            Description
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {article.description}
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            Caractéristiques
          </h2>
          <div className="divide-y divide-gray-100">
            {[
              { key: "Marque", val: article.marque },
              { key: "Catégorie", val: article.category },
              { key: "Taille", val: article.taille },
              { key: "État", val: article.etat_article },
              { key: "Condition", val: article.condition },
              { key: "Genre", val: article.genre },
              { key: "Publié", val: article.date_ajout_relative },
            ].map(({ key, val }) => (
              <div key={key} className="flex justify-between py-2.5 text-sm">
                <span className="text-gray-400">{key}</span>
                <span className="font-medium text-gray-900 capitalize">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commentaires */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <CommentSection articleId={article.id_article} userId={user!.id} />
      </div>
    </div>
  );
}