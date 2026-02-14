"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAPI } from '@/lib/api';

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchAPI('/categories');
        setCategories(data.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (loading || categories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading, categories.length]);

  if (loading) {
    return <div className="container" style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading categories...</div>;
  }

  if (categories.length === 0) return null;

  return (
    <section className="container" style={{ padding: '3rem 0' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Featured Categories</h2>
      
      <div style={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '600px', // Limit width for "one big category" look
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)'
      }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}>
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/products?category=${category._id}`}
              style={{ 
                flex: '0 0 100%', 
                width: '100%',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem'
              }}
            >
              <div style={{ 
                width: '200px', 
                height: '200px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                marginBottom: '1.5rem',
                border: '4px solid var(--primary)',
                position: 'relative',
                boxShadow: '0 0 20px rgba(108, 92, 231, 0.3)'
              }}>
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{category.name}</h3>
              <p style={{ color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>Explore Collection &rarr;</p>
            </Link>
          ))}
        </div>

        {/* Dots Indicators */}
        <div style={{ 
          position: 'absolute', 
          bottom: '1rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex', 
          gap: '0.5rem' 
        }}>
          {categories.map((_, index) => (
            <div 
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: index === currentIndex ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
