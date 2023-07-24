import Image from 'next/image';
import { Inter } from 'next/font/google';
import Map from '@/components/Map';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Map />
    </div>
  );
}
