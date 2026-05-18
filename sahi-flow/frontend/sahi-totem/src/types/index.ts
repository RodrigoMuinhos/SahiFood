export interface Category {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
}

export type Allergen =
  | "gluten"
  | "crustaceos"
  | "ovos"
  | "peixe"
  | "amendoim"
  | "soja"
  | "laticinios"
  | "nozes"
  | "aipo"
  | "mostarda"
  | "gergelim"
  | "sulfitos"
  | "moluscos"
  | "tremocos";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  preparationTimeMinutes: number;
  active: boolean;
  hasRecipe: boolean;
  categoryId?: string;
  allergens?: Allergen[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  customerType: string;
  customerName?: string;
  createdAt: string;
  paidAt?: string;
  startedAt?: string;
  readyAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

export interface KitchenTicket {
  id: string;
  orderId: string;
  status: string;
  priority: number;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  deliveredAt?: string;
}

export type OrderStatus =
  | "CREATED"
  | "WAITING_PAYMENT"
  | "PAID"
  | "SENT_TO_KITCHEN"
  | "IN_PREPARATION"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type KitchenStatus =
  | "WAITING"
  | "IN_PREPARATION"
  | "READY"
  | "DELIVERED"
  | "PROBLEM";
