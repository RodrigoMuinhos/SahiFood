"use client";

import { useCart } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Keyboard,
  Minus,
  Plus,
  QrCode,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiPost } from "@/lib/api";
import { Order, Product } from "@/types";
import VirtualKeyboard from "@/components/VirtualKeyboard";

const COMBO_CATEGORY_ID = "550e8400-e29b-41d4-a716-446655440002";

const ORDER_TYPES = [
  {
    value: "DINE_IN",
    title: "Comer no local",
    description: "Pedido para consumir no restaurante.",
  },
  {
    value: "TAKEAWAY",
    title: "Levar",
    description: "Pedido embalado para retirada.",
  },
  {
    value: "DELIVERY",
    title: "Delivery",
    description: "Pedido para entrega no endereço do cliente.",
  },
] as const;

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCep(value: string) {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidCep(value: string) {
  return onlyDigits(value).length === 8;
}

function isValidPhone(value: string) {
  const len = onlyDigits(value).length;
  return len === 10 || len === 11;
}

function getComboDetails(product: Product) {
  if (product.categoryId !== COMBO_CATEGORY_ID) return null;

  const name = product.name.toLowerCase();

  if (name.includes("bayd")) {
    return ["Bayd Coalho", "Batatinha Chips", "Água com Gás"];
  }

  if (name.includes("plus") || name.includes("kafta")) {
    return ["Khabz Kafta", "Batatinha Chips", "Suco da Casa"];
  }

  if (name.includes("completo")) {
    return ["Sahan Kafta", "Bebida", "Batatinha Chips"];
  }

  return ["Item principal", "Acompanhamento", "Bebida"];
}

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    clearCart,
    customerName,
    setCustomerName,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [keyboardUrl, setKeyboardUrl] = useState("");
  const [orderType, setOrderType] =
    useState<(typeof ORDER_TYPES)[number]["value"]>("DINE_IN");
  const [deliveryDistanceKm, setDeliveryDistanceKm] = useState("3");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryCep, setDeliveryCep] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNumber, setDeliveryNumber] = useState("");
  const [deliveryComplement, setDeliveryComplement] = useState("");
  const [deliveryNeighborhood, setDeliveryNeighborhood] = useState("");
  const [deliveryCityState, setDeliveryCityState] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const router = useRouter();

  const STORE_ADDRESS =
    "Rua Dr. Gilberto Studart, 728 - Fortaleza/CE, 60192-105";

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const lookupCep = async (cepValue: string) => {
    const cepDigits = onlyDigits(cepValue);
    if (cepDigits.length !== 8) {
      setCepError("Digite um CEP válido com 8 números.");
      return;
    }

    try {
      setCepLoading(true);
      setCepError("");
      const response = await fetch(
        `https://viacep.com.br/ws/${cepDigits}/json/`,
      );
      const data = await response.json();

      if (data?.erro) {
        setCepError("CEP não encontrado.");
        return;
      }

      setDeliveryAddress(data.logradouro || "");
      setDeliveryNeighborhood(data.bairro || "");
      setDeliveryCityState(
        [data.localidade, data.uf].filter(Boolean).join("/") || "",
      );
    } catch {
      setCepError("Não foi possível consultar o CEP agora.");
    } finally {
      setCepLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    setKeyboardUrl(
      new URL("/cart/keyboard", window.location.origin).toString(),
    );
  }, []);

  useEffect(() => {
    if (orderType !== "DELIVERY") return;

    const cepDigits = onlyDigits(deliveryCep);
    if (cepDigits.length !== 8) return;

    const timer = setTimeout(() => {
      void lookupCep(deliveryCep);
    }, 500);

    return () => clearTimeout(timer);
  }, [deliveryCep, orderType]);

  const qrCodeUrl = useMemo(() => {
    if (!keyboardUrl) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(keyboardUrl)}`;
  }, [keyboardUrl]);

  const deliveryDistanceValue = Math.max(
    0,
    Number(deliveryDistanceKm.replace(",", ".")) || 0,
  );

  const deliveryFee = useMemo(() => {
    if (orderType !== "DELIVERY") return 0;

    const baseFee = 3.99;
    if (deliveryDistanceValue <= 3) return baseFee;

    const extraKm = Math.ceil(deliveryDistanceValue - 3);
    return baseFee + extraKm;
  }, [deliveryDistanceValue, orderType]);

  const orderTotal = useMemo(
    () => getTotal() + deliveryFee,
    [deliveryFee, getTotal],
  );

  const addressComplete =
    orderType !== "DELIVERY" ||
    (isValidCep(deliveryCep) &&
      deliveryAddress.trim() !== "" &&
      deliveryNumber.trim() !== "" &&
      deliveryNeighborhood.trim() !== "" &&
      deliveryCityState.trim() !== "");

  const canCheckout =
    items.length > 0 &&
    customerName.trim().length > 0 &&
    isValidPhone(customerPhone) &&
    addressComplete;

  const handleCheckout = async () => {
    if (!canCheckout) return;

    try {
      setLoading(true);
      const subtotal = getTotal();
      const total = subtotal + deliveryFee;
      const orderPayload = {
        orderNumber: Math.floor(Math.random() * 899) + 100,
        status: "CREATED",
        subtotal,
        discount: 0,
        total,
        customerType: orderType,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
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
        customerPhone: customerPhone.trim(),
        orderType,
        storeAddress: STORE_ADDRESS,
        deliveryCep: orderType === "DELIVERY" ? onlyDigits(deliveryCep) : null,
        deliveryAddress:
          orderType === "DELIVERY"
            ? {
                street: deliveryAddress.trim(),
                number: deliveryNumber.trim(),
                complement: deliveryComplement.trim() || null,
                neighborhood: deliveryNeighborhood.trim(),
                cityState: deliveryCityState.trim(),
              }
            : null,
        deliveryDistanceKm:
          orderType === "DELIVERY" ? deliveryDistanceValue : null,
        deliveryFee,
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
            <h1 className="text-lg font-black uppercase tracking-[0.2em] text-[#f8edd8]">
              Meu Pedido
            </h1>
            <p className="text-xs text-[#9d8f77]">{totalItems} item(ns)</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Order type */}
        <div className="rounded-2xl border border-[#4a3b1f] bg-[#15110d] p-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
              Tipo de pedido
            </p>
            <h2 className="mt-1 text-lg font-black uppercase tracking-[0.08em] text-[#f8edd8]">
              Onde deseja receber seu pedido?
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {ORDER_TYPES.map((type) => {
              const active = orderType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => setOrderType(type.value)}
                  className={`rounded-2xl border px-4 py-4 text-left transition active:scale-[0.99] ${
                    active
                      ? "border-[#d29a35] bg-[#d29a35]/12"
                      : "border-[#4a3b1f] bg-[#1a140f] hover:bg-[#211810]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-base font-black uppercase tracking-[0.08em] ${
                        active ? "text-[#f8edd8]" : "text-[#d9ccb3]"
                      }`}
                    >
                      {type.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                        active
                          ? "bg-[#d29a35] text-[#17120f]"
                          : "bg-[#221a12] text-[#d29a35]"
                      }`}
                    >
                      {active ? "Selecionado" : "Escolher"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-[#9d8f77]">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {orderType === "DELIVERY" && (
          <div className="mt-4 space-y-3 rounded-2xl border border-[#4a3b1f] bg-[#1a140f] p-4">
            <div className="rounded-xl border border-[#4a3b1f] bg-[#15110d] px-4 py-3 text-sm text-[#cdbda1]">
              <span className="font-bold text-[#d29a35]">Loja:</span>{" "}
              {STORE_ADDRESS}
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                CEP do cliente
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={deliveryCep}
                  onChange={(e) => setDeliveryCep(formatCep(e.target.value))}
                  onBlur={() => {
                    if (isValidCep(deliveryCep)) void lookupCep(deliveryCep);
                  }}
                  placeholder="00000-000"
                  className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => void lookupCep(deliveryCep)}
                  disabled={cepLoading}
                  className="rounded-xl border border-[#4a3b1f] bg-[#15110d] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#d29a35] transition hover:bg-[#211810] disabled:opacity-60"
                >
                  {cepLoading ? "Buscando..." : "Buscar"}
                </button>
              </div>
              {cepError && (
                <p className="mt-2 text-xs font-semibold text-[#f39b9b]">
                  {cepError}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                Endereço de entrega
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Rua, avenida, travessa..."
                rows={2}
                className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-base font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                  Número
                </label>
                <input
                  type="text"
                  value={deliveryNumber}
                  onChange={(e) => setDeliveryNumber(e.target.value)}
                  placeholder="Ex.: 728"
                  className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                  Complemento
                </label>
                <input
                  type="text"
                  value={deliveryComplement}
                  onChange={(e) => setDeliveryComplement(e.target.value)}
                  placeholder="Apto, bloco, referência"
                  className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                  Bairro
                </label>
                <input
                  type="text"
                  value={deliveryNeighborhood}
                  onChange={(e) => setDeliveryNeighborhood(e.target.value)}
                  placeholder="Bairro"
                  className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                  Cidade / UF
                </label>
                <input
                  type="text"
                  value={deliveryCityState}
                  onChange={(e) => setDeliveryCityState(e.target.value)}
                  placeholder="Fortaleza/CE"
                  className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
                Distância estimada da loja
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={deliveryDistanceKm}
                  onChange={(e) => setDeliveryDistanceKm(e.target.value)}
                  placeholder="Ex.: 3"
                  className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
                />
                <span className="whitespace-nowrap rounded-xl border border-[#4a3b1f] bg-[#15110d] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#9d8f77]">
                  km
                </span>
              </div>
              <p className="mt-2 text-xs text-[#9d8f77]">
                Até 3 km: R$ 3,99. Acima disso, soma R$ 1,00 por km extra.
              </p>
            </div>
          </div>
        )}

        {/* Name input */}
        <div className="rounded-2xl border border-[#4a3b1f] bg-[#15110d] p-5">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d29a35] mb-3">
            <User className="h-4 w-4" />
            Cadastro do cliente
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite seu nome..."
            maxLength={40}
            className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3.5 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
          />
          <div className="mt-3">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#d29a35]">
              Celular para contato
            </label>
            <input
              type="tel"
              inputMode="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(formatPhone(e.target.value))}
              placeholder="(85) 99999-9999"
              className="w-full rounded-xl border border-[#4a3b1f] bg-[#1a140f] px-4 py-3.5 text-lg font-semibold text-[#f8edd8] placeholder-[#5a4d3a] focus:border-[#d29a35] focus:outline-none transition"
            />
          </div>
          <p className="mt-2 text-xs text-[#7a6d5a]">
            Usaremos seus dados para chamar o pedido e enviar a entrega.
          </p>
          <p className="mt-2 text-xs text-[#9d8f77]">
            Você também pode usar o teclado virtual no rodapé.
          </p>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[#9d8f77] text-lg mb-4">
              Seu carrinho está vazio
            </p>
            <button
              onClick={() => router.push("/menu")}
              className="rounded-2xl bg-[#d29a35] px-6 py-3 font-black uppercase tracking-wide text-[#17120f]"
            >
              Ver cardapio
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9d8f77]">
              Itens do pedido
            </p>
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
                  {item.product.categoryId === COMBO_CATEGORY_ID && (
                    <div className="mt-1.5 space-y-1">
                      <span className="inline-flex rounded-full bg-[#d29a35]/15 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[#d29a35]">
                        Combo
                      </span>
                      <p className="text-xs text-[#cdbda1]">
                        Inclui: {getComboDetails(item.product)?.join(" • ")}
                      </p>
                    </div>
                  )}
                  {item.notes && (
                    <p className="text-xs text-[#9d8f77] mt-0.5 truncate">
                      {item.notes}
                    </p>
                  )}
                  <p className="text-[#d29a35] font-black text-sm mt-1">
                    R${" "}
                    {(item.product.price * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}
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
                    {item.quantity <= 1 ? (
                      <Trash2 className="h-3.5 w-3.5" />
                    ) : (
                      <Minus className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <span className="w-5 text-center font-black text-[#f8edd8]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
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
        <footer className="flex-none border-t border-[#3a2a12] bg-[#17120f] px-5 py-4 space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1fr_160px] xl:items-start">
            <div className="rounded-2xl border border-[#4a3b1f] bg-[#15110d] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d29a35]">
                <Keyboard className="h-4 w-4" />
                Teclado virtual
              </div>
              <VirtualKeyboard
                value={customerName}
                onChange={setCustomerName}
                maxLength={40}
                compact
              />
            </div>

            {qrCodeUrl && (
              <div className="mx-auto flex w-full max-w-[160px] flex-col items-center rounded-2xl border border-[#4a3b1f] bg-[#15110d] p-3 text-center">
                <div className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9d8f77]">
                  <QrCode className="h-3.5 w-3.5 text-[#d29a35]" />
                  No celular
                </div>
                <img
                  src={qrCodeUrl}
                  alt="QR code para abrir teclado auxiliar no celular"
                  className="h-24 w-24 rounded-lg bg-white p-1"
                />
                <p className="mt-2 text-[10px] leading-4 text-[#9d8f77]">
                  Escaneie para abrir um teclado auxiliar no celular.
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9d8f77]">
              {totalItems} item(ns)
            </span>
            <span className="text-xl font-black text-[#d29a35]">
              R$ {orderTotal.toFixed(2).replace(".", ",")}
            </span>
          </div>

          {orderType === "DELIVERY" && (
            <div className="rounded-xl border border-[#4a3b1f] bg-[#1e1710] px-4 py-3 text-xs text-[#d3c5ad] space-y-1">
              <div className="flex items-center justify-between gap-3">
                <span>Subtotal</span>
                <span>R$ {getTotal().toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Taxa de delivery</span>
                <span>R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          )}

          {/* Payment notice */}
          <div className="rounded-xl bg-[#1e1710] border border-[#4a3b1f] px-4 py-3 text-xs text-[#d3c5ad]">
            {orderType === "DINE_IN" &&
              "Pagamento realizado com o atendente. Confirme o pedido e aguarde!"}
            {orderType === "TAKEAWAY" &&
              "Pedido preparado para retirada. Confirme e aguarde a liberação!"}
            {orderType === "DELIVERY" &&
              "Pedido para entrega. A taxa de delivery foi adicionada ao total."}
          </div>

          {/* Confirm button */}
          <button
            onClick={handleCheckout}
            disabled={loading || !canCheckout}
            className={`w-full rounded-2xl py-5 text-base font-black uppercase tracking-wider transition active:scale-[0.98] ${
              loading || !canCheckout
                ? "bg-[#4a3b1f] text-[#9d8f77] cursor-not-allowed"
                : "bg-[#d29a35] text-[#17120f] hover:brightness-105"
            }`}
          >
            {loading
              ? "Confirmando..."
              : !customerName.trim()
                ? "Informe seu nome para continuar"
                : !isValidPhone(customerPhone)
                  ? "Informe um celular válido"
                  : orderType === "DELIVERY" && !deliveryAddress.trim()
                    ? "Informe o endereço de entrega"
                    : "Confirmar Pedido"}
          </button>
        </footer>
      )}
    </div>
  );
}
