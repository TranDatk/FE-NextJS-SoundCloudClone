import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sound Cloud Clone',
  description: '...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
      <div style={{ marginBottom: "100px" }}></div>
      <AppFooter />
    </>
  );
}
