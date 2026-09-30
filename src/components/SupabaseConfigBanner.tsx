'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Database, ExternalLink, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function SupabaseConfigBanner() {
  const { isConfigured } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const envSampleText = `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...`;

  const copyEnv = () => {
    navigator.clipboard.writeText(envSampleText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div 
        className={`border rounded-xl px-4 py-3 transition-all duration-200 backdrop-blur-md ${
          isConfigured
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
            : 'bg-neutral-900/80 border-orange-500/30 text-neutral-300'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Database className={`w-4 h-4 ${isConfigured ? 'text-emerald-400' : 'text-orange-400 animate-pulse'}`} />
            <div className="text-xs">
              <span className="font-semibold text-white">
                {isConfigured ? 'Supabase Connected' : 'Supabase Ready'}
              </span>
              <span className="text-neutral-400 ml-1.5 hidden sm:inline">
                {isConfigured ? '(Live Database)' : '(Demo & Local Mode)'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition cursor-pointer"
          >
            <span>{isConfigured ? 'Status' : 'Setup Guide'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-neutral-800 text-xs text-neutral-300 space-y-2.5 animate-in fade-in">
            <p className="text-neutral-400">
              {isConfigured
                ? 'Your project is successfully hooked up to live Supabase Auth and Database.'
                : 'The app is fully interactive in local demo mode! To connect to your real Supabase project & deploy to Vercel:'}
            </p>

            {!isConfigured && (
              <div className="space-y-2 bg-neutral-950/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span>Add to <code className="text-orange-300">.env.local</code>:</span>
                  <button
                    onClick={copyEnv}
                    className="flex items-center gap-1 text-orange-400 hover:text-orange-300"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-neutral-300 overflow-x-auto whitespace-pre p-2 bg-neutral-900 rounded">
                  {envSampleText}
                </pre>
                <div className="flex gap-4 pt-1">
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Create Supabase Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Deploy to Vercel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
