import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Dark Fox - Secure Authentication Platform',
  description: 'Next.js + Supabase authentication suite with Google, Facebook, Custom User ID, and Guest login.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#08090d] text-neutral-100 flex flex-col selection:bg-orange-500 selection:text-black">
        <AuthProvider>
          {/* Ambient Fox background mesh */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-orange-600/15 via-rose-600/10 to-transparent blur-[140px] rounded-full" />
            <div className="absolute top-[40%] -left-[10%] w-[500px] h-[400px] bg-gradient-to-r from-amber-600/10 to-transparent blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-l from-violet-600/10 to-transparent blur-[140px] rounded-full" />
            
            {/* Subtle grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
          </div>

          <Navbar />

          <main className="relative z-10 flex-1 flex flex-col">
            {children}
          </main>

          <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950/60 py-6 text-center text-xs text-neutral-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-300">Dark Fox</span>
                <span>© {new Date().getFullYear()}</span>
                <span>• Next.js + Supabase + Vercel</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-400">
                <span>Google & Facebook OAuth</span>
                <span>•</span>
                <span>Custom ID & Guest Pass</span>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
