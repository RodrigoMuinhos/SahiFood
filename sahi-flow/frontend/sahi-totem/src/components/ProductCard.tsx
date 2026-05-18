"use client";

import { Product } from "@/types";
import { useCart } from "@/lib/store";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState(false);

  const visual = getProductVisual(product);

  const handleAdd = () => {
    addItem(product, 1, note);
    setNote("");
    setFeedback(true);
    setTimeout(() => setFeedback(false), 1800);
  };

  return (
    <div className="group overflow-hidden rounded-[34px] border border-[#5a431f] bg-[#16120e] shadow-[0_28px_80px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a54b] xl:grid xl:min-h-[460px] xl:grid-cols-[1.15fr_0.85fr]">
      <div
        className="relative h-[320px] overflow-hidden border-b border-[#4a3b1f] xl:h-auto xl:border-b-0 xl:border-r"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.12) 0%, rgba(10,8,7,0.76) 100%), url('${visual.imageUrl}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,181,71,0.35),transparent_30%)]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#f1c36d] backdrop-blur-sm">
          Preparação rápida
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="max-w-[80%] rounded-[28px] border border-white/10 bg-black/35 p-5 backdrop-blur-sm">
            <img
              src="/logo/sahi-logo.png"
              alt="Logo SA´HI"
              className="h-10 w-10 object-contain"
            />
            <h3 className="mt-2 text-3xl font-black uppercase leading-none text-[#fff4df] md:text-4xl">
              {product.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/80 md:text-base">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between space-y-5 p-6 md:p-7">
        <div className="space-y-5">
          <p className="text-base leading-7 text-[#d3c5ad] md:text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-2xl border border-[#4a3b1f] bg-[#1d1813] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9d8f77]">
                Valor
              </p>
              <span className="mt-2 block text-4xl font-black text-[#f1b547]">
                {product.price === 0
                  ? "Grátis"
                  : `R$ ${product.price.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d8f77]">
              Observação do pedido
            </label>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ex.: sem cebola, molho à parte"
              className="w-full rounded-2xl border border-[#4a3b1f] bg-[#221c16] px-4 py-4 text-base text-[#f8edd8] placeholder:text-[#9d8f77] focus:border-[#d6a54b] focus:ring-0"
            />
          </div>
        </div>

        <button
          id={`btn-${product.id}`}
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d29a35] px-4 py-5 text-lg font-black uppercase tracking-[0.08em] text-[#17120f] transition-all duration-200 hover:brightness-105"
        >
          <Plus className="h-6 w-6" />
          {feedback ? "Adicionado ao pedido" : "Adicionar ao pedido"}
        </button>
      </div>
    </div>
  );
}

function getProductVisual(product: Product) {
  return {
    imageUrl: product.imageUrl || getFallbackImage(product),
  };
}

function getFallbackImage(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("baguette") || name.includes("shawarma")) {
    return "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1200";
  }

  if (name.includes("bowl") || name.includes("falafel")) {
    return "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200";
  }

  if (
    name.includes("breakfast") ||
    name.includes("toast") ||
    name.includes("ovos")
  ) {
    return "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1200";
  }

  if (
    name.includes("água") ||
    name.includes("refrigerante") ||
    name.includes("suco")
  ) {
    return "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1200";
  }

  return "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1200";
}
