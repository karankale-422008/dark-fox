'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import SocialAuthButtons from './SocialAuthButtons';
import GuestModal from './GuestModal';
import { Eye, EyeOff, Lock, User, LogIn, Sparkles, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignup?: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const { loginWithCredentials } = useAuth();
  const router = useRouter();

  const [userIdOrEmail, setUserIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestModalOpen, setGuestModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userIdOrEmail.trim()) {
      setError('Please enter your User ID or Email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithCredentials(userIdOrEmail, password);
      if (res.error) {
        setError(res.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Social Logins: Google & Facebook */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Quick Connect
          </label>
          <SocialAuthButtons onError={(msg) => setError(msg)} />
        </div>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <span className="relative px-3 bg-[#0d0e15] text-[11px] font-medium tracking-wider uppercase text-neutral-500">
            Or with User ID
          </span>
        </div>

        {/* User ID / Email Input */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            User ID or Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={userIdOrEmail}
              onChange={(e) => setUserIdOrEmail(e.target.value)}
              placeholder="e.g. shadow_fox or user@example.com"
              className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition duration-200"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-neutral-300">
              Password
            </label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                alert('For demo accounts, any password with 6+ chars works or use your guest/registered password.');
              }}
              className="text-[11px] text-orange-400 hover:text-orange-300 transition"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-orange-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-orange-500 focus:ring-orange-500/30 accent-orange-500 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-xs text-neutral-400 cursor-pointer select-none">
            Remember my session
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-xl transition-all duration-300 group-hover:opacity-90" />
          <div className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-[11px] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-neutral-950 font-bold text-sm tracking-wide">
            {loading ? (
              <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Log In to Dark Fox</span>
              </>
            )}
          </div>
        </button>

        {/* Guest Login Banner Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setGuestModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-orange-500/40 hover:border-orange-400 bg-orange-950/20 hover:bg-orange-950/30 text-orange-300 hover:text-orange-200 text-xs font-semibold transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Create Guest ID & Password / Guest Pass</span>
          </button>
        </div>

        {/* Switch to Sign Up link */}
        <div className="text-center pt-2 text-xs text-neutral-400">
          Don&apos;t have an account yet?{' '}
          {onSwitchToSignup ? (
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-orange-400 hover:text-orange-300 font-semibold hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          ) : (
            <Link href="/signup" className="text-orange-400 hover:text-orange-300 font-semibold hover:underline">
              Sign Up
            </Link>
          )}
        </div>
      </form>

      {/* Guest Setup Modal */}
      <GuestModal isOpen={guestModalOpen} onClose={() => setGuestModalOpen(false)} />
    </>
  );
}
