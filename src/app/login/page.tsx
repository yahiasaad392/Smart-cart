"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserToken, setUserName } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await fetchAPI('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.message === 'success') {
        setUserToken(data.token);
        setUserName(data.user.name);
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err: any) {
       setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '8rem', maxWidth: '500px' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Welcome Back</h1>
        
        {error && <div style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', 
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)',
                color: 'white', outline: 'none'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
               style={{ 
                width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', 
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)',
                color: 'white', outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ justifyContent: 'center', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
