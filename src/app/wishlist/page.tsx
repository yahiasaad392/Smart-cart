"use client";
import { useEffect, useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useUser } from '@/context/UserContext';
import { fetchAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, loading: wishlistLoading } = useWishlist();
  const { userToken } = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!userToken) return;
      setLoading(true);
      try {
        const data = await fetchAPI('/wishlist', {
          headers: { token: userToken }
        });
        if (data.status === 'success') {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Failed to load wishlist products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [userToken, wishlist.length]); // Re-fetch when wishlist changes to keep sync

  if (!userToken) {
      return (
          <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
              <h2>Please login to view your wishlist</h2>
          </div>
      );
  }

  if (loading) {
    return <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>Loading wishlist...</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 className="text-hero" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>My Wishlist</h1>
       {products.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Your wishlist is empty.</p>
       ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {products.map((product: any) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
       )}
    </div>
  );
}
