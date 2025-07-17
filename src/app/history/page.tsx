'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const [histories, setHistories] = useState<
    { id: string; content: string; createdAt: any }[]
  >([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    setFetching(true);
    // 히스토리 불러오기
    const q = query(
      collection(db, 'histories'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    getDocs(q).then((snap) => {
      setHistories(
        snap.docs.map((d) => ({
          id: d.id,
          content: d.data().content,
          createdAt: d.data().createdAt?.toDate?.() || null,
        }))
      );
      setFetching(false);
    });
    // 크레딧 불러오기
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      setCredits(snap.exists() ? snap.data().credits ?? 0 : 0);
    });
  }, [user]);

  if (!user && !loading) {
    router.replace('/');
    return null;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f0fdfa] to-[#e0e7ff] dark:from-[#18181b] dark:to-[#23272f]'>
      <div className='w-full max-w-2xl bg-white/70 dark:bg-black/40 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col gap-8 border border-white/30 dark:border-white/10 backdrop-blur-xl animate-fade-in'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-600 to-indigo-600 dark:from-blue-300 dark:via-fuchsia-400 dark:to-indigo-300'>
          내 Thread 히스토리
        </h2>
        <div className='text-right text-sm text-gray-700 dark:text-gray-200 mb-2'>
          내 크레딧: {credits ?? '...'}
        </div>
        {fetching ? (
          <div className='text-center text-gray-500'>불러오는 중...</div>
        ) : histories.length === 0 ? (
          <div className='text-center text-gray-500'>
            저장된 히스토리가 없습니다.
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            {histories.map((h, i) => (
              <div
                key={h.id}
                className='relative rounded-xl bg-white/90 dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow p-4 text-base text-gray-800 dark:text-gray-100 animate-fade-in'>
                <div style={{ whiteSpace: 'pre-line' }}>{h.content}</div>
                <div className='flex gap-2 mt-3 justify-end'>
                  <Button
                    type='button'
                    size='sm'
                    variant='outline'
                    onClick={() => navigator.clipboard.writeText(h.content)}>
                    복사
                  </Button>
                </div>
                {h.createdAt && (
                  <div className='text-xs text-gray-400 mt-2 text-right'>
                    {h.createdAt.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
