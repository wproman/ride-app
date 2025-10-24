/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks/useAuthPersistence.ts
import { setCredentials } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

export const useAuthPersistence = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for stored auth data on app start
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        dispatch(setCredentials({ user: authData.user }));
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, [dispatch]);
};