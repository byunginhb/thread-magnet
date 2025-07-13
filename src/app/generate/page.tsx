'use client';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [target, setTarget] = useState('');
  const [style, setStyle] = useState('');

  const isValid = topic.trim() && target.trim() && style.trim();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f0fdfa] to-[#e0e7ff] dark:from-[#18181b] dark:to-[#23272f]'>
      <div className='w-full max-w-lg bg-white/70 dark:bg-black/40 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col gap-8 border border-white/30 dark:border-white/10 backdrop-blur-xl animate-fade-in'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-600 to-indigo-600 dark:from-blue-300 dark:via-fuchsia-400 dark:to-indigo-300'>
          Thread 생성하기
        </h2>
        <form className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='topic'
              className='font-semibold text-gray-700 dark:text-gray-200'>
              주제
            </label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder='예: AI 트렌드, 생산성 팁 등'
              className='rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-black/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition'
              autoComplete='off'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='target'
              className='font-semibold text-gray-700 dark:text-gray-200'>
              타겟 고객
            </label>
            <input
              id='target'
              type='text'
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder='예: 개발자, 마케터, 스타트업 창업가 등'
              className='rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-black/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition'
              autoComplete='off'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='style'
              className='font-semibold text-gray-700 dark:text-gray-200'>
              쓰레드 스타일
            </label>
            <select
              id='style'
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className='rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-black/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition'>
              <option value=''>스타일 선택</option>
              <option value='informative'>정보 전달형</option>
              <option value='storytelling'>스토리텔링형</option>
              <option value='persuasive'>설득/영업형</option>
              <option value='casual'>캐주얼/친근형</option>
            </select>
          </div>
          <Button
            type='submit'
            size='lg'
            className='mt-4 rounded-full font-semibold text-base bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg hover:scale-105 hover:ring-2 hover:ring-fuchsia-400 transition-all'
            disabled={!isValid}>
            생성하기
          </Button>
        </form>
      </div>
    </div>
  );
}
