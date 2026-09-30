'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import FoxLogo from '@/components/FoxLogo';
import Link from 'next/link';
import {
  Shield,
  Database,
  ExternalLink,
  LogOut,
  GitBranch,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout, isConfigured } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800">
          <FoxLogo size={48} />
          <h2 className="text-xl font-bold text-white mt-4">Access Denied</h2>
          <p className="text-sm text-neutral-400 mt-2 mb-6">
            You need to be signed in to view the Dark Fox Dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-neutral-950 font-bold rounded-xl text-sm"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'google':
        return {
          label: 'Google OAuth',
          color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        };
      case 'facebook':
        return {
          label: 'Facebook OAuth',
          color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        };
      case 'guest':
        return {
          label: 'Guest Session',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      default:
        return {
          label: 'Custom Credentials',
          color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        };
    }
  };

  const badge = getProviderBadge(user.provider);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=DarkFox'}
                alt={user.userId}
                className="w-20 h-20 rounded-2xl bg-neutral-900 border-2 border-orange-500/40 p-1 shadow-lg shadow-orange-500/10 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-neutral-950" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {user.name || user.userId}
                </h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-sm font-mono text-neutral-400">ID: @{user.userId}</p>
              {user.email && <p className="text-xs text-neutral-500">{user.email}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-rose-300 hover:text-rose-200 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Deployment & Backend Connectivity Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Supabase Status Card */}
        <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Supabase Backend</h3>
            </div>
            <span
              className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                isConfigured ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {isConfigured ? 'LIVE' : 'DEMO/LOCAL'}
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            {isConfigured
              ? 'Real-time PostgreSQL database & authentication are connected and synced.'
              : 'App is running in local reactive mode. Add your Supabase project keys in .env.local to link live.'}
          </p>

          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold"
          >
            <span>Supabase Console</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* GitHub Repository Card */}
        <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">GitHub Push Ready</h3>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-purple-950 text-purple-400">
              GIT INITIALIZED
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            This repository is structured cleanly with .gitignore and clean modular Next.js architecture.
          </p>

          <div className="text-[11px] font-mono bg-neutral-900 p-2 rounded text-neutral-300">
            git push origin main
          </div>
        </div>

        {/* Vercel Edge Deployment Card */}
        <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Vercel Deployment</h3>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-sky-950 text-sky-400">
              OPTIMIZED
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Ready to import straight into Vercel with automatic SSR, zero config, and environment variables.
          </p>

          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold"
          >
            <span>Import to Vercel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Account Details & Session Inspector */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold text-white">Active Session Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">User ID</span>
            <span className="text-sm font-semibold text-white mt-1 block font-mono">{user.userId}</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Auth Provider</span>
            <span className="text-sm font-semibold text-white mt-1 block capitalize">{user.provider}</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Email / Contact</span>
            <span className="text-sm font-semibold text-neutral-300 mt-1 block truncate">
              {user.email || 'N/A (Guest)'}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Session Created</span>
            <span className="text-sm font-semibold text-neutral-300 mt-1 block">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
