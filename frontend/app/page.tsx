'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const userData = await api.login(username, role);
      localStorage.setItem('moodsnap_user', JSON.stringify(userData));
      router.push('/dashboard');
    } catch (err) {
      setError('Connection failed. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-black tracking-tighter italic">MoodSnap</h1>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-[0.2em]">Mindful Tracking</p>
        </div>

        <div className="bg-white p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-all text-gray-800 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-1">
                Access Level
              </label>
              <div className="flex gap-2">
                {(['user', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${
                      role === r 
                        ? 'bg-black text-white border-black shadow-lg shadow-gray-200' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-medium text-center bg-red-50 py-2 rounded-xl italic">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-900 transition-all active:scale-[0.98] disabled:bg-gray-200"
            >
              {isLoading ? 'Authenticating...' : 'Enter Space'}
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-300 text-[10px] mt-10 tracking-widest uppercase">
          &copy; 2026 Studio MoodSnap
        </p>
      </div>
    </div>
  );
}