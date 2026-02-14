import { fetchAPI } from '@/lib/api';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton'; // We'll extract this logic or inline it

interface Product {
  id: string;
  _id?: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  description: string;
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  let product: Product | null = null;
  try {
    const data = await fetchAPI(`/products/${params.id}`);
    product = data.data;
  } catch (error) {
    console.error(error);
  }

  if (!product) {
    return <div className="container" style={{ paddingTop: '100px' }}>Product not found</div>;
  }

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Image Gallery (Simplified to cover) */}
          <div style={{ position: 'relative', height: '400px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
             <Image
              src={product.imageCover}
              alt={product.title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{product.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                {product.price} EGP
              </span>
              <span style={{ color: 'var(--accent-pink)', fontWeight: 'bold' }}>
                ★ {product.ratingsAverage}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {product.description}
            </p>

            <div style={{ marginTop: 'auto' }}>
               <AddToCartButton productId={product.id || product._id || ''} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
