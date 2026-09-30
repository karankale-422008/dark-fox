'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, isSupabaseConfigured } from './supabase/client';

export interface UserProfile {
  id: string;
  userId: string; // custom chosen user ID / username
  email?: string;
  provider: 'google' | 'facebook' | 'custom' | 'guest';
  avatarUrl?: string;
  name?: string;
  createdAt: string;
  isGuest?: boolean;
}

interface StoredAccount {
  id: string;
  userId: string;
  email: string;
  password?: string;
  displayName?: string;
  avatar?: string;
  createdAt?: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  loginWithGoogle: () => Promise<{ error?: string }>;
  loginWithFacebook: () => Promise<{ error?: string }>;
  loginWithCredentials: (userIdOrEmail: string, password: string) => Promise<{ error?: string }>;
  signupWithCredentials: (data: {
    userId: string;
    email: string;
    password: string;
    displayName?: string;
    avatar?: string;
  }) => Promise<{ error?: string }>;
  loginAsGuest: (guestId?: string, guestPassword?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_SESSION_KEY = 'darkfox_active_user';
const LOCAL_STORAGE_GUESTS_KEY = 'darkfox_guest_accounts';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  // Load existing session on startup
  useEffect(() => {
    async function initAuth() {
      try {
        if (isConfigured) {
          const supabase = createClient();
          if (supabase) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              const u = session.user;
              const provider = (u.app_metadata?.provider || 'custom') as UserProfile['provider'];
              setUser({
                id: u.id,
                userId: u.user_metadata?.username || u.email?.split('@')[0] || 'fox_user',
                email: u.email,
                provider: provider,
                name: u.user_metadata?.full_name || u.user_metadata?.username || u.email?.split('@')[0],
                avatarUrl: u.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.id}`,
                createdAt: u.created_at,
                isGuest: false,
              });
              setLoading(false);
              return;
            }
          }
        }

        // Check local storage for mock / custom user session
        const savedSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
        if (savedSession) {
          setUser(JSON.parse(savedSession));
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, [isConfigured]);

  const saveLocalSession = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(userData));
  };

  const loginWithGoogle = async () => {
    try {
      if (isConfigured) {
        const supabase = createClient();
        if (supabase) {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
          if (error) return { error: error.message };
          return {};
        }
      }

      // Demo/Fallback Mode
      await new Promise((r) => setTimeout(r, 600));
      const demoUser: UserProfile = {
        id: 'google-user-' + Math.random().toString(36).substring(2, 9),
        userId: 'GoogleExplorer',
        email: 'fox.pilot@gmail.com',
        provider: 'google',
        name: 'Alex Vance (Google)',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString(),
        isGuest: false,
      };
      saveLocalSession(demoUser);
      return {};
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Google login failed' };
    }
  };

  const loginWithFacebook = async () => {
    try {
      if (isConfigured) {
        const supabase = createClient();
        if (supabase) {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
          if (error) return { error: error.message };
          return {};
        }
      }

      // Demo/Fallback Mode
      await new Promise((r) => setTimeout(r, 600));
      const demoUser: UserProfile = {
        id: 'facebook-user-' + Math.random().toString(36).substring(2, 9),
        userId: 'CyberFoxFB',
        email: 'cyber.fox@facebook.com',
        provider: 'facebook',
        name: 'Jordan Fox (Facebook)',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString(),
        isGuest: false,
      };
      saveLocalSession(demoUser);
      return {};
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Facebook login failed' };
    }
  };

  const loginWithCredentials = async (userIdOrEmail: string, password: string) => {
    try {
      if (!userIdOrEmail.trim() || !password) {
        return { error: 'Please enter your User ID / Email and password.' };
      }

      if (isConfigured) {
        const supabase = createClient();
        if (supabase) {
          const emailToUse = userIdOrEmail.includes('@')
            ? userIdOrEmail
            : `${userIdOrEmail.toLowerCase().replace(/[^a-z0-9_]/g, '')}@darkfox.internal`;

          const { data, error } = await supabase.auth.signInWithPassword({
            email: emailToUse,
            password: password,
          });

          if (error) {
            return { error: error.message };
          }

          if (data.user) {
            const u = data.user;
            const profile: UserProfile = {
              id: u.id,
              userId: u.user_metadata?.username || userIdOrEmail,
              email: u.email,
              provider: 'custom',
              name: u.user_metadata?.displayName || userIdOrEmail,
              avatarUrl: u.user_metadata?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.id}`,
              createdAt: u.created_at,
              isGuest: false,
            };
            saveLocalSession(profile);
            return {};
          }
        }
      }

      // Local / Offline fallback checking saved accounts
      const storedUsersRaw = localStorage.getItem(LOCAL_STORAGE_GUESTS_KEY);
      const storedUsers: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      
      const found = storedUsers.find(
        (u: StoredAccount) =>
          (u.userId?.toLowerCase() === userIdOrEmail.toLowerCase() ||
           u.email?.toLowerCase() === userIdOrEmail.toLowerCase()) &&
          u.password === password
      );

      if (found) {
        const profile: UserProfile = {
          id: found.id,
          userId: found.userId,
          email: found.email,
          provider: found.isGuest ? 'guest' : 'custom',
          name: found.displayName || found.userId,
          avatarUrl: found.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${found.id}`,
          createdAt: found.createdAt || new Date().toISOString(),
          isGuest: found.isGuest || false,
        };
        saveLocalSession(profile);
        return {};
      }

      // If user doesn't exist locally and no supabase, create a demo dynamic login
      if (password.length >= 6) {
        const customUser: UserProfile = {
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          userId: userIdOrEmail.split('@')[0],
          email: userIdOrEmail.includes('@') ? userIdOrEmail : `${userIdOrEmail}@darkfox.internal`,
          provider: 'custom',
          name: userIdOrEmail.split('@')[0],
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${userIdOrEmail}`,
          createdAt: new Date().toISOString(),
          isGuest: false,
        };
        saveLocalSession(customUser);
        return {};
      }

      return { error: 'Invalid User ID or Password. Password must be at least 6 characters.' };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Login failed' };
    }
  };

  const signupWithCredentials = async ({
    userId,
    email,
    password,
    displayName,
    avatar,
  }: {
    userId: string;
    email: string;
    password: string;
    displayName?: string;
    avatar?: string;
  }) => {
    try {
      if (!userId.trim()) return { error: 'User ID is required.' };
      if (!email.trim() || !email.includes('@')) return { error: 'Valid email is required.' };
      if (password.length < 6) return { error: 'Password must be at least 6 characters long.' };

      if (isConfigured) {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                username: userId,
                displayName: displayName || userId,
                avatar: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
              },
            },
          });

          if (error) return { error: error.message };

          if (data.user) {
            const profile: UserProfile = {
              id: data.user.id,
              userId: userId,
              email: email,
              provider: 'custom',
              name: displayName || userId,
              avatarUrl: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
              createdAt: data.user.created_at,
              isGuest: false,
            };
            saveLocalSession(profile);
            return {};
          }
        }
      }

      // Save locally
      const storedUsersRaw = localStorage.getItem(LOCAL_STORAGE_GUESTS_KEY);
      const storedUsers: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const exists = storedUsers.some(
        (u: StoredAccount) => u.userId.toLowerCase() === userId.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
      );

      if (exists) {
        return { error: 'User ID or Email already exists. Please login instead.' };
      }

      const newAccount: StoredAccount = {
        id: 'acc-' + Math.random().toString(36).substring(2, 9),
        userId,
        email,
        password,
        displayName: displayName || userId,
        avatar: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
        createdAt: new Date().toISOString(),
        isGuest: false,
      };

      storedUsers.push(newAccount);
      localStorage.setItem(LOCAL_STORAGE_GUESTS_KEY, JSON.stringify(storedUsers));

      const profile: UserProfile = {
        id: newAccount.id,
        userId: newAccount.userId,
        email: newAccount.email,
        provider: 'custom',
        name: newAccount.displayName,
        avatarUrl: newAccount.avatar,
        createdAt: newAccount.createdAt || new Date().toISOString(),
        isGuest: false,
      };
      saveLocalSession(profile);

      return {};
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Signup failed' };
    }
  };

  const loginAsGuest = async (customGuestId?: string, customGuestPassword?: string) => {
    try {
      await new Promise((r) => setTimeout(r, 400));
      
      const guestId = customGuestId?.trim() || `GuestFox_${Math.floor(1000 + Math.random() * 9000)}`;
      
      if (customGuestPassword) {
        // Save guest account so they can log back in later
        const storedUsersRaw = localStorage.getItem(LOCAL_STORAGE_GUESTS_KEY);
        const storedUsers: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const existingIdx = storedUsers.findIndex((u: StoredAccount) => u.userId.toLowerCase() === guestId.toLowerCase());
        
        const guestData: StoredAccount = {
          id: 'guest-' + Math.random().toString(36).substring(2, 9),
          userId: guestId,
          email: `${guestId.toLowerCase()}@guest.darkfox.io`,
          password: customGuestPassword,
          displayName: `🦊 ${guestId}`,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${guestId}`,
          createdAt: new Date().toISOString(),
          isGuest: true,
        };

        if (existingIdx >= 0) {
          storedUsers[existingIdx] = guestData;
        } else {
          storedUsers.push(guestData);
        }
        localStorage.setItem(LOCAL_STORAGE_GUESTS_KEY, JSON.stringify(storedUsers));
      }

      const guestProfile: UserProfile = {
        id: 'guest-' + Math.random().toString(36).substring(2, 9),
        userId: guestId,
        email: `${guestId.toLowerCase()}@guest.darkfox.io`,
        provider: 'guest',
        name: `Guest (${guestId})`,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${guestId}`,
        createdAt: new Date().toISOString(),
        isGuest: true,
      };

      saveLocalSession(guestProfile);
      return {};
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Guest login failed' };
    }
  };

  const logout = async () => {
    if (isConfigured) {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured,
        loginWithGoogle,
        loginWithFacebook,
        loginWithCredentials,
        signupWithCredentials,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
