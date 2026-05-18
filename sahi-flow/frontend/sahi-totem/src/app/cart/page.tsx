"use client";

import { useCart } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { apiPost } from "@/lib/api";
import { Order } from "@/types";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart, customerName, setCustomerName } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0 || !customerName.trim()) return;

    try {
      setLoading(true);
      const total = getTotal();
      const orderPayload = {
        orderNumber: Math.floor(Math.random() * 899) + 100,
        status: "CREATED",
        subtotal: total,
        discount: 0,
        total,
        customerType: "PUBLIC",
        customerName: customerName.trim(),
      };

      let orderNumber: number;

      try {
        const response = await apiPost<Order>("/api/orders", orderPayload);
        orderNumber = response.orderNumber;
      } catch {
        orderNumber = orderPayload.orderNumber;
      }

      // Save order snapshot for receipt
      const snapshot = {
        orderNumber,
        customerName: customerName.trim(),
        items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          unitPrice: i.product.price,
          notes: i.notes,
        })),
        total,
        createdAt: new Date().toISOString(),
      };
      sessionStorage.setItem("lastOrder", JSON.stringify(snapshot));

      clearCart();
      router.push(`/order-confirmed/${orderNumber}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#090807] text-[#f8edd8]">

      {/* Header */}
      <header className="flex-none border-b border-[#2a2018] bg-[#100d09]/95 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-[#4a3b1f] p-2 text-[#d29a35] hover:bg-[#221b15] transition active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-black uppercase tracking-[0.2em] text-[#f8edd8]">Meu Pedido</h1>
            <p className="text-xs text-[#9d8f77]">{totalItems} item(ns)</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

        {/* Name input */}
        <div className="rounded-2xl border border-[#4a3b1f] bg-[#15110d] p-5">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d29a35] mb-3">
            <User className="h-4 w-4" />
            Como posso te chamar?
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite seu nome..."
            maxLength={40}
            className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3.5 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
          />
          <p className="mt-2 text-xs text-[#7a6d5a]">
            Usaremos seu nome para chamar quando o pedido estiver pronto.
          </p>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[#9d8f77] text-lg mb-4">Seu carrinho está vazio</p>
            <button
              onClick={() => router.push("/menu")}
              className="rounded-2xl bg-[#d29a35] px-6 py-3 font-black uppercase tracking-wide text-[#17120f]"
            >
              Ver cardapio
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9d8f77]">Itens do pedido</p>
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 rounded-2xl border border-[#3a2b18] bg-[#15110d] p-4"
              >
                {item.product.imageUrl && (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-14 w-14 rounded-xl object-cover flex-none"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-black uppercase text-[#f8edd8] text-sm leading-tight truncate">
                    {item.product.name}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-[#9d8f77] mt-0.5 truncate">{item.notes}</p>
                  )}
                  <p className="text-[#d29a35] font-black text-sm mt-1">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  <button
                    onClick={() =>
                      item.quantity <= 1
                        ? removeItem(item.product.id)
                        : updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="h-8 w-8 rounded-full border border-[#4a3b1f] flex items-center justify-center text-[#d29a35] hover:bg-[#221b15] transition active:scale-90"
                  >
                    {item.quantity <= 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                  </button>
                  <span className="w-5 text-center font-black text-[#f8edd8]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="h-8 w-8 rounded-full border border-[#4a3b1f] flex items-center justify-center text-[#d29a35] hover:bg-[#221b15] transition active:scale-90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <footer className="flex-none border-t border-[#3a2a12] bg-[#17120f] px-5 py-4 space-y-3">
          {/* Summary */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9d8f77]">{totalItems} item(ns)</span>
            <span className="text-xl font-black text-[#d29a35]">
              R$ {getTotal().toFixed(2).replace(".", ",")}
            </span>
          </div>

          {/* Payment notice */}
          <div className="rounded-xl bg-[#1e1710] border border-[#4a3b1f] px-4 py-3 text-xs text-[#d3c5ad]">
            Pagamento realizado com o atendente. Confirme o pedido e aguarde!
          </div>

          {/* Confirm button */}
          <button
            onClick={handleCheckout}
            disabled={loading || !customerName.trim()}
            className={`w-full rounded-2xl py-5 text-base font-black uppercase tracking-wider transition active:scale-[0.98] ${
              loading || !customerName.trim()
                ? "bg-[#4a3b1f] text-[#9d8f77] cursor-not-allowed"
                : "bg-[#d29a35] text-[#17120f] hover:brightness-105"
            }`}
          >
            {loading ? "Confirmando..." : !customerName.trim() ? "Informe seu nome para continuar" : "Confirmar Pedido"}
          </button>
        </footer>
      )}
    </div>
  );
}
