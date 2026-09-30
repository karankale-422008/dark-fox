'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { UserCheck, Sparkles, X, ShieldAlert, ArrowRight } from 'lucide-react';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function GuestModal({ isOpen, onClose, onSuccess }: GuestModalProps) {
  const { loginAsGuest } = useAuth();
  const router = useRouter();

  const [guestId, setGuestId] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateRandomGuest = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `GuestFox_${randomNum}`;
    const generatedPass = `FoxPass!${Math.floor(100 + Math.random() * 900)}`;
    setGuestId(generatedId);
    setGuestPassword(generatedPass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedId = guestId.trim() || `Guest_${Math.floor(1000 + Math.random() * 9000)}`;
    
    try {
      setLoading(true);
      const res = await loginAsGuest(trimmedId, guestPassword || undefined);
      if (res.error) {
        setError(res.error);
      } else {
        onSuccess?.();
        onClose();
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Guest sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantQuickGuest = async () => {
    try {
      setLoading(true);
      const res = await loginAsGuest();
      if (res.error) {
        setError(res.error);
      } else {
        onSuccess?.();
        onClose();
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Quick guest login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-neutral-900/95 border border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-orange-950/40 text-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full blur-sm" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 text-orange-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">Guest Pass Setup</h3>
            <p className="text-xs text-neutral-400">Create a personalized Guest User ID & Password</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-300">Custom Guest User ID</label>
              <button
                type="button"
                onClick={generateRandomGuest}
                className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 transition"
              >
                <Sparkles className="w-3 h-3" /> Auto-generate
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={guestId}
                onChange={(e) => setGuestId(e.target.value)}
                placeholder="e.g. ShadowFox_77"
                className="w-full bg-neutral-950/80 border border-neutral-700/80 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Guest Password <span className="text-neutral-500">(Optional for saving session)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={guestPassword}
                onChange={(e) => setGuestPassword(e.target.value)}
                placeholder="Create a guest password"
                className="w-full bg-neutral-950/80 border border-neutral-700/80 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition font-mono"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              If you set a password, you can log back in later using this User ID and Password!
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter with Custom Guest Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleInstantQuickGuest}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium rounded-xl border border-neutral-700/50 transition cursor-pointer"
            >
              Instant 1-Click Guest Login (Random ID)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
