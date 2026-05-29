import * as Slider from "@radix-ui/react-slider";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterState = {
  categories: string[];
  conditions: string[];
  sizes: string[];
  price: [number, number];
};

export const CATEGORIES = [
  "Pantalon", "Short", "T-shirt", "Débardeur",
  "Chemise", "Robe", "Jupe", "Sweat", "Ensemble", "Maillot",
] as const;

export const CONDITIONS = ["Neuf", "Occasion"] as const;

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const MAX_PRICE = 500_000;

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  conditions: [],
  sizes: [],
  price: [0, MAX_PRICE],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggle(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function formatAr(n: number) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

function PillGroup({
  options,
  selected,
  onToggle,
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
              active
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

interface SidebarFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
  activeCount: number;
}

export default function SidebarFilters({
  filters,
  onChange,
  onApply,
  activeCount,
}: SidebarFiltersProps) {

  const update = (patch: Partial<FilterState>) =>
    onChange({ ...filters, ...patch });

  const reset = () => onChange(DEFAULT_FILTERS);

  return (
    <div className="space-y-5">

      {/* ── Catégorie ── */}
      <div>
        <SectionLabel>Catégorie</SectionLabel>
        <PillGroup
          options={CATEGORIES}
          selected={filters.categories}
          onToggle={(v) => update({ categories: toggle(filters.categories, v) })}
        />
      </div>

      <hr className="border-gray-100" />

      {/* ── Condition ── */}
      <div>
        <SectionLabel>Condition</SectionLabel>
        <PillGroup
          options={CONDITIONS}
          selected={filters.conditions}
          onToggle={(v) => update({ conditions: toggle(filters.conditions, v) })}
        />
      </div>

      <hr className="border-gray-100" />

      {/* ── Taille ── */}
      <div>
        <SectionLabel>Taille</SectionLabel>
        <PillGroup
          options={SIZES}
          selected={filters.sizes}
          onToggle={(v) => update({ sizes: toggle(filters.sizes, v) })}
        />
      </div>

      <hr className="border-gray-100" />

      {/* ── Prix ── */}
      <div>
        <SectionLabel>Prix</SectionLabel>
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>{formatAr(filters.price[0])}</span>
          <span>{formatAr(filters.price[1])}</span>
        </div>
        <Slider.Root
          value={filters.price}
          onValueChange={(value) => update({ price: value as [number, number] })}
          min={0}
          max={MAX_PRICE}
          step={1000}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="relative grow rounded-full h-1 bg-gray-200">
            <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-300 rounded-full shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 transition-colors" />
          <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-300 rounded-full shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 transition-colors" />
        </Slider.Root>
      </div>

      <hr className="border-gray-100" />

      {/* ── Actions ── */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={reset}
          className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
        >
          Réinitialiser
        </button>
        {activeCount > 0 && (
          <span className="text-xs text-gray-400">
            {activeCount} filtre{activeCount > 1 ? "s" : ""} actif{activeCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onApply}
        className="w-full py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-700 active:scale-[0.98] transition-all"
      >
        Appliquer les filtres
      </button>

    </div>
  );
}
// import * as Slider from "@radix-ui/react-slider";

// interface FieldsetProps {
//     titre: string,
//     element?: string[]
//     type: string,
//     price?: number[]
//     onValueChange?: (value: number[]) => void
//     maxPrice?: number
// }

// export default function Fieldset({ titre, type, element, price, maxPrice,onValueChange }: FieldsetProps) {
//     const elementFiltre = element ? element.map((item, index) =>
//         <label key={titre + '' + index} className="flex gap-2 cursor-pointer">
//             <input className="appearance-none w-2 h-2  rounded-full checked:bg-black checked:ring-2 checked:ring-black checked:ring-inset relative top-2.5"
//                 type={type} name={titre} value={item} />
//             <span>{item}</span>
//         </label>
//     ) : null

//     const priceRange = <Slider.Root
//         value={price}
//         onValueChange={(value) => onValueChange?.(value)}
//         max={maxPrice}
//         step={100}
//         className="relative flex items-center w-full h-5"
//     >
//         <Slider.Track className="bg-gray-300 relative grow rounded-full h-3">
//             <Slider.Range className="absolute bg-black rounded-full h-full" />
//         </Slider.Track>

//         <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full" />
//         <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full" />
//     </Slider.Root>

//     return (
//         <fieldset>
//             <legend className="font-semibold mb-2">{titre}</legend>
//             <div className="space-y-2">
//                 {type === "radio" ? elementFiltre : priceRange}
//             </div>
//         </fieldset>
//     )
// }