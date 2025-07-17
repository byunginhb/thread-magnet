import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { Sparkles, KeyRound, Monitor } from 'lucide-react';

export default function Home() {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-24 bg-gradient-to-br from-[#e0e7ff] via-[#f0fdfa] to-[#f5f3ff] dark:from-[#18181b] dark:via-[#23272f] dark:to-[#1e293b]'>
      {/* Glassmorphism 배경 블러 */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute left-1/2 top-1/3 w-[520px] h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/30 dark:bg-white/10 blur-3xl' />
      </div>
      <main className='z-10 flex flex-col items-center gap-10 max-w-2xl w-full text-center'>
        <div className='backdrop-blur-xl bg-white/60 dark:bg-black/30 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center gap-6 border border-white/30 dark:border-white/10 animate-fade-in'>
          <img src='/logo.png' alt='ThreadMagnet 로고' className='w-60 h-60 ' />
          <p className='text-lg sm:text-xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed'>
            누구나 쉽고 빠르게{' '}
            <span className='font-bold text-fuchsia-600 dark:text-fuchsia-300'>
              고품질 Thread 콘텐츠
            </span>
            를<br />
            AI로 자동 생성하는 웹 도구입니다.
            <br />
            주제와 타겟만 입력하면,{' '}
            <span className='font-semibold text-blue-600 dark:text-blue-300'>
              AI가 Thread를 완성
            </span>
            해 드려요.
          </p>
          <ul className='text-sm sm:text-base text-gray-600 dark:text-gray-300 flex flex-col gap-1 items-center'>
            <li className='flex items-center gap-2'>
              <Sparkles size={18} />
              로그인 없이 Thread 생성 가능
            </li>
            <li className='flex items-center gap-2'>
              <KeyRound size={18} />
              로그인 시 히스토리 관리
            </li>
            <li className='flex items-center gap-2'>
              <Monitor size={18} />
              반응형 · 다크모드 · 미니멀 UI
            </li>
          </ul>
          <Button
            asChild
            size='lg'
            className='rounded-full shadow-xl text-base px-8 py-6 font-semibold bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:scale-105 hover:ring-2 hover:ring-fuchsia-400 transition-all animate-bounce-in'>
            <Link href='/generate'>Thread 생성하기</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
