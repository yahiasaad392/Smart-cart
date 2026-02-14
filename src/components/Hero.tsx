import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section style={{ 
      position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', 
      overflow: 'hidden', marginTop: '-80px', paddingTop: '80px'
    }}>
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        background: 'radial-gradient(circle at 30% 50%, rgba(108, 92, 231, 0.2) 0%, rgba(11, 12, 21, 0) 50%)',
        zIndex: -1
      }} />
      
      <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <span style={{ 
            display: 'inline-block', padding: '0.5rem 1rem', 
            background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50px', 
            marginBottom: '1.5rem', border: '1px solid var(--card-border)',
            color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem'
          }}>
            New Collection 2024
          </span>
          <h1 className="text-hero" style={{ marginBottom: '1.5rem' }}>
            Future of <br />
            <span className="text-gradient">Smart Cart.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '500px' }}>
             Discover a curated collection of premium products with the Smart Cart experience. Fast, secure, and beautiful.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/categories" className="glass-panel" style={{ 
              padding: '0.75rem 2rem', textDecoration: 'none', color: 'white',
              borderRadius: 'var(--radius-sm)', transition: 'transform 0.2s',
              display: 'inline-flex', alignItems: 'center'
            }}>
              Explore Categories
            </Link>
          </div>
        </div>
        
        <div className="hidden-mobile-block-md" style={{ flex: 1, position: 'relative', height: '600px' }}>
          {}
           <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.3
          }} />
        </div>
      </div>
    </section>
  );
}
