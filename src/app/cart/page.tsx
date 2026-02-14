"use client";
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, getCart, removeItem, updateItemCount, numOfCartItems, loading, apiCartId } = useCart();
  const { userToken } = useUser();

  useEffect(() => {
    if (userToken) {
      getCart();
    }
  }, [userToken]);

  if (!userToken) {
    return (
      <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h2>Please login to view your cart</h2>
        <Link href="/login" className="btn-primary" style={{ marginTop: '1rem' }}>Login</Link>
      </div>
    );
  }

  if (loading && cartItems.length === 0) {
    return <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>Loading Cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link href="/" className="btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</Link>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.count), 0);

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Your Cart ({numOfCartItems} items)</h1>
      
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cartItems.map((item) => (
            <div key={item._id} style={{ 
              display: 'flex', alignItems: 'center', gap: '1.5rem', 
              paddingBottom: '1.5rem', borderBottom: '1px solid var(--card-border)' 
            }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <Image src={item.product.imageCover} alt={item.product.title} fill style={{ objectFit: 'cover' }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem' }}>{item.product.title}</h3>
                <p style={{ color: 'var(--primary)' }}>{item.price} EGP</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem' }}>
                  <button 
                    onClick={() => updateItemCount(item.product.id, item.count - 1)}
                    disabled={item.count <= 1}
                    style={{ 
                      padding: '0.2rem 0.6rem', border: '1px solid var(--primary)', borderRadius: '4px',
                      background: 'transparent', color: 'var(--primary)', cursor: item.count <= 1 ? 'not-allowed' : 'pointer',
                      opacity: item.count <= 1 ? 0.5 : 1
                    }}
                  >-</button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '1.5rem', textAlign: 'center' }}>{item.count}</span>
                  <button 
                    onClick={() => updateItemCount(item.product.id, item.count + 1)}
                    style={{ 
                      padding: '0.2rem 0.6rem', background: 'var(--primary)', color: 'white', 
                      borderRadius: '4px', border: 'none', cursor: 'pointer'
                    }}
                  >+</button>
                </div>
                <button 
                  onClick={() => removeItem(item.product.id)}
                  style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.1)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Total Price:</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800 }}>{totalPrice} EGP</span>
          </div>
          <Link href={`/checkout?cartId=${apiCartId}`} className="btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
