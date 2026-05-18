"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";

const showcase = mockProducts.filter((p) => p.imageUrl).slice(0, 8);

export default function ScreensaverPage() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Cycle through products with cross-fade
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % showcase.length);
        setVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = showcase[idx];

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#090807] cursor-pointer select-none"
      onClick={() => router.push("/menu")}
    >
      {/* Background images — fade between them */}
      {showcase.map((p, i) => (
        <div
          key={p.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === idx && visible ? 1 : 0 }}
        >
          <img
            src={p.imageUrl!}
            alt={p.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85" />
        </div>
      ))}

      {/* UI layer */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 py-14">
        {/* Brand */}
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="/logo/sahi-logo.png"
              alt="Logo SA´HI"
              className="h-[26rem] w-[26rem] object-contain drop-shadow-2xl md:h-[34rem] md:w-[34rem]"
            />
          </div>
        </div>

        {/* Current product highlight */}
        <div
          className="text-center transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#d29a35] mb-3">
            Em destaque
          </p>
          <h2 className="text-5xl font-black uppercase text-[#f8edd8] drop-shadow-lg">
            {current?.name}
          </h2>
          <p className="mt-3 text-3xl font-black text-[#d29a35]">
            R$ {current?.price.toFixed(2).replace(".", ",")}
          </p>
          {current?.description && (
            <p className="mt-2 max-w-sm text-[#d3c5ad] text-sm leading-relaxed">
              {current.description}
            </p>
          )}
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {showcase.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-white/25 transition-all duration-500"
              style={{
                width: i === idx ? "2rem" : "0.375rem",
                backgroundColor: i === idx ? "#d29a35" : undefined,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/menu")}
          className="w-full max-w-sm rounded-2xl bg-[#d29a35] px-8 py-6 text-xl font-black uppercase tracking-[0.14em] text-[#17120f] shadow-[0_8px_40px_rgba(210,154,53,0.4)] transition hover:brightness-110 active:scale-[0.98]"
        >
          TOQUE PARA COMEÇAR
        </button>
      </div>
    </div>
  );
}
