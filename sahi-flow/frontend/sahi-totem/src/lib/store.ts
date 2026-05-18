import { create } from "zustand";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

interface CartStore {
  items: CartItem[];
  customerName: string;
  lastUpdate: number;
  setCustomerName: (name: string) => void;
  addItem: (product: Product, quantity: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  customerName: "",
  lastUpdate: 0,
  setCustomerName: (name: string) => set({ customerName: name }),

  addItem: (product: Product, quantity: number, notes?: string) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
          lastUpdate: Date.now(),
        };
      }

      return {
        items: [...state.items, { product, quantity, notes }],
        lastUpdate: Date.now(),
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
      lastUpdate: Date.now(),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
      lastUpdate: Date.now(),
    }));
  },

  clearCart: () => {
    set({ items: [], lastUpdate: Date.now() });
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  },

  getTotal: () => {
    return get().getSubtotal();
  },
}));
