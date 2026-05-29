import { useEffect } from "react";
import { createPortal } from "react-dom";
import SidebarFilters from "./Fieldset";
import type { FilterState } from "./Fieldset";

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
  activeCount: number;
}

export default function FilterBottomSheet({
  open,
  onClose,
  filters,
  onChange,
  onApply,
  activeCount,
}: FilterBottomSheetProps) {
  // Bloque le scroll du body quand le sheet est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleApply = () => {
    onApply();
    onClose();
  };

  return createPortal(
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Sheet ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtres"
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Handle + header */}
        <div className="flex flex-col items-center pt-3 pb-0 px-5">
          <div className="w-10 h-1 bg-gray-200 rounded-full mb-4" />
          <div className="w-full flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Filtres</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              aria-label="Fermer les filtres"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto px-5 pb-6" style={{ maxHeight: "70vh" }}>
          <SidebarFilters
            filters={filters}
            onChange={onChange}
            onApply={handleApply}
            activeCount={activeCount}
          />
        </div>
      </div>
    </>,
    document.body
  );
}