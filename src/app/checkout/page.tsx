"use client";
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const cartId = searchParams.get('cartId');
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const { userToken } = useUser();
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId || !userToken) return;
    
    setLoading(true);
    try {
      const shippingAddress = { details, phone, city };
      const data = await fetchAPI(`/orders/checkout-session/${cartId}?url=${window.location.origin}`, {
        method: 'POST',
        headers: { token: userToken },
        body: JSON.stringify({ shippingAddress })
      });

      if (data.status === 'success') {
        window.location.href = data.session.url;
      }
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '8rem', maxWidth: '600px' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
         <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Shipping Details</h1>
         
         <form onSubmit={handleCheckout} style={{ display: 'grid', gap: '1.2rem' }}>
            <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Details (Address)</label>
            <input 
              value={details} onChange={(e) => setDetails(e.target.value)} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
           <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Phone</label>
            <input 
              value={phone} onChange={(e) => setPhone(e.target.value)} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
           <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>City</label>
            <input 
              value={city} onChange={(e) => setCity(e.target.value)} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ justifyContent: 'center', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now (Online)'}
          </button>
         </form>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="container" style={{paddingTop: '8rem', textAlign: 'center'}}>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
