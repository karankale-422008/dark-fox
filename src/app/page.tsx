'use client';

import React, { useState } from 'react';
import FoxLogo from '@/components/FoxLogo';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import SupabaseConfigBanner from '@/components/SupabaseConfigBanner';
import { Zap, Sparkles, Key, Globe, Server } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left column: Hero & Brand presentation */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Dark Fox Authentication</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Enter the{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-500 bg-clip-text text-transparent">
              Dark Fox
            </span>{' '}
            Domain.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0">
            A fast, modern authentication system crafted with <strong>Google Login</strong>,{' '}
            <strong>Facebook Login</strong>, <strong>Custom User ID & Password</strong>, and a custom{' '}
            <strong>Guest Login</strong>. Built to deploy seamlessly to <strong>Vercel</strong> &{' '}
            <strong>Supabase</strong>.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-left">
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-orange-400 font-semibold text-xs">
                <Globe className="w-4 h-4" />
                <span>OAuth Providers</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                1-Click Sign in with Google & Facebook accounts via Supabase Auth.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Key className="w-4 h-4" />
                <span>Guest & Custom ID</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Make your own unique User ID & password or jump in instantly with guest pass.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Server className="w-4 h-4" />
                <span>Supabase Native</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Plug-and-play PostgreSQL & OAuth with zero boilerplate setup.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                <Zap className="w-4 h-4" />
                <span>Vercel & Git Ready</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Pre-configured for CI/CD git push & instant Vercel edge deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Auth Card with Tabs */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          {/* Supabase status indicator */}
          <SupabaseConfigBanner />

          {/* Auth Card Box */}
          <div className="relative rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-2xl shadow-orange-950/20 backdrop-blur-xl p-6 sm:p-8 overflow-hidden">
            {/* Top glowing edge line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500" />

            {/* Header / Logo */}
            <div className="text-center mb-6">
              <FoxLogo size={52} />
              <h2 className="mt-3 text-xl font-bold text-white tracking-wide">
                {activeTab === 'login' ? 'Welcome Back' : 'Join Dark Fox'}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {activeTab === 'login'
                  ? 'Sign in to access your secure profile & dashboard'
                  : 'Create your custom handle and credentials'}
              </p>
            </div>

            {/* Tab Selector */}
            <div className="grid grid-cols-2 p-1 mb-6 rounded-xl bg-neutral-900 border border-neutral-800/90">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Content */}
            {activeTab === 'login' ? (
              <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
