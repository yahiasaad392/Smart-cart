import { fetchAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import CategorySlider from '@/components/CategorySlider';
import FeaturedCategories from '@/components/FeaturedCategories';
import Link from 'next/link';

export default async function Home() {
  let products = [];
  try {
    const data = await fetchAPI('/products');
     // Limit to 8 products for home page
    products = data.data.slice(0, 8);
  } catch (err) {
    console.error(err);
  }

  return (
    <main>
      <Hero />
      <CategorySlider />
      {/* <FeaturedCategories /> - Replaced by Slider or kept as alternative? Keeping both might be redundant, but user asked for slider. Commenting out old static one if it exists or just adding slider above. Let's add slider above. */}
      {/* FeaturedCategories might be the old static list. START OF USER REQUEST: "i want u to make an slider for categories" */ }
      
      <div className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
           <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Trending Now</h2>
           <Link href="/products" style={{ color: 'var(--primary)' }}>View All Products &rarr;</Link>
        </div>
       
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {products.map((product: any) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
