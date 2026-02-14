import { fetchAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'All Products | Route Nebula',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let products = [];
  try {
    const data = await fetchAPI('/products');
    products = data.data;

    const categoryId = searchParams.category;
    if (categoryId && typeof categoryId === 'string') {
      products = products.filter((product: any) => product.category._id === categoryId);
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 800 }}>
        {searchParams.category ? 'Filtered Products' : 'All Products'}
      </h1>
      
      <div className="glass-panel" style={{ padding: '2rem' }}>
        {products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {products.map((product: any) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No products found in this category.</p>
        )}
      </div>
    </main>
  );
}
