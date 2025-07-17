import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  'AI 작가가 작성 중... ✍️',
  '베스트셀러인 척... 📚',
  '굉장히 빠르게 작성 중... ⚡',
  '창의력을 끌어모으는 중... 💡',
  '문장에 마법을 거는 중... 👻',
  '생각보다 진지하게 고민 중... 🤔',
  '감동을 준비하는 중... 😎',
  '이모지로 감정을 표현하는 중... 😁',
  'AI가 커피 한 잔 마시는 중... ☕',
  '글에 영혼을 불어넣는 중... 👻',
];

export default function GenerateLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-[120px]'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className='text-lg font-semibold'>
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
