import { Allergen } from "@/types";

const ALLERGEN_CONFIG: Record<
  Allergen,
  { label: string; emoji: string; bg: string }
> = {
  gluten: { label: "Glúten", emoji: "🌾", bg: "#b5850a" },
  crustaceos: { label: "Crustáceos", emoji: "🦀", bg: "#c94a1e" },
  ovos: { label: "Ovos", emoji: "🥚", bg: "#c9a200" },
  peixe: { label: "Peixe", emoji: "🐟", bg: "#2874a0" },
  amendoim: { label: "Amendoim", emoji: "🥜", bg: "#8b5e2a" },
  soja: { label: "Soja", emoji: "🌱", bg: "#3a7d44" },
  laticinios: { label: "Laticínios", emoji: "🥛", bg: "#5a8fa8" },
  nozes: { label: "Nozes", emoji: "🌰", bg: "#6b4c1e" },
  aipo: { label: "Aipo", emoji: "🌿", bg: "#2e7d52" },
  mostarda: { label: "Mostarda", emoji: "💛", bg: "#9e8000" },
  gergelim: { label: "Gergelim", emoji: "⚪", bg: "#8c7a55" },
  sulfitos: { label: "Sulfitos", emoji: "⚗️", bg: "#6a3d9a" },
  moluscos: { label: "Moluscos", emoji: "🐚", bg: "#1a6b9e" },
  tremocos: { label: "Tremoços", emoji: "🫘", bg: "#b56000" },
};

interface AllergenBadgeProps {
  allergen: Allergen;
  size?: "sm" | "md";
}

export function AllergenBadge({ allergen, size = "md" }: AllergenBadgeProps) {
  const cfg = ALLERGEN_CONFIG[allergen];
  if (!cfg) return null;

  if (size === "sm") {
    return (
      <div
        title={cfg.label}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm"
        style={{ backgroundColor: cfg.bg }}
      >
        {cfg.emoji}
      </div>
    );
  }

  return (
    <div
      className="inline-flex flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-white"
      style={{ backgroundColor: cfg.bg, minWidth: "3.5rem" }}
    >
      <span className="text-2xl leading-none">{cfg.emoji}</span>
      <span className="text-center text-[9px] font-bold uppercase leading-tight">
        {cfg.label}
      </span>
    </div>
  );
}

interface AllergenListProps {
  allergens: Allergen[];
  size?: "sm" | "md";
}

export function AllergenList({ allergens, size = "md" }: AllergenListProps) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9d8f77]">
        Contém alérgenos
      </p>
      <div className="flex flex-wrap gap-2">
        {allergens.map((a) => (
          <AllergenBadge key={a} allergen={a} size={size} />
        ))}
      </div>
    </div>
  );
}
