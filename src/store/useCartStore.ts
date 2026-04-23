import { create } from 'zustand';
import { Product } from '../data/mockData';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  get totalValue(): number;
  get totalItems(): number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { ...product, quantity }], isOpen: true };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  get totalValue() {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  get totalItems() {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
