'use client';
import { useAuth } from './useAuth';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

export default function GoogleAuthButton() {
  const { user, loading, login, logout } = useAuth();

  if (loading)
    return (
      <Button disabled size='sm'>
        로딩 중...
      </Button>
    );

  if (user) {
    return (
      <div className='flex items-center gap-3'>
        <span className='text-sm font-semibold text-gray-800 dark:text-gray-100 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700'>
          {user.displayName || user.email}
        </span>
        <Button asChild variant='secondary' size='sm' className='rounded-full'>
          <Link href='/history'>히스토리 보기</Link>
        </Button>
        <Button
          onClick={logout}
          variant='outline'
          size='sm'
          className='rounded-full border-gray-300 dark:border-gray-700'>
          로그아웃
        </Button>
      </div>
    );
  }
  return (
    <Button
      onClick={login}
      size='sm'
      className='rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition-all'>
      Google 로그인
    </Button>
  );
}
