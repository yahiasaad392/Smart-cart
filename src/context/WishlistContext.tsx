"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { fetchAPI } from '@/lib/api';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { userToken } = useUser();

  const getWishlist = async () => {
    if (!userToken) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchAPI('/wishlist', {
        headers: { token: userToken }
      });
      if (data.status === 'success') {
        const ids = data.data.map((item: any) => item.id || item._id);
        setWishlist(ids);
      }
    } catch (err) {
      console.error("Failed to load wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, [userToken]);

  const addToWishlist = async (productId: string) => {
    if (!userToken) return;
    try {
      setWishlist(prev => [...prev, productId]); // Optimistic update
      const data = await fetchAPI('/wishlist', {
        method: 'POST',
        headers: { token: userToken },
        body: JSON.stringify({ productId })
      });
      if (data.status === 'success') {
        // sync with server response if needed, but optimistic update is faster
        const ids = data.data.map((item: any) => item.id || item._id);
        setWishlist(ids);
      }
    } catch (err) {
      console.error("Failed to add to wishlist", err);
      // Revert on failure
      setWishlist(prev => prev.filter(id => id !== productId));
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!userToken) return;
    try {
      setWishlist(prev => prev.filter(id => id !== productId)); // Optimistic update
      const data = await fetchAPI(`/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { token: userToken },
      });
      if (data.status === 'success') {
         const ids = data.data.map((item: any) => item.id || item._id);
         setWishlist(ids);
      }
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
      // Revert on failure
      setWishlist(prev => [...prev, productId]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, loading }}>
        {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
