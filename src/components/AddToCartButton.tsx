"use client";
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleAdd} 
      className="btn-primary" 
      style={{ width: '100%', justifyContent: 'center' }}
      disabled={loading}
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
