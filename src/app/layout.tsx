import './globals.css';
import { Inter, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });
const geistSans = Geist({subsets: ["latin"]});

export const metadata = {
  title: 'Community Connect',
  description: 'Community Connect x Standert',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}