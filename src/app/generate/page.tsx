'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@/features/auth/useAuth';
import { db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

function makePrompt(topic: string, target: string, style: string) {
  return `주제: ${topic}\n타겟: ${target}\n스타일: ${style}`.trim();
}

export default function GeneratePage() {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [target, setTarget] = useState('');
  const [style, setStyle] = useState('casual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [checkingCredits, setCheckingCredits] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(
    null
  );

  const isValid = topic.trim() && target.trim() && style.trim();

  const styleOptions = [
    { value: 'casual', label: '캐주얼/친근형' },
    { value: 'informative', label: '정보 전달형' },
    { value: 'storytelling', label: '스토리텔링형' },
    { value: 'persuasive', label: '설득형' },
  ];

  const targetOptions = [
    '랜덤',
    '개발자',
    '마케터',
    '창업가',
    '디자이너',
    '학생',
    '직장인',
    '프리랜서',
  ];

  // 로그인 유저의 credits 조회
  useEffect(() => {
    if (!user) {
      setCredits(null);
      return;
    }
    setCheckingCredits(true);
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      setCredits(snap.exists() ? snap.data().credits ?? 0 : 0);
      setCheckingCredits(false);
    });
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setError(null);
    setResult([]);

    // 로그인 유저: 크레딧 확인 및 차감
    if (user) {
      if (checkingCredits) {
        setError(
          '크레딧 정보를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.'
        );
        return;
      }
      if (credits === null) {
        setError('크레딧 정보를 불러올 수 없습니다.');
        return;
      }
      if (credits < 1) {
        setError('크레딧이 부족합니다. (최소 1 필요)');
        return;
      }
      // 크레딧 차감
      setLoading(true);
      try {
        await updateDoc(doc(db, 'users', user.uid), { credits: credits - 1 });
        setCredits(credits - 1);
      } catch (e) {
        console.error(e);
        setLoading(false);
        setError('크레딧 차감에 실패했습니다.');
        return;
      }
    }
    // Gemini 호출
    setLoading(true);
    try {
      const prompt = makePrompt(topic, target, style);
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '생성 실패');
      setResult([data.result as string]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(text: string, idx: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {}
  }

  async function handleSave() {
    if (!user || !result[0]) return;
    setSaveStatus(null);
    try {
      await addDoc(collection(db, 'histories'), {
        uid: user.uid,
        content: result[0],
        createdAt: serverTimestamp(),
      });
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    }
    setTimeout(() => setSaveStatus(null), 1500);
  }

  function handleRegenerate() {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f0fdfa] to-[#e0e7ff] dark:from-[#18181b] dark:to-[#23272f]'>
      <div className='w-full max-w-lg bg-white/70 dark:bg-black/40 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col gap-8 border border-white/30 dark:border-white/10 backdrop-blur-xl animate-fade-in'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-600 to-indigo-600 dark:from-blue-300 dark:via-fuchsia-400 dark:to-indigo-300'>
          Thread 생성하기
        </h2>
        {user && (
          <div className='text-right text-sm text-gray-700 dark:text-gray-200 mb-2'>
            내 크레딧: {checkingCredits ? '...' : credits}
          </div>
        )}
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
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
            <div className='flex gap-2 flex-wrap mb-1'>
              {targetOptions.map((t) => (
                <button
                  key={t}
                  type='button'
                  className={
                    'px-3 py-1 rounded-full border text-xs font-medium transition ' +
                    (target === t
                      ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white border-transparent shadow'
                      : 'bg-white dark:bg-black/30 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900')
                  }
                  onClick={() => setTarget(t)}>
                  {t}
                </button>
              ))}
            </div>
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
            <div className='flex gap-2 flex-wrap mt-1'>
              {styleOptions.map((s) => (
                <button
                  key={s.value}
                  type='button'
                  className={
                    'px-4 py-2 rounded-full border text-sm font-semibold transition ' +
                    (style === s.value
                      ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white border-transparent shadow'
                      : 'bg-white dark:bg-black/30 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900')
                  }
                  onClick={() => setStyle(s.value)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <Button
            type='submit'
            size='lg'
            className='mt-4 rounded-full font-semibold text-base bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg hover:scale-105 hover:ring-2 hover:ring-fuchsia-400 transition-all'
            disabled={!isValid || loading}>
            {loading ? '생성 중...' : '생성하기'}
          </Button>
        </form>
        {error && (
          <div className='text-red-500 text-center font-semibold'>{error}</div>
        )}
        {result.length > 0 && (
          <div className='flex flex-col gap-4 mt-6'>
            <div className='relative rounded-xl bg-white/90 dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow p-4 text-base text-gray-800 dark:text-gray-100 animate-fade-in'>
              <button
                type='button'
                className='absolute top-2 right-2 px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition'
                onClick={() => handleCopy(result[0], 0)}>
                {copiedIdx === 0 ? '복사됨!' : 'Copy'}
              </button>
              <div style={{ whiteSpace: 'pre-line' }}>{result[0]}</div>
              <div className='flex gap-2 mt-4 justify-end'>
                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  onClick={handleRegenerate}
                  disabled={loading}>
                  다시 생성
                </Button>
                {user && (
                  <Button
                    type='button'
                    size='sm'
                    variant='secondary'
                    onClick={handleSave}>
                    저장
                  </Button>
                )}
              </div>
              {saveStatus === 'success' && (
                <div className='text-green-600 text-xs mt-2'>
                  히스토리 저장 완료!
                </div>
              )}
              {saveStatus === 'error' && (
                <div className='text-red-500 text-xs mt-2'>
                  저장 실패. 다시 시도해 주세요.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
