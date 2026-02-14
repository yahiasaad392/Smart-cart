import { fetchAPI, getCategoriesWithProducts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default async function FeaturedCategories() {
  let categories = [];
  try {
    const data = await getCategoriesWithProducts();
    const priority = ['Electronics', 'Mobiles', "Men's Fashion", "Women's Fashion"];
    categories = data.data.filter((c: any) => priority.includes(c.name));
    if (categories.length < 6) {
       const others = data.data.filter((c: any) => !priority.includes(c.name)).slice(0, 6 - categories.length);
       categories = [...categories, ...others];
    }
  } catch (error) {
    return null;
  }

  return (
    <section className="container" style={{ margin: '4rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Top Categories</h2>
        <Link href="/categories" style={{ color: 'var(--primary)' }}>View All &rarr;</Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        {categories.map((cat: any) => (
          <Link href={`/products?category=${cat._id}`} key={cat._id} className="glass-panel" style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem',
            transition: 'transform 0.2s', textDecoration: 'none'
          }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '1rem', borderRadius: '50%', overflow: 'hidden' }}>
              <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 600, color: 'var(--foreground)', textAlign: 'center' }}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
