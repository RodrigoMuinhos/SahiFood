"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/lib/store";
import { X, Clock, Plus, Minus, ShoppingCart } from "lucide-react";
import { AllergenList } from "./AllergenBadge";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

function getPlateDetails(product: Product) {
  const name = product.name.toLowerCase();
  const categoryId = product.categoryId;

  if (categoryId === "550e8400-e29b-41d4-a716-446655440002") {
    return {
      base: ["Item principal", "Acompanhamento", "Bebida"],
      molhos: ["Maionese Verde", "Maionese Defumada", "Sem molho"],
      extras: ["Molho extra", "Queijo coalho extra", "Ovo extra"],
      perfil: "Combo prático e completo",
    };
  }

  if (categoryId === "550e8400-e29b-41d4-a716-446655440005") {
    return {
      base: ["Adicional do pedido"],
      molhos: ["Escolha seu sabor"],
      extras: ["Pode combinar com lanches e pratos"],
      perfil: "Complemento para personalizar seu pedido",
    };
  }

  if (name.includes("sahan") || name.includes("prato")) {
    return {
      base: ["Kafta", "Arroz", "Legumes grelhados", "Vinagrete"],
      molhos: ["Maionese Verde", "Maionese Defumada", "Sem molho"],
      extras: ["Molho extra", "Queijo coalho extra", "Ovo extra"],
      perfil: "Refeição completa para o dia",
    };
  }

  if (name.includes("khabz")) {
    return {
      base: ["Kafta", "Pão baguete", "Queijo coalho", "Cebola roxa"],
      molhos: ["Maionese Verde", "Maionese Defumada", "Sem molho"],
      extras: ["Queijo coalho extra", "Molho extra", "Ovo extra"],
      perfil: "Ótima escolha para matar a fome",
    };
  }

  if (name.includes("bayd") || name.includes("ovo")) {
    return {
      base: ["Pão", "Ovo", "Queijo coalho"],
      molhos: ["Maionese Verde", "Maionese Defumada", "Sem molho"],
      extras: ["Ovo extra", "Queijo coalho extra", "Molho extra"],
      perfil: "Perfeito para um lanche rápido",
    };
  }

  if (
    name.includes("monster") ||
    name.includes("doritos") ||
    name.includes("chips") ||
    name.includes("toaster") ||
    name.includes("chocolate") ||
    name.includes("lata") ||
    name.includes("água") ||
    name.includes("suco")
  ) {
    return {
      base: ["Item de conveniência", "Pronto para consumo"],
      molhos: ["Não se aplica"],
      extras: ["Sem adicionais"],
      perfil: "Item rápido para acompanhar seu pedido",
    };
  }

  if (
    name.includes("molho") ||
    name.includes("queijo") ||
    name.includes("extra")
  ) {
    return {
      base: ["Adicional do pedido"],
      molhos: ["Verifique sua preferência"],
      extras: ["Pode combinar com lanches e pratos"],
      perfil: "Complemento para personalizar seu pedido",
    };
  }

  return {
    base: ["Produto selecionado"],
    molhos: ["Maionese Verde", "Maionese Defumada", "Sem molho"],
    extras: ["Verificar disponibilidade"],
    perfil: "Item do cardápio",
  };
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNotes("");
      setAdded(false);
    }
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!product) return null;

  const details = getPlateDetails(product);

  const handleAdd = () => {
    addItem(product, quantity, notes || undefined);
    setAdded(true);
    setTimeout(() => onClose(), 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[42px] border border-[#4a3b1f] bg-[#15110d] shadow-[0_-24px_70px_rgba(0,0,0,0.55)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-[38vh] min-h-[280px] overflow-hidden flex-none">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#221b15] text-lg text-[#9d8f77]">
              Sem foto
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-[#15110d]/10 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prep time */}
          {product.preparationTimeMinutes > 0 && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-sm text-[#f8edd8]">
              <Clock className="h-3.5 w-3.5 text-[#d29a35]" />
              <span>{product.preparationTimeMinutes} min</span>
            </div>
          )}

          {/* Feito na hora */}
          {product.hasRecipe && (
            <div className="absolute bottom-4 right-4 rounded-full bg-[#d29a35]/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#17120f]">
              Preparado na hora
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5 pb-36">
            {/* Name & price */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-black uppercase leading-tight text-[#f8edd8] md:text-3xl">
                {product.name}
              </h2>
              <p className="whitespace-nowrap rounded-xl bg-[#d29a35] px-4 py-2 text-2xl font-black leading-none text-[#17120f] md:text-3xl">
                {product.price === 0
                  ? "Grátis"
                  : `R$ ${product.price.toFixed(2).replace(".", ",")}`}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-base leading-relaxed text-[#d3c5ad]">
                {product.description}
              </p>
            )}

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-[#4a3b1f] bg-[#1a140f] p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9d8f77]">
                  O que vem
                </p>
                <p className="mt-2 text-sm text-[#f8edd8]">
                  {details.base.join(" • ")}
                </p>
              </div>

              <div className="rounded-2xl border border-[#4a3b1f] bg-[#1a140f] p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9d8f77]">
                  Molhos
                </p>
                <p className="mt-2 text-sm text-[#f8edd8]">
                  {details.molhos.join(" • ")}
                </p>
              </div>

              <div className="rounded-2xl border border-[#4a3b1f] bg-[#1a140f] p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9d8f77]">
                  Complementos
                </p>
                <p className="mt-2 text-sm text-[#f8edd8]">
                  {details.extras.join(" • ")}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#3f2f1a] bg-[#14100c] px-4 py-3 text-sm text-[#d3c5ad]">
              <span className="font-bold text-[#d29a35]">Dica:</span>{" "}
              {details.perfil}.
            </div>

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="rounded-2xl border border-[#4a3b1f] bg-[#1a140f] p-4">
                <AllergenList allergens={product.allergens} size="md" />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#9d8f77]">
                Observação do pedido
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: sem cebola, molho à parte..."
                className="w-full resize-none rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-base text-[#f8edd8] placeholder:text-[#5a4d3a] focus:border-[#d29a35] focus:outline-none"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-none border-t border-[#4a3b1f] bg-[#14100c] px-5 py-5 pb-6">
          <div className="flex items-end gap-3">
            <div className="min-w-[132px] rounded-2xl border border-[#4a3b1f] bg-[#1a140f] px-3 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9d8f77]">
                Quantidade
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24190f] text-[#f8edd8] transition hover:bg-[#2d2010] active:scale-95"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-xl font-black text-[#f8edd8]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24190f] text-[#f8edd8] transition hover:bg-[#2d2010] active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex min-h-[72px] flex-1 items-center justify-center gap-3 rounded-2xl px-5 text-base font-black uppercase tracking-wider transition active:scale-[0.98] ${
                added
                  ? "bg-[#4a8a5a] text-white"
                  : "bg-[#d29a35] text-[#17120f] hover:brightness-110"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-left leading-tight">
                {added
                  ? "Adicionado!"
                  : `Adicionar · R$ ${(product.price * quantity).toFixed(2).replace(".", ",")}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
