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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <CartProvider>
            <Navbar />
            <div style={{ marginTop: '80px' }}>
              {children}
            </div>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
