"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string; 
  _id?: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: {
    name: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const id = product.id || product._id;

  return (
    <div className="glass-panel" style={{ 
      overflow: 'hidden', transition: 'transform 0.3s ease',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', top: '10px', right: '10px', 
          background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px',
          color: 'var(--secondary)', fontWeight: 'bold'
        }}>
          ★ {product.ratingsAverage}
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {product.category.name}
        </span>
        <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0', flex: 1 }}>
          <Link href={`/products/${id}`} className="hover:text-primary transition-colors">
            {product.title.split(' ').slice(0, 4).join(' ')}...
          </Link>
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            {product.price} EGP
          </span>
          <button 
            className="btn-primary" 
            style={{ padding: '0.5rem 1rem' }}
            onClick={() => { if (id) addToCart(id); }}
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
