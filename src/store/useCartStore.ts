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
  totalValue: number;
  totalItems: number;
}

export const useCartStore = create<CartStore>((set, get) => {
  const calculateTotals = (items: CartItem[]) => {
    const totalValue = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    return { totalValue, totalItems };
  };

  return {
    items: [],
    isOpen: false,
    totalValue: 0,
    totalItems: 0,
    setIsOpen: (isOpen) => set({ isOpen }),
    addItem: (product, quantity = 1) => {
      set((state) => {
        const existing = state.items.find((i) => i.id === product.id);
        let newItems;
        if (existing) {
          newItems = state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          newItems = [...state.items, { ...product, quantity }];
        }
        return {
          items: newItems,
          ...calculateTotals(newItems)
        };
      });
    },
    removeItem: (productId) => {
      set((state) => {
        const newItems = state.items.filter((i) => i.id !== productId);
        return {
          items: newItems,
          ...calculateTotals(newItems)
        };
      });
    },
    updateQuantity: (productId, quantity) => {
      set((state) => {
        const newItems = state.items.map((i) =>
          i.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
        );
        return {
          items: newItems,
          ...calculateTotals(newItems)
        };
      });
    },
    clearCart: () => set({ items: [], totalValue: 0, totalItems: 0 }),
  };
});
