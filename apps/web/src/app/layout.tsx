import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientLayout } from './ClientLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '騎空士ブロッカー',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={inter.className}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
