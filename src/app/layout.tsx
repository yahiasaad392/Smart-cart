import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/context/UserContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Cart | Premium E-commerce',
  description: 'Next-generation shopping experience',
};

import Footer from '@/components/Footer';

import { WishlistProvider } from '@/context/WishlistContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <div style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px - 300px)' }}>
                {children}
              </div>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </UserProvider>
      </body>
    </html>
  );
}
