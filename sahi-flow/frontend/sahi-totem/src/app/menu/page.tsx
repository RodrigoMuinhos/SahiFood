"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Product, Category } from "@/types";
import { apiGet } from "@/lib/api";
import {
  ArrowRight,
  BadgePercent,
  Check,
  Clock,
  Coffee,
  LayoutGrid,
  Minus,
  PackageOpen,
  Plus,
  ShoppingCart,
  Sparkles,
  Store,
  User,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useCart } from "@/lib/store";
import { mockCategories, mockProducts } from "@/lib/mock-data";
import ProductModal from "@/components/ProductModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CAT_META: Record<string, { icon: React.ReactNode }> = {
  "Pratos Principais": { icon: <UtensilsCrossed className="h-4 w-4" /> },
  Combos: { icon: <Sparkles className="h-4 w-4" /> },
  Bebidas: { icon: <Store className="h-4 w-4" /> },
  Conveniência: { icon: <PackageOpen className="h-4 w-4" /> },
  "Molhos da Casa": { icon: <Coffee className="h-4 w-4" /> },
  Extras: { icon: <Plus className="h-4 w-4" /> },
};

const BLOCKED_TERMS =
  /(frango|hamb[úu]rguer|bacon|falafel|shawarma|refrigerante|[áa]gua\s+mineral|[áa]gua\s+natural)/i;

function getCatIcon(name: string) {
  const lower = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  for (const [key, val] of Object.entries(CAT_META)) {
    const keyLower = key
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (lower.startsWith(keyLower.slice(0, 3))) return val.icon;
  }
  return <LayoutGrid className="h-4 w-4" />;
}

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { items, addItem, getTotal } = useCart();
  const router = useRouter();
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Idle detection — return to screensaver after 3 min
  const resetIdle = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => router.push("/"), 3 * 60 * 1000);
  };

  useEffect(() => {
    const events = [
      "pointerdown",
      "pointermove",
      "keydown",
      "scroll",
      "touchstart",
    ];
    events.forEach((e) =>
      window.addEventListener(e, resetIdle, { passive: true }),
    );
    resetIdle();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const curatedCategories = [...mockCategories].sort(
        (a, b) => a.displayOrder - b.displayOrder,
      );

      try {
        setLoading(true);
        const [cats, prods] = await Promise.all([
          apiGet<Category[]>("/api/categories"),
          apiGet<Product[]>("/api/products"),
        ]);

        const remoteHasBlockedItems = prods.some((product) =>
          BLOCKED_TERMS.test(`${product.name} ${product.description ?? ""}`),
        );

        const remoteHasCoreProducts = prods.some((product) =>
          /kafta|k[eé]f|khabz|bayd|coalhovo|sahan|z[aá]atar/i.test(
            product.name,
          ),
        );

        if (cats.length > 0 && prods.length > 0) {
          if (!remoteHasBlockedItems && remoteHasCoreProducts) {
            const sorted = [...cats].sort(
              (a, b) => a.displayOrder - b.displayOrder,
            );
            setCategories(sorted);
            setProducts(prods.filter((p) => p.active !== false));
            setSelectedCategory((c) => c ?? sorted[0].id);
          } else {
            setCategories(curatedCategories);
            setProducts(mockProducts);
            setSelectedCategory((c) => c ?? curatedCategories[0].id);
          }
          setLoading(false);
          return;
        }
      } catch {
        /* fall through to mock */
      }
      setCategories(curatedCategories);
      setProducts(mockProducts);
      setSelectedCategory((c) => c ?? curatedCategories[0]?.id ?? null);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? products.filter((p) => p.categoryId === selectedCategory)
        : products,
    [products, selectedCategory],
  );

  const comboProducts = useMemo(() => {
    const comboCategoryIds = categories
      .filter((cat) => /combo/i.test(cat.name))
      .map((cat) => cat.id);

    if (comboCategoryIds.length === 0) {
      return products
        .filter((p) => /combo|sahan|monster|completo|plus/i.test(p.name))
        .slice(0, 4);
    }

    return products.filter((p) =>
      comboCategoryIds.includes(p.categoryId ?? ""),
    );
  }, [products, categories]);

  const featuredProducts = useMemo(() => {
    const source = comboProducts.length > 0 ? comboProducts : products;
    return source.filter((p) => p.imageUrl).slice(0, 6);
  }, [comboProducts, products]);

  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((current) => (current + 1) % featuredProducts.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  useEffect(() => {
    if (carouselIndex >= featuredProducts.length) {
      setCarouselIndex(0);
    }
  }, [carouselIndex, featuredProducts.length]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = getTotal();
  const selectedCategoryName = categories.find(
    (c) => c.id === selectedCategory,
  )?.name;

  const convenienceProducts = useMemo(() => {
    const convenienceCategoryIds = categories
      .filter((cat) => /conveni[êe]ncia/i.test(cat.name))
      .map((cat) => cat.id);

    return products
      .filter((product) =>
        convenienceCategoryIds.includes(product.categoryId ?? ""),
      )
      .sort((a, b) => b.price - a.price);
  }, [categories, products]);

  const upsellSuggestions = useMemo(() => {
    if (totalAmount >= 30) return [];
    const currentIds = new Set(items.map((item) => item.product.id));
    return convenienceProducts
      .filter((product) => !currentIds.has(product.id))
      .slice(0, 3);
  }, [totalAmount, items, convenienceProducts]);

  const openCartPreview = () => {
    if (totalItems === 0) {
      router.push("/cart");
      return;
    }
    setShowCartPreview(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#090807] text-[#f8edd8]">
      {/* SIDEBAR FIXA */}
      <aside className="hidden h-full w-[260px] flex-none border-r border-[#2a2018] bg-[#100d09] lg:flex lg:flex-col">
        <div className="flex h-[180px] items-center justify-center border-b border-[#2a2018] px-5 py-4">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center overflow-hidden leading-none"
          >
            <img
              src="/logo/sahi-hor.png"
              alt="Logo SA´HI"
              className="h-20 w-[13.5rem] scale-[6.4] object-contain"
            />
          </Link>
        </div>

        <div className="px-4 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9d8f77]">
            Categorias
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 pb-4">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            const count = products.filter(
              (p) => p.categoryId === cat.id,
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
                  active
                    ? "border-[#d29a35] bg-[#d29a35]/15"
                    : "border-[#3b2c17] bg-[#16120d] hover:bg-[#211810]"
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-bold">
                  <span
                    className={`${active ? "text-[#d29a35]" : "text-[#cdbda1]"}`}
                  >
                    {getCatIcon(cat.name)}
                  </span>
                  <span
                    className={active ? "text-[#f8edd8]" : "text-[#cdbda1]"}
                  >
                    {cat.name}
                  </span>
                </span>
                <span className="rounded-full bg-[#221a12] px-2 py-0.5 text-[10px] font-black text-[#d29a35]">
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-[#2a2018] p-4">
          <button
            onClick={openCartPreview}
            className="relative flex w-full items-center justify-between rounded-2xl bg-[#d29a35] px-4 py-3 text-[#17120f] transition hover:brightness-105"
          >
            <span className="flex items-center gap-2 text-sm font-black uppercase tracking-wide">
              <ShoppingCart className="h-4 w-4" />
              Carrinho
            </span>
            <span className="text-sm font-black">{totalItems}</span>
          </button>
          <p className="mt-2 text-center text-xs text-[#9d8f77]">
            R$ {totalAmount.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex-none border-b border-[#2a2018] bg-[#100d09]/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d29a35]">
                Faça seu pedido
              </span>
              <h1 className="mt-1 text-base font-black uppercase tracking-[0.22em] text-[#f8edd8] md:text-lg">
                Cardápio
              </h1>
            </div>

            <button
              onClick={openCartPreview}
              className="relative rounded-xl border border-[#4a3b1f] p-2.5 text-[#d29a35] transition hover:bg-[#221b15] active:scale-95 lg:hidden"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#d29a35] text-[10px] font-black text-[#17120f]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Categorias no mobile */}
          <div className="border-t border-[#2a2018] px-4 py-3 lg:hidden">
            <div
              className="flex gap-2 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                      active
                        ? "border-[#d29a35] bg-[#d29a35] text-[#17120f]"
                        : "border-[#4a3b1f] bg-[#1a1511] text-[#d9ccb3]"
                    }`}
                  >
                    {getCatIcon(cat.name)}
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-6 lg:py-5">
          {loading ? (
            <div className="flex h-full items-center justify-center text-[#9d8f77]">
              Carregando...
            </div>
          ) : (
            <div className="space-y-5">
              {/* BANNER */}
              <section className="relative overflow-hidden rounded-3xl border border-[#3f2f1a] bg-[#15110d] p-5 md:p-6">
                <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 translate-x-10 -translate-y-10 rounded-full bg-[#d29a35]/20 blur-3xl" />
                <div className="relative z-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#4a3b1f] bg-[#1c1610] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#d29a35]">
                      <BadgePercent className="h-3.5 w-3.5" />
                      Escolha fácil
                    </p>
                    <h2 className="text-2xl font-black uppercase leading-tight text-[#f8edd8] md:text-3xl">
                      Escolha seu favorito
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-[#cdbda1] md:text-base">
                      Veja os itens disponíveis, adicione ao pedido e confirme
                      no balcão.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#3f2f1a] bg-[#120f0b] p-3 text-center">
                    <div className="rounded-xl bg-[#1d1711] p-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9d8f77]">
                        1
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#f8edd8]">
                        Escolha
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#1d1711] p-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9d8f77]">
                        2
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#f8edd8]">
                        Confirme
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#1d1711] p-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9d8f77]">
                        3
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#f8edd8]">
                        Pague
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CARROSSEL */}
              {featuredProducts.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#d29a35]">
                      Destaques do cardápio
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCarouselIndex(
                            (v) =>
                              (v - 1 + featuredProducts.length) %
                              featuredProducts.length,
                          )
                        }
                        className="rounded-lg border border-[#4a3b1f] p-2 text-[#d29a35] hover:bg-[#1f1812]"
                        aria-label="Slide anterior"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          setCarouselIndex(
                            (v) => (v + 1) % featuredProducts.length,
                          )
                        }
                        className="rounded-lg border border-[#4a3b1f] p-2 text-[#d29a35] hover:bg-[#1f1812]"
                        aria-label="Próximo slide"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-3xl border border-[#3f2f1a] bg-[#15110d]">
                    <div
                      className="flex transition-transform duration-500"
                      style={{
                        transform: `translateX(-${carouselIndex * 100}%)`,
                      }}
                    >
                      {featuredProducts.map((product) => (
                        <article
                          key={product.id}
                          className="min-w-full cursor-pointer p-4 md:p-5"
                          onClick={() => setModalProduct(product)}
                        >
                          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                            <div className="relative overflow-hidden rounded-2xl border border-[#4a3b1f]">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-52 w-full object-cover md:h-56"
                                />
                              ) : (
                                <div className="flex h-52 items-center justify-center bg-[#221b15] md:h-56">
                                  <LayoutGrid className="h-10 w-10 text-[#4a3b1f]" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d8f77]">
                                Escolha do dia
                              </p>
                              <h4 className="mt-2 text-2xl font-black uppercase text-[#f8edd8]">
                                {product.name}
                              </h4>
                              <p className="mt-2 line-clamp-2 text-sm text-[#cdbda1]">
                                {product.description ||
                                  "Produto recomendado para agilizar sua escolha."}
                              </p>
                              <div className="mt-4 flex flex-wrap items-center gap-3">
                                <p className="inline-flex min-h-[52px] items-center rounded-xl bg-[#d29a35] px-4 py-2 text-3xl font-black leading-none text-[#17120f]">
                                  R${" "}
                                  {product.price.toFixed(2).replace(".", ",")}
                                </p>
                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    addItem(product, 1);
                                  }}
                                  className="inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-[#d29a35] bg-[#d29a35] px-5 py-2 text-sm font-black uppercase tracking-wide text-[#17120f] transition hover:brightness-105"
                                >
                                  Adicionar agora
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    {featuredProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCarouselIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === carouselIndex
                            ? "w-8 bg-[#d29a35]"
                            : "w-2 bg-[#4a3b1f]"
                        }`}
                        aria-label={`Ir para o slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* DESTAQUE DE PRODUTOS */}
              <section>
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[0.15em] text-[#f8edd8]">
                      {selectedCategoryName || "Produtos"}
                    </h3>
                    <p className="text-xs text-[#9d8f77]">
                      Fotos reais dos itens disponíveis
                    </p>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-2xl border border-[#3f2f1a] bg-[#14100c] text-[#9d8f77]">
                    Nenhum produto nesta categoria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {filteredProducts.map((product, index) => (
                      <MenuProductCard
                        key={product.id}
                        product={product}
                        featured={index < 2}
                        onOpenModal={() => setModalProduct(product)}
                        onQuickAdd={() => addItem(product, 1)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* RESUMO DE FLUXO */}
              <section className="rounded-2xl border border-[#3f2f1a] bg-[#14100c] p-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1e1710] px-3 py-1 text-[#d29a35]">
                    <User className="h-3.5 w-3.5" />
                    Nome no pedido
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1e1710] px-3 py-1 text-[#d29a35]">
                    <Check className="h-3.5 w-3.5" />
                    Pagamento no balcão
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#cdbda1]">
                  Depois de confirmar, um atendente finaliza o pedido e recebe o
                  pagamento.
                </p>
              </section>
            </div>
          )}
        </main>

        {totalItems > 0 && (
          <footer className="flex-none border-t border-[#3a2a12] bg-[#17120f] px-4 py-3 lg:hidden">
            <button
              onClick={() => router.push("/cart")}
              className="flex w-full items-center justify-between rounded-2xl bg-[#d29a35] px-5 py-4 transition hover:brightness-105 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17120f] text-sm font-black text-[#d29a35]">
                  {totalItems}
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-[#17120f]">
                  Ver carrinho
                </span>
              </div>
              <span className="text-lg font-black text-[#17120f]">
                R$ {totalAmount.toFixed(2).replace(".", ",")}
              </span>
            </button>
          </footer>
        )}
      </div>

      {/* CART PREVIEW SHEET */}
      {showCartPreview && (
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          <button
            className="absolute inset-0 bg-black/65"
            onClick={() => setShowCartPreview(false)}
            aria-label="Fechar prévia do carrinho"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-t-[30px] border border-[#4a3b1f] bg-[#15110d] p-5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9d8f77]">
                  Resumo do pedido
                </p>
                <h3 className="mt-1 text-xl font-black uppercase text-[#f8edd8]">
                  Confira antes de continuar
                </h3>
              </div>
              <button
                onClick={() => setShowCartPreview(false)}
                className="rounded-full border border-[#4a3b1f] p-2 text-[#d29a35]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {items.slice(0, 3).map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between rounded-xl border border-[#3a2b18] bg-[#1a140f] px-3 py-2"
                >
                  <p className="truncate text-sm font-semibold text-[#f8edd8]">
                    {item.quantity}x {item.product.name}
                  </p>
                  <p className="text-sm font-black text-[#d29a35]">
                    R${" "}
                    {(item.product.price * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-xs text-[#9d8f77]">
                  + {items.length - 3} item(ns) no carrinho
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#1e1710] px-4 py-3">
              <span className="text-sm text-[#cdbda1]">Subtotal parcial</span>
              <span className="text-xl font-black text-[#d29a35]">
                R$ {totalAmount.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {upsellSuggestions.length > 0 && (
              <div className="mt-4 rounded-2xl border border-[#3f2f1a] bg-[#14100c] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d29a35]">
                  Complete seu pedido
                </p>
                <p className="mt-1 text-xs text-[#9d8f77]">
                  Adicione mais um item antes de seguir para o carrinho.
                </p>

                <div className="mt-3 space-y-2">
                  {upsellSuggestions.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-xl border border-[#3a2b18] bg-[#1a140f] px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-bold text-[#f8edd8]">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#d29a35]">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <button
                        onClick={() => addItem(product, 1)}
                        className="rounded-lg bg-[#d29a35] px-3 py-1.5 text-xs font-black uppercase text-[#17120f]"
                      >
                        Adicionar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowCartPreview(false)}
                className="rounded-xl border border-[#4a3b1f] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#d29a35]"
              >
                Continuar escolhendo
              </button>
              <button
                onClick={() => {
                  setShowCartPreview(false);
                  router.push("/cart");
                }}
                className="rounded-xl bg-[#d29a35] px-4 py-3 text-sm font-black uppercase tracking-wide text-[#17120f]"
              >
                Ir para carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}

/* ---------- Product Card ---------- */
interface CardProps {
  product: Product;
  featured?: boolean;
  onOpenModal: () => void;
  onQuickAdd: () => void;
}

function MenuProductCard({
  product,
  featured = false,
  onOpenModal,
  onQuickAdd,
}: CardProps) {
  const [feedback, setFeedback] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd();
    setFeedback(true);
    setTimeout(() => setFeedback(false), 1200);
  };

  return (
    <div
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border bg-[#15110d] transition hover:border-[#d29a35]/55 active:scale-[0.99] ${
        featured
          ? "border-[#6a4d24] shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          : "border-[#3a2b18]"
      }`}
      onClick={onOpenModal}
    >
      {/* Photo */}
      <div
        className={`relative overflow-hidden flex-none ${featured ? "h-56 md:h-64" : "h-44 md:h-48"}`}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[#221b15] flex items-center justify-center">
            <LayoutGrid className="h-8 w-8 text-[#4a3b1f]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#d29a35] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#17120f]">
            Destaque
          </span>
        )}
        {product.preparationTimeMinutes > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[10px] text-[#f8edd8]">
            <Clock className="h-3 w-3 text-[#d29a35]" />
            {product.preparationTimeMinutes}min
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3
          className={`uppercase leading-tight text-[#f8edd8] line-clamp-2 ${featured ? "text-xl md:text-2xl font-black" : "text-lg md:text-xl font-black"}`}
        >
          {product.name}
        </h3>
        <p
          className={`inline-flex w-fit rounded-xl bg-[#d29a35] px-3 py-1 font-black text-[#17120f] ${featured ? "text-3xl" : "text-2xl"}`}
        >
          {product.price === 0
            ? "Grátis"
            : `R$ ${product.price.toFixed(2).replace(".", ",")}`}
        </p>
        <button
          onClick={handleQuickAdd}
          className={`mt-auto flex w-full items-center justify-center gap-1 rounded-xl py-3 text-xs font-black uppercase tracking-wide transition active:scale-95 ${
            feedback
              ? "bg-[#4a8a5a] text-white"
              : "bg-[#d29a35] text-[#17120f] hover:brightness-110"
          }`}
        >
          {feedback ? (
            "Adicionado"
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
