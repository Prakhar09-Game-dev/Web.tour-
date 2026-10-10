import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const inputClassName =
  'w-full rounded-xl border border-white/[.08] bg-[#0c0b0b] py-3.5 pl-11 pr-4 text-sm text-[#fff8f4] outline-none transition duration-300 placeholder:text-[#887c78] hover:border-white/20 focus:border-[#ff4638] focus:shadow-[0_0_0_3px_rgba(255,70,56,0.14)]';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const switchMode = (register: boolean) => {
    setIsRegister(register);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister ? { name, email, phone, password } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.token, data.user);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Authentication error. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (type: 'admin' | 'customer') => {
    setIsRegister(false);
    setErrorMsg('');
    if (type === 'admin') {
      setEmail('admin@vimaltravels.com');
      setPassword('admin123');
    } else {
      setEmail('customer@example.com');
      setPassword('customer123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#080707]/90 p-3 backdrop-blur-lg sm:p-6">
      <style>{`
        @keyframes auth-form-enter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes auth-tap-bounce {
          0% { transform: scale(1); }
          30% { transform: scale(.965) translateY(1px); }
          68% { transform: scale(1.025) translateY(-1px); }
          100% { transform: scale(1); }
        }
        .auth-form-enter { animation: auth-form-enter 460ms cubic-bezier(.22, 1, .36, 1) both; }
        .auth-tap { transition: transform 180ms cubic-bezier(.2, .8, .2, 1), box-shadow 220ms ease, background-color 220ms ease; }
        .auth-tap:active { animation: auth-tap-bounce 360ms cubic-bezier(.2, .8, .2, 1); }
        @media (prefers-reduced-motion: reduce) {
          .auth-form-enter, .auth-tap { animation: none; transition: none; }
        }
      `}</style>
      <div
        aria-labelledby="auth-title"
        aria-modal="true"
        className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#100e0e] shadow-[0_36px_120px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:rounded-[36px]"
        role="dialog"
      >
        <div className="grid min-h-[min(760px,calc(100dvh-24px))] lg:grid-cols-[.94fr_1.06fr]">
          <section
            className={`relative isolate order-1 flex min-h-[275px] flex-col justify-between overflow-hidden p-6 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:min-h-[320px] sm:p-9 lg:min-h-[690px] lg:p-12 ${
              isRegister
                ? 'lg:order-2 bg-[#111010]'
                : 'lg:order-1 bg-[#c91f1b]'
            }`}
            style={{
              backgroundImage: isRegister
                ? 'radial-gradient(ellipse at 78% 18%, rgba(198,30,27,.34), transparent 35%), repeating-linear-gradient(132deg, transparent 0 11px, rgba(255,63,51,.09) 11px 12px, transparent 12px 24px), linear-gradient(145deg, #181313, #090909 72%)'
                : 'radial-gradient(ellipse at 82% 12%, rgba(255,95,72,.68), transparent 35%), repeating-linear-gradient(132deg, transparent 0 10px, rgba(10,7,7,.16) 10px 11px, transparent 11px 23px), linear-gradient(145deg, #e33b2e, #8e1718 80%)'
            }}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-24 -top-32 h-[360px] w-[360px] rounded-full border transition-all duration-1000 ${
                isRegister
                  ? 'scale-90 border-[#f13c31]/20'
                  : 'scale-110 border-[#ffd1c0]/25'
              }`}
            >
              <div className="absolute inset-7 rounded-full border border-current opacity-40" />
              <div className="absolute inset-16 rounded-full border border-current opacity-30" />
              <div className="absolute left-[12%] top-[48%] h-2 w-2 rounded-full bg-[#ff5144] shadow-[0_0_18px_6px_rgba(255,57,46,.55)]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[.12]"
              style={{
                backgroundImage:
                  'radial-gradient(#fff 0.65px, transparent 0.65px)',
                backgroundSize: '6px 6px',
                maskImage: 'linear-gradient(135deg, black, transparent 72%)'
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="font-headline text-2xl font-black leading-none tracking-[-0.08em] text-white">
                  VIMAL<span className="text-[#ffb3a3]">.</span>
                </p>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[.28em] text-white/65">
                  Tour &amp; Travellers
                </p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.2em] text-white/75">
                Varanasi · India
              </span>
            </div>

            <div className="relative z-10 mt-10 max-w-lg lg:mt-0">
              <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.24em] text-white/70">
                <span className="h-px w-7 bg-current" />
                {isRegister ? 'Make room for the road' : 'Your journey, in good hands'}
              </p>
              <h1
                className="font-headline text-[clamp(2.8rem,7vw,5.7rem)] font-black uppercase leading-[.82] tracking-[-.075em] text-[#fff7f2]"
                id="auth-title"
              >
                {isRegister ? (
                  <>
                    Go
                    <br />
                    your
                    <br />
                    own way<span className="text-[#f04436]">.</span>
                  </>
                ) : (
                  <>
                    The city
                    <br />
                    is calling
                    <span className="text-[#181010]">.</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/75 sm:text-base">
                {isRegister
                  ? 'One account for the journeys you have planned — and the ones you have not yet imagined.'
                  : 'Come back to your bookings, your plans, and the people who know these roads best.'}
              </p>
            </div>

            <div className="relative z-10 mt-9 flex items-end justify-between border-t border-white/20 pt-4 lg:mt-0">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.22em] text-white/55">
                  Vimal travel notes
                </p>
                <p className="mt-1 text-xs text-white/85">
                  {isRegister ? 'Start with a name. Go anywhere.' : 'Local knowledge. Open roads.'}
                </p>
              </div>
              <span className="font-headline text-4xl font-black leading-none tracking-[-.08em] text-white/25">
                25°19′
              </span>
            </div>
          </section>

          <section
            className={`relative order-2 flex flex-col justify-center overflow-hidden bg-[#171313] p-4 transition-all duration-700 sm:p-7 lg:p-9 ${
              isRegister ? 'lg:order-1' : 'lg:order-2'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 15% 85%, rgba(193,35,29,.12), transparent 36%), repeating-linear-gradient(45deg, transparent 0 16px, rgba(255,255,255,.018) 16px 17px, transparent 17px 34px)'
            }}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px] transition-colors duration-700 ${
                isRegister ? 'bg-[#ed3028]/15' : 'bg-[#ed3028]/10'
              }`}
            />

            <div className="relative z-10 mx-auto w-full max-w-[470px] rounded-[28px] border border-[#762923]/75 bg-[#100e0e]/95 p-5 shadow-[0_26px_70px_rgba(0,0,0,.48),0_0_34px_rgba(111,31,27,.16),inset_0_1px_0_rgba(255,118,105,.12)] backdrop-blur-xl transition-all duration-500 sm:rounded-[32px] sm:p-7 lg:p-8">
              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ff5b4e]/80 to-transparent" />
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#ef4438]">
                    {isRegister ? 'Passenger profile · 01' : 'Member access · 02'}
                  </p>
                  <h2 className="mt-2 font-headline text-3xl font-black tracking-[-.06em] text-[#fff8f4] sm:text-4xl">
                    {isRegister ? 'Join the journey' : 'Pick up where you left off'}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-white/40">
                    {isRegister
                      ? 'Set up your details once. Keep every trip together.'
                      : 'Your travel plans are right where you left them.'}
                  </p>
                </div>
                <button
                  aria-label="Close login form"
                  className="auth-tap group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/75 transition duration-300 hover:rotate-90 hover:border-[#f04436]/60 hover:bg-[#f04436]/10 hover:text-white"
                  onClick={onClose}
                  type="button"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                    close
                  </span>
                </button>
              </div>

              <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/[.07] bg-[#080808] p-1.5">
                <button
                  aria-pressed={!isRegister}
                  className={`auth-tap relative rounded-lg py-3 text-center text-[10px] font-bold uppercase tracking-[.18em] transition-all duration-300 ${
                    !isRegister ? 'bg-[#351614] text-white shadow-[inset_0_0_0_1px_rgba(240,68,54,.38),0_3px_12px_rgba(111,31,27,.22)]' : 'text-white/40 hover:text-white/75'
                  }`}
                  onClick={() => switchMode(false)}
                  type="button"
                >
                  Sign in
                </button>
                <button
                  aria-pressed={isRegister}
                  className={`auth-tap relative rounded-lg py-3 text-center text-[10px] font-bold uppercase tracking-[.18em] transition-all duration-300 ${
                    isRegister ? 'bg-[#351614] text-white shadow-[inset_0_0_0_1px_rgba(240,68,54,.38),0_3px_12px_rgba(111,31,27,.22)]' : 'text-white/40 hover:text-white/75'
                  }`}
                  onClick={() => switchMode(true)}
                  type="button"
                >
                  Register
                </button>
              </div>

              <div>
                <form
                  key={isRegister ? 'register' : 'login'}
                  onSubmit={handleSubmit}
                  className="auth-form-enter"
                >
                  <div className="mb-5 rounded-2xl border border-[#5b2421]/60 bg-[#0b0a0a] p-4 shadow-[inset_0_1px_0_rgba(255,95,80,.04)] sm:p-5">
                    <div className="mb-5 flex items-center gap-3 border-b border-white/[.07] pb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9362c]/10 font-mono text-[11px] font-bold text-[#ff6257]">
                        01
                      </span>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/80">
                          {isRegister ? 'Your details' : 'Account details'}
                        </p>
                        <p className="mt-1 text-[10px] text-white/35">
                          {isRegister ? 'Fields marked are required' : 'Enter your account credentials'}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-[17px] text-[#f04436]/80">
                        {isRegister ? 'person_add' : 'fingerprint'}
                      </span>
                    </div>
                  {isRegister && (
                    <>
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#c4b8b3]"
                          htmlFor="auth-name"
                        >
                          Full name
                        </label>
                        <div className="relative">
                          <span aria-hidden="true" className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-white/30">badge</span>
                          <input autoComplete="name" className={inputClassName} id="auth-name" onChange={(e) => setName(e.target.value)} placeholder="Name as you’d like us to know you" required type="text" value={name} />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#c4b8b3]"
                          htmlFor="auth-phone"
                        >
                          Phone number
                        </label>
                        <div className="relative">
                          <span aria-hidden="true" className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-white/30">call</span>
                          <input autoComplete="tel" className={inputClassName} id="auth-phone" onChange={(e) => setPhone(e.target.value)} placeholder="Your reachable number" required type="tel" value={phone} />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label
                      className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#c4b8b3]"
                      htmlFor={isRegister ? 'register-email' : 'login-email'}
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <span aria-hidden="true" className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-white/30">alternate_email</span>
                      <input autoComplete="email" className={inputClassName} id={isRegister ? 'register-email' : 'login-email'} onChange={(e) => setEmail(e.target.value)} placeholder={isRegister ? 'Your preferred email address' : 'Email address on your account'} required type="email" value={email} />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#c4b8b3]"
                      htmlFor={isRegister ? 'register-password' : 'login-password'}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span aria-hidden="true" className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-white/30">lock</span>
                      <input autoComplete={isRegister ? 'new-password' : 'current-password'} className={inputClassName} id={isRegister ? 'register-password' : 'login-password'} onChange={(e) => setPassword(e.target.value)} placeholder={isRegister ? 'Choose a private password' : 'Your password'} required type="password" value={password} />
                    </div>
                  </div>
                  </div>

                  {!isRegister && (
                    <div className="mb-5 flex items-center justify-between text-xs">
                      <label className="flex cursor-pointer items-center gap-2 text-white/55">
                        <input
                          className="h-3.5 w-3.5 accent-[#f04436]"
                          type="checkbox"
                        />
                        Keep me signed in
                      </label>
                      <button
                        className="text-[#ff766b] transition-colors hover:text-white"
                        type="button"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {errorMsg && (
                    <div
                      aria-live="polite"
                      className="mb-4 rounded-xl border border-[#ff5549]/35 bg-[#711b19]/20 px-4 py-3 text-sm text-[#ffaaa2]"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <button
                    className="auth-tap group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-[#e9362c] px-5 py-4 text-left text-[11px] font-black uppercase tracking-[.2em] text-white shadow-[0_12px_35px_rgba(207,37,29,.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f34a3e] hover:shadow-[0_16px_38px_rgba(207,37,29,.34)] disabled:cursor-wait disabled:opacity-70 motion-reduce:transform-none"
                    disabled={loading}
                    type="submit"
                  >
                    <span>{loading ? 'One moment…' : isRegister ? 'Create my account' : 'Continue'}</span>
                    <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>

              {!isRegister ? (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/35">
                    Try a demo account
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="auth-tap flex-1 rounded-lg border border-white/10 px-3 py-2.5 text-left text-[11px] font-semibold text-white/65 transition-colors hover:border-[#f04436]/50 hover:text-white"
                      onClick={() => fillQuickDemo('admin')}
                      type="button"
                    >
                      Admin demo <span className="text-[#f04436]">↗</span>
                    </button>
                    <button
                      className="auth-tap flex-1 rounded-lg border border-white/10 px-3 py-2.5 text-left text-[11px] font-semibold text-white/65 transition-colors hover:border-[#f04436]/50 hover:text-white"
                      onClick={() => fillQuickDemo('customer')}
                      type="button"
                    >
                      Customer demo <span className="text-[#f04436]">↗</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
                  Your details are only used to manage your account and travel requests.
                </p>
              )}

              <p className="mt-6 text-center text-xs text-white/45">
                {isRegister ? 'Already have an account?' : 'New to Vimal?'}{' '}
                <button
                  className="auth-tap rounded-sm font-bold text-[#ff766b] transition-colors hover:text-white"
                  onClick={() => switchMode(!isRegister)}
                  type="button"
                >
                  {isRegister ? 'Sign in instead' : 'Create an account'}
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
