// hooks/useAuth.ts
import { useAppSelector } from '@/redux/hooks';

export const useAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  
  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: false, // Since we're not using queries in navbar
  };
};