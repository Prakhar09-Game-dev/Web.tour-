import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071827]/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="max-w-4xl w-full overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_rgba(5,15,28,0.35)] my-8 animate-in zoom-in-95">
        <div className="grid lg:grid-cols-[1.02fr_1.25fr]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,211,104,0.24),transparent_30%),linear-gradient(135deg,#0c1d31_0%,#122844_50%,#0b1729_100%)] p-6 sm:p-8 text-white">
            <div className="absolute -right-16 -top-10 h-40 w-40 rounded-full bg-[#fed65b]/20 blur-3xl" />
            <div className="absolute -left-10 bottom-8 h-32 w-32 rounded-full bg-[#6ec7b6]/15 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fed65b] text-lg font-black text-[#0d1c32] shadow-lg shadow-[#fed65b]/20">
                  V
                </div>
                <div>
                  <p className="font-headline text-xl font-black tracking-tight">Vimal</p>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-slate-300">Tour & Travellers</p>
                </div>
              </div>

              <div className="mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffe088]">
                  <span className="material-symbols-outlined text-[14px]">travel_explore</span>
                  Trusted by pilgrims & travellers
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="font-headline text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  {isRegister ? 'Create your travel account' : 'Welcome back to Varanasi'}
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-slate-300">
                  {isRegister
                    ? 'Manage your bookings, request custom trip quotes, and plan your next spiritual or city journey with ease.'
                    : 'Access your bookings, trip history, and quick support for every ride across Kashi and beyond.'}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  'Transparent pricing for every route',
                  '24/7 local support and quick confirmations',
                  'Comfortable rides for city, airport, and pilgrimage trips'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#fed65b]">check_circle</span>
                    <span className="text-sm text-slate-100">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-[#fed65b]/25 bg-[#fed65b]/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#ffe088]">Quick access</p>
                  <p className="mt-2 text-sm font-medium text-white">Demo sign-in available in the form panel.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f8f8f8] p-5 sm:p-7 lg:p-8">
            <div className="flex items-center justify-between pb-4">
              <div className="inline-flex rounded-full border border-[#dfe3e8] bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrorMsg('');
                  }}
                  className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all ${
                    !isRegister ? 'bg-[#0d1c32] text-white shadow-md' : 'text-[#44474d]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setErrorMsg('');
                  }}
                  className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all ${
                    isRegister ? 'bg-[#0d1c32] text-white shadow-md' : 'text-[#44474d]'
                  }`}
                >
                  Register
                </button>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#44474d] shadow-sm ring-1 ring-[#e2e2e2] transition-colors hover:bg-[#f3f3f4]"
                aria-label="Close login form"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-[#e6e8eb] bg-white p-3.5 shadow-[0_10px_30px_rgba(12,29,49,0.04)]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#735c00]">Try demo access</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillQuickDemo('admin')}
                  className="rounded-xl border border-[#fed65b]/30 bg-[#fff6d5] px-3 py-2 text-left text-[11px] font-bold text-[#241a00] transition-colors hover:bg-[#fed65b]/30"
                >
                  Admin demo
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickDemo('customer')}
                  className="rounded-xl border border-[#e2e2e2] bg-[#f5f6f7] px-3 py-2 text-left text-[11px] font-bold text-[#0d1c32] transition-colors hover:bg-[#edf0f3]"
                >
                  Customer demo
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
              {isRegister && (
                <>
                  <div>
                    <label className="mb-1.5 block font-semibold text-[#44474d]">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[#c5c6cd] bg-[#f3f3f4] px-3 py-2.5 text-sm text-[#1a1c1c] outline-none transition focus:border-[#0d1c32] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-semibold text-[#44474d]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-[#c5c6cd] bg-[#f3f3f4] px-3 py-2.5 text-sm text-[#1a1c1c] font-mono outline-none transition focus:border-[#0d1c32] focus:bg-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="mb-1.5 block font-semibold text-[#44474d]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#c5c6cd] bg-[#f3f3f4] px-3 py-2.5 text-sm text-[#1a1c1c] outline-none transition focus:border-[#0d1c32] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-[#44474d]">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#c5c6cd] bg-[#f3f3f4] px-3 py-2.5 text-sm text-[#1a1c1c] outline-none transition focus:border-[#0d1c32] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-[#0d1c32] py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(13,28,50,0.2)] transition-colors hover:bg-[#122844] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <div className="mt-5 border-t border-[#e2e2e2] pt-4 text-center text-xs text-[#515f78]">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(false);
                      setErrorMsg('');
                    }}
                    className="font-bold text-[#0d1c32] underline underline-offset-2"
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  Don’t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(true);
                      setErrorMsg('');
                    }}
                    className="font-bold text-[#0d1c32] underline underline-offset-2"
                  >
                    Register here
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
