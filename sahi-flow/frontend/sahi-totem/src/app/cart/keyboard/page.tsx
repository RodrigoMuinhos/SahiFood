"use client";

import VirtualKeyboard from "@/components/VirtualKeyboard";
import { Copy, Smartphone } from "lucide-react";
import { useState } from "react";

export default function CartKeyboardPage() {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090807] px-4 py-6 text-[#f8edd8]">
      <div className="mx-auto max-w-xl space-y-5">
        <div className="rounded-3xl border border-[#4a3b1f] bg-[#15110d] p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
            <Smartphone className="h-4 w-4" />
            Teclado auxiliar no celular
          </div>
          <h1 className="mt-3 text-2xl font-black uppercase text-[#f8edd8]">
            Digite seu nome
          </h1>
          <p className="mt-2 text-sm text-[#cdbda1]">
            Use o teclado abaixo para digitar com mais conforto no celular.
          </p>

          <div className="mt-4 rounded-2xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-4 text-xl font-black text-[#f8edd8]">
            {name || "Seu nome aparecerá aqui"}
          </div>

          <div className="mt-5">
            <VirtualKeyboard value={name} onChange={setName} />
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!name.trim()}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-wide transition ${
              !name.trim()
                ? "cursor-not-allowed bg-[#4a3b1f] text-[#9d8f77]"
                : "bg-[#d29a35] text-[#17120f] hover:brightness-110"
            }`}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Nome copiado" : "Copiar nome"}
          </button>
        </div>
      </div>
    </main>
  );
}
