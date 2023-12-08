import Nav from '@/components/ui/dashboard/nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'dashboard | Link ',
  description: ''
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen">
      <Nav />
      <div className="">{children}</div>
    </div>
  );
}
