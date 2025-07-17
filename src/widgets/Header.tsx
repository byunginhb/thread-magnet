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
    <header className='w-full flex flex-wrap items-center justify-between gap-y-2 p-3 sm:p-4 border-b bg-white/80 dark:bg-black/40 backdrop-blur z-20 min-h-[56px]'>
      <div className='flex items-center gap-2 min-w-0'>
        <Link href='/' className='flex items-center gap-2 group min-w-0'>
          <img
            src='/logo.png'
            alt='ThreadMagnet 로고'
            className='w-8 h-8 rounded-full shadow shrink-0'
          />
          <span className='hidden sm:inline truncate text-lg font-bold bg-gradient-to-r from-blue-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent group-hover:opacity-80 transition max-w-[120px] sm:max-w-none'>
            ThreadMagnet
          </span>
        </Link>
      </div>
      <nav className='flex flex-wrap gap-1 sm:gap-4 min-w-0 overflow-x-auto'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              'px-3 py-1 rounded-full text-sm font-semibold transition whitespace-nowrap ' +
              (pathname === item.href
                ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white shadow'
                : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900')
            }>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className='flex-shrink-0 ml-auto'>
        <GoogleAuthButton />
      </div>
    </header>
  );
}
