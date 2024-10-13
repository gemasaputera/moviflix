import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from './provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UmamiAnalytics from '@/components/UmamiAnalytics';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Browse and search for movies using TMDB API'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <div className="min-h-screen bg-black text-white">
            <Header />
            <main>{children}</main>
          </div>
          <Footer />
        </Providers>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
