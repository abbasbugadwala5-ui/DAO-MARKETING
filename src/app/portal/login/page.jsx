'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogoFull } from '@/components/portal/ui/Logo';
import '@/app/portal/portal.css';

// Point this at any existing landscape image already in /public
// (a wide architectural / project photo works best). One line to swap later.
const HERO_IMAGE = '/images/cine%203.webp';

const STYLES = `
#dao-login {
  --ink:#0A0908; --panel:#1E1B14; --field:#15130E; --field-border:rgba(212,178,122,0.22);
  --cream:#F5E9D1; --gold:#D4B27A; --gold-lt:#E5BB5C; --muted:#9C968A; --muted-2:#6E6A60;
  min-height:100vh; background:var(--ink); color:var(--cream);
  font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
  -webkit-font-smoothing:antialiased; display:flex; align-items:center; justify-content:center;
  padding:40px; position:relative; overflow:hidden;
}
#dao-login *{box-sizing:border-box}
#dao-login .dao-bgglow{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:900px;height:600px;background:var(--gold);opacity:0.06;filter:blur(170px);border-radius:9999px;pointer-events:none}
#dao-login .dao-card{width:100%;max-width:1040px;display:grid;grid-template-columns:minmax(400px,460px) 1fr;border:1px solid rgba(212,178,122,0.18);border-radius:26px;overflow:hidden;background:var(--panel);box-shadow:0 40px 120px rgba(0,0,0,0.55);position:relative;z-index:1;min-height:624px}
#dao-login .dao-form-side{position:relative;display:flex;flex-direction:column;justify-content:center;padding:54px 56px;background:var(--panel)}
#dao-login .dao-form-inner{width:100%;max-width:360px;margin:0 auto}
#dao-login .dao-logo{display:flex;align-items:center;justify-content:center;margin-bottom:36px}
#dao-login .dao-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:0.24em;color:var(--gold);font-weight:500}
#dao-login .dao-h1{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:46px;font-weight:500;letter-spacing:0.005em;color:var(--cream);text-align:center;line-height:1.05}
#dao-login .dao-h1 .accent{color:var(--gold)}
#dao-login .dao-sub{font-size:14px;line-height:1.6;color:var(--muted);margin-top:14px;text-align:center}
#dao-login .dao-toggle{display:flex;gap:4px;background:var(--field);border:1px solid var(--field-border);border-radius:11px;padding:4px;margin:28px 0 22px}
#dao-login .dao-toggle button{flex:1;height:36px;border:none;background:transparent;color:var(--muted);font-family:inherit;font-size:12px;font-weight:500;letter-spacing:0.04em;border-radius:8px;cursor:pointer;transition:all 0.15s}
#dao-login .dao-toggle button.active{background:rgba(212,178,122,0.14);color:var(--gold)}
#dao-login .dao-toggle button:not(.active):hover{color:var(--cream)}
#dao-login .dao-label{font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:var(--muted);display:block;margin-bottom:8px}
#dao-login .dao-field{position:relative;margin-bottom:18px}
#dao-login .dao-field .dao-ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted-2);width:16px;height:16px;pointer-events:none}
#dao-login input{
  width:100% !important;height:50px !important;border-radius:11px !important;
  border:1px solid var(--field-border) !important;background:var(--field) !important;
  padding:0 44px 0 42px !important;font-family:inherit !important;font-size:15px !important;
  color:var(--cream) !important;outline:none !important;-webkit-appearance:none !important;
  appearance:none !important;transition:border-color 0.15s !important;
}
#dao-login input::placeholder{color:var(--muted-2) !important}
#dao-login input:focus{border-color:rgba(212,178,122,0.4) !important;box-shadow:0 0 0 3px rgba(212,178,122,0.12) !important}
#dao-login .dao-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--muted-2);cursor:pointer;width:18px;height:18px;padding:0}
#dao-login .dao-eye:hover{color:var(--gold)}
#dao-login .dao-hint{font-size:12px;color:var(--muted);margin:-8px 0 18px;line-height:1.5}
#dao-login .dao-submit{width:100%;height:52px;border:none;border-radius:11px;background:var(--gold);color:var(--ink);font-family:inherit;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;transition:background 0.15s;margin-top:4px}
#dao-login .dao-submit:hover{background:var(--gold-lt)}
#dao-login .dao-submit:disabled{opacity:0.6;cursor:not-allowed}
#dao-login .dao-submit svg{width:16px;height:16px}
#dao-login .dao-error{border:1px solid rgba(201,122,122,0.4);background:rgba(201,122,122,0.12);border-radius:9px;padding:10px 14px;font-size:13px;color:#E08A8A;margin-bottom:14px}
#dao-login .dao-magic{border:1px solid rgba(111,168,138,0.35);background:rgba(111,168,138,0.10);border-radius:12px;padding:22px 20px}
#dao-login .dao-magic h3{font-size:16px;font-weight:600;color:#6FA88A}
#dao-login .dao-magic p{margin-top:8px;font-size:14px;line-height:1.55;color:rgba(245,233,209,0.6)}
#dao-login .dao-magic .em{color:var(--cream)}
#dao-login .dao-magic button{margin-top:16px;background:transparent;border:none;cursor:pointer;font-family:inherit;font-size:13px;color:var(--gold)}
#dao-login .dao-magic button:hover{color:var(--gold-lt)}
#dao-login .dao-foot{margin-top:38px;padding-top:24px;border-top:1px solid var(--field-border);text-align:center}
#dao-login .dao-tagline{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;color:var(--gold);letter-spacing:0.04em}
#dao-login .dao-enc{display:inline-flex;align-items:center;gap:7px;font-size:11px;color:var(--muted-2);margin-top:13px;letter-spacing:0.04em}
#dao-login .dao-enc svg{width:13px;height:13px}
#dao-login .dao-img-side{position:relative;background:#0A0908;overflow:hidden}
#dao-login .dao-img-side img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(0.78) saturate(0.85) sepia(0.18) contrast(1.05)}
#dao-login .dao-img-side::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(212,178,122,0.16) 0%,rgba(212,178,122,0.06) 35%,rgba(10,9,8,0) 70%);z-index:1;pointer-events:none;mix-blend-mode:screen}
#dao-login .dao-img-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,var(--panel) 0%,rgba(20,18,13,0.45) 18%,rgba(20,18,13,0.1) 40%,rgba(10,9,8,0) 70%),linear-gradient(0deg,rgba(10,9,8,0.85) 0%,rgba(10,9,8,0.25) 35%,rgba(10,9,8,0) 60%),linear-gradient(135deg,rgba(212,178,122,0.08) 0%,rgba(10,9,8,0) 50%)}
#dao-login .dao-img-cap{position:absolute;left:44px;bottom:42px;z-index:3}
#dao-login .dao-img-cap .et{font-size:10px;text-transform:uppercase;letter-spacing:0.24em;color:var(--gold)}
#dao-login .dao-img-cap .ti{font-family:"Cormorant Garamond",Georgia,serif;font-size:23px;color:var(--cream);margin-top:6px;letter-spacing:0.01em}
@media (max-width:900px){
  #dao-login{padding:0}
  #dao-login .dao-card{grid-template-columns:1fr;max-width:480px;border-radius:0;min-height:100vh;border:none}
  #dao-login .dao-img-side{display:none}
  #dao-login .dao-form-side{padding:44px 26px}
}
@media (max-width:540px){
  #dao-login .dao-form-side{padding:32px 20px}
  #dao-login .dao-h1{font-size:36px}
  #dao-login .dao-sub{font-size:13px}
  #dao-login .dao-logo{margin-bottom:24px}
  #dao-login input{font-size:16px !important;height:46px !important}
  #dao-login .dao-submit{height:50px;font-size:12px}
  #dao-login .dao-toggle{margin:22px 0 18px}
  #dao-login .dao-tagline{font-size:15px}
}
@media (max-width:380px){
  #dao-login .dao-form-side{padding:28px 16px}
  #dao-login .dao-h1{font-size:30px}
}
`;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const [showPw, setShowPw] = useState(false);

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

  return (
    <div id="dao-login" data-portal>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="dao-bgglow" aria-hidden="true" />

      <div className="dao-card">
        <div className="dao-form-side">
          <div className="dao-form-inner">
            <div className="dao-logo">
              <LogoFull height={104} />
            </div>

            {magicSent ? (
              <div className="dao-magic">
                <h3>Check your inbox.</h3>
                <p>
                  We sent a sign-in link to <span className="em">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMagicSent(false);
                    setEmail('');
                  }}
                >
                  ← Use a different email
                </button>
              </div>
            ) : (
              <>
                <h1 className="dao-h1">Welcome <span className="accent">back.</span></h1>
                <p className="dao-sub">
                  Sign in to follow your project — updates, progress, milestones and files, all in one place.
                </p>

                <div className="dao-toggle">
                  <button
                    type="button"
                    className={mode === 'password' ? 'active' : ''}
                    onClick={() => {
                      setMode('password');
                      setError('');
                    }}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    className={mode === 'magic' ? 'active' : ''}
                    onClick={() => {
                      setMode('magic');
                      setError('');
                    }}
                  >
                    Magic link
                  </button>
                </div>

                <form onSubmit={mode === 'password' ? signInWithPassword : sendMagicLink}>
                  <label className="dao-label" htmlFor="email">Email address</label>
                  <div className="dao-field">
                    <svg className="dao-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>

                  {mode === 'password' && (
                    <>
                      <label className="dao-label" htmlFor="password">Password</label>
                      <div className="dao-field">
                        <svg className="dao-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="11" x="3" y="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input
                          id="password"
                          type={showPw ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                        />
                        <button type="button" className="dao-eye" onClick={() => setShowPw((v) => !v)} aria-label="Show password">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}

                  {mode === 'magic' && (
                    <p className="dao-hint">We&apos;ll email you a one-time sign-in link — no password needed.</p>
                  )}

                  {error && <div className="dao-error">{error}</div>}

                  <button type="submit" className="dao-submit" disabled={loading}>
                    {loading ? 'Signing in…' : mode === 'password' ? 'Sign in' : 'Send magic link'}
                    {!loading && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="dao-foot">
              <div className="dao-tagline">Define · Amplify · Own.</div>
              <span className="dao-enc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                All data is encrypted and secure
              </span>
            </div>
          </div>
        </div>

        <div className="dao-img-side">
          <img src={HERO_IMAGE} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="dao-img-overlay" />
          <div className="dao-img-cap">
            <div className="et">Selected work</div>
            <div className="ti">Crafted spaces, documented end to end.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
