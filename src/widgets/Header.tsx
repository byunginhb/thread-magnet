'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';
import { useUserEffect } from '@/features/auth/useUserEffect';

const GoogleAuthButton = dynamic(
  () => import('@/features/auth/GoogleAuthButton'),
  { ssr: false }
);

export default function Header() {
  useUserEffect();
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/generate', label: 'Thread 생성' },
    ...(user ? [{ href: '/history', label: '히스토리' }] : []),
  ];

  return (
    <header className='w-full flex items-center justify-between p-4 border-b bg-white/80 dark:bg-black/40 backdrop-blur z-20'>
      <nav className='flex gap-2 sm:gap-4'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              'px-3 py-1 rounded-full text-sm font-semibold transition ' +
              (pathname === item.href
                ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white shadow'
                : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900')
            }>
            {item.label}
          </Link>
        ))}
      </nav>
      <GoogleAuthButton />
    </header>
  );
}
