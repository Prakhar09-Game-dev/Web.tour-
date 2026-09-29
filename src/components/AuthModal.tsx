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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#e2e2e2] animate-in zoom-in-95 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e2e2] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#0d1c32] text-white flex items-center justify-center font-bold">
              V
            </span>
            <div>
              <h2 className="font-headline font-bold text-lg text-[#0d1c32]">
                {isRegister ? 'Create Customer Account' : 'Sign In to Vimal Tour'}
              </h2>
              <span className="text-[11px] text-[#75777e]">
                {isRegister ? 'Manage bookings & trip quotes' : 'Access your trip history & bookings'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Quick Demo Credentials Strip */}
        <div className="bg-[#f9f9f9] p-3 rounded-xl border border-[#e2e2e2] mb-4 text-xs">
          <span className="text-[11px] font-bold text-[#735c00] block mb-1.5 uppercase tracking-wider">
            ⚡ Quick Test Sign In:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo('admin')}
              className="py-1.5 px-2 bg-[#fed65b]/30 hover:bg-[#fed65b] text-[#241a00] font-bold rounded text-[11px] transition-colors cursor-pointer text-left"
            >
              👑 Admin Demo
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('customer')}
              className="py-1.5 px-2 bg-[#f3f3f4] hover:bg-[#e2e2e2] text-[#0d1c32] font-bold rounded text-[11px] transition-colors cursor-pointer text-left"
            >
              👤 Customer Demo
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] font-mono"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold text-[#44474d] mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="e.g. customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#44474d] mb-1">Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#000000] text-white font-bold text-xs rounded-xl hover:bg-[#0d1c32] transition-colors shadow-sm cursor-pointer mt-2"
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[#e2e2e2] text-center text-xs text-[#75777e]">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setErrorMsg('');
                }}
                className="font-bold text-[#0d1c32] underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setErrorMsg('');
                }}
                className="font-bold text-[#0d1c32] underline cursor-pointer"
              >
                Register Here
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
