import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Exemple si vous utilisez Inter
import '../../assets/style.css';

const inter = Inter({ subsets: ['latin'] }); // Assurez-vous que cette ligne est correcte

export const metadata: Metadata = {
  title: "Laboratoire 2 - Services Web",
  description: "Application des de produits avec services REST",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
} // <- Cette parenthèse fermante est en trop ici.
