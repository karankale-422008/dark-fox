'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';
import FoxLogo from './FoxLogo';
import { useAuth } from '@/lib/auth-context';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isConfigured } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <FoxLogo size={36} glow={true} />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent group-hover:opacity-90 transition">
              DARK FOX
            </span>
            <span className="text-[10px] tracking-widest text-neutral-400 font-mono -mt-1 uppercase">
              Auth Platform
            </span>
          </div>
        </Link>

        {/* Right side navigation & user pill */}
        <div className="flex items-center gap-3">
          {/* Supabase Status Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400">
            <span
              className={`w-2 h-2 rounded-full ${
                isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{isConfigured ? 'Supabase Live' : 'Demo & Local'}</span>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-orange-500/30 text-xs text-white hover:border-orange-500/60 transition"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-5 h-5 rounded-full" />
                ) : (
                  <User className="w-4 h-4 text-orange-400" />
                )}
                <span className="font-medium truncate max-w-[120px]">{user.userId}</span>
                {user.isGuest && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold">
                    Guest
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-neutral-950 shadow-md shadow-orange-500/20 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
