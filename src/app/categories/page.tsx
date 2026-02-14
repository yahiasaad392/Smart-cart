import { fetchAPI, getCategoriesWithProducts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Categories | Route Nebula',
};

export default async function CategoriesPage() {
  let categories = [];
  try {
    const data = await getCategoriesWithProducts();
    categories = data.data;
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 800 }}>Browse Categories</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {categories.map((cat: any) => (
          <Link href={`/products?category=${cat._id}`} key={cat._id} className="glass-panel" style={{ 
            display: 'block', padding: '1rem', textAlign: 'center', transition: 'transform 0.2s',
            textDecoration: 'none' 
          }}>
            <div style={{ position: 'relative', height: '200px', marginBottom: '1rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--foreground)' }}>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
