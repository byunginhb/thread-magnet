import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserDoc } from '@/entities/user';

export function useUserEffect() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    getDoc(ref).then((snap) => {
      if (!snap.exists()) {
        const newUser: UserDoc = {
          uid: user.uid,
          email: user.email || '',
          credits: 50,
          createdAt: Date.now(),
        };
        setDoc(ref, newUser);
      }
    });
  }, [user]);
}
