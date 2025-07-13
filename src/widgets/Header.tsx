'use client';
import { AuthProvider } from '@/features/auth/useAuth';
import dynamic from 'next/dynamic';
import { useUserEffect } from '@/features/auth/useUserEffect';

const GoogleAuthButton = dynamic(
  () => import('@/features/auth/GoogleAuthButton'),
  { ssr: false }
);

export default function Header() {
  return (
    <AuthProvider>
      <HeaderContent />
    </AuthProvider>
  );
}

function HeaderContent() {
  useUserEffect();
  const GoogleAuthButton = dynamic(
    () => import('@/features/auth/GoogleAuthButton'),
    { ssr: false }
  );
  return (
    <header className='w-full flex justify-end p-4 border-b'>
      <GoogleAuthButton />
    </header>
  );
}
