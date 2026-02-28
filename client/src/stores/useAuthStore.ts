import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
  avatar?: string;
  bio?: string;
  isBlocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
        // 同时保存 token 到 localStorage
        localStorage.setItem('token', token);
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // 同时清除 localStorage 中的 token
        localStorage.removeItem('token');
      },
      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);