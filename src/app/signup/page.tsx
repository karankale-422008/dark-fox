'use client';

import React from 'react';
import FoxLogo from '@/components/FoxLogo';
import SignupForm from '@/components/SignupForm';
import SupabaseConfigBanner from '@/components/SupabaseConfigBanner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-orange-400 mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <SupabaseConfigBanner />

        <div className="relative rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-2xl shadow-orange-950/20 backdrop-blur-xl p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500" />

          <div className="text-center mb-6">
            <FoxLogo size={52} />
            <h1 className="mt-3 text-2xl font-bold text-white tracking-wide">
              Create Dark Fox Account
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Select your handle, email, password, and custom fox avatar
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}
