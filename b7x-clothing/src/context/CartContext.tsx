"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { Product, ProductSize, formatPrice } from "@/data/products";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; size: ProductSize } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: ProductSize } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; size: ProductSize; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  formattedTotal: string;
  addItem: (product: Product, size: ProductSize) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  updateQuantity: (
    productId: string,
    size: ProductSize,
    quantity: number
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems, isOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { product, size, quantity: 1 }],
        isOpen: true,
      };
    }

    case "REMOVE_ITEM": {
      const { productId, size } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.id === productId && item.size === size)
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, size, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addItem = useCallback((product: Product, size: ProductSize) => {
    dispatch({ type: "ADD_ITEM", payload: { product, size } });
  }, []);

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, size } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: ProductSize, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [state.items]
  );

  const formattedTotal = formatPrice(totalPrice);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        formattedTotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
