"use client";
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { userToken, logout, userName } = useUser();
  const { numOfCartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="glass-panel" style={{ 
        position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)', 
        width: 'calc(100% - 2rem)', maxWidth: '1200px', zIndex: 100, padding: '0.8rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, zIndex: 102 }}>
          Smart<span style={{ color: 'var(--primary)' }}>Cart</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden-mobile-flex-md" style={{ gap: '2rem' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/categories" className="nav-link">Categories</Link>
        </div>

        <div className="hidden-mobile-flex-md" style={{ gap: '1rem' }}>
          {userToken ? (
            <>
              <Link href="/cart" style={{ position: 'relative' }}>
                Cart
                {numOfCartItems > 0 && (
                  <span style={{ 
                    position: 'absolute', top: '-8px', right: '-12px', 
                    background: 'var(--accent-pink)', fontSize: '0.7rem', 
                    padding: '2px 6px', borderRadius: '10px' 
                  }}>
                    {numOfCartItems}
                  </span>
                )}
              </Link>
              <span style={{ color: 'var(--text-muted)' }}>Hi, {userName || 'User'}</span>
              <button onClick={() => logout()} style={{ color: 'var(--accent-pink)', background: 'transparent' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: 'var(--foreground)' }}>Login</Link>
              <Link href="/register" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className={`hamburger hidden-desktop ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} style={{ marginLeft: 'auto', zIndex: 102 }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/" className="mobile-menu-link" onClick={toggleMenu}>Home</Link>
        <Link href="/products" className="mobile-menu-link" onClick={toggleMenu}>Products</Link>
        <Link href="/categories" className="mobile-menu-link" onClick={toggleMenu}>Categories</Link>
        
        {userToken ? (
          <>
            <Link href="/cart" className="mobile-menu-link" onClick={toggleMenu}>
              Cart ({numOfCartItems})
            </Link>
            <button onClick={() => { logout(); toggleMenu(); }} className="mobile-menu-link" style={{ background: 'transparent', border: 'none' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="mobile-menu-link" onClick={toggleMenu}>Login</Link>
            <Link href="/register" className="mobile-menu-link" onClick={toggleMenu}>Register</Link>
          </>
        )}
      </div>
    </>
  );
}
