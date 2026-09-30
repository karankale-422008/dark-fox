'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import SocialAuthButtons from './SocialAuthButtons';
import GuestModal from './GuestModal';
import { Eye, EyeOff, Lock, User, Mail, UserPlus, Sparkles, AlertCircle, Check } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin?: () => void;
}

const FOX_AVATARS = [
  { id: 'fire', name: 'Inferno Fox', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=InfernoFox' },
  { id: 'cyber', name: 'Cyber Fox', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberFox' },
  { id: 'shadow', name: 'Shadow Fox', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=ShadowFox' },
  { id: 'neon', name: 'Neon Fox', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeonFox' },
];

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const { signupWithCredentials } = useAuth();
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(FOX_AVATARS[0].url);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestModalOpen, setGuestModalOpen] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  };

  const passwordScore = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId.trim()) {
      setError('Please choose a custom User ID');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await signupWithCredentials({
        userId: userId.trim(),
        email: email.trim(),
        password,
        displayName: userId.trim(),
        avatar: selectedAvatar,
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
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

        {/* Quick Social SignUp */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Sign Up With
          </label>
          <SocialAuthButtons onError={(msg) => setError(msg)} />
        </div>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <span className="relative px-3 bg-[#0d0e15] text-[11px] font-medium tracking-wider uppercase text-neutral-500">
            Or Create Custom Dark Fox Account
          </span>
        </div>

        {/* Custom User ID */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Choose Custom User ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value.replace(/\s+/g, '_'))}
              placeholder="e.g. cyber_fox_007"
              className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition duration-200 font-mono"
            />
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">This will be your unique handle on Dark Fox.</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@darkfox.app"
              className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition duration-200"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
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

          {/* Password strength meter */}
          {password && (
            <div className="mt-2 space-y-1">
              <div className="grid grid-cols-4 gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordScore >= step
                        ? passwordScore <= 1
                          ? 'bg-rose-500'
                          : passwordScore <= 2
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                        : 'bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>Strength:</span>
                <span className={passwordScore >= 3 ? 'text-emerald-400' : 'text-amber-400'}>
                  {passwordScore <= 1 ? 'Weak' : passwordScore <= 2 ? 'Medium' : 'Strong'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition duration-200"
            />
          </div>
        </div>

        {/* Avatar Selection */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-2">
            Select Avatar Style
          </label>
          <div className="flex items-center gap-3">
            {FOX_AVATARS.map((avatar) => {
              const isSelected = selectedAvatar === avatar.url;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.url)}
                  className={`relative p-1 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20 scale-105'
                      : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 opacity-70 hover:opacity-100'
                  }`}
                  title={avatar.name}
                >
                  <img src={avatar.url} alt={avatar.name} className="w-9 h-9 rounded-lg" />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 bg-orange-500 text-black rounded-full p-0.5 shadow">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
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
                <UserPlus className="w-4 h-4" />
                <span>Create Dark Fox Account</span>
              </>
            )}
          </div>
        </button>

        {/* Guest Pass quick option */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setGuestModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-orange-500/40 hover:border-orange-400 bg-orange-950/20 hover:bg-orange-950/30 text-orange-300 hover:text-orange-200 text-xs font-semibold transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Prefer No Email? Create a Guest ID & Password</span>
          </button>
        </div>

        {/* Switch to Login link */}
        <div className="text-center pt-2 text-xs text-neutral-400">
          Already have an account?{' '}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-orange-400 hover:text-orange-300 font-semibold hover:underline cursor-pointer"
            >
              Log In
            </button>
          ) : (
            <Link href="/login" className="text-orange-400 hover:text-orange-300 font-semibold hover:underline">
              Log In
            </Link>
          )}
        </div>
      </form>

      {/* Guest Setup Modal */}
      <GuestModal isOpen={guestModalOpen} onClose={() => setGuestModalOpen(false)} />
    </>
  );
}
