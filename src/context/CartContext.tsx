"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { useUser } from './UserContext';
import { fetchAPI } from '@/lib/api';

interface CartItem {
  count: number;
  _id: string;
  product: {
    id: string;
    title: string;
    imageCover: string;
    price: number;
  }
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  apiCartId: string | null;
  numOfCartItems: number;
  addToCart: (productId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItemCount: (productId: string, count: number) => Promise<void>;
  getCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [apiCartId, setApiCartId] = useState<string | null>(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userToken } = useUser();

  const getCart = async () => {
    if (!userToken) return;
    setLoading(true);
    try {
      const data = await fetchAPI('/cart', {
        headers: { token: userToken }
      });
      if (data.status === 'success') {
        setCartItems(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setApiCartId(data.cartId);
      }
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    if (!userToken) return;
    try {
      const data = await fetchAPI('/cart', {
        method: 'POST',
        headers: { token: userToken },
        body: JSON.stringify({ productId })
      });
       if (data.status === 'success') {
         await getCart();
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!userToken) return;
    try {
       const data = await fetchAPI(`/cart/${itemId}`, {
        method: 'DELETE',
        headers: { token: userToken },
      });
      if (data.status === 'success') {
         setCartItems(data.data.products);
         setNumOfCartItems(data.numOfCartItems);
      }
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const updateItemCount = async (productId: string, count: number) => {
    if (!userToken) return;
    try {
      const data = await fetchAPI(`/cart/${productId}`, {
        method: 'PUT',
        headers: { token: userToken },
        body: JSON.stringify({ count })
      });
      if (data.status === 'success') {
        setCartItems(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
      }
    } catch (err) {
      console.error("Failed to update item count", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, apiCartId, numOfCartItems, addToCart, removeItem, updateItemCount, getCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
