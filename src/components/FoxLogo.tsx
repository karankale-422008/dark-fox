import React from 'react';

interface FoxLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export default function FoxLogo({ className = '', size = 48, glow = true }: FoxLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none"
          style={{ width: size * 1.3, height: size * 1.3, transform: 'translate(-10%, -10%)' }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="foxOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7b00" />
            <stop offset="50%" stopColor="#f54714" />
            <stop offset="100%" stopColor="#c71d2b" />
          </linearGradient>
          <linearGradient id="foxViolet" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7928ca" />
            <stop offset="100%" stopColor="#ff0080" />
          </linearGradient>
          <linearGradient id="darkEar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1c29" />
            <stop offset="100%" stopColor="#0d0e15" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0070f3" />
          </radialGradient>
        </defs>

        {/* Left Ear Outer */}
        <polygon points="12,18 36,45 18,52" fill="url(#foxOrange)" />
        {/* Left Ear Inner */}
        <polygon points="17,25 32,45 22,48" fill="url(#darkEar)" />

        {/* Right Ear Outer */}
        <polygon points="88,18 82,52 64,45" fill="url(#foxOrange)" />
        {/* Right Ear Inner */}
        <polygon points="83,25 78,48 68,45" fill="url(#darkEar)" />

        {/* Center Forehead & Brow */}
        <polygon points="50,14 36,45 64,45" fill="url(#foxViolet)" />

        {/* Left Cheek */}
        <polygon points="18,52 36,45 50,65 24,78" fill="url(#foxOrange)" />
        {/* Right Cheek */}
        <polygon points="82,52 76,78 50,65 64,45" fill="url(#foxOrange)" />

        {/* Snout */}
        <polygon points="36,45 64,45 50,82" fill="url(#foxOrange)" />
        <polygon points="42,65 58,65 50,88" fill="#12131c" />

        {/* Left Eye (Cyber cyan slit) */}
        <polygon points="34,50 44,53 38,55" fill="url(#eyeGlow)" filter="drop-shadow(0 0 4px #00f0ff)" />

        {/* Right Eye (Cyber cyan slit) */}
        <polygon points="66,50 62,55 56,53" fill="url(#eyeGlow)" filter="drop-shadow(0 0 4px #00f0ff)" />

        {/* Nose Tip */}
        <circle cx="50" cy="87" r="2.5" fill="#00f0ff" filter="drop-shadow(0 0 3px #00f0ff)" />

        {/* Whisker Cyber Lines */}
        <line x1="22" y1="62" x2="6" y2="60" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="24" y1="68" x2="8" y2="70" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="78" y1="62" x2="94" y2="60" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="76" y1="68" x2="92" y2="70" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}
