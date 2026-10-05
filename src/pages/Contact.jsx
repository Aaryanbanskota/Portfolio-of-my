import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

const socialIcons = {
  linkedin: () => (
    <svg className="w-6 h-6 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
    </svg>
  ),
  facebook: () => (
    <svg className="w-6 h-6 fill-current text-[#1877F2]" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: () => (
    <svg className="w-6 h-6 fill-current text-[#E4405F]" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  twitter: () => (
    <svg className="w-5 h-5 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  gmail: () => (
    <svg className="w-6 h-6 fill-current text-[#EA4335]" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
};

const platformDisplayNames = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "X (Twitter)",
  gmail: "Gmail",
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aaryanbanskota@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-12 pb-36 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <AnimatedCard startY={50} cardClassName="p-6 sm:p-10 md:p-12 text-center flex flex-col items-center gap-8 relative overflow-hidden">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
        
        {/* Profile Avatar Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img 
              src={details.profile.avatarUrl} 
              alt={details.profile.name} 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-xl border-2 dark:border-zinc-700 border-slate-300"
            />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 dark:border-zinc-950 border-white"></span>
            </span>
          </div>

          <div>
            <AnimatedText className="text-3xl sm:text-4xl font-extrabold dark:text-zinc-100 text-slate-900 tracking-tight">
              Get in Touch
            </AnimatedText>
            <AnimatedText className="dark:text-zinc-400 text-slate-600 text-sm sm:text-base max-w-lg mt-2 font-light leading-relaxed">
              I'm always open to new engineering roles, software collaborations, or open-source discussions. Feel free to connect via any platform!
            </AnimatedText>
          </div>
        </div>

        {/* Quick Email Action Button */}
        <AnimatedText className="w-full max-w-md">
          <button
            onClick={handleCopyEmail}
            className="w-full py-3.5 px-6 rounded-2xl dark:bg-zinc-900 bg-indigo-50/80 border dark:border-zinc-800 border-indigo-200 dark:text-zinc-200 text-indigo-900 font-semibold text-sm flex items-center justify-between hover:border-indigo-500/60 dark:hover:bg-zinc-800/80 hover:bg-indigo-100 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22 6c0-.88-.59-1.63-1.4-1.87l-8.6 6.45L3.4 4.13C2.59 4.37 2 5.12 2 6v12c0 1.1.9 2 2 2h3V10.27l5 3.75 5-3.75V20h3c1.1 0 2-.9 2-2V6z"/>
                <path fill="#34A853" d="M4 20h3v-9.73L2 6.45V18c0 1.1.9 2 2 2z"/>
                <path fill="#EA4335" d="M20 4H4c-.77 0-1.47.43-1.82 1.07l9.82 7.37 9.82-7.37C21.47 4.43 20.77 4 20 4z"/>
                <path fill="#FBBC04" d="M20 20c1.1 0 2-.9 2-2V6.45l-5 3.82V20h3z"/>
              </svg>
              <span className="font-mono text-xs sm:text-sm">aaryanbanskota@gmail.com</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-medium shadow-xs group-hover:bg-indigo-500 transition-colors">
              {copied ? 'Copied! 📋' : 'Copy Email'}
            </span>
          </button>
        </AnimatedText>

        {/* Social Networks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
          {details.socials.map((social) => {
            const IconComponent = socialIcons[social.name];
            const displayName = platformDisplayNames[social.name] || social.name;

            return (
              <AnimatedText key={social.name} className="w-full">
                <a 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border dark:border-zinc-800/90 border-slate-200 dark:bg-zinc-900/60 bg-white hover:dark:bg-zinc-800/90 hover:bg-slate-50 border-t-2 hover:border-t-indigo-500 dark:hover:border-zinc-600 hover:border-slate-300 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="p-2.5 rounded-xl dark:bg-zinc-950 bg-slate-100 border dark:border-zinc-800 border-slate-200 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      {IconComponent ? <IconComponent /> : <span>🔗</span>}
                    </div>
                    <div>
                      <h4 className="text-base font-bold dark:text-zinc-100 text-slate-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {displayName}
                      </h4>
                      <p className="text-xs dark:text-zinc-400 text-slate-500 font-mono mt-0.5">
                        {social.handle || social.url.split('/').pop()}
                      </p>
                    </div>
                  </div>

                  <span className="dark:text-zinc-500 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-sm font-semibold">
                    ↗
                  </span>
                </a>
              </AnimatedText>
            );
          })}
        </div>

      </AnimatedCard>
    </div>
  );
}
