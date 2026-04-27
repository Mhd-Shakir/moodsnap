'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, User, MoodEntry, Stats } from '@/lib/api';
import MoodForm from '@/components/MoodForm';
import TimelineList from '@/components/TimelineList';
import StatsPanel from '@/components/StatsPanel';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [stats, setStats] = useState<Stats>({ happy: 0, sad: 0, neutral: 0, angry: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('moodsnap_user');
    if (!storedUser) {
      router.push('/');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchData(parsedUser);
  }, [router]);

  const fetchData = async (currUser: User) => {
    try {
      setIsLoading(true);
      const [moodData, statsData] = await Promise.all([
        api.getMoods(currUser.userId, currUser.role),
        api.getStats(currUser.userId, currUser.role),
      ]);
      setMoods(moodData);
      setStats(statsData);
      setError('');
    } catch (err) {
      setError('Failed to load data. Is the backend running?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMood = async (mood: string, note: string) => {
    if (!user) return;
    try {
      setIsSubmitting(true);
      await api.createMood(user.userId, user.role, mood, note);
      await fetchData(user);
    } catch (err) {
      setError('Failed to save mood. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMood = async (id: string) => {
    if (!user || user.role !== 'admin') return;
    try {
      await api.deleteMood(id, user.role);
      await fetchData(user);
    } catch (err) {
      setError('Failed to delete mood.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('moodsnap_user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold">MS</div>
            <h1 className="text-xl font-bold tracking-tight">MoodSnap</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">@{user.username}</p>
              <p className="text-[10px] uppercase font-bold text-indigo-500">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {isLoading && moods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-indigo-400">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
            <p className="font-medium">Loading your dashboard...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form (User Only) and Stats */}
            <div className="lg:col-span-5 space-y-8">
              {user.role === 'user' && (
                <MoodForm onSuccess={handleCreateMood} isSubmitting={isSubmitting} />
              )}
              <StatsPanel stats={stats} />
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-7">
              <TimelineList 
                entries={moods} 
                isAdmin={user.role === 'admin'} 
                onDelete={handleDeleteMood}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
