'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  const signInWithPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/portal/dashboard');
      router.refresh();
    }
  };

  const sendMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMagicSent(true);
    }
    setLoading(false);
  };

  const serifItalic = { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' };
  const sans = { fontFamily: "'Schibsted Grotesk', sans-serif" };
  const display = { fontFamily: "'Bodoni Moda', serif" };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5E9D1] flex flex-col">
      {/* Top bar */}
      <div className="p-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium text-[#D4B27A]" style={serifItalic}>
          DAO Marketing
        </Link>
        <Link href="/" className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/50 hover:text-[#D4B27A] transition-colors" style={sans}>
          ← Back to site
        </Link>
      </div>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Gold seal */}
          <div className="flex justify-center mb-12">
            <div className="relative w-20 h-20">
              <div
                className="absolute inset-0 rounded-full border border-[#D4B27A]/40"
                style={{ animation: 'spin 24s linear infinite' }}
              ></div>
              <div
                className="absolute inset-2 rounded-full border border-[#D4B27A]/25"
                style={{ animation: 'spin 16s linear infinite reverse' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl text-[#D4B27A]" style={{ ...display, fontStyle: 'italic', fontWeight: 700 }}>
                D
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4B27A] mb-4" style={sans}>
              Project Portal · Access
            </div>
            <h1 className="text-4xl md:text-5xl text-[#F5E9D1] mb-3" style={serifItalic}>
              Welcome back<span className="text-[#D4B27A]">.</span>
            </h1>
            <p className="text-[#F5E9D1]/60 text-sm" style={sans}>
              Sign in to access your project dashboard.
            </p>
          </div>

          {magicSent ? (
            <div className="text-center">
              <div className="text-2xl text-[#D4B27A] mb-3" style={serifItalic}>
                Check your inbox.
              </div>
              <p className="text-[#F5E9D1]/60 text-sm" style={sans}>
                We sent a sign-in link to <span className="text-[#F5E9D1]">{email}</span>.<br />
                Click the link in the email to access your portal.
              </p>
              <button
                onClick={() => { setMagicSent(false); setEmail(''); }}
                style={sans}
                className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#D4B27A] hover:text-[#E5BB5C] transition-colors"
              >
                ← Use a different email
              </button>
            </div>
          ) : (
            <form
              onSubmit={mode === 'password' ? signInWithPassword : sendMagicLink}
              className="space-y-6"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D4B27A] mb-3" style={sans}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={sans}
                  className="w-full bg-transparent border-b border-[#D4B27A]/25 py-3 text-[#F5E9D1] placeholder-[#F5E9D1]/30 focus:border-[#D4B27A] focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              {mode === 'password' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D4B27A] mb-3" style={sans}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={sans}
                    className="w-full bg-transparent border-b border-[#D4B27A]/25 py-3 text-[#F5E9D1] focus:border-[#D4B27A] focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {error && (
                <div className="text-xs text-[#A85E3B] py-2" style={sans}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={sans}
                className="w-full bg-[#D4B27A] text-[#0A0908] py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-[#E5BB5C] transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in…' : (mode === 'password' ? 'Sign in →' : 'Send magic link →')}
              </button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'password' ? 'magic' : 'password')}
                  style={sans}
                  className="text-[10px] uppercase tracking-[0.2em] text-[#F5E9D1]/50 hover:text-[#D4B27A] transition-colors"
                >
                  {mode === 'password' ? 'Or sign in with magic link' : 'Or sign in with password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 text-center text-[10px] uppercase tracking-[0.25em] text-[#F5E9D1]/30" style={sans}>
        © 2026 DAO Marketing Management LLC · Dubai
      </div>
    </div>
  );
}
