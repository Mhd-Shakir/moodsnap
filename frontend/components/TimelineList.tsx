import React from 'react';
import { MoodEntry } from '@/lib/api';

interface TimelineListProps {
  entries: MoodEntry[];
  isAdmin: boolean;
  onDelete?: (id: string) => void;
}

const TimelineList: React.FC<TimelineListProps> = ({ entries, isAdmin, onDelete }) => {
  const getEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😢';
      case 'angry': return '😡';
      default: return '🤔';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-black mb-4 tracking-tight">
        {isAdmin ? 'All Entries' : 'History'}
      </h2>
      {entries.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-gray-400 text-sm italic">
          No records found.
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {entries.map((entry) => (
            <div key={entry.id} className="group bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-5 transition-all hover:border-black">
              <div className="text-2xl grayscale group-hover:grayscale-0 transition-all">
                {getEmoji(entry.mood)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  {isAdmin && onDelete && (
                    <button onClick={() => onDelete(entry.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-black transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-800 mt-1 font-light">
                  {entry.note || 'No thoughts recorded.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineList;