"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, Printer } from "lucide-react";

interface OrderSnapshot {
  orderNumber: number;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    notes?: string;
  }>;
  total: number;
  createdAt: string;
}

export default function OrderConfirmedPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params?.orderNumber ?? "---";
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Auto-return to screensaver
  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    const r = setTimeout(() => router.push("/"), 30_000);
    return () => {
      clearInterval(t);
      clearTimeout(r);
    };
  }, [router]);

  const time = order?.createdAt
    ? new Date(order.createdAt).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#090807] px-4 py-10 text-[#f8edd8]">
      {/* Success icon */}
      <div className="mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-[#4a8a5a]/20 animate-ping" />
        <CheckCircle className="h-20 w-20 text-[#4a8a5a] relative" />
      </div>

      <h1 className="text-3xl font-black uppercase tracking-widest text-[#f8edd8] mb-1">
        Pedido confirmado!
      </h1>
      {order?.customerName && (
        <p className="text-[#d29a35] text-lg font-semibold mb-6">
          Ola, {order.customerName}!
        </p>
      )}

      {/* Receipt card */}
      <div className="w-full max-w-sm">
        {/* Thermal receipt style */}
        <div className="relative bg-[#faf8f2] text-[#1a140f] rounded-t-2xl shadow-2xl overflow-hidden print:shadow-none">
          {/* Zigzag top edge */}
          <div
            className="h-4 w-full bg-[#090807]"
            style={{
              clipPath:
                "polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)",
            }}
          />

          <div className="px-6 pt-4 pb-6 font-mono">
            {/* Header */}
            <div className="text-center mb-4 border-b-2 border-dashed border-[#c8b88a] pb-4">
              <div className="flex justify-center mb-2">
                <img
                  src="/logo/sahi-logo.png"
                  alt="Logo SA´HI"
                  className="h-24 w-24 object-contain"
                />
              </div>
              <p className="text-4xl font-black tracking-tight mt-1">
                #{String(orderNumber).padStart(3, "0")}
              </p>
              {order?.customerName && (
                <p className="text-lg font-bold mt-1">{order.customerName}</p>
              )}
              {time && <p className="text-xs text-[#8a7a5a] mt-1">{time}</p>}
            </div>

            {/* Items */}
            {order?.items && order.items.length > 0 && (
              <div className="space-y-2 mb-4 border-b-2 border-dashed border-[#c8b88a] pb-4">
                {order.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm">
                      <span className="font-bold flex-1 pr-2">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-bold whitespace-nowrap">
                        R${" "}
                        {(item.quantity * item.unitPrice)
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-xs text-[#8a7a5a] ml-4">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between font-black text-lg mb-4 border-b-2 border-dashed border-[#c8b88a] pb-4">
              <span>TOTAL</span>
              <span>R$ {(order?.total ?? 0).toFixed(2).replace(".", ",")}</span>
            </div>

            {/* Payment note */}
            <div className="text-center text-xs text-[#8a7a5a] space-y-1">
              <p className="font-bold text-sm text-[#1a140f]">
                Pagamento com o atendente
              </p>
              <p>Nosso atendente ira ate voce</p>
              <p>Aguarde com este comprovante!</p>
            </div>
          </div>

          {/* Zigzag bottom */}
          <div
            className="h-4 w-full bg-[#090807]"
            style={{
              clipPath:
                "polygon(0 100%, 4% 0, 8% 100%, 12% 0, 16% 100%, 20% 0, 24% 100%, 28% 0, 32% 100%, 36% 0, 40% 100%, 44% 0, 48% 100%, 52% 0, 56% 100%, 60% 0, 64% 100%, 68% 0, 72% 100%, 76% 0, 80% 100%, 84% 0, 88% 100%, 92% 0, 96% 100%, 100% 0, 100% 100%)",
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 w-full max-w-sm space-y-3 no-print">
        <button
          onClick={() => window.print()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#4a3b1f] bg-[#15110d] px-5 py-4 font-bold text-[#d29a35] transition hover:bg-[#1e1710] active:scale-[0.98]"
        >
          <Printer className="h-5 w-5" />
          Imprimir comprovante
        </button>

        <button
          onClick={() => router.push("/menu")}
          className="w-full rounded-2xl bg-[#d29a35] px-5 py-4 font-black uppercase tracking-wide text-[#17120f] transition hover:brightness-105 active:scale-[0.98]"
        >
          Fazer outro pedido
        </button>

        <p className="text-center text-xs text-[#7a6d5a]">
          Voltando a tela inicial em {countdown}s...
        </p>
      </div>
    </div>
  );
}
