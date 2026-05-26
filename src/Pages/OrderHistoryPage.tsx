import { useState } from "react";
import { FiPackage, FiChevronDown, FiChevronRight, FiSearch, FiDownload, FiRefreshCw, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiTruck, FiAlertCircle } from "react-icons/fi";
import { MdOutlineShoppingBag, MdOutlineReceipt } from "react-icons/md";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = "en_cours" | "expedie" | "livre" | "annule" | "retour";

interface OrderProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  colorHex: string;
  rated?: number;
}

interface TrackingStep {
  label: string;
  date: string;
  done: boolean;
  active?: boolean;
}

interface Order {
  id: string;
  reference: string;
  date: string;
  status: OrderStatus;
  total: number;
  shippingMethod: string;
  address: string;
  items: OrderProduct[];
  tracking?: TrackingStep[];
  estimatedDelivery?: string;
  invoiceUrl?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    reference: "ELM-2026-00847",
    date: "18 Mai 2026",
    status: "expedie",
    total: 292000,
    shippingMethod: "Livraison express",
    address: "12 Rue Rainandriamampandry, Antananarivo 101",
    estimatedDelivery: "21 Mai 2026",
    items: [
      {
        id: "p1", name: "Robe Midi Florale", brand: "Élara Paris",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
        price: 89000, quantity: 1, size: "M", color: "Beige", colorHex: "#E8C5A0",
      },
      {
        id: "p2", name: "Veste en Lin Beige", brand: "Maison Soa",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e58?w=300&q=80",
        price: 145000, quantity: 1, size: "L", color: "Naturel", colorHex: "#D4C5A9",
      },
      {
        id: "p4", name: "Sneakers Canvas", brand: "Urban Step",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        price: 58000, quantity: 1, size: "42", color: "Blanc", colorHex: "#FFFFFF",
      },
    ],
    tracking: [
      { label: "Commande confirmée",  date: "18 Mai 2026, 10:24", done: true },
      { label: "En préparation",      date: "18 Mai 2026, 14:00", done: true },
      { label: "Expédié",             date: "19 Mai 2026, 08:30", done: true, active: true },
      { label: "En cours de livraison", date: "",                 done: false },
      { label: "Livré",               date: "",                   done: false },
    ],
  },
  {
    id: "o2",
    reference: "ELM-2026-00731",
    date: "02 Mai 2026",
    status: "livre",
    total: 198000,
    shippingMethod: "Livraison standard",
    address: "12 Rue Rainandriamampandry, Antananarivo 101",
    items: [
      {
        id: "p5", name: "Sac Tote Cuir Naturel", brand: "Maison Soa",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80",
        price: 198000, quantity: 1, size: "Unique", color: "Camel", colorHex: "#C8A882",
        rated: 5,
      },
    ],
    tracking: [
      { label: "Commande confirmée",    date: "02 Mai 2026, 09:15", done: true },
      { label: "En préparation",        date: "02 Mai 2026, 11:00", done: true },
      { label: "Expédié",               date: "03 Mai 2026, 08:00", done: true },
      { label: "En cours de livraison", date: "05 Mai 2026, 14:00", done: true },
      { label: "Livré",                 date: "06 Mai 2026, 11:30", done: true },
    ],
  },
  {
    id: "o3",
    reference: "ELM-2026-00612",
    date: "14 Avril 2026",
    status: "livre",
    total: 125000,
    shippingMethod: "Point relais",
    address: "Point relais — Analakely, Antananarivo",
    items: [
      {
        id: "p6", name: "Pantalon Cargo Kaki", brand: "Street Mada",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=80",
        price: 67000, quantity: 1, size: "L", color: "Kaki", colorHex: "#6B7C5C",
        rated: 4,
      },
      {
        id: "p3", name: "Chemise Oxford Slim", brand: "Gentleman MG",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&q=80",
        price: 58000, quantity: 1, size: "L", color: "Blanc", colorHex: "#FFFFFF",
        rated: 3,
      },
    ],
  },
  {
    id: "o4",
    reference: "ELM-2026-00504",
    date: "28 Mars 2026",
    status: "annule",
    total: 72000,
    shippingMethod: "Livraison standard",
    address: "12 Rue Rainandriamampandry, Antananarivo 101",
    items: [
      {
        id: "p3b", name: "Chemise Oxford Slim", brand: "Gentleman MG",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&q=80",
        price: 72000, quantity: 1, size: "M", color: "Bleu", colorHex: "#4A90D9",
      },
    ],
  },
  {
    id: "o5",
    reference: "ELM-2026-00389",
    date: "10 Mars 2026",
    status: "retour",
    total: 89000,
    shippingMethod: "Livraison express",
    address: "12 Rue Rainandriamampandry, Antananarivo 101",
    items: [
      {
        id: "p1b", name: "Robe Midi Florale", brand: "Élara Paris",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
        price: 89000, quantity: 1, size: "S", color: "Bordeaux", colorHex: "#C0392B",
      },
    ],
  },
];

const STATUS_FILTERS = [
  { key: "tous",     label: "Toutes" },
  { key: "en_cours", label: "En cours" },
  { key: "expedie",  label: "Expédiées" },
  { key: "livre",    label: "Livrées" },
  { key: "annule",   label: "Annulées" },
  { key: "retour",   label: "Retours" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

const STATUS_CONFIG: Record<OrderStatus, {
  label: string; icon: JSX.Element;
  bg: string; text: string; border: string; dot: string;
}> = {
  en_cours: {
    label: "En cours",
    icon: <FiClock className="text-xs" />,
    bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-400",
  },
  expedie: {
    label: "Expédié",
    icon: <FiTruck className="text-xs" />,
    bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500",
  },
  livre: {
    label: "Livré",
    icon: <FiCheckCircle className="text-xs" />,
    bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500",
  },
  annule: {
    label: "Annulé",
    icon: <FiXCircle className="text-xs" />,
    bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-400",
  },
  retour: {
    label: "Retour",
    icon: <FiRefreshCw className="text-xs" />,
    bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", dot: "bg-purple-400",
  },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function StarRating({ value, onChange }: { value?: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange?.(s)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          aria-label={`${s} étoile${s > 1 ? "s" : ""}`}
        >
          {s <= (hover || value || 0)
            ? <HiStar className="text-amber-400 text-sm" />
            : <HiOutlineStar className="text-gray-300 text-sm" />
          }
        </button>
      ))}
    </div>
  );
}

// ─── Tracking Timeline ────────────────────────────────────────────────────────
function TrackingTimeline({ steps }: { steps: TrackingStep[] }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3 items-start">
          {/* Ligne verticale + dot */}
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 mt-0.5 shrink-0 transition-all ${
              step.done
                ? step.active
                  ? "bg-blue-500 border-blue-500 ring-2 ring-blue-200"
                  : "bg-gray-900 border-gray-900"
                : "bg-white border-gray-300"
            }`} />
            {i < steps.length - 1 && (
              <div className={`w-0.5 h-8 ${step.done ? "bg-gray-900" : "bg-gray-200"}`} />
            )}
          </div>
          {/* Texte */}
          <div className="pb-4 min-w-0">
            <p className={`text-xs font-semibold leading-tight ${step.done ? "text-gray-900" : "text-gray-400"}`}>
              {step.label}
              {step.active && (
                <span className="ml-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                  En cours
                </span>
              )}
            </p>
            {step.date && (
              <p className="text-[10px] text-gray-400 mt-0.5">{step.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Rating Modal ─────────────────────────────────────────────────────────────
function RatingModal({
  product,
  onClose,
  onSubmit,
}: {
  product: OrderProduct;
  onClose: () => void;
  onSubmit: (productId: string, rating: number, comment: string) => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-gray-900 mb-1">Évaluer l'article</h3>
        <p className="text-xs text-gray-500 mb-4">Votre avis aide d'autres clients</p>
        <div className="flex items-center gap-3 mb-4">
          <img src={product.image} alt={product.name} className="w-12 h-14 rounded-lg object-cover" />
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{product.brand}</p>
            <p className="text-sm font-semibold text-gray-900">{product.name}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <StarRating value={rating} onChange={setRating} />
          <span className="text-xs text-gray-400">
            {["", "Mauvais", "Passable", "Bien", "Très bien", "Excellent"][rating] || "Choisir une note"}
          </span>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience (optionnel)..."
          rows={3}
          className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={onClose}>
            Annuler
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs bg-gray-900 hover:bg-gray-700 text-white"
            disabled={rating === 0}
            onClick={() => { onSubmit(product.id, rating, comment); onClose(); }}
          >
            Publier l'avis
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({
  order,
  onRate,
}: {
  order: Order;
  onRate: (product: OrderProduct) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[order.status];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-200"
      style={{ animation: "fadeSlideIn 0.25s ease-out both" }}
    >
      {/* ── Header ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start sm:items-center gap-3">
          {/* Icône statut */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} border ${cfg.border}`}>
            <span className={cfg.text}>{cfg.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-gray-900 font-mono tracking-tight">{order.reference}</p>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <FiClock className="text-[10px]" /> {order.date}
              {order.estimatedDelivery && order.status === "expedie" && (
                <span className="ml-2 text-blue-600 font-medium">
                  · Livraison prévue le {order.estimatedDelivery}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:ml-auto">
          {/* Miniatures produits */}
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-lg object-cover border-2 border-white"
              />
            ))}
            {order.items.length > 3 && (
              <div className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500 font-semibold">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">{fmt(order.total)}</p>
            <p className="text-[10px] text-gray-400">{order.items.length} article{order.items.length > 1 ? "s" : ""}</p>
          </div>
          <FiChevronDown className={`text-gray-400 transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* ── Expanded content ── */}
      {expanded && (
        <div className="border-t border-gray-100">
          {/* Articles */}
          <div className="px-5 py-4 flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-16 rounded-xl object-cover bg-gray-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{item.brand}</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                      <span className="w-2 h-2 rounded-full border border-gray-300 shrink-0" style={{ background: item.colorHex }} />
                      {item.color}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                      T. {item.size}
                    </span>
                    <span className="text-xs text-gray-500">× {item.quantity}</span>
                  </div>
                  {/* Note existante ou bouton noter */}
                  {order.status === "livre" && (
                    <div className="mt-1.5">
                      {item.rated ? (
                        <div className="flex items-center gap-1">
                          <StarRating value={item.rated} />
                          <span className="text-[10px] text-gray-400">Votre note</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onRate(item)}
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                        >
                          <HiOutlineStar className="text-sm" />
                          Laisser un avis
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm font-bold text-gray-900 shrink-0">{fmt(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Livraison info */}
          <div className="mx-5 mb-4 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-start gap-2 flex-1">
              <FiMapPin className="text-gray-400 text-sm mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-700">{order.shippingMethod}</p>
                <p className="text-xs text-gray-400 leading-tight">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Tracking toggle */}
          {order.tracking && (
            <div className="mx-5 mb-4">
              <button
                onClick={() => setShowTracking((v) => !v)}
                className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors mb-3"
              >
                <FiPackage className="text-sm" />
                Suivi de commande
                <FiChevronDown className={`transition-transform duration-200 ${showTracking ? "rotate-180" : ""}`} />
              </button>
              {showTracking && <TrackingTimeline steps={order.tracking} />}
            </div>
          )}

          {/* Actions footer */}
          <div className="px-5 pb-4 flex flex-wrap items-center gap-2 border-t border-gray-50 pt-3">
            {(order.status === "livre" || order.status === "expedie") && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center gap-1.5 border-gray-200 hover:border-gray-900"
                onClick={() => navigate("/")}
              >
                <FiRefreshCw className="text-xs" />
                Commander à nouveau
              </Button>
            )}
            {order.status === "livre" && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center gap-1.5 border-gray-200 hover:border-gray-900"
              >
                <FiRefreshCw className="text-xs" />
                Faire un retour
              </Button>
            )}
            {order.status === "en_cours" && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center gap-1.5 border-red-200 text-red-600 hover:bg-red-50"
              >
                <FiXCircle className="text-xs" />
                Annuler
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-xs flex items-center gap-1.5 border-gray-200 hover:border-gray-900 ml-auto"
            >
              <MdOutlineReceipt className="text-sm" />
              Télécharger facture
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ filtered, onReset }: { filtered: boolean; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        {filtered
          ? <FiAlertCircle className="text-4xl text-gray-300" />
          : <MdOutlineShoppingBag className="text-4xl text-gray-300" />
        }
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {filtered ? "Aucune commande trouvée" : "Aucune commande"}
      </h2>
      <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
        {filtered
          ? "Essayez un autre filtre ou une autre recherche."
          : "Vous n'avez pas encore passé de commande. Découvrez notre collection !"}
      </p>
      <Button
        className="bg-gray-900 hover:bg-gray-700 text-white text-sm px-6"
        onClick={onReset}
      >
        {filtered ? "Réinitialiser les filtres" : "Découvrir la collection"}
      </Button>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg z-50 whitespace-nowrap transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      {message}
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeFilter, setActiveFilter] = useState("tous");
  const [search, setSearch] = useState("");
  const [ratingTarget, setRatingTarget] = useState<OrderProduct | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const handleRate = (product: OrderProduct) => setRatingTarget(product);

  const handleSubmitRating = (productId: string, rating: number) => {
    setOrders((prev) =>
      prev.map((o) => ({
        ...o,
        items: o.items.map((i) => (i.id === productId ? { ...i, rated: rating } : i)),
      }))
    );
    showToast("Merci pour votre avis !");
  };

  // Stats rapides
  const stats = {
    total:    orders.length,
    livre:    orders.filter((o) => o.status === "livre").length,
    en_cours: orders.filter((o) => o.status === "en_cours" || o.status === "expedie").length,
    depense:  orders.filter((o) => o.status !== "annule").reduce((s, o) => s + o.total, 0),
  };

  // Filtrage
  const filtered = orders.filter((o) => {
    const matchFilter = activeFilter === "tous" || o.status === activeFilter;
    const matchSearch =
      !search.trim() ||
      o.reference.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const isFiltering = activeFilter !== "tous" || search.trim() !== "";

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">

          {/* ── EN-TÊTE ───────────────────────────────────────────────── */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <MdOutlineShoppingBag className="text-2xl text-gray-700" />
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mes Commandes</h1>
            </div>
            <p className="text-sm text-gray-500">Retrouvez et suivez toutes vos commandes</p>
          </div>

          {/* ── STATS RAPIDES ─────────────────────────────────────────── */}
          {orders.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Commandes",  value: stats.total,                       sub: "au total" },
                { label: "Livrées",    value: stats.livre,                       sub: "avec succès" },
                { label: "En cours",   value: stats.en_cours,                    sub: "en transit" },
                { label: "Total dépensé", value: fmt(stats.depense),             sub: "hors annulations" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-lg font-bold text-gray-900">{value}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── RECHERCHE + FILTRES ───────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* Barre de recherche */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par référence ou article..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filtres par statut */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-5 scrollbar-hide">
            {STATUS_FILTERS.map(({ key, label }) => {
              const count = key === "tous"
                ? orders.length
                : orders.filter((o) => o.status === key).length;
              if (key !== "tous" && count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                    activeFilter === key
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {label}
                  <span className={`text-[10px] font-semibold ${activeFilter === key ? "text-gray-300" : "text-gray-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── LISTE COMMANDES ───────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <EmptyState
              filtered={isFiltering}
              onReset={() => { setActiveFilter("tous"); setSearch(""); if (!isFiltering) navigate("/"); }}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((order, i) => (
                <div key={order.id} style={{ animationDelay: `${i * 50}ms` }}>
                  <OrderCard order={order} onRate={handleRate} />
                </div>
              ))}
            </div>
          )}

          {/* Footer info */}
          {filtered.length > 0 && (
            <p className="text-xs text-center text-gray-400 mt-8">
              {filtered.length} commande{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
              {isFiltering && (
                <button onClick={() => { setActiveFilter("tous"); setSearch(""); }} className="ml-2 underline hover:text-gray-600">
                  Réinitialiser
                </button>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Modal notation */}
      {ratingTarget && (
        <RatingModal
          product={ratingTarget}
          onClose={() => setRatingTarget(null)}
          onSubmit={handleSubmitRating}
        />
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
