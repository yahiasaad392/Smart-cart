"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--card-border)', marginTop: '4rem', padding: '3rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Smart<span style={{ color: 'var(--primary)' }}>Cart</span>
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            The best place to find premium products at unbeatable prices. Experience the future of shopping.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <Link href="/products" style={{ color: 'var(--text-muted)' }}>Products</Link>
            <Link href="/categories" style={{ color: 'var(--text-muted)' }}>Categories</Link>
            <Link href="/cart" style={{ color: 'var(--text-muted)' }}>Cart</Link>
          </div>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <span>support@smartcart.com</span>
            <span>+1 (555) 123-4567</span>
            <span>Cairo, Egypt</span>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)', textAlign: 'center', color: 'var(--text-muted)' }}>
        © 2024 Smart Cart. All rights reserved.
      </div>
    </footer>
  );
}
