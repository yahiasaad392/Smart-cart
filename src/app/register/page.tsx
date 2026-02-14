"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserToken, setUserName } = useUser();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.rePassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchAPI('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (data.message === 'success') {
         setUserToken(data.token);
         setUserName(data.user.name);
         router.push('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err: any) {
       setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '6rem', maxWidth: '600px', paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Create Account</h1>
        
        {error && <div style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Full Name</label>
            <input 
              name="name" type="text" onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Email</label>
            <input 
              name="email" type="email" onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Password</label>
            <input 
              name="password" type="password" onChange={handleChange} required minLength={6}
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
           <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Confirm Password</label>
            <input 
              name="rePassword" type="password" onChange={handleChange} required minLength={6}
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>
           <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Phone</label>
            <input 
              name="phone" type="tel" onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ justifyContent: 'center', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
